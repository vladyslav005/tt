import type {Program} from "@/shared/core/domain/ast";
import {useCallback, useState, useEffect} from "react";
import {applyEdgeChanges, applyNodeChanges, addEdge, ReactFlow, Background, Controls, MiniMap, type NodeTypes} from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import type {AstFlowGraph} from "@/shared/presentation/flow/types.ts";
import {AbstractionFlowNode} from "@/features/ast/components/ast/flow/AbstractionFlowNode.tsx";
import {VariableFlowNode} from "@/features/ast/components/ast/flow/VariableFlowNode.tsx";
import {ApplicationFlowNode} from "@/features/ast/components/ast/flow/ApplicationFlowNode.tsx";
import {ProgramFlowNode} from "@/features/ast/components/ast/flow/ProgramFlowNode.tsx";
import {FunDeclFlowNode} from "@/features/ast/components/ast/flow/FunDeclFlowNode.tsx";
import {VarDeclFlowNode} from "@/features/ast/components/ast/flow/VarDeclFlowNode.tsx";
import {LiteralFlowNode} from "@/features/ast/components/ast/flow/LiteralFlowNode.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select.tsx";

export interface AstProps {
  AST: Program,
  fullScreen?: boolean,
  setAST: (ast: Program) => void,
}

export const nodeTypes: NodeTypes = {
  program: ProgramFlowNode,
  funDecl: FunDeclFlowNode,
  varDecl: VarDeclFlowNode,
  abstraction: AbstractionFlowNode,
  variable: VariableFlowNode,
  application: ApplicationFlowNode,
  literal: LiteralFlowNode,
} as NodeTypes;

export function AstEditor({
                      AST,
                      fullScreen = false,
                    } : AstProps) {
  const [graph, setGraph] = useState<AstFlowGraph>({ nodes: [], edges: [] });
  const [newNodeType_, setNewNodeType] = useState<keyof typeof nodeTypes>("variable");

  // Update graph when AST changes
  useEffect(() => {
    addStandaloneNode("program");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  const addStandaloneNode = useCallback((nodeType?: string) => {
    console.log("Adding node of type:", nodeType);
    let newNodeType: keyof typeof nodeTypes = newNodeType_;
    if (nodeType) {
      newNodeType = nodeType as keyof typeof nodeTypes;
    }

    const id = `manual-${newNodeType}-${Date.now()}`;
    const position = { x: 120 + graph.nodes.length * 30, y: 120 + graph.nodes.length * 20 };

    const makeNode = () => {
      if (newNodeType === "program") {
        return {
          id,
          type: "program",
          position,
          data: {
            term: {
              id,
              kind: "Program",
              globals: []
            },

            onConnectTerm: (params: any) => {
              console.log("Connect term:", params);
            }
          }
        };
      }
      if (newNodeType === "funDecl") {
        const valueId = `${id}-value`;
        return {
          id,
          type: "funDecl",
          position,
          data: {
            term: { id, kind: "FunDecl", name: "f", type: { kind: "Nat" }, value: { id: valueId, kind: "Var", name: "x" } },
            editable: true,
          },

        };
      }
      if (newNodeType === "varDecl") {
        const valueId = `${id}-value`;
        return {
          id,
          type: "varDecl",
          position,
          data: {
            term: { id, kind: "VarDecl", name: "x", type: { kind: "Nat" }, value: { id: valueId, kind: "Var", name: "x" } },
            editable: true,
          },
        };
      }
      if (newNodeType === "abstraction") {
        const bodyId = `${id}-body`;
        return {
          id,
          type: "abstraction",
          position,
          data: {
            term: {
              id,
              kind: "Abs",
              param: "x",
              paramType: { kind: "Nat" },
              body: { id: bodyId, kind: "Var", name: "x" },
              editable: true,
            },
          },
        };
      }
      if (newNodeType === "application") {
        const funcId = `${id}-func`;
        const argId = `${id}-arg`;
        return {
          id,
          type: "application",
          position,
          data: {
            term: {
              id,
              kind: "App",
              func: { id: funcId, kind: "Var", name: "f" },
              arg: { id: argId, kind: "Var", name: "x" },
              editable: true,
            },
          },
        };
      }
      if (newNodeType === "literal") {
        return {
          id, type: "literal",
          position,
          data: {
            term: {
              id,
              kind: "Lit",
              value: 0 },
            editable: true
          }
        };

      }
      return {
        id, type: "variable",
        position,
        data: {
          term: {
            id,
            kind: "Var",
            name: "x" }
        },
        editable: true
      };
    };

    setGraph((prevGraph) => ({
      ...prevGraph,
      nodes: [...prevGraph.nodes, makeNode() as AstFlowGraph["nodes"][number]],
    }));
  }, [graph.nodes.length, newNodeType_]);

  return (
    <div style={{ width: '100%', height: fullScreen ? '80vh' :'600px' }}>
      <div className="flex items-center justify-end gap-2 p-2 border-b bg-background/60">
        <Select value={newNodeType_} onValueChange={(value) => setNewNodeType(value as keyof typeof nodeTypes)}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Node type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="program">Program</SelectItem>
            <SelectItem value="funDecl">FunDecl</SelectItem>
            <SelectItem value="varDecl">VarDecl</SelectItem>
            <SelectItem value="abstraction">Abstraction</SelectItem>
            <SelectItem value="application">Application</SelectItem>
            <SelectItem value="variable">Variable</SelectItem>
            <SelectItem value="literal">Literal</SelectItem>
          </SelectContent>
        </Select>
        <Button type="button" onClick={() => addStandaloneNode()}>Add node</Button>
      </div>
      <ReactFlow
        nodes={graph.nodes}
        edges={graph.edges}
        minZoom={0.1}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        nodesConnectable={true}
        fitView
      >
        <Background />
        <Controls
          className="bg-background! border-border! [&_button]:bg-card! [&_button]:border-border! [&_button]:text-foreground! [&_button:hover]:bg-accent!"
        />
        <MiniMap
          className="bg-background! border-border!"
          nodeColor={(node) => {
            if (node.type === 'program') return 'hsl(var(--primary))';
            if (node.type === 'funDecl') return 'hsl(142, 71%, 45%)';
            if (node.type === 'varDecl') return 'hsl(189, 85%, 44%)';
            if (node.type === 'abstraction') return 'hsl(270, 55%, 55%)';
            if (node.type === 'application') return 'hsl(217, 91%, 60%)';
            if (node.type === 'variable') return 'hsl(142, 71%, 45%)';
            if (node.type === 'literal') return 'hsl(38, 92%, 50%)';
            return 'hsl(var(--muted))';
          }}
        />
      </ReactFlow>
    </div>
  );
}