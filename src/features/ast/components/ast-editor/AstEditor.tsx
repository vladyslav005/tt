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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select.tsx";
import {graphToAst} from "@/features/ast/hooks/graphToAst";
import type {TyArrow, TyVar} from "@/shared/core/domain/ast";
import {TyVarFlowNode} from "@/features/ast/components/ast/flow/TyVarFlowNode";
import {TyArrowFlowNode} from "@/features/ast/components/ast/flow/TyArrowFlowNode";

export interface AstProps {
  AST: Program,
  fullScreen?: boolean,
  setAST: (ast: Program) => void,
  graph: AstFlowGraph,
  setGraph:  React.Dispatch<React.SetStateAction<AstFlowGraph>>,
}

export const nodeTypes: NodeTypes = {
  program: ProgramFlowNode,
  funDecl: FunDeclFlowNode,
  varDecl: VarDeclFlowNode,
  abstraction: AbstractionFlowNode,
  variable: VariableFlowNode,
  application: ApplicationFlowNode,
  literal: LiteralFlowNode,
  type: (props: any) => {
    const kind = (props.data?.term as any)?.kind;
    return kind === "TyArrow" ? <TyArrowFlowNode {...props} /> : <TyVarFlowNode {...props} />;
  },
} as NodeTypes;

type AddOnDropKind = "decl" | "term" | "type";

function kindFromSourceHandle(handleId?: string): AddOnDropKind | null {
  if (!handleId) return null;
  if (handleId === "global-decl") return "decl";
  if (handleId === "type" || handleId === "paramType" || handleId === "from" || handleId === "to") return "type";
  if (handleId === "term" || handleId === "value" || handleId === "body" || handleId === "left" || handleId === "right") return "term";
  return null;
}

const VALID_NODE_TYPES_BY_KIND: Record<AddOnDropKind, Array<
  | "funDecl"
  | "varDecl"
  | "abstraction"
  | "application"
  | "variable"
  | "literal"
  | "typeVar"
  | "typeArrow"
