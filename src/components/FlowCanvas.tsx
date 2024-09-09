import BaseCustomNode from "@/components/custom_nodes/BaseCustomNode";
import Dagre from '@dagrejs/dagre';
import { Background, Controls, ReactFlow, ReactFlowProvider, useEdgesState, useNodesState, useReactFlow, type Edge, type Node, type NodeMouseHandler } from "@xyflow/react";
import { useCallback, useEffect, useMemo, useState } from "react";
// import '@xyflow/react/dist/style.css';
type Props = {
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    nodes: Node[];
    edges: Edge[];
}

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
    const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
    g.setGraph({ rankdir: 'LR' });

    edges.forEach((edge) => g.setEdge(edge.source, edge.target));
    nodes.forEach((node) =>
        g.setNode(node.id, {
            ...node,
            width: node.measured?.width ?? 0,
            height: node.measured?.height ?? 0,
        }),
    );

    Dagre.layout(g);

    return {
        nodes: nodes.map((node) => {
            const position = g.node(node.id);
            // We are shifting the dagre node position (anchor=center center) to the top left
            // so it matches the React Flow node anchor point (top left).
            const x = position.x - (node.measured?.width ?? 0) / 2;
            const y = position.y - (node.measured?.height ?? 0) / 2;

            return { ...node, position: { x, y } };
        }),
        edges,
    };
};


function FlowCanvas({ nodes: initialNodes, edges: initialEdges }: Props) {

    const { fitView } = useReactFlow();

    const nodeTypes = useMemo(() => ({
        baseCustom: BaseCustomNode
    }), []);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const [hasLayoutedElements, setHasLayoutedElements] = useState(false);

    useEffect(() => {
        if (!hasLayoutedElements) {
            // Wait for the next tick to ensure custom nodes have rendered and have `measured` dimensions
            setTimeout(() => {
                const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);
                setNodes(layoutedNodes);
                setEdges(layoutedEdges);

                setHasLayoutedElements(true); // Prevent further layout calculations
                
            }, 30);
        }

        fitView();

    }, [nodes, edges, hasLayoutedElements]);

    const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

    const onNodeMouseEnter: NodeMouseHandler = useCallback((event, node) => {
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
        <div style={{ height: '80vh', width: '100%', opacity: hasLayoutedElements ? 1 : 0 }}>
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes.map((node) => ({
                    ...node,
                    ...getNodeProps(node),
                    type: 'baseCustom',
                    data: { ...node.data, style: node.style }
                }))}
                nodesDraggable={false}
                edges={edges.map((edge) => ({ ...edge, ...getEdgeProps(edge) }))}
                onNodeMouseEnter={onNodeMouseEnter}
                onNodeMouseLeave={onNodeMouseLeave}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                style={{ height: '100%', width: '100%' }}
                fitView
            >
                <Background  />
                <Controls  />
            </ReactFlow>
        </div>
    )
}

export default function ({ nodes: initialNodes, edges: initialEdges }: Props) {
    return (
        <ReactFlowProvider>
            <FlowCanvas nodes={initialNodes} edges={initialEdges} />
        </ReactFlowProvider>
    );
}