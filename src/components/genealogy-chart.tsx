
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
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { genealogyData, Person } from '@/lib/genealogy-data';
import { Card } from './ui/card';
import { Home } from 'lucide-react';

// A custom node component
const PersonNode = ({ data }: { data: { person: Person, onExpand: (person: Person) => void } }) => (
  <Card 
    className="w-48 text-center shadow-md bg-green-100 border-2 border-green-300 cursor-pointer hover:border-green-500 p-2"
    onClick={() => data.onExpand(data.person)}
  >
    <div className="flex items-center justify-center gap-2">
      <Home className="h-6 w-6 text-green-800" />
      <h3 className="text-base font-bold font-headline text-green-900">{data.person.name}</h3>
    </div>
  </Card>
);

const nodeTypes = {
  person: PersonNode,
};

export function GenealogyChart() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onExpand = useCallback((personToExpand: Person) => {
        setNodes((currentNodes) => {
            const existingNodeIds = new Set(currentNodes.map(n => n.id));
            if (!personToExpand.children || personToExpand.children.length === 0) {
                return currentNodes;
            }

            const childrenArePresent = personToExpand.children.every(child => existingNodeIds.has(child.id));
            if (childrenArePresent) {
                return currentNodes;
            }

            const parentNode = currentNodes.find(n => n.id === personToExpand.id);
            const childNodes = (personToExpand.children ?? []).map((child, index) => {
                const xOffset = (index - ((personToExpand.children?.length ?? 1) - 1) / 2) * 250;
                const yOffset = 150;

                return {
                    id: child.id,
                    type: 'person',
                    position: {
                        x: (parentNode?.position.x ?? 0) + xOffset,
                        y: (parentNode?.position.y ?? 0) + yOffset
                    },
                    data: { person: child, onExpand },
                    sourcePosition: Position.Bottom,
                    targetPosition: Position.Top,
                    draggable: false,
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
            
            // Using React Flow's addEdge utility to prevent duplicates
            let finalEdges = currentEdges;
            newEdges.forEach(edge => {
                finalEdges = addEdge(edge, finalEdges);
            });
            return finalEdges;
        });

    }, [setNodes, setEdges]);
    
    // Set the initial node with the correct onExpand function
    useEffect(() => {
        setNodes([
            {
                id: genealogyData.id,
                type: 'person',
                position: { x: 0, y: 0 },
                data: { person: genealogyData, onExpand },
                sourcePosition: Position.Bottom,
                targetPosition: Position.Top,
                draggable: false,
            },
        ]);
        setEdges([]);
    }, [onExpand, setNodes, setEdges]);


    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            className="bg-background"
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
        >
            <Controls />
            <Background />
        </ReactFlow>
    );
}
