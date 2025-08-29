
"use client";

import React from 'react';
import ReactFlow, {
  Controls,
  Background,
  Node,
  Edge,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const CustomNode = ({ data }: { data: { name: string; clan?: string } }) => (
  <Card className="w-48 text-center shadow-md bg-card border-2 border-primary">
    <CardHeader className="p-4">
      <CardTitle className="text-base font-bold">{data.name}</CardTitle>
      {data.clan && <CardDescription>{data.clan}</CardDescription>}
    </CardHeader>
  </Card>
);

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  { id: '1', type: 'custom', position: { x: 250, y: 0 }, data: { name: 'Абылай хан', clan: 'Орта жүз' } },
  { id: '2', type: 'custom', position: { x: 0, y: 150 }, data: { name: 'Қабанбай', clan: 'Ұлы жүз' } },
  { id: '3', type: 'custom', position: { x: 500, y: 150 }, data: { name: 'Бөгенбай', clan: 'Орта жүз' } },
  { id: '4', type: 'custom', position: { x: 250, y: 300 }, data: { name: 'Кенесары', clan: 'Орта жүз' } },
  { id: '5', type: 'custom', position: { x: 250, y: 450 }, data: { name: 'Сыздық сұлтан' } },
  { id: '6', type: 'custom', position: { x: 500, y: 450 }, data: { name: 'Жәнібек' } },
  { id: '7', type: 'custom', position: { x: 0, y: 450 }, data: { name: 'Күнімжан', clan: 'Жұбайы'} },
];

const initialEdges: Edge[] = [
  { id: 'e1-4', source: '1', target: '4', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e2-1', source: '2', target: '1', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e3-1', source: '3', target: '1', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e4-5', source: '4', target: '5', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e4-6', source: '4', target: '6', markerEnd: { type: MarkerType.ArrowClosed } },
  { id: 'e7-4', source: '7', target: '4', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
];

export function GenealogyChart() {
  return (
    <ReactFlow
      nodes={initialNodes}
      edges={initialEdges}
      nodeTypes={nodeTypes}
      fitView
      className="bg-background"
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
}
