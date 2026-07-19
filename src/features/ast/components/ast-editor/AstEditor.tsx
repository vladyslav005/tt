import type {Program} from "@/shared/core/domain/ast";
import {useCallback, useState, useEffect, useRef} from "react";
import {
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type NodeTypes,
  type Connection,
  type Node,
  type Edge,
  useReactFlow,
  type OnConnectStart,
  type OnConnectEnd,
} from "@xyflow/react";
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
import {Separator} from "@/shared/components/ui/separator.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select.tsx";
import {graphToAst} from "@/features/ast/hooks/graphToAst";
import {layoutAstFlow} from "@/features/ast/hooks/layoutAstFlow.ts";
import type {TyArrow, TyVar} from "@/shared/core/domain/ast";
import {TyVarFlowNode} from "@/features/ast/components/ast/flow/TyVarFlowNode";
import {TyArrowFlowNode} from "@/features/ast/components/ast/flow/TyArrowFlowNode";
import {SumTypeFlowNode} from "@/features/ast/components/ast/flow/SumTypeFlowNode";
import {TupleTypeFlowNode} from "@/features/ast/components/ast/flow/TupleTypeFlowNode";
import {VariantTypeFlowNode} from "@/features/ast/components/ast/flow/VariantTypeFlowNode";
import {RecordTypeFlowNode} from "@/features/ast/components/ast/flow/RecordTypeFlowNode";
import {InlFlowNode} from "@/features/ast/components/ast/flow/InlFlowNode";
import {InrFlowNode} from "@/features/ast/components/ast/flow/InrFlowNode";
import {IfConditionFlowNode} from "@/features/ast/components/ast/flow/IfConditionFlowNode";
import {CaseFlowNode} from "@/features/ast/components/ast/flow/CaseFlowNode";
import {VariantCaseFlowNode} from "@/features/ast/components/ast/flow/VariantCaseFlowNode";
import {VariantFlowNode} from "@/features/ast/components/ast/flow/VariantFlowNode";
import {AscribeFlowNode} from "@/features/ast/components/ast/flow/AscribeFlowNode";
import {TupleProjectionFlowNode} from "@/features/ast/components/ast/flow/TupleProjectionFlowNode";
import {RecordProjectionFlowNode} from "@/features/ast/components/ast/flow/RecordProjectionFlowNode";
import {RecordFlowNode} from "@/features/ast/components/ast/flow/RecordFlowNode";
import {SequencingFlowNode} from "@/features/ast/components/ast/flow/SequencingFlowNode";
import {TupleFlowNode} from "@/features/ast/components/ast/flow/TupleFlowNode";
import {DummyAbstractionFlowNode} from "@/features/ast/components/ast/flow/DummyAbstractionFlowNode";
import {LetFlowNode} from "@/features/ast/components/ast/flow/LetFlowNode";
import {BinOpFlowNode} from "@/features/ast/components/ast/flow/BinOpFlowNode";
import {FixFlowNode} from "@/features/ast/components/ast/flow/FixFlowNode";
import {Undo2, Redo2, LayoutGrid, Maximize2, Trash2} from "lucide-react";

const HANDLE_LABELS: Record<string, string> = {
  "global-decl": "decl",
  "term": "term",
  "body": "body",
  "paramType": "param",
  "type": "type",
  "value": "value",
  "left": "fn",
  "right": "arg",
  "from": "from",
  "to": "to",
  "condition": "cond",
  "then": "then",
  "else": "else",
  "variable": "scrutinee",
  "inl-term": "inl",
  "inr-term": "inr",
  "tuple": "tuple",
  "first": "1st",
  "second": "2nd",
  "leftOperand": "left",
  "rightOperand": "right",
};

export interface AstProps {
  AST: Program,
  fullScreen?: boolean,
  setAST: (ast: Program) => void,
  graph: AstFlowGraph,
  setGraph:  React.Dispatch<React.SetStateAction<AstFlowGraph>>,
}

function TypeFlowNodeDispatch(props: any) {
  const kind = (props.data?.term as any)?.kind;
  switch (kind) {
    case "TyArrow":
      return <TyArrowFlowNode {...props} />;
    case "SumType":
      return <SumTypeFlowNode {...props} />;
    case "TupleType":
      return <TupleTypeFlowNode {...props} />;
    case "VariantType":
      return <VariantTypeFlowNode {...props} />;
    case "RecordType":
      return <RecordTypeFlowNode {...props} />;
    default:
      return <TyVarFlowNode {...props} />;
  }
}

// Node kinds beyond this core set can be *displayed* here (e.g. via "Copy from
// viewer" in AstEditorContainer) but are not yet constructible through this
// editor's toolbar/connection UI — see graphToAst.ts's reconstruct() fallback.
export const nodeTypes: NodeTypes = {
  program: ProgramFlowNode,
  funDecl: FunDeclFlowNode,
  varDecl: VarDeclFlowNode,
  abstraction: AbstractionFlowNode,
  variable: VariableFlowNode,
  application: ApplicationFlowNode,
  literal: LiteralFlowNode,
  type: TypeFlowNodeDispatch,
  inl: InlFlowNode,
  inr: InrFlowNode,
  ifCondition: IfConditionFlowNode,
  case: CaseFlowNode,
  variantCase: VariantCaseFlowNode,
  variant: VariantFlowNode,
  ascribe: AscribeFlowNode,
  tupleProjection: TupleProjectionFlowNode,
  recordProjection: RecordProjectionFlowNode,
  record: RecordFlowNode,
  sequencing: SequencingFlowNode,
  tuple: TupleFlowNode,
  dummyAbstraction: DummyAbstractionFlowNode,
  let: LetFlowNode,
  binOp: BinOpFlowNode,
  fix: FixFlowNode,
} as NodeTypes;

