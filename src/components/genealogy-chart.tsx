
'use client';

import React, { useState, useCallback, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Handle,
  Position,
  NodeProps,
} from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';
import { GenealogyMember } from '@/lib/types';
import { GitBranch } from 'lucide-react';
import { Button } from './ui/button';

// ============ Custom Node Component ============
interface CustomNodeData {
  label: string;
  onExpand: (id: string) => void;
  isExpanded: boolean;
}

const CustomNode = ({ id, data }: NodeProps<CustomNodeData>) => {
  return (
    <div className="bg-card border-2 border-primary/50 shadow-lg rounded-lg p-3 text-center transition-all duration-200 hover:shadow-xl hover:border-primary">
      <Handle type="target" position={Position.Top} className="!bg-primary/50" />
      <div className="font-headline text-lg text-foreground">{data.label}</div>
      {!data.isExpanded && (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => data.onExpand(id)}
          className="mt-2 text-primary hover:text-accent-foreground"
        >
          <GitBranch className="mr-2 h-4 w-4" />
          Тарату
        </Button>
      )}
      <Handle type="source" position={Position.Bottom} className="!bg-primary/50" />
    </div>
  );
};

// ============ Layouting Function ============
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 200;
const nodeHeight = 100;

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB'): {nodes: Node[], edges: Edge[]} => {
  dagreGraph.setGraph({ rankdir: direction, ranksep: 60, nodesep: 20 });

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
  });

  return { nodes, edges };
};

// ============ Main Chart Component ============
interface GenealogyChartProps {
    initialMember: GenealogyMember;
    fetchChildren: (parentId: string) => Promise<GenealogyMember[]>;
}

export function GenealogyChart({ initialMember, fetchChildren }: GenealogyChartProps) {
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const onExpand = useCallback(async (nodeId: string) => {
    if (expandedNodes.has(nodeId)) return;

    setNodes((prevNodes) => prevNodes.map(n => n.id === nodeId ? {...n, data: {...n.data, isExpanded: true}} : n));

    const children = await fetchChildren(nodeId);

    const newNodes: Node<CustomNodeData>[] = children.map((member) => ({
      id: member.id,
      type: 'custom',
      data: { 
          label: member.name, 
          onExpand: onExpand,
          isExpanded: false
      },
      position: { x: 0, y: 0 },
    }));

    const newEdges: Edge[] = children.map((member) => ({
      id: `e-${nodeId}-${member.id}`,
      source: nodeId,
      target: member.id,
      animated: true,
      style: { stroke: '#60a5fa', strokeWidth: 2 },
    }));

    setNodes((nds) => [...nds, ...newNodes]);
    setEdges((eds) => [...eds, ...newEdges]);
    setExpandedNodes((prev) => new Set(prev).add(nodeId));

  }, [fetchChildren, setNodes, setEdges, expandedNodes]);

  const initialNodes: Node<CustomNodeData>[] = useMemo(() => [
    {
      id: initialMember.id,
      type: 'custom',
      data: { 
          label: initialMember.name, 
          onExpand: onExpand,
          isExpanded: false,
      },
      position: { x: 0, y: 0 },
    },
  ], [initialMember, onExpand]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges
    );
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  }, [nodes, edges, setNodes, setEdges]);
  
  React.useEffect(() => {
    onLayout();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes.length]); // Re-layout when number of nodes changes

  return (
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges])}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable={false}
        className="bg-muted/50"
      >
        <Controls />
        <Background />
      </ReactFlow>
  );
}