>> = {
  decl: ["funDecl", "varDecl"],
  term: ["abstraction", "application", "variable", "literal"],
  type: ["typeVar", "typeArrow"],
};

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

  const [newNodeType_, setNewNodeType] = useState<
    | "program"
    | "funDecl"
    | "varDecl"
    | "abstraction"
    | "application"
    | "variable"
    | "literal"
    | "typeVar"
    | "typeArrow"
  >("variable");
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

  // Update graph when AST changes
  useEffect(() => {
    // addStandaloneNode("program");
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
    (params: Connection) => {
      setGraph((prevGraph) => {
        const sourceNode = prevGraph.nodes.find((n) => n.id === params.source);
        const targetNode = prevGraph.nodes.find((n) => n.id === params.target);

        // Basic sanity
        if (!sourceNode || !targetNode || !params.sourceHandle) {
          return prevGraph;
        }

        const sourceKind = (sourceNode.data as any)?.term?.kind as string | undefined;
        const targetKind = (targetNode.data as any)?.term?.kind as string | undefined;

        const isDecl = (k?: string) => k === "VarDecl" || k === "FunDecl";
        const isType = (k?: string) => k === "TyVar" || k === "TyArrow";
        const isTerm = (k?: string) => k === "Var" || k === "Abs" || k === "App" || k === "Lit";

        const handle = params.sourceHandle;

        const isGlobalHandle = handle === "global-decl";
        const isTypeHandle = handle === "type" || handle === "paramType" || handle === "from" || handle === "to";
        const isTermHandle = handle === "term" || handle === "value" || handle === "body" || handle === "left" || handle === "right";

        // 1) Declarations can ONLY be connected from Program.global-decl
        if ((isDecl(targetKind) && !isGlobalHandle) || (!isDecl(targetKind) && isGlobalHandle)) {
          console.warn("Invalid connection: declarations can only be connected from Program.global-decl", params);
          return prevGraph;
        }

        console.warn(isDecl(targetKind), isGlobalHandle, params);


        // 2) Type nodes can ONLY be targeted via type handles
        if (isType(targetKind) && !isTypeHandle) {
          console.warn("Invalid connection: type nodes must be connected via type handles", params);
          return prevGraph;
        }

        // 3) Type handles can ONLY target type nodes
        if (isTypeHandle && !isType(targetKind)) {
          console.warn("Invalid connection: type handles must connect to type nodes", params);
          return prevGraph;
        }

        // 4) Term handles can ONLY target term nodes
        if (isTermHandle && !isTerm(targetKind)) {
          console.warn("Invalid connection: term handles must connect to term nodes", params);
          return prevGraph;
        }

        // 5) Program.term must target a term
        if (handle === "term" && sourceKind === "Program" && !isTerm(targetKind)) {
          console.warn("Invalid connection: Program.term must connect to a term node", params);
          return prevGraph;
        }

        // allow multiple globals on the same handle, but keep single edges for structural handles
        const isMultiHandle = isGlobalHandle;
        const nextEdges = isMultiHandle
          ? prevGraph.edges
          : prevGraph.edges.filter(
              (e) => !(e.source === params.source && e.sourceHandle === params.sourceHandle),
            );

        const withNew = addEdge(params, nextEdges);
        const nextGraph = { ...prevGraph, edges: withNew };

        pendingAstRef.current = graphToAst(nextGraph);

        return nextGraph;
      });
    },
    [],
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
    console.log("Adding node of type:", nodeType);
    let newNodeType = newNodeType_;
    if (nodeType) {
      newNodeType = nodeType as typeof newNodeType_;
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
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          }
        };
      }
      if (newNodeType === "funDecl") {
        const valueId = `${id}-value`;
        const typeId = `${id}-type`;
        return {
          id,
          type: "funDecl",
          position,
          data: {
            term: {
              id,
              kind: "FunDecl",
              name: "f",
              type: { id: typeId, kind: "TyVar", name: "T" },
              value: { id: valueId, kind: "Var", name: "x" },
            },
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          },

        };
      }
      if (newNodeType === "varDecl") {
        const valueId = `${id}-value`;
        const typeId = `${id}-type`;
        return {
          id,
          type: "varDecl",
          position,
          data: {
            term: {
              id,
              kind: "VarDecl",
              name: "x",
              type: { id: typeId, kind: "TyVar", name: "T" },
              value: { id: valueId, kind: "Var", name: "x" },
            },
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          },
        };
      }
      if (newNodeType === "abstraction") {
        const bodyId = `${id}-body`;
        const paramTypeId = `${id}-paramType`;
        return {
          id,
          type: "abstraction",
          position,
          data: {
            term: {
              id,
              kind: "Abs",
              param: "x",
              paramType: { id: paramTypeId, kind: "TyVar", name: "T" },
              body: { id: bodyId, kind: "Var", name: "x" },
              type: { id: `${id}-type`, kind: "TyVar", name: "T" },
            },
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
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
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
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
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          }
        };

      }
      if (newNodeType === "typeVar") {
        const ty: TyVar = { id, kind: "TyVar", name: "T" };
        return {
          id,
          type: "type",
          position,
          data: {
            term: ty,
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          },
        };
      }
      if (newNodeType === "typeArrow") {
        const ty: TyArrow = {
          id,
          kind: "TyArrow",
          from: { id: `${id}-from`, kind: "TyVar", name: "A" },
          to: { id: `${id}-to`, kind: "TyVar", name: "B" },
        };
        return {
          id,
          type: "type",
          position,
          data: {
            term: ty,
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          },
        };
      }
      return {
        id, type: "variable",
        position,
        data: {
          term: {
            id,
            kind: "Var",
            name: "x" },
          editable: true,
          onChange: (patch: any) => updateNodeTerm(id, patch),
        },
      };
    };

    setGraph((prevGraph) => ({
      ...prevGraph,
      nodes: [...prevGraph.nodes, makeNode() as AstFlowGraph["nodes"][number]],
    }));
  }, [graph.nodes.length, newNodeType_, setGraph, updateNodeTerm]);

  function offsetPosition(pos: { x: number; y: number }, dx: number, dy: number) {
    return { x: pos.x + dx, y: pos.y + dy };
  }

  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const [selectedEdgeIds, setSelectedEdgeIds] = useState<string[]>([]);
  const clipboardRef = useRef<Array<{ node: Node; edges: Edge[] }> | null>(null);

  const deleteSelection = useCallback(() => {
    setGraph((prev) => {
      if (selectedNodeIds.length === 0 && selectedEdgeIds.length === 0) return prev;

      const remainingNodes = prev.nodes.filter((n) => !selectedNodeIds.includes(n.id));
      const remainingEdges = prev.edges.filter((e) => {
        if (selectedEdgeIds.includes(e.id)) return false;
        if (selectedNodeIds.includes(e.source) || selectedNodeIds.includes(e.target)) return false;
        return true;
      });

      return { ...prev, nodes: remainingNodes, edges: remainingEdges };
    });
  }, [selectedEdgeIds, selectedNodeIds]);

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
            // If the term has an id, keep it aligned to node id for consistency
            term: { ...(node.data as any)?.term, id: newId },
          },
        } as any;
      });

      const clipNodeIds = new Set(clip.map((c) => c.node.id));
      const newEdges: Edge[] = prev.edges;

      // Create edges among pasted nodes (only edges fully inside selection)
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
        edges: [...newEdges, ...(pastedEdges as any)],
      };
    });
  }, []);

  // Keyboard shortcuts: delete, copy, paste
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const mod = isMac ? e.metaKey : e.ctrlKey;

      if (e.key === "Delete") {
        e.preventDefault();
        deleteSelection();
        return;
      }

      if (mod && (e.key === "c" || e.key === "C")) {
        e.preventDefault();
        copySelection();
        return;
      }

      if (mod && (e.key === "v" || e.key === "V")) {
        e.preventDefault();
        pasteSelection();
        return;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [copySelection, deleteSelection, pasteSelection]);

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

  const onConnectStart: OnConnectStart = useCallback((_, params) => {
    if (!params.nodeId || !params.handleId) return;
    const handleKind = kindFromSourceHandle(params.handleId);
    if (!handleKind) return;

    // Start draft; we'll decide on end whether to open selector.
    setConnectDraft({
      source: params.nodeId,
      sourceHandle: params.handleId,
      kind: handleKind,
      clientX: 0,
      clientY: 0,
    });
    setAddOnDropChoice(null);
  }, []);

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

  // When connectDraft has client coords set (drop on pane), show selector.
  const showAddOnDrop = Boolean(connectDraft && dropPopupPos);

  // Focus trigger when popup appears so keyboard works; keep dropdown open.
  useEffect(() => {
    if (!showAddOnDrop) return;
    // next tick so trigger exists
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
        const valueId = `${id}-value`;
        const typeId = `${id}-type`;
        return {
          id,
          type: "funDecl",
          position,
          data: {
            term: {
              id,
              kind: "FunDecl",
              name: "f",
              type: { id: typeId, kind: "TyVar", name: "T" },
              value: { id: valueId, kind: "Var", name: "x" },
            },
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          },
        };
      }
      if (nodeType === "varDecl") {
        const valueId = `${id}-value`;
        const typeId = `${id}-type`;
        return {
          id,
          type: "varDecl",
          position,
          data: {
            term: {
              id,
              kind: "VarDecl",
              name: "x",
              type: { id: typeId, kind: "TyVar", name: "T" },
              value: { id: valueId, kind: "Var", name: "x" },
            },
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          },
        };
      }
      if (nodeType === "abstraction") {
        const bodyId = `${id}-body`;
        const paramTypeId = `${id}-paramType`;
        return {
          id,
          type: "abstraction",
          position,
          data: {
            term: {
              id,
              kind: "Abs",
              param: "x",
              paramType: { id: paramTypeId, kind: "TyVar", name: "T" },
              body: { id: bodyId, kind: "Var", name: "x" },
              type: { id: `${id}-type`, kind: "TyVar", name: "T" },
            },
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          },
        };
      }
      if (nodeType === "application") {
        return {
          id,
          type: "application",
          position,
          data: {
            term: {
              id,
              kind: "App",
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
          id,
          type: "literal",
          position,
          data: {
            term: { id, kind: "Lit", value: 0 },
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          },
        };
      }
      if (nodeType === "typeVar") {
        return {
          id,
          type: "type",
          position,
          data: {
            term: { id, kind: "TyVar", name: "T" },
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          },
        };
      }
      if (nodeType === "typeArrow") {
        return {
          id,
          type: "type",
          position,
          data: {
            term: {
              id,
              kind: "TyArrow",
              from: { id: `${id}-from`, kind: "TyVar", name: "A" },
              to: { id: `${id}-to`, kind: "TyVar", name: "B" },
            },
            editable: true,
            onChange: (patch: any) => updateNodeTerm(id, patch),
          },
        };
      }

      return {
        id,
        type: "variable",
        position,
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

    setGraph((prev) => ({
      ...prev,
      nodes: [...prev.nodes, node],
      edges: addEdge(connection, prev.edges),
    }));

    setConnectDraft(null);
    setDropPopupPos(null);
    setAddOnDropChoice(null);
    setAddOnDropOpen(false);
  }, [connectDraft, rf, setGraph, updateNodeTerm]);

  return (
    <div ref={wrapperRef} style={{ width: '100%', height: fullScreen ? '80vh' :'600px' }} className="relative">
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

      <div className="flex items-center justify-end gap-2 p-2 border-b bg-background/60">
        <Select value={newNodeType_} onValueChange={(value) => setNewNodeType(value as any)}>
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
            <SelectItem value="typeVar">TyVar</SelectItem>
            <SelectItem value="typeArrow">TyArrow</SelectItem>
          </SelectContent>
        </Select>
        <Button type="button" onClick={() => addStandaloneNode()}>Add node</Button>
        <Button type="button" variant="destructive" onClick={deleteSelection} disabled={selectedNodeIds.length === 0 && selectedEdgeIds.length === 0}>
          Delete
        </Button>
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
        nodesConnectable={true}
        deleteKeyCode={null}
        panActivationKeyCode={null}
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

