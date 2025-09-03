
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
import { Card } from './ui/card';
import { Home } from 'lucide-react';

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

const initialNodes: Node[] = [
  {
    id: genealogyData.id,
    type: 'person',
    position: { x: 0, y: 0 },
    data: { person: genealogyData, onExpand: () => {} },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    draggable: false, // Make nodes non-draggable
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
        
        // Return current nodes if there are no children to expand
        if (!personToExpand.children || personToExpand.children.length === 0) {
            return currentNodes;
        }

        // Check if children are already added to avoid duplication
        const areChildrenPresent = personToExpand.children.every(child => existingNodeIds.has(child.id));
        if (areChildrenPresent) {
            return currentNodes;
        }

        const childNodes = (personToExpand.children ?? [])
            .map((child, index) => {
                const parentNode = currentNodes.find(n => n.id === personToExpand.id);
                const xOffset = (index - ((personToExpand.children?.length ?? 1) - 1) / 2) * 250;
                const yOffset = 150;

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
                    draggable: false, // Make new nodes non-draggable
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
        
        let updatedEdges = [...currentEdges];
        newEdges.forEach(edge => {
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
      nodesDraggable={false} // Globally disable node dragging
      nodesConnectable={false} // Disable connecting nodes via drag
      elementsSelectable={false} // Disable selecting elements
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
}
