// component as child of ReactFlowProvider so we have access to state
import { useState, useEffect } from "react";
import { useStore, useReactFlow } from "@xyflow/react";
import dagre from "@dagrejs/dagre";

const DagreNodePositioning = ({
  Options,
  SetNodes,
  SetEdges,
  Edges,
  SetViewIsFit,
}) => {
  const [nodesPositioned, setNodesPositioned] = useState(false);
  const { fitView } = useReactFlow();

  // fetch react flow state
  const store = useStore();
  // isolate nodes map
  const nodeInternals = store.nodeInternals;
  // flatten nodes map to array
  const flattenedNodes = Array.from(nodeInternals.values());

  useEffect(() => {
    try {
      // node dimensions are not immediately detected, so we want to wait until they are
      if (flattenedNodes[0]?.width) {
        // create dagre graph
        const dagreGraph = new dagre.graphlib.Graph();
        // this prevents error
        dagreGraph.setDefaultEdgeLabel(() => ({}));

        // use dagre graph to layout nodes
        const getLayoutedElements = (nodes, edges) => {
          dagreGraph.setGraph(Options);

          edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));
          nodes.forEach((node) => dagreGraph.setNode(node.id, node));

          dagre.layout(dagreGraph);

          return {
            nodes: nodes.map((node) => {
              const { x, y } = dagreGraph.node(node.id);

              return { ...node, position: { x, y } };
            }),
            edges,
          };
        };

        // if nodes exist and nodes are not positioned
        if (flattenedNodes.length > 0 && !nodesPositioned) {
          const layouted = getLayoutedElements(flattenedNodes, Edges);

          // ad target positions based on chart direction
          switch (Options.rankdir) {
            case "TB":
              layouted.nodes.forEach((node) => {
                node.targetPosition = "top";
                node.sourcePosition = "bottom";
              });
              break;
            case "BT":
              layouted.nodes.forEach((node) => {
                node.targetPosition = "bottom";
                node.sourcePosition = "top";
              });
              break;
            case "LR":
              layouted.nodes.forEach((node) => {
                node.targetPosition = "left";
                node.sourcePosition = "right";
              });
              break;
            case "RL":
              layouted.nodes.forEach((node) => {
                node.targetPosition = "right";
                node.sourcePosition = "left";
              });
              break;
            default:
              console.log("unrecognized chart direction");
          }

          // update react flow state
          SetNodes(layouted.nodes);
          SetEdges(layouted.edges);
          setNodesPositioned(true);

          // fit view
          window.requestAnimationFrame(() => {
            fitView();
          });
          SetViewIsFit(true);
        }
      } else {
        return null;
      }
    } catch (error) {
      console.log("error", error);
      return null;
    }
  });

  return null;
};

export default DagreNodePositioning;
