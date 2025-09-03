
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
import { familyMembers } from '@/lib/genealogy-data';

// ==================== Custom Node Component ====================

interface CustomNodeData {
    label: string;
    member: {
        id: string;
        name: string;
        surname: string;
        birthYear: number | string;
        gender: 'male' | 'female' | 'couple';
        members?: FamilyMember[]; // For couples
    };
    onExpand: (memberId: string) => void;
}

function CustomNode({ data, id }: NodeProps<CustomNodeData>) {
    const { member, onExpand, label } = data;
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
        text-white font-sans cursor-pointer
    `;
    
    // Only male nodes can be expanded to show children
    const handleNodeClick = () => {
        if (isMale || isCouple) {
            onExpand(member.id);
        }
    };

    return (
        <div
            className={nodeClasses}
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
            onClick={handleNodeClick}
        >
            <Handle type="target" position={Position.Top} className="w-2 h-2 bg-gray-400 rounded-full !-top-1 opacity-50" />
                <div className="font-bold text-base leading-tight">{label}</div>
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

const memberMap = new Map(familyMembers.map(m => [m.id, m]));

export function GenealogyChart() {
    const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
    
    const onExpand = useCallback((memberId: string) => {
        setNodes(prevNodes => {
            const existingNodeIds = new Set(prevNodes.map(n => n.id));
            const newNodes: any[] = [];
            const newEdges: any[] = [];

            const children = familyMembers.filter(m => m.parents.includes(memberId) && m.gender === 'male');

            children.forEach(child => {
                if (!existingNodeIds.has(child.id)) {
                    // Find spouse
                    const spouse = familyMembers.find(f => f.gender === 'female' && familyMembers.some(grandChild => grandChild.parents.includes(child.id) && grandChild.parents.includes(f.id)));
                    
                    let sourceId = child.id;
                    
                    if (spouse && !existingNodeIds.has(`couple-${child.id}-${spouse.id}`)) {
                       const coupleId = `couple-${child.id}-${spouse.id}`;
                       newNodes.push({
                            id: coupleId,
                            type: 'customNode',
                            data: { label: `${child.name} & ${spouse.name}`, member: { id: coupleId, gender: 'couple' }, onExpand },
                       });
                       newEdges.push({ id: `e-${memberId}-${coupleId}`, source: memberId, target: coupleId, style: { strokeWidth: 1.5, stroke: '#A1A1AA' } });
                       sourceId = coupleId;
                    } else {
                       newNodes.push({
                           id: child.id,
                           type: 'customNode',
                           data: { label: `${child.name} ${child.surname}`, member: child, onExpand },
                       });
                       newEdges.push({ id: `e-${memberId}-${child.id}`, source: memberId, target: child.id, style: { strokeWidth: 1.5, stroke: '#A1A1AA' } });
                    }
                }
            });
            
            if (newNodes.length === 0) return prevNodes;

            const allNodes = [...prevNodes, ...newNodes];
            setEdges(prevEdges => [...prevEdges, ...newEdges]);
            
            const { nodes: layoutedNodes } = getLayoutedElements(allNodes, [...edges, ...newEdges]);
            return layoutedNodes;
        });

    }, [setNodes, setEdges, nodes, edges]);
    
    useEffect(() => {
        const rootMember = familyMembers.find(m => m.parents.length === 0 && m.gender === 'male');
        if (rootMember) {
            setNodes([{
                id: rootMember.id,
                type: 'customNode',
                data: { label: `${rootMember.name} ${rootMember.surname}`, member: rootMember, onExpand },
                position: { x: 400, y: 50 },
            }]);
        }
    }, []); // Run only once

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
