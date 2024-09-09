import { addEdge, Background, Controls, ReactFlow, useEdgesState, useNodesState, type Edge, type Node } from "@xyflow/react";
import { useState, useCallback, useMemo } from "react";
import BaseCustomNode from "@/components/custom_nodes/BaseCustomNode";
// import '@xyflow/react/dist/style.css';
type Props = {
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    nodes: Node[];
    edges: Edge[];
}


export default function FlowCanvas({ nodes: initialNodes, edges: initialEdges }: Props) {

    const nodeTypes = useMemo(() => ({
        baseCustom: BaseCustomNode
    }), []);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const [hoveredNodeId, setHoveredNodeId] = useState(null);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const onNodeMouseEnter = useCallback((event, node) => {
        setHoveredNodeId(node.id);
    }, []);

    const onNodeMouseLeave = useCallback(() => {
        setHoveredNodeId(null);
    }, []);

    const getNodeProps = (node: Node) => {
        const isHovered = node.id === hoveredNodeId;
        const isParentOrChild = edges.some(
            (edge) =>
                (edge.source === hoveredNodeId && edge.target === node.id) ||
                (edge.source === node.id && edge.target === hoveredNodeId)
        );
        const normalState: Partial<Node> = { style: { fill: 'white', stroke: 'black', border: '2px solid transparent', borderRadius: '5px', strokeWidth: 1, opacity: 1 } };
        const selectedState: Partial<Node> = { style: { fill: 'white', border: '2px solid green', borderRadius: '5px', strokeWidth: 2, opacity: 1 } };
        const dimmedState: Partial<Node> = { style: { fill: 'white', stroke: 'black', border: '2px solid transparent', borderRadius: '5px', opacity: 0.2 } };

        if (!hoveredNodeId) return normalState;

        return isHovered || isParentOrChild ? selectedState : dimmedState;
    }

    const getEdgeProps = (edge: Edge) => {

        const isParentOrChild = edge.source === hoveredNodeId || edge.target === hoveredNodeId;

        const normalState: Partial<Edge> = { style: { stroke: 'black', strokeWidth: 1 }, animated: false };
        const dimmedState: Partial<Edge> = { style: { stroke: 'black', strokeWidth: 1, opacity: 0.2 }, animated: false };
        const selectedState: Partial<Edge> = { style: { stroke: 'green', strokeWidth: 2 }, animated: true };

        if (!hoveredNodeId) return normalState;

        return isParentOrChild ? selectedState : dimmedState;
    }


    return (
        <div style={{ height: '80vh', width: '100%' }}>
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes.map((node) => ({
                    ...node,
                    ...getNodeProps(node),
                    type: 'baseCustom',
                    data: { ...node.data, style: node.style }
                }))}
                edges={edges.map((edge) => ({ ...edge, ...getEdgeProps(edge) }))}
                onNodeMouseEnter={onNodeMouseEnter}
                onNodeMouseLeave={onNodeMouseLeave}
                fitView
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                style={{ height: '100%', width: '100%' }}
                onConnect={onConnect}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}