type AddOnDropKind = "decl" | "term" | "type";

// Node kinds whose own handles always point at further *types* (as opposed to
// term/program nodes, whose handles are term-context except "type"/"paramType").
const TYPE_SOURCE_KINDS = new Set(["TyVar", "TyArrow", "SumType", "TupleType", "VariantType", "RecordType"]);

// A handful of handle names are reused across both term nodes and type nodes
// (e.g. "left"/"right" on Application vs. SumType, "el-N" on Tuple vs.
// TupleType, "field-N" on Record/Variant vs. VariantType/RecordType) — so the
// handle name alone can't tell us what kind of node belongs on the other end.
// The source node's own kind disambiguates: handles coming off a type node are
// always type-context, everything else defaults to term-context except the
// handles that explicitly carry a nested type ("type", "paramType").
function expectedChildKind(sourceKind: string | undefined, handleId: string | undefined): AddOnDropKind | null {
  if (!handleId) return null;
  if (handleId === "global-decl") return "decl";
  if (sourceKind && TYPE_SOURCE_KINDS.has(sourceKind)) return "type";
  if (handleId === "type" || handleId === "paramType") return "type";
  return "term";
}

const VALID_NODE_TYPES_BY_KIND: Record<AddOnDropKind, string[]> = {
  decl: ["funDecl", "varDecl"],
  term: [
    "abstraction", "application", "variable", "literal",
    "inl", "inr", "ifCondition", "case", "variantCase", "variant",
    "ascribe", "tupleProjection", "recordProjection", "record",
    "sequencing", "tuple", "dummyAbstraction", "let", "binOp", "fix",
  ],
  type: ["typeVar", "typeArrow", "sumType", "tupleType", "variantType", "recordType"],
};

// Skeleton (term, xyflow node "type" string) for each newly-added node kind,
// shared by addStandaloneNode and commitAddNodeOnDrop. Returns null for the
// original 8 kinds, which keep their existing inline construction below.
function makeDefaultTermNode(nodeType: string, id: string): { type: string; term: any } | null {
  switch (nodeType) {
    case "inl":
    case "inr":
      return {
        type: nodeType,
        term: {
          id, kind: nodeType === "inl" ? "Inl" : "Inr",
          term: { id: `${id}-term`, kind: "Var", name: "x" },
          type: {
            id: `${id}-type`, kind: "SumType",
            left: { id: `${id}-left`, kind: "TyVar", name: "A" },
            right: { id: `${id}-right`, kind: "TyVar", name: "B" },
          },
        },
      };
    case "ifCondition":
      return {
        type: "ifCondition",
        term: {
          id, kind: "IfCondition",
          condition: { id: `${id}-cond`, kind: "Lit", value: "true" },
          then: { id: `${id}-then`, kind: "Var", name: "x" },
        },
      };
    case "case":
      return {
        type: "case",
        term: {
          id, kind: "Case",
          variable: { id: `${id}-variable`, kind: "Var", name: "s" },
          inl: { variable: "x", term: { id: `${id}-inl`, kind: "Var", name: "x" } },
          inr: { variable: "y", term: { id: `${id}-inr`, kind: "Var", name: "y" } },
        },
      };
    case "variantCase":
      return {
        type: "variantCase",
        term: {
          id, kind: "VariantCase",
          variable: { id: `${id}-variable`, kind: "Var", name: "s" },
          cases: [{ label: "l1", variable: "x", body: { id: `${id}-case-0`, kind: "Var", name: "x" } }],
        },
      };
    case "variant":
      return {
        type: "variant",
        term: {
          id, kind: "Variant",
          type: {
            id: `${id}-type`, kind: "VariantType",
            variants: [{ label: "l1", type: { id: `${id}-type-f0`, kind: "TyVar", name: "T" } }],
          },
          variants: [{ label: "l1", term: { id: `${id}-field-0`, kind: "Var", name: "x" } }],
        },
      };
    case "ascribe":
      return {
        type: "ascribe",
        term: {
          id, kind: "Ascribe",
          term: { id: `${id}-term`, kind: "Var", name: "x" },
          type: { id: `${id}-type`, kind: "TyVar", name: "T" },
        },
      };
    case "tupleProjection":
      return {
        type: "tupleProjection",
        term: {
          id, kind: "TupleProjection",
          tuple: { id: `${id}-tuple`, kind: "Var", name: "t" },
          index: 1,
        },
      };
    case "recordProjection":
      return {
        type: "recordProjection",
        term: {
          id, kind: "RecordProjection",
          term: { id: `${id}-term`, kind: "Var", name: "r" },
          label: "l",
        },
      };
    case "record":
      return {
        type: "record",
        term: {
          id, kind: "Record",
          fields: [{ label: "l1", term: { id: `${id}-field-0`, kind: "Var", name: "x" } }],
        },
      };
    case "sequencing":
      return {
        type: "sequencing",
        term: {
          id, kind: "Sequencing",
          first: { id: `${id}-first`, kind: "Lit", value: "unit" },
          second: { id: `${id}-second`, kind: "Var", name: "x" },
        },
      };
    case "let":
      return {
        type: "let",
        term: {
          id, kind: "Let", name: "x",
          value: { id: `${id}-value`, kind: "Lit", value: "0" },
          body: { id: `${id}-body`, kind: "Var", name: "x" },
        },
      };
    case "binOp":
      return {
        type: "binOp",
        term: {
          id, kind: "BinOp", operator: "+",
          left: { id: `${id}-leftOperand`, kind: "Lit", value: "1" },
          right: { id: `${id}-rightOperand`, kind: "Lit", value: "1" },
        },
      };
    case "fix":
      return {
        type: "fix",
        term: {
          id, kind: "Fix",
          term: {
            id: `${id}-term`, kind: "Abs", param: "f",
            paramType: { id: `${id}-paramType`, kind: "TyVar", name: "T" },
            body: { id: `${id}-body`, kind: "Var", name: "f" },
          },
        },
      };
    case "tuple":
      return {
        type: "tuple",
        term: {
          id, kind: "Tuple",
          elements: [{ id: `${id}-el-0`, kind: "Var", name: "x" }],
        },
      };
    case "dummyAbstraction":
      return {
        type: "dummyAbstraction",
        term: {
          id, kind: "DummyAbstraction",
          paramType: { id: `${id}-paramType`, kind: "TyVar", name: "T" },
          body: { id: `${id}-body`, kind: "Var", name: "x" },
        },
      };
    case "sumType":
      return {
        type: "type",
        term: {
          id, kind: "SumType",
          left: { id: `${id}-left`, kind: "TyVar", name: "A" },
          right: { id: `${id}-right`, kind: "TyVar", name: "B" },
        },
      };
    case "tupleType":
      return {
        type: "type",
        term: {
          id, kind: "TupleType",
          elements: [{ id: `${id}-el-0`, kind: "TyVar", name: "A" }],
        },
      };
    case "variantType":
      return {
        type: "type",
        term: {
          id, kind: "VariantType",
          variants: [{ label: "l1", type: { id: `${id}-field-0`, kind: "TyVar", name: "T" } }],
        },
      };
    case "recordType":
      return {
        type: "type",
        term: {
          id, kind: "RecordType",
          fields: [{ label: "l1", type: { id: `${id}-field-0`, kind: "TyVar", name: "T" } }],
        },
      };
    default:
      return null;
  }
}

