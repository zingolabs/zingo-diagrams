import {
  nodes as initialNodes,
  edges as initialEdges,
  type ZainoRoadmapNode,
  type ZainoRoadmapEdge,
  edges,
} from "@/data/zaino_roadmap";

import {
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  type NodeMouseHandler,
} from "@xyflow/react";

import { useState, useCallback, useMemo, type CSSProperties } from "react";
import NodeComponent from "./NodeComponent";

export default function Canvas() {

  const nodeTypes = useMemo(
    () => ({
      custom: NodeComponent,
    }),
    [],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const onNodeMouseEnter: NodeMouseHandler = useCallback((event, node) => {
    setHoveredNodeId(node.id);
  }, []);

  const onNodeMouseLeave = useCallback(() => {
    setHoveredNodeId(null);
  }, []);



  return (
    <ReactFlowProvider>
      <div style={{ height: "90vh", width: "100%" }}>
        <ReactFlow
          nodeTypes={nodeTypes}
          minZoom={0.1}
          nodes={nodes.map((node) => getWrappedNode(node, edges, hoveredNodeId))}
          nodesDraggable={false}
          edges={edges}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseLeave={onNodeMouseLeave}
          // onNodesChange={onNodesChange}
          // onEdgesChange={onEdgesChange}
          style={{ height: "100%", width: "100%" }}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}

function getNodeStyle(node: ZainoRoadmapNode, edges: ZainoRoadmapEdge[], hoveredNodeId: string | null) {
    const isHovered = node.id === hoveredNodeId;
    const isParentOrChild = edges.some(
        (edge) => (edge.source === hoveredNodeId && edge.target === node.id) ||
            (edge.source === node.id && edge.target === hoveredNodeId)
    );
    const normalState: CSSProperties = {
        fill: "white",
        stroke: "black",
        border: "2px solid transparent",
        borderRadius: "5px",
        strokeWidth: 1,
        opacity: 1,
    };
    const selectedState: CSSProperties = {
        fill: "white",
        border: "2px solid green",
        borderRadius: "5px",
        strokeWidth: 2,
        opacity: 1,
    };
    const dimmedState: CSSProperties = {
        fill: "white",
        stroke: "black",
        border: "2px solid transparent",
        borderRadius: "5px",
        opacity: 0.2,
    };

    if (!hoveredNodeId) return normalState;

    return isHovered || isParentOrChild ? selectedState : dimmedState;
}

function getWrappedNode(node: ZainoRoadmapNode, edges: ZainoRoadmapEdge[], hoveredNodeId: string | null) : WrappedNode {
  return {
    ...node,
    style: { ...node.style, ...getNodeStyle(node, edges, hoveredNodeId) },
    // data: { ...node.data, style: node.style },
    type: "custom",
  };
}

export type WrappedNode = ZainoRoadmapNode & { style: CSSProperties };
