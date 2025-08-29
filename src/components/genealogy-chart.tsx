
"use client";

import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  Node,
  Edge,
  MarkerType,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowInstance,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { genealogyData, Person } from '@/lib/genealogy-data';
import Image from 'next/image';
import { Card } from './ui/card';

const PersonNode = ({ data }: { data: { person: Person, onExpand: (person: Person) => void } }) => (
  <Card 
    className="w-48 text-center shadow-md bg-card border-2 border-primary cursor-pointer hover:border-accent p-2"
    onClick={() => data.onExpand(data.person)}
  >
    <div className="relative w-full h-32 mb-2 rounded-md overflow-hidden">
        <Image
            src={data.person.imageUrl}
            alt={data.person.name}
            fill
            className="object-cover"
            sizes="150px"
            data-ai-hint="historical portrait"
        />
    </div>
    <h3 className="text-base font-bold font-headline">{data.person.name}</h3>
    <p className="text-xs text-muted-foreground">{data.person.title}</p>
  </Card>
);

const nodeTypes = {
  person: PersonNode,
};

const initialNodes: Node[] = [
  {
    id: genealogyData.id,
    type: 'person',
    position: { x: 0, y: 0 },
    data: { person: genealogyData, onExpand: () => {} },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
];

const initialEdges: Edge[] = [];

export function GenealogyChart() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

   const onExpand = useCallback((personToExpand: Person) => {
    setNodes((currentNodes) => {
        const existingNodeIds = new Set(currentNodes.map(n => n.id));
        const childNodes = (personToExpand.children ?? [])
            .filter(child => !existingNodeIds.has(child.id))
            .map((child, index) => {
                const parentNode = currentNodes.find(n => n.id === personToExpand.id);
                const xOffset = (index - ((personToExpand.children?.length ?? 1) -1) / 2) * 250;
                const yOffset = 250;

                return {
                    id: child.id,
                    type: 'person',
                    position: { 
                        x: (parentNode?.position.x ?? 0) + xOffset, 
                        y: (parentNode?.position.y ?? 0) + yOffset
                    },
                    data: { person: child, onExpand: onExpand },
                    sourcePosition: Position.Bottom,
                    targetPosition: Position.Top,
                };
            });

        return [...currentNodes, ...childNodes];
    });

    setEdges((currentEdges) => {
        const newEdges = (personToExpand.children ?? []).map(child => ({
            id: `e-${personToExpand.id}-${child.id}`,
            source: personToExpand.id,
            target: child.id,
            markerEnd: { type: MarkerType.ArrowClosed },
        }));
        
        let updatedEdges = currentEdges;
        newEdges.forEach(edge => {
            // addEdge is idempotent, it won't add duplicates
            updatedEdges = addEdge(edge, updatedEdges);
        });
        
        return updatedEdges;
    });

  }, [setNodes, setEdges]);
  
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        // give onExpand function to all nodes
        node.data = { ...node.data, onExpand };
        return node;
      })
    );
  }, [onExpand, setNodes]);


  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
      className="bg-background"
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
}