// Inner editor must run under ReactFlowProvider (required for useReactFlow)
export function AstEditor({
  fullScreen = false,
  setAST,
  graph,
  setGraph,
}: AstProps) {
  // NOTE: useReactFlow must be used under ReactFlowProvider in AstEditorContainer
  const rf = useReactFlow();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [newNodeType_] = useState<string>("variable");
  const pendingAstRef = useRef<Program | null>(null);

  const [connectDraft, setConnectDraft] = useState<null | {
    source: string;
    sourceHandle: string;
    kind: AddOnDropKind;
    clientX: number;
    clientY: number;
  }>(null);

  // popup position relative to wrapper
  const [dropPopupPos, setDropPopupPos] = useState<null | { x: number; y: number }>(null);

  const [addOnDropChoice, setAddOnDropChoice] = useState<string | null>(null);
  const [addOnDropOpen, setAddOnDropOpen] = useState(false);
  const addOnDropTriggerRef = useRef<HTMLButtonElement | null>(null);

  // Node right-click context menu
  const [nodeCtxMenu, setNodeCtxMenu] = useState<null | { x: number; y: number; nodeId: string }>(null);

  // Undo / redo stacks (refs so mutations don't trigger re-renders)
  const undoStackRef = useRef<AstFlowGraph[]>([]);
  const redoStackRef = useRef<AstFlowGraph[]>([]);

  const snapshotHistory = useCallback((current: AstFlowGraph) => {
    undoStackRef.current = [...undoStackRef.current, current].slice(-50);
    redoStackRef.current = [];
  }, []);

  const undo = useCallback(() => {
    if (undoStackRef.current.length === 0) return;
    const snapshot = undoStackRef.current.pop()!;
    redoStackRef.current = [...redoStackRef.current, graph].slice(-50);
    setGraph(snapshot);
  }, [graph, setGraph]);

  const redo = useCallback(() => {
    if (redoStackRef.current.length === 0) return;
    const snapshot = redoStackRef.current.pop()!;
    undoStackRef.current = [...undoStackRef.current, graph].slice(-50);
    setGraph(snapshot);
  }, [graph, setGraph]);

  // Keep AST in sync with graph (node edits + edge edits)
  useEffect(() => {
    pendingAstRef.current = graphToAst(graph);
  }, [graph]);

  // Emit AST updates after graph state changes
  useEffect(() => {
    if (!pendingAstRef.current) return;
    setAST(pendingAstRef.current);
    pendingAstRef.current = null;
  }, [graph, setAST]);

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

  const validateConnection = useCallback((params: Connection, nodes: Node[]): boolean => {
    const sourceNode = nodes.find((n) => n.id === params.source);
    const targetNode = nodes.find((n) => n.id === params.target);
    if (!sourceNode || !targetNode || !params.sourceHandle) return false;

    const sourceKind = (sourceNode.data as any)?.term?.kind as string | undefined;
    const targetKind = (targetNode.data as any)?.term?.kind as string | undefined;

    const isDecl = (k?: string) => k === "VarDecl" || k === "FunDecl";
    const isType = (k?: string) => !!k && TYPE_SOURCE_KINDS.has(k);
    const isTerm = (k?: string) =>
      !!k && !isDecl(k) && !isType(k) && k !== "Program";

    const expected = expectedChildKind(sourceKind, params.sourceHandle);
    if (!expected) return false;

    if (expected === "decl") return isDecl(targetKind);
    if (expected === "type") return isType(targetKind);
    return isTerm(targetKind);
  }, []);

  const isValidConnection = useCallback((params: Edge | Connection): boolean => {
    return validateConnection(params as Connection, rf.getNodes());
  }, [rf, validateConnection]);

  const onConnect = useCallback(
    (params: Connection) => {
      if (!validateConnection(params, rf.getNodes())) return;
      snapshotHistory(graph);
      const label = params.sourceHandle ? HANDLE_LABELS[params.sourceHandle] : undefined;
      setGraph((prevGraph) => {
        if (!validateConnection(params, prevGraph.nodes)) return prevGraph;

        const isGlobalHandle = params.sourceHandle === "global-decl";
        const nextEdges = isGlobalHandle
          ? prevGraph.edges
          : prevGraph.edges.filter(
              (e) => !(e.source === params.source && e.sourceHandle === params.sourceHandle),
            );

        const withNew = addEdge({ ...params, label }, nextEdges);
        const nextGraph = { ...prevGraph, edges: withNew };
        pendingAstRef.current = graphToAst(nextGraph);
        return nextGraph;
      });
    },
    [graph, rf, snapshotHistory, validateConnection],
  );

  const updateNodeTerm = useCallback((nodeId: string, patch: any) => {
    setGraph((prevGraph) => {
      const nextNodes = prevGraph.nodes.map((n) => {
        if (n.id !== nodeId) return n;
        return {
          ...n,
          data: {
            ...n.data,
            term: {
              ...(n.data as any).term,
              ...patch,
            },
          },
        };
      });

      const nextGraph = { ...prevGraph, nodes: nextNodes };
      pendingAstRef.current = graphToAst(nextGraph);
      return nextGraph;
    });
  }, []);

  useEffect(() => {
    // Ensure editable nodes have an onChange handler so Inputs are editable after copying nodes from viewer
    const needsPatch = graph.nodes.some((n: any) => n.data?.editable && typeof (n.data as any).onChange !== "function");
    if (!needsPatch) return;

    setGraph((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n: any) => {
        if (n.data?.editable && typeof (n.data as any).onChange !== "function") {
          return {
            ...n,
            data: {
              ...n.data,
              onChange: (patch: any) => updateNodeTerm(n.id, patch),
            },
          };
        }
        return n;
      }),
    }));
  }, [graph.nodes, setGraph, updateNodeTerm]);

  const addStandaloneNode = useCallback((nodeType?: string) => {
    let newNodeType = newNodeType_;
    if (nodeType) {
      newNodeType = nodeType as typeof newNodeType_;
    }

    const id = `manual-${newNodeType}-${Date.now()}`;
    const position = { x: 120 + graph.nodes.length * 30, y: 120 + graph.nodes.length * 20 };

    const makeNode = () => {
      if (newNodeType === "program") {
        return {
          id, type: "program", position,
          data: {
            term: { id, kind: "Program", globals: [] },
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          }
        };
      }
      if (newNodeType === "funDecl") {
        return {
          id, type: "funDecl", position,
          data: {
            term: {
              id, kind: "FunDecl", name: "f",
              type: { id: `${id}-type`, kind: "TyVar", name: "T" },
              value: { id: `${id}-value`, kind: "Var", name: "x" },
            },
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          },
        };
      }
      if (newNodeType === "varDecl") {
        return {
          id, type: "varDecl", position,
          data: {
            term: {
              id, kind: "VarDecl", name: "x",
              type: { id: `${id}-type`, kind: "TyVar", name: "T" },
              value: { id: `${id}-value`, kind: "Var", name: "x" },
            },
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          },
        };
      }
      if (newNodeType === "abstraction") {
        return {
          id, type: "abstraction", position,
          data: {
            term: {
              id, kind: "Abs", param: "x",
              paramType: { id: `${id}-paramType`, kind: "TyVar", name: "T" },
              body: { id: `${id}-body`, kind: "Var", name: "x" },
              type: { id: `${id}-type`, kind: "TyVar", name: "T" },
            },
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          },
        };
      }
      if (newNodeType === "application") {
        return {
          id, type: "application", position,
          data: {
            term: {
              id, kind: "App",
              func: { id: `${id}-func`, kind: "Var", name: "f" },
              arg: { id: `${id}-arg`, kind: "Var", name: "x" },
            },
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          },
        };
      }
      if (newNodeType === "literal") {
        return {
          id, type: "literal", position,
          data: {
            term: { id, kind: "Lit", value: 0 },
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          }
        };
      }
      if (newNodeType === "typeVar") {
        const ty: TyVar = { id, kind: "TyVar", name: "T" };
        return {
          id, type: "type", position,
          data: { term: ty, editable: true, onChange: (patch: any) => updateNodeTerm(id, patch) },
        };
      }
      if (newNodeType === "typeArrow") {
        const ty: TyArrow = {
          id, kind: "TyArrow",
          from: { id: `${id}-from`, kind: "TyVar", name: "A" },
          to: { id: `${id}-to`, kind: "TyVar", name: "B" },
        };
        return {
          id, type: "type", position,
          data: { term: ty, editable: true, onChange: (patch: any) => updateNodeTerm(id, patch) },
        };
      }
      const skeleton = makeDefaultTermNode(newNodeType, id);
      if (skeleton) {
        return {
          id, type: skeleton.type, position,
          data: { term: skeleton.term, editable: true, onChange: (patch: any) => updateNodeTerm(id, patch) },
        };
      }

      return {
        id, type: "variable", position,
        data: {
          term: { id, kind: "Var", name: "x" },
          editable: true,
          onChange: (patch: any) => updateNodeTerm(id, patch),
        },
      };
    };

    snapshotHistory(graph);
    setGraph((prevGraph) => ({
      ...prevGraph,
      nodes: [...prevGraph.nodes, makeNode() as AstFlowGraph["nodes"][number]],
    }));
  }, [graph, newNodeType_, setGraph, snapshotHistory, updateNodeTerm]);

  const autoLayout = useCallback(() => {
    snapshotHistory(graph);
    setGraph((prev) => layoutAstFlow(prev.nodes, prev.edges));
  }, [graph, setGraph, snapshotHistory]);

  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const [selectedEdgeIds, setSelectedEdgeIds] = useState<string[]>([]);
  const clipboardRef = useRef<Array<{ node: Node; edges: Edge[] }> | null>(null);

  const deleteSelection = useCallback(() => {
    if (selectedNodeIds.length === 0 && selectedEdgeIds.length === 0) return;
    snapshotHistory(graph);
    setGraph((prev) => {
      const remainingNodes = prev.nodes.filter((n) => !selectedNodeIds.includes(n.id));
      const remainingEdges = prev.edges.filter((e) => {
        if (selectedEdgeIds.includes(e.id)) return false;
        if (selectedNodeIds.includes(e.source) || selectedNodeIds.includes(e.target)) return false;
        return true;
      });
      return { ...prev, nodes: remainingNodes, edges: remainingEdges };
    });
  }, [graph, selectedEdgeIds, selectedNodeIds, snapshotHistory]);

  const deleteNode = useCallback((nodeId: string) => {
    snapshotHistory(graph);
    setGraph((prev) => ({
      ...prev,
      nodes: prev.nodes.filter((n) => n.id !== nodeId),
      edges: prev.edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
    }));
  }, [graph, setGraph, snapshotHistory]);

  const duplicateNode = useCallback((nodeId: string) => {
    snapshotHistory(graph);
    setGraph((prev) => {
      const original = prev.nodes.find((n) => n.id === nodeId);
      if (!original) return prev;
      const newId = `${nodeId}-copy-${Date.now()}`;
      const newNode = {
        ...original,
        id: newId,
        position: { x: original.position.x + 40, y: original.position.y + 40 },
        selected: false,
        data: {
          ...(original.data as any),
          term: { ...(original.data as any)?.term, id: newId },
          onChange: (patch: any) => updateNodeTerm(newId, patch),
        },
      } as any;
      return { ...prev, nodes: [...prev.nodes, newNode] };
    });
  }, [graph, setGraph, snapshotHistory, updateNodeTerm]);

  const selectAll = useCallback(() => {
    setGraph((prev) => ({
      ...prev,
      nodes: prev.nodes.map((n) => ({ ...n, selected: true })),
      edges: prev.edges.map((e) => ({ ...e, selected: true })),
    }));
  }, [setGraph]);

  const clearAll = useCallback(() => {
    snapshotHistory(graph);
    setGraph({ nodes: [], edges: [] });
  }, [graph, setGraph, snapshotHistory]);

  function offsetPosition(pos: { x: number; y: number }, dx: number, dy: number) {
    return { x: pos.x + dx, y: pos.y + dy };
  }

  const copySelection = useCallback(() => {
    setGraph((prev) => {
      const nodes = prev.nodes.filter((n) => selectedNodeIds.includes(n.id));
      if (nodes.length === 0) return prev;

      const edges = prev.edges.filter(
        (e) => selectedNodeIds.includes(e.source) && selectedNodeIds.includes(e.target),
      );

      clipboardRef.current = nodes.map((node) => ({
        node,
        edges: edges.filter((e) => e.source === node.id || e.target === node.id),
      }));

      return prev;
    });
  }, [selectedNodeIds]);

  const pasteSelection = useCallback(() => {
    const clip = clipboardRef.current;
    if (!clip || clip.length === 0) return;

    snapshotHistory(graph);
    setGraph((prev) => {
      const idMap = new Map<string, string>();
      const now = Date.now();

      const newNodes: Node[] = clip.map(({ node }, idx) => {
        const newId = `${node.id}-copy-${now}-${idx}`;
        idMap.set(node.id, newId);
        return {
          ...node,
          id: newId,
          position: offsetPosition(node.position, 40, 40),
          selected: false,
          data: {
            ...(node.data as any),
            term: { ...(node.data as any)?.term, id: newId },
          },
        } as any;
      });

      const clipNodeIds = new Set(clip.map((c) => c.node.id));
      const edgesToCopy = prev.edges.filter(
        (e) => clipNodeIds.has(e.source) && clipNodeIds.has(e.target),
      );

      const pastedEdges: Edge[] = edgesToCopy.map((e, idx) => ({
        ...e,
        id: `${e.id}-copy-${now}-${idx}`,
        source: idMap.get(e.source)!,
        target: idMap.get(e.target)!,
        selected: false,
      }));

      return {
        ...prev,
        nodes: [...prev.nodes, ...(newNodes as any)],
        edges: [...prev.edges, ...(pastedEdges as any)],
      };
    });
  }, [graph, snapshotHistory]);

  // Keyboard shortcuts
  const onEditorKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;

      const isEditingText =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable ||
        target.getAttribute("role") === "combobox";

      if (isEditingText) return;

      const modifier = event.ctrlKey || event.metaKey;
      const key = event.key.toLowerCase();

      if (event.key === "Delete" || event.key === "Backspace") {
        event.preventDefault();
        deleteSelection();
        return;
      }

      if (modifier && key === "z" && !event.shiftKey) {
        event.preventDefault();
        undo();
        return;
      }

      if (modifier && (key === "y" || (key === "z" && event.shiftKey))) {
        event.preventDefault();
        redo();
        return;
      }

      if (modifier && key === "a") {
        event.preventDefault();
        selectAll();
        return;
      }

      if (modifier && key === "c") {
        event.preventDefault();
        copySelection();
        return;
      }

      if (modifier && key === "v") {
        event.preventDefault();
        pasteSelection();
      }
    },
    [copySelection, deleteSelection, pasteSelection, redo, selectAll, undo],
  );

  const onNodesDelete = useCallback((deleted: Node[]) => {
    const ids = new Set(deleted.map((n) => n.id));
    setGraph((prev) => ({
      ...prev,
      nodes: prev.nodes.filter((n) => !ids.has(n.id)),
      edges: prev.edges.filter((e) => !ids.has(e.source) && !ids.has(e.target)),
    }));
  }, []);

  const onEdgesDelete = useCallback((deleted: Edge[]) => {
    const ids = new Set(deleted.map((e) => e.id));
    setGraph((prev) => ({
      ...prev,
      edges: prev.edges.filter((e) => !ids.has(e.id)),
    }));
  }, []);

  const onSelectionChange = useCallback((params: { nodes?: Node[]; edges?: Edge[] }) => {
    setSelectedNodeIds((params.nodes ?? []).map((n) => n.id));
    setSelectedEdgeIds((params.edges ?? []).map((e) => e.id));
  }, []);

  const onNodeContextMenu = useCallback((event: React.MouseEvent, node: Node) => {
    event.preventDefault();
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    setNodeCtxMenu({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      nodeId: node.id,
    });
  }, []);

  const onPaneClick = useCallback(() => setNodeCtxMenu(null), []);

  const onConnectStart: OnConnectStart = useCallback((_, params) => {
    if (!params.nodeId || !params.handleId) return;
    const sourceNode = rf.getNodes().find((n) => n.id === params.nodeId);
    const sourceKind = (sourceNode?.data as any)?.term?.kind as string | undefined;
    const handleKind = expectedChildKind(sourceKind, params.handleId);
    if (!handleKind) return;

    setConnectDraft({
      source: params.nodeId,
      sourceHandle: params.handleId,
      kind: handleKind,
      clientX: 0,
      clientY: 0,
    });
    setAddOnDropChoice(null);
  }, [rf]);

  const onConnectEnd: OnConnectEnd = useCallback((event) => {
    if (!connectDraft) return;

    const targetIsPane = (event.target as HTMLElement | null)?.classList?.contains("react-flow__pane");
    if (!targetIsPane) {
      setConnectDraft(null);
      setDropPopupPos(null);
      setAddOnDropOpen(false);
      return;
    }

    const e = event as MouseEvent;
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;

    setConnectDraft((prev) => (prev ? { ...prev, clientX: e.clientX, clientY: e.clientY } : prev));
    setDropPopupPos({
      x: Math.max(8, e.clientX - rect.left + 8),
      y: Math.max(8, e.clientY - rect.top + 8),
    });
    setAddOnDropOpen(true);
  }, [connectDraft]);

  const showAddOnDrop = Boolean(connectDraft && dropPopupPos);

  useEffect(() => {
    if (!showAddOnDrop) return;
    const t = window.setTimeout(() => {
      addOnDropTriggerRef.current?.focus();
    }, 0);
    return () => window.clearTimeout(t);
  }, [showAddOnDrop]);

  const commitAddNodeOnDrop = useCallback((choice: string) => {
    if (!connectDraft) return;

    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;

    const position = rf.screenToFlowPosition({
      x: connectDraft.clientX - rect.left,
      y: connectDraft.clientY - rect.top,
    });

    const nodeType = choice as any;
    const id = `drop-${nodeType}-${Date.now()}`;

    const node = ((): any => {
      if (nodeType === "funDecl") {
        return {
          id, type: "funDecl", position,
          data: {
            term: {
              id, kind: "FunDecl", name: "f",
              type: { id: `${id}-type`, kind: "TyVar", name: "T" },
              value: { id: `${id}-value`, kind: "Var", name: "x" },
            },
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          },
        };
      }
      if (nodeType === "varDecl") {
        return {
          id, type: "varDecl", position,
          data: {
            term: {
              id, kind: "VarDecl", name: "x",
              type: { id: `${id}-type`, kind: "TyVar", name: "T" },
              value: { id: `${id}-value`, kind: "Var", name: "x" },
            },
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          },
        };
      }
      if (nodeType === "abstraction") {
        return {
          id, type: "abstraction", position,
          data: {
            term: {
              id, kind: "Abs", param: "x",
              paramType: { id: `${id}-paramType`, kind: "TyVar", name: "T" },
              body: { id: `${id}-body`, kind: "Var", name: "x" },
              type: { id: `${id}-type`, kind: "TyVar", name: "T" },
            },
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          },
        };
      }
      if (nodeType === "application") {
        return {
          id, type: "application", position,
          data: {
            term: {
              id, kind: "App",
              func: { id: `${id}-func`, kind: "Var", name: "f" },
              arg: { id: `${id}-arg`, kind: "Var", name: "x" },
            },
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          },
        };
      }
      if (nodeType === "literal") {
        return {
          id, type: "literal", position,
          data: {
            term: { id, kind: "Lit", value: 0 },
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          },
        };
      }
      if (nodeType === "typeVar") {
        return {
          id, type: "type", position,
          data: {
            term: { id, kind: "TyVar", name: "T" },
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          },
        };
      }
      if (nodeType === "typeArrow") {
        return {
          id, type: "type", position,
          data: {
            term: {
              id, kind: "TyArrow",
              from: { id: `${id}-from`, kind: "TyVar", name: "A" },
              to: { id: `${id}-to`, kind: "TyVar", name: "B" },
            },
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          },
        };
      }
      const skeleton = makeDefaultTermNode(nodeType, id);
      if (skeleton) {
        return {
          id, type: skeleton.type, position,
          data: { term: skeleton.term, editable: true, onChange: (patch: any) => updateNodeTerm(id, patch) },
        };
      }

      return {
        id, type: "variable", position,
        data: {
          term: { id, kind: "Var", name: "x" },
          editable: true,
          onChange: (patch: any) => updateNodeTerm(id, patch),
        },
      };
    })();

    const connection: Connection = {
      source: connectDraft.source,
      sourceHandle: connectDraft.sourceHandle,
      target: id,
      targetHandle: null,
    };
    const label = connectDraft.sourceHandle ? HANDLE_LABELS[connectDraft.sourceHandle] : undefined;

    snapshotHistory(graph);
    setGraph((prev) => ({
      ...prev,
      nodes: [...prev.nodes, node],
      edges: addEdge({ ...connection, label }, prev.edges),
    }));

    setConnectDraft(null);
    setDropPopupPos(null);
    setAddOnDropChoice(null);
    setAddOnDropOpen(false);
  }, [connectDraft, graph, rf, setGraph, snapshotHistory, updateNodeTerm]);

  return (
    <div
      ref={wrapperRef}
      style={{ width: '100%', height: fullScreen ? '80vh' : '600px' }}
      className="relative"
      onKeyDown={onEditorKeyDown}
    >
      {/* Drop-to-create popup */}
      {showAddOnDrop && dropPopupPos && (
        <div
          className="absolute z-50 rounded-md border bg-background p-2 shadow-md"
          style={{ left: dropPopupPos.x, top: dropPopupPos.y }}
        >
          <div className="text-xs text-muted-foreground mb-2">Insert node</div>
          <Select
            value={addOnDropChoice ?? undefined}
            open={addOnDropOpen}
            onOpenChange={setAddOnDropOpen}
            onValueChange={(v) => {
              setAddOnDropChoice(v);
              commitAddNodeOnDrop(v);
            }}
          >
            <SelectTrigger ref={addOnDropTriggerRef as any} className="w-44">
              <SelectValue placeholder="Select node" />
            </SelectTrigger>
            <SelectContent>
              {connectDraft && VALID_NODE_TYPES_BY_KIND[connectDraft.kind].map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="mt-2 flex justify-end">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                setConnectDraft(null);
                setDropPopupPos(null);
                setAddOnDropChoice(null);
                setAddOnDropOpen(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Node context menu */}
      {nodeCtxMenu && (
        <div
          className="absolute z-50 min-w-[9rem] rounded-md border bg-popover text-popover-foreground shadow-md py-1"
          style={{ left: nodeCtxMenu.x, top: nodeCtxMenu.y }}
        >
          <button
            className="w-full px-3 py-1.5 text-sm text-left hover:bg-accent hover:text-accent-foreground"
            onClick={() => { duplicateNode(nodeCtxMenu.nodeId); setNodeCtxMenu(null); }}
          >
            Duplicate
          </button>
          <div className="h-px bg-border my-1" />
          <button
            className="w-full px-3 py-1.5 text-sm text-left text-destructive hover:bg-accent"
            onClick={() => { deleteNode(nodeCtxMenu.nodeId); setNodeCtxMenu(null); }}
          >
            Delete
          </button>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b bg-background/60 flex-wrap">
        {/* Term nodes */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground mr-0.5">Terms</span>
          {([
            { type: "abstraction", label: "λ", title: "Abstraction (λx.e)" },
            { type: "application", label: "@", title: "Application (f x)" },
            { type: "variable",    label: "x", title: "Variable" },
            { type: "literal",     label: "#", title: "Literal (0, true, unit)" },
            { type: "dummyAbstraction", label: "λ_", title: "Dummy Abstraction (λ_:T.t)" },
            { type: "sequencing",  label: ";", title: "Sequencing (t1;t2)" },
            { type: "ascribe",     label: "as", title: "Ascription (t as T)" },
            { type: "let",         label: "let", title: "Let (let x = t1 in t2, with let-polymorphism)" },
          ] as const).map(({ type, label, title }) => (
            <Button key={type} size="sm" variant="outline" title={title}
              onClick={() => addStandaloneNode(type)}
              className="h-7 w-7 p-0 font-mono font-bold text-sm">
              {label}
            </Button>
          ))}
        </div>

        <Separator orientation="vertical" className="h-5" />

        {/* Arithmetic / comparison */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground mr-0.5">Math</span>
          {([
            { type: "binOp", label: "+/<", title: "Arithmetic or comparison (t1 op t2)" },
            { type: "fix",   label: "fix", title: "Fixpoint operator (fix t, t : T -> T)" },
          ] as const).map(({ type, label, title }) => (
            <Button key={type} size="sm" variant="outline" title={title}
              onClick={() => addStandaloneNode(type)}
              className="h-7 px-2 font-mono font-bold text-xs">
              {label}
            </Button>
          ))}
        </div>

        <Separator orientation="vertical" className="h-5" />

        {/* Sum / variant terms */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground mr-0.5">Sums</span>
          {([
            { type: "inl",         label: "inl", title: "Left injection (inl t as T1+T2)" },
            { type: "inr",         label: "inr", title: "Right injection (inr t as T1+T2)" },
            { type: "case",        label: "case", title: "Case analysis on a sum type" },
            { type: "variant",     label: "[l=]", title: "Variant literal ([l=t] as VariantType)" },
            { type: "variantCase", label: "vcase", title: "Case analysis on a variant type" },
          ] as const).map(({ type, label, title }) => (
            <Button key={type} size="sm" variant="outline" title={title}
              onClick={() => addStandaloneNode(type)}
              className="h-7 px-2 font-mono font-bold text-xs">
              {label}
            </Button>
          ))}
        </div>

        <Separator orientation="vertical" className="h-5" />

        {/* Tuple / record terms */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground mr-0.5">Tuples/Records</span>
          {([
            { type: "tuple",            label: "⟨,⟩", title: "Tuple literal" },
            { type: "tupleProjection",  label: ".i", title: "Tuple projection (t.i)" },
            { type: "record",           label: "⟨l=⟩", title: "Record literal" },
            { type: "recordProjection", label: ".l", title: "Record projection (t.l)" },
          ] as const).map(({ type, label, title }) => (
            <Button key={type} size="sm" variant="outline" title={title}
              onClick={() => addStandaloneNode(type)}
              className="h-7 px-2 font-mono font-bold text-xs">
              {label}
            </Button>
          ))}
        </div>

        <Separator orientation="vertical" className="h-5" />

        {/* Control flow */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground mr-0.5">Control</span>
          {([
            { type: "ifCondition", label: "if", title: "Conditional (if/then/elseif/else)" },
          ] as const).map(({ type, label, title }) => (
            <Button key={type} size="sm" variant="outline" title={title}
              onClick={() => addStandaloneNode(type)}
              className="h-7 px-2 font-mono font-bold text-xs">
              {label}
            </Button>
          ))}
        </div>

        <Separator orientation="vertical" className="h-5" />

        {/* Type nodes */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground mr-0.5">Types</span>
          {([
            { type: "typeVar",     label: "T", title: "Type Variable" },
            { type: "typeArrow",   label: "→", title: "Arrow Type (A→B)" },
            { type: "sumType",     label: "+", title: "Sum Type (A+B)" },
            { type: "tupleType",   label: "⟨*⟩", title: "Tuple Type (A*B)" },
            { type: "variantType", label: "[l:]", title: "Variant Type ([l:T,...])" },
            { type: "recordType",  label: "{l:}", title: "Record Type (synthesized)" },
          ] as const).map(({ type, label, title }) => (
            <Button key={type} size="sm" variant="outline" title={title}
              onClick={() => addStandaloneNode(type)}
              className="h-7 px-2 font-mono font-bold text-xs">
              {label}
            </Button>
          ))}
        </div>

        <Separator orientation="vertical" className="h-5" />

        {/* Decl nodes */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground mr-0.5">Decls</span>
          {([
            { type: "funDecl", label: "ƒ",   title: "Function Declaration" },
            { type: "varDecl", label: "let", title: "Variable Declaration" },
          ] as const).map(({ type, label, title }) => (
            <Button key={type} size="sm" variant="outline" title={title}
              onClick={() => addStandaloneNode(type)}
              className="h-7 px-2 font-mono font-bold text-xs">
              {label}
            </Button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Button size="sm" variant="ghost" onClick={undo} title="Undo (Ctrl+Z)"
            className="h-7 w-7 p-0">
            <Undo2 className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" variant="ghost" onClick={redo} title="Redo (Ctrl+Y)"
            className="h-7 w-7 p-0">
            <Redo2 className="h-3.5 w-3.5" />
          </Button>

          <Separator orientation="vertical" className="h-5 mx-1" />

          <Button size="sm" variant="ghost" onClick={autoLayout} title="Auto Layout"
            className="h-7 w-7 p-0">
            <LayoutGrid className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => rf.fitView()} title="Fit View"
            className="h-7 w-7 p-0">
            <Maximize2 className="h-3.5 w-3.5" />
          </Button>

          <Separator orientation="vertical" className="h-5 mx-1" />

          <Button size="sm" variant="ghost" onClick={deleteSelection}
            disabled={selectedNodeIds.length === 0 && selectedEdgeIds.length === 0}
            title="Delete selection (Del)" className="h-7 w-7 p-0">
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" variant="ghost" onClick={clearAll}
            title="Clear all nodes and edges"
            className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive">
            Clear
          </Button>
        </div>
      </div>

      <ReactFlow
        nodes={graph.nodes}
        edges={graph.edges}
        minZoom={0.1}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        onSelectionChange={onSelectionChange as any}
        nodeTypes={nodeTypes}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        onConnect={onConnect}
        isValidConnection={isValidConnection}
        onNodeContextMenu={onNodeContextMenu}
        onPaneClick={onPaneClick}
        nodesConnectable={true}
        deleteKeyCode={null}
        panActivationKeyCode={null}
        defaultEdgeOptions={{
          labelStyle: { fontSize: 10 },
          labelBgPadding: [3, 4] as [number, number],
          labelBgBorderRadius: 3,
          labelBgStyle: { fillOpacity: 0.7 },
        }}
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
            if (node.type === 'inl') return 'hsl(347, 77%, 50%)';
            if (node.type === 'inr') return 'hsl(330, 81%, 60%)';
            if (node.type === 'ifCondition') return 'hsl(189, 94%, 43%)';
            if (node.type === 'case') return 'hsl(239, 84%, 67%)';
            if (node.type === 'variantCase') return 'hsl(258, 90%, 66%)';
            if (node.type === 'variant') return 'hsl(292, 84%, 61%)';
            if (node.type === 'ascribe') return 'hsl(173, 80%, 40%)';
            if (node.type === 'tupleProjection' || node.type === 'tuple') return 'hsl(84, 81%, 44%)';
            if (node.type === 'recordProjection' || node.type === 'record') return 'hsl(25, 95%, 53%)';
            if (node.type === 'sequencing') return 'hsl(199, 89%, 48%)';
            if (node.type === 'dummyAbstraction') return 'hsl(258, 90%, 66%)';
            if (node.type === 'let') return 'hsl(160, 84%, 39%)';
            if (node.type === 'binOp') return 'hsl(38, 92%, 50%)';
            if (node.type === 'fix') return 'hsl(0, 84%, 60%)';
            return 'hsl(var(--muted))';
          }}
        />
      </ReactFlow>
    </div>
  );
}
