
'use client';

import React, { useMemo, useEffect, useCallback } from 'react';
import ReactFlow, {
    Controls,
    Background,
    MiniMap,
    Panel,
    useNodesState,
    useEdgesState,
    addEdge,
    Handle,
    Position,
    NodeProps,
} from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';
import type { FamilyMember } from '@/lib/genealogy-data';

// ==================== Custom Node Component ====================

interface CustomNodeData {
    label: string;
    member: {
        id: string;
        name: string;
        surname: string;
        birthYear: string;
        gender: 'male' | 'female' | 'couple';
        members?: FamilyMember[]; // For couples
    };
}

function CustomNode({ data }: NodeProps<CustomNodeData>) {
    const { member } = data;
    const isCouple = member.gender === 'couple';
    const isMale = member.gender === 'male';

    const nodeClasses = `
        p-3 rounded-xl shadow-lg border-2
        ${isCouple
            ? 'bg-gradient-to-br from-green-200 to-green-400 border-green-600'
            : (isMale
                ? 'bg-gradient-to-br from-blue-200 to-blue-400 border-blue-600'
                : 'bg-gradient-to-br from-pink-200 to-pink-400 border-pink-600'
            )
        }
        text-center transition-transform transform hover:scale-105 duration-300
        min-w-[150px] max-w-[220px] flex flex-col justify-center items-center
        text-white font-sans
    `;

    return (
        <div
            className={nodeClasses}
            style={{
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
        >
            <Handle type="target" position={Position.Top} className="w-2 h-2 bg-gray-400 rounded-full !-top-1 opacity-50" />

            {isCouple && member.members ? (
                <>
                    <div className="font-bold text-base leading-tight">{member.members[0].name} & {member.members[1].name}</div>
                    <div className="text-xs opacity-90">{member.members[0].surname} & {member.members[1].surname}</div>
                </>
            ) : (
                <>
                    <div className="font-bold text-base leading-tight">{member.name}</div>
                    <div className="text-sm leading-tight opacity-90">{member.surname}</div>
                    <div className="text-xs opacity-70">({member.birthYear})</div>
                </>
            )}

            {(isMale || isCouple) && (
                <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-gray-400 rounded-full !-bottom-1 opacity-50" />
            )}
        </div>
    );
}


// ==================== Layouting Function ====================

const nodeWidth = 200;
const nodeHeight = 80;

const getLayoutedElements = (nodes: any[], edges: any[], direction = 'TB') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    dagreGraph.setGraph({ rankdir: direction, nodesep: 50, ranksep: 80 });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.targetPosition = Position.Top;
        node.sourcePosition = Position.Bottom;
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };
        return node;
    });

    return { nodes, edges };
};

// ==================== Main Family Tree Component ====================

import { familyMembers } from '@/lib/genealogy-data';

export function GenealogyChart() {
    const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    useEffect(() => {
        const memberMap = new Map(familyMembers.map(m => [m.id, m]));
        const processedMemberIds = new Set<string>();
        let generatedNodes: any[] = [];
        let generatedEdges: any[] = [];

        familyMembers.forEach(member => {
            if (processedMemberIds.has(member.id)) return;

            // Check for a spouse
            const spouse = familyMembers.find(other => 
                other.id !== member.id &&
                other.gender !== member.gender &&
                member.parents.join(',') === other.parents.join(',') && // Not siblings
                familyMembers.some(child => 
                    child.parents.includes(member.id) && child.parents.includes(other.id)
                )
            );

            if (spouse && !processedMemberIds.has(spouse.id)) {
                // This is a couple
                const male = member.gender === 'male' ? member : spouse;
                const female = member.gender === 'female' ? member : spouse;
                const coupleNodeId = `couple-${male.id}-${female.id}`;

                generatedNodes.push({
                    id: coupleNodeId,
                    type: 'customNode',
                    data: {
                        label: `${male.name} & ${female.name}`,
                        member: {
                            id: coupleNodeId,
                            gender: 'couple',
                            members: [male, female]
                        }
                    },
                    position: { x: 0, y: 0 },
                });
                
                // Link children to the couple node
                const children = familyMembers.filter(child => child.parents.includes(male.id) && child.parents.includes(female.id));
                children.forEach(child => {
                    generatedEdges.push({
                        id: `e-${coupleNodeId}-${child.id}`,
                        source: coupleNodeId,
                        target: child.id,
                        style: { strokeWidth: 1.5, stroke: '#A1A1AA' },
                    });
                });

                processedMemberIds.add(male.id);
                processedMemberIds.add(female.id);

            } else if (!spouse) {
                // This is a single person (or part of a couple already processed)
                generatedNodes.push({
                    id: member.id,
                    type: 'customNode',
                    data: { label: `${member.name} ${member.surname}`, member },
                    position: { x: 0, y: 0 },
                });
            }
        });
        
        // Link single parents to their children
        familyMembers.forEach(child => {
             if (child.parents.length === 1) {
                 const parentId = child.parents[0];
                 const parentNode = generatedNodes.find(n => n.id === parentId);
                 if (parentNode) {
                     generatedEdges.push({
                         id: `e-${parentId}-${child.id}`,
                         source: parentId,
                         target: child.id,
                         style: { strokeWidth: 1.5, stroke: '#A1A1AA' },
                     });
                 }
             }
        });


        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            generatedNodes,
            generatedEdges
        );

        setNodes(layoutedNodes);
        setEdges(layoutedEdges);

    }, [setNodes, setEdges]);


    return (
        <div style={{ width: '100%', height: '100%' }} className="bg-white">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                nodesDraggable={false}
                minZoom={0.2}
                maxZoom={2}
                className="bg-muted/50"
            >
                <MiniMap 
                    nodeStrokeWidth={3} 
                    nodeColor={(n: any) => {
                        if (n.data.member.gender === 'couple') return '#10B981';
                        if (n.data.member.gender === 'male') return '#3B82F6';
                        if (n.data.member.gender === 'female') return '#EC4899';
                        return '#9CA3AF';
                    }}
                    nodeBorderRadius={5}
                />
                <Controls />
                <Background variant="dots" gap={20} size={1} color="#E5E7EB" />
                <Panel position="top-left" className="p-2 bg-white rounded-lg shadow-md text-sm text-gray-700 font-headline">
                    Бектілеу Ата Шежіресі
                </Panel>
            </ReactFlow>
        </div>
    );
}
