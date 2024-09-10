import Dagre from '@dagrejs/dagre';
import React, { useCallback, useMemo } from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    Panel,
    useNodesState,
    useEdgesState,
    useReactFlow,
} from '@xyflow/react';


import '@xyflow/react/dist/style.css';
import zcashd_deprecation from '@/data/zcashd_deprecation';
import { transformDAG } from "@/utils/transformDAG";
import BaseCustomNode from './custom_nodes/BaseCustomNode';

const { nodes: initialNodes, edges: initialEdges } = transformDAG(zcashd_deprecation);

const getLayoutedElements = (nodes, edges, options) => {
    const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
    g.setGraph({ rankdir: options.direction });

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

const LayoutFlow = () => {
    const { fitView } = useReactFlow();
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const nodeTypes = useMemo(() => ({
        baseCustom: BaseCustomNode
    }), []);

    const onLayout = useCallback(
        (direction) => {
            console.log(nodes);
            const layouted = getLayoutedElements(nodes, edges, { direction });

            setNodes([...layouted.nodes]);
            setEdges([...layouted.edges]);

            window.requestAnimationFrame(() => {
                fitView();
            });
        },
        [nodes, edges],
    );

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <ReactFlow
                nodeTypes={nodeTypes}
                style={{ height: '100%', width: '100%' }}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodes={nodes.map((node) => ({
                    ...node,
                    // ...getNodeProps(node),
                    type: 'baseCustom',
                    data: { ...node.data, style: node.style }
                }))}
                fitView
            >
                <Panel position="top-right">
                    <button onClick={() => onLayout('TB')}>vertical layout</button>
                    <button onClick={() => onLayout('LR')}>horizontal layout</button>
                </Panel>
            </ReactFlow>
        </div>
    );
};

export default function () {
    return (
        <ReactFlowProvider>
            <LayoutFlow />
        </ReactFlowProvider>
    );
}
