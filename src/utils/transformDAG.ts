import type { Edge } from "@xyflow/react";
import type { DAGNode, Edge } from "../data/zcashd_deprecation";


export function transformDAG(nodes: DAGNode[]) {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    let nodeIdCounter = 1;
    let edgeIdCounter = 1;

    // Helper function to add node and get its new id
    function addNode(nodeData: DAGNode) {
        newNodes.push({
            id: nodeData.id,
            data: {
                ...nodeData
            },
            position: {
                x: (nodeIdCounter - 1) * 300, // Simple positioning for now
                y: Math.floor((nodeIdCounter - 1) / 3) * 100
            }
        });
        nodeIdCounter++;
        createEdges(nodeData);
    }

    function createEdges(node: DAGNode) {
        if (node.children) {
            node.children.forEach(childId => {
                newEdges.push({
                    id: edgeIdCounter.toString(),
                    source: node.id,
                    target: childId,
                    animated: false,
                    style: { stroke: 'black', strokeWidth: 1 }
                });
                edgeIdCounter++;
            });
        }
    }

    // Process each node in the original array
    nodes.forEach(addNode);

    return { nodes: newNodes, edges: newEdges };
}
