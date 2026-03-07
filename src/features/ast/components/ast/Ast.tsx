import type {Program} from "@/shared/core/domain/ast";
import {useCallback, useState, useEffect} from "react";
import {applyEdgeChanges, applyNodeChanges, addEdge, ReactFlow, Background, Controls, MiniMap, type NodeTypes} from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import type {AstFlowGraph} from "@/features/ast/components/ast/flow/types.ts";
import {AbstractionFlowNode} from "@/features/ast/components/ast/flow/AbstractionFlowNode.tsx";
import {VariableFlowNode} from "@/features/ast/components/ast/flow/VariableFlowNode.tsx";
import {ApplicationFlowNode} from "@/features/ast/components/ast/flow/ApplicationFlowNode.tsx";
import {ProgramFlowNode} from "@/features/ast/components/ast/flow/ProgramFlowNode.tsx";
import {FunDeclFlowNode} from "@/features/ast/components/ast/flow/FunDeclFlowNode.tsx";
import {VarDeclFlowNode} from "@/features/ast/components/ast/flow/VarDeclFlowNode.tsx";
import {LiteralFlowNode} from "@/features/ast/components/ast/flow/LiteralFlowNode.tsx";
import {useMapAstToFlow} from "@/features/ast/hooks/mapAstToFlow.ts";
import {layoutAstFlow} from "@/features/ast/components/ast/flow/layoutAstFlow.ts";


export interface AstProps {
  AST: Program,
}

const nodeTypes: NodeTypes = {
  program: ProgramFlowNode,
  funDecl: FunDeclFlowNode,
  varDecl: VarDeclFlowNode,
  abstraction: AbstractionFlowNode,
  variable: VariableFlowNode,
  application: ApplicationFlowNode,
  literal: LiteralFlowNode,
} as NodeTypes;

export function Ast({
  AST
} : AstProps) {

  const { mapAstToFlow } = useMapAstToFlow()
  const [graph, setGraph] = useState<AstFlowGraph>({ nodes: [], edges: [] });

  // Update graph when AST changes
  useEffect(() => {
    const newGraph = mapAstToFlow();
    const layoutGraph = layoutAstFlow(newGraph.nodes, newGraph.edges);
    if (newGraph) {
      setGraph(layoutGraph);
    }
  }, [AST]); // eslint-disable-line react-hooks/exhaustive-deps

  const onNodesChange = useCallback(
    (changes: any) => {
      setGraph((prevGraph) => ({
        ...prevGraph,
        nodes: applyNodeChanges(changes, prevGraph.nodes),
      }));
    },
    [],
  );

  const onEdgesChange = useCallback(
    (changes: any) => {
      setGraph((prevGraph) => ({
        ...prevGraph,
        edges: applyEdgeChanges(changes, prevGraph.edges),
      }));
    },
    [],
  );

  const onConnect = useCallback(
    (params: any) => {
      setGraph((prevGraph) => ({
        ...prevGraph,
        edges: addEdge(params, prevGraph.edges),
      }));
    },
    [],
  );

  return (
    <div style={{ width: '100%', height: '50vh' }}>
      <ReactFlow
        nodes={graph.nodes}
        edges={graph.edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        fitView
      >

        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}