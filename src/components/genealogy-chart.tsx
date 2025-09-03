
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
    member: FamilyMember;
}

function CustomNode({ data }: NodeProps<CustomNodeData>) {
    const { label } = data;

    const nodeClasses = `
        p-3 rounded-md shadow-md border-2
        bg-gradient-to-br from-green-100 to-green-200 border-green-400
        text-center transition-transform transform hover:scale-105 duration-300
        min-w-[150px] max-w-[220px] flex justify-center items-center
        text-green-900 font-semibold cursor-pointer
    `;
    
    return (
        <div className={nodeClasses} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <Handle type="target" position={Position.Top} className="w-2 h-2 bg-gray-400 rounded-full !-top-1 opacity-50" />
            <div className="font-headline text-base leading-tight">{label}</div>
            <Handle type="source" position={Position.Bottom} className="w-2 h-2 bg-gray-400 rounded-full !-bottom-1 opacity-50" />
        </div>
    );
}


// ==================== Layouting Function ====================
const nodeWidth = 200;
const nodeHeight = 60;

const getLayoutedElements = (nodes: any[], edges: any[], direction = 'TB') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: direction, nodesep: 50, ranksep: 70 });

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

// ==================== Main Genealogy Chart Component ====================
export function GenealogyChart() {
    const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
    
    const onNodeClick = useCallback((event: React.MouseEvent, node: any) => {
        const memberId = node.id;
        
        setNodes(prevNodes => {
            const existingNodeIds = new Set(prevNodes.map(n => n.id));
            const newNodes: any[] = [];
            const newEdges: any[] = [];

            const children = familyMembers.filter(m => m.parents.includes(memberId));
            
            const alreadyVisibleChildren = children.every(child => existingNodeIds.has(child.id));
            if (alreadyVisibleChildren) return prevNodes;

            children.forEach(child => {
                if (!existingNodeIds.has(child.id)) {
                    newNodes.push({
                        id: child.id,
                        type: 'customNode',
                        data: { label: child.name, member: child },
                    });
                    newEdges.push({ id: `e-${memberId}-${child.id}`, source: memberId, target: child.id, style: { strokeWidth: 1.5, stroke: '#A1A1AA' } });
                }
            });
            
            if (newNodes.length === 0) return prevNodes;

            const allNodes = [...prevNodes, ...newNodes];
            const allEdges = [...edges, ...newEdges];
            
            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(allNodes, allEdges);
            setEdges(layoutedEdges);
            return layoutedNodes;
        });
    }, [edges, setEdges, setNodes]);

    useEffect(() => {
        const rootMember = familyMembers.find(m => m.parents.length === 0);
        if (rootMember) {
            setNodes([{
                id: rootMember.id,
                type: 'customNode',
                data: { label: rootMember.name, member: rootMember },
                position: { x: 400, y: 50 },
            }]);
        }
    }, []);

    return (
        <div style={{ width: '100%', height: '100%' }} className="bg-white">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                onNodeClick={onNodeClick}
                fitView
                nodesDraggable={false}
                minZoom={0.2}
                maxZoom={2}
                className="bg-muted/50"
            >
                <MiniMap 
                    nodeStrokeWidth={3} 
                    nodeColor={() => '#22c55e'}
                    nodeBorderRadius={5}
                />
                <Controls />
                <Background variant="dots" gap={20} size={1} color="#E5E7EB" />
                <Panel position="top-left" className="p-2 bg-white rounded-lg shadow-md text-sm text-gray-700 font-headline">
                    Ата-бабалар шежіресі
                </Panel>
            </ReactFlow>
        </div>
    );
}
