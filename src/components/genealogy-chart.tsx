
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
        if (!personToExpand.children || personToExpand.children.length === 0) {
            return;
        }

        const childNodeIds = new Set(personToExpand.children.map(c => c.id));
        const existingChildNodes = nodes.filter(n => childNodeIds.has(n.id));

        // If children are already present, do nothing to prevent re-adding.
        if (existingChildNodes.length > 0) {
           return;
        }

        const parentNode = nodes.find(n => n.id === personToExpand.id);
        if (!parentNode) return;

        const newNodes: Node[] = [];
        personToExpand.children.forEach((child, index) => {
            // This check is redundant due to the check above but kept for safety.
            if (nodes.find(n => n.id === child.id)) return;

            const xOffset = (index - (personToExpand.children.length - 1) / 2) * 250;
            const yOffset = 150;
            
            newNodes.push({
                id: child.id,
                type: 'person',
                position: {
                    x: parentNode.position.x + xOffset,
                    y: parentNode.position.y + yOffset
                },
                data: { person: child, onExpand: () => {} }, // Placeholder onExpand
                sourcePosition: Position.Bottom,
                targetPosition: Position.Top,
                draggable: false,
            });
        });

        const newEdges = (personToExpand.children ?? []).map(child => ({
            id: `e-${personToExpand.id}-${child.id}`,
            source: personToExpand.id,
            target: child.id,
            markerEnd: { type: MarkerType.ArrowClosed },
        }));

        setNodes(nds => nds.concat(newNodes));
        setEdges(eds => addEdge(newEdges, eds));

    }, [nodes, setNodes, setEdges]);
    
    // Set the initial node only once.
    useEffect(() => {
        const initialNode = {
            id: genealogyData.id,
            type: 'person',
            position: { x: 0, y: 0 },
            data: { person: genealogyData, onExpand: () => {} }, // Use a placeholder for now
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top,
            draggable: false,
        };
        setNodes([initialNode]);
        setEdges([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setNodes, setEdges]);

    // This effect updates the onExpand function in the node data whenever it changes.
    // This breaks the infinite loop.
    useEffect(() => {
        setNodes((nds) =>
          nds.map((node) => {
            if(node.data.onExpand !== onExpand) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        onExpand,
                    },
                };
            }
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
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
        >
            <Controls />
            <Background />
        </ReactFlow>
    );
}
