
"use client";

import React, { useCallback, useEffect } from 'react';
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
            const parentNode = currentNodes.find(n => n.id === personToExpand.id);
            if (!parentNode || !personToExpand.children || personToExpand.children.length === 0) {
                return currentNodes;
            }

            const existingChildIds = new Set(currentNodes.map(n => n.id));
            const childrenToCreate = personToExpand.children.filter(c => !existingChildIds.has(c.id));

            if (childrenToCreate.length === 0) {
                return currentNodes; // All children already exist
            }

            const newNodes: Node[] = childrenToCreate.map((child, index) => {
                 const xOffset = (index - (personToExpand.children.length - 1) / 2) * 250;
                 const yOffset = 150;
                
                return {
                    id: child.id,
                    type: 'person',
                    position: {
                        x: parentNode.position.x + xOffset,
                        y: parentNode.position.y + yOffset
                    },
                    data: { person: child, onExpand: onExpand }, 
                    sourcePosition: Position.Bottom,
                    targetPosition: Position.Top,
                };
            });
            
            const newEdges = childrenToCreate.map(child => ({
                id: `e-${personToExpand.id}-${child.id}`,
                source: personToExpand.id,
                target: child.id,
                markerEnd: { type: MarkerType.ArrowClosed },
            }));

            setEdges(eds => addEdge(newEdges, eds));
            return [...currentNodes, ...newNodes];
        });
    }, [setNodes, setEdges]);
    
    // Set the initial node only once on mount.
    useEffect(() => {
        const initialNode: Node = {
            id: genealogyData.id,
            type: 'person',
            position: { x: 0, y: 0 },
            data: { person: genealogyData, onExpand: onExpand }, 
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top,
        };
        setNodes([initialNode]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onExpand]); // Rerunning on onExpand change is intended here to pass the latest onExpand function to the node

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

