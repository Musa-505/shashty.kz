
"use client";

import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  Node,
  Edge,
  MarkerType,
  addEdge,
  Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const CustomNode = ({ data }: { data: { name: string; clan?: string } }) => (
  <Card className="w-48 text-center shadow-md bg-card border-2 border-primary cursor-pointer hover:border-accent">
    <CardHeader className="p-4">
      <CardTitle className="text-base font-bold">{data.name}</CardTitle>
      {data.clan && <CardDescription>{data.clan}</CardDescription>}
    </CardHeader>
  </Card>
);

const nodeTypes = {
  custom: CustomNode,
};

const allNodes: Node[] = [
  { id: '1', type: 'custom', position: { x: 250, y: 0 }, data: { name: 'Абылай хан', clan: 'Орта жүз' } },
  { id: '2', type: 'custom', position: { x: 0, y: 150 }, data: { name: 'Қабанбай', clan: 'Ұлы жүз' } },
  { id: '3', type: 'custom', position: { x: 500, y: 150 }, data: { name: 'Бөгенбай', clan: 'Орта жүз' } },
  { id: '4', type: 'custom', position: { x: 250, y: 300 }, data: { name: 'Кенесары', clan: 'Орта жүз' } },
  { id: '5', type: 'custom', position: { x: 250, y: 450 }, data: { name: 'Сыздық сұлтан' } },
  { id: '6', type: 'custom', position: { x: 500, y: 450 }, data: { name: 'Жәнібек' } },
  { id: '7', type: 'custom', position: { x: 0, y: 450 }, data: { name: 'Күнімжан', clan: 'Жұбайы'} },
];

const allEdges: Edge[] = [
  { id: 'e1-4', source: '1', target: '4', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e2-1', source: '2', target: '1', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e3-1', source: '3', target: '1', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e4-5', source: '4', target: '5', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e4-6', source: '4', target: '6', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e7-4', source: '7', target: '4', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
];

export function GenealogyChart() {
  const [nodes, setNodes] = useState<Node[]>(allNodes);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    // Find all edges connected to the clicked node
    const connectedEdges = allEdges.filter(
      (edge) => edge.source === node.id || edge.target === node.id
    );
    
    // Add the newly found edges to the existing visible edges
    // This uses a Set to prevent duplicate edges from being added
    setEdges((prevEdges) => {
        const newEdges = [...prevEdges];
        const edgeIds = new Set(prevEdges.map(e => e.id));
        
        connectedEdges.forEach(edge => {
            if (!edgeIds.has(edge.id)) {
                newEdges.push(edge);
                edgeIds.add(edge.id);
            }
        });
        
        return newEdges;
    });
  }, []);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      nodeTypes={nodeTypes}
      fitView
      className="bg-background"
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
}
