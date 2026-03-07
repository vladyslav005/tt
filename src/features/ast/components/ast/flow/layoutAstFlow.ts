import dagre from "@dagrejs/dagre";
import type { Edge } from "@xyflow/react";
import type { AstFlowNode } from "./types";

const NODE_WIDTH = 320;
const NODE_HEIGHT = 300;

export function layoutAstFlow(
  nodes: AstFlowNode[],
  edges: Edge[],
  direction: "TB" | "LR"  = "TB",
) {
  const graph = new dagre.graphlib.Graph();
  graph.setDefaultEdgeLabel(() => ({}));

  graph.setGraph({
    rankdir: direction,
    nodesep: 40,
    ranksep: 80,
    marginx: 20,
    marginy: 20,
  });

  for (const node of nodes) {
    graph.setNode(node.id, {
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
    });
  }

  for (const edge of edges) {
    graph.setEdge(edge.source, edge.target);
  }

  dagre.layout(graph);

  const layoutedNodes = nodes.map((node) => {
    const positioned = graph.node(node.id);

    return {
      ...node,
      position: {
        x: positioned.x, //- NODE_WIDTH ,/// 2,
        y: positioned.y //- NODE_HEIGHT /// 2,
      },
    };
  });

  return {
    nodes: layoutedNodes,
    edges,
  };
}