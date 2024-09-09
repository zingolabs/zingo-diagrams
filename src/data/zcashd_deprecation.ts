import type { Edge, Node } from "@xyflow/react";

type DAGNode = {
    id: string;
    label: string;
    description?: string;
    kb_url?: string;
    gh_issue_url?: string;
    children?: string[];
}

const nodes : DAGNode[] = [
    {
        id: '1.1',
        label: '1.1',
        description: 'This is a description',
        kb_url: 'https://github.com/zcash/zcash/issues/1000',
        gh_issue_url: 'https://github.com/zcash/zcash/issues/1000',
        children: ['1.2', '1.3', '1.4']
    },
    {
        id: '1.2',
        label: '1.2',
        description: 'Some other description',
        kb_url: 'https://github.com/zcash/zcash/issues/1000',
        gh_issue_url: 'https://github.com/zcash/zcash/issues/1000',
        children: ['1.5']
    },
    {
        id: '1.3',
        label: '1.3',
        description: 'Some other description',
        kb_url: 'https://github.com/zcash/zcash/issues/1000',
        gh_issue_url: 'https://github.com/zcash/zcash/issues/1000',
        children: ['1.5', '1.8']
    },
    {
        id: '1.4',
        label: '1.4',
        description: 'Some other description',
        kb_url: 'https://github.com/zcash/zcash/issues/1000',
        // gh_issue_url: 'https://github.com/zcash/zcash/issues/1000',
        children: ['1.6', '1.7']
    },
    {
        id: '1.5',
        label: '1.5',
        description: 'Some other description',
        // kb_url: 'https://github.com/zcash/zcash/issues/1000',
        gh_issue_url: 'https://github.com/zcash/zcash/issues/1000',
        children: ['1.7']
    },
    {
        id: '1.6',
        label: '1.6',
        description: 'Some other description',
        kb_url: 'https://github.com/zcash/zcash/issues/1000',
        gh_issue_url: 'https://github.com/zcash/zcash/issues/1000',
        children: []
    },
    {
        id: '1.7',
        label: '1.7',
        description: 'Some other description',
        kb_url: 'https://github.com/zcash/zcash/issues/1000',
        gh_issue_url: 'https://github.com/zcash/zcash/issues/1000',
        children: []
    },
    {
        id: '1.8',
        label: '1.8',
        description: 'Some other description',
        kb_url: 'https://github.com/zcash/zcash/issues/1000',
        gh_issue_url: 'https://github.com/zcash/zcash/issues/1000',
        children: ['2.1', '2.2']
    },
    {
        id: '2.1',
        label: '2.1',
        description: 'Some other description',
        kb_url: 'https://github.com/zcash/zcash/issues/1000',
        gh_issue_url: 'https://github.com/zcash/zcash/issues/1000',
        children: ['3.1']
    },
    {
        id: '2.2',
        label: '2.2',
        description: 'Some other description',
        kb_url: 'https://github.com/zcash/zcash/issues/1000',
        gh_issue_url: 'https://github.com/zcash/zcash/issues/1000',
        children: ['3.1']
    },
    {
        id: '3.1',
        label: '3.1',
        description: 'Some other description',
        kb_url: 'https://github.com/zcash/zcash/issues/1000',
        gh_issue_url: 'https://github.com/zcash/zcash/issues/1000',
        children: []
    }

   
]

export default nodes;

export function transformDAG(nodes: DAGNode[]) {
    const newNodes : Node[] = [];
    const newEdges : Edge[] = [];
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

    function createEdges(node:DAGNode){
        if(node.children){
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
  
//   // Example usage
//   const transformedData = transformDAG(nodes);
//   console.log(transformedData);