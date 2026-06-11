import type {Edge} from "@xyflow/react";
import type {AstFlowGraph, AstFlowNode} from "@/shared/presentation/flow/types";
import type {Abs, App, ASTNode, FunDecl, GlobalDecl, Program, Term, TyVar, Type, Var, VarDecl, TyArrow} from "@/shared/core/domain/ast";

type NodeMap = Map<string, AstFlowNode>;

type ByHandle = Record<string, Edge[]>;

function groupOutgoingByHandle(edges: Edge[], sourceId: string): ByHandle {
  const result: ByHandle = {};
  for (const e of edges) {
    if (e.source !== sourceId) continue;
    const h = e.sourceHandle ?? "";
    (result[h] ??= []).push(e);
  }
  return result;
}

function firstTargetNode(byHandle: ByHandle, handle: string, nodeMap: NodeMap): AstFlowNode | undefined {
  const edge = byHandle[handle]?.[0];
  if (!edge?.target) return undefined;
  return nodeMap.get(edge.target);
}

function parseGlobalIndex(handle: string): number | null {
  if (handle === "global-decl") return 0;
  if (!handle.startsWith("global-")) return null;
  const n = Number(handle.slice("global-".length));
  return Number.isFinite(n) ? n : null;
}

function defaultTyVar(id: string, name = "T"): TyVar {
  return { id, kind: "TyVar", name };
}

function defaultType(id: string): Type {
  return defaultTyVar(id);
}

function defaultVar(id: string, name = "x"): Var {
  return { id, kind: "Var", name };
}

function reconstructType(node: AstFlowNode, nodeMap: NodeMap, edges: Edge[], visiting: Set<string>): Type {
  if (visiting.has(node.id)) {
    const raw = node.data.term as any;
    return (raw && (raw.kind === "TyVar" || raw.kind === "TyArrow")) ? (raw as Type) : defaultType(node.id);
  }
  visiting.add(node.id);

  const raw = node.data.term as any;
  const byHandle = groupOutgoingByHandle(edges, node.id);

  if (raw.kind === "TyVar") {
    visiting.delete(node.id);
    return { id: raw.id ?? node.id, kind: "TyVar", name: raw.name ?? "T" };
  }

  if (raw.kind === "TyArrow") {
    const fromNode = firstTargetNode(byHandle, "from", nodeMap);
    const toNode = firstTargetNode(byHandle, "to", nodeMap);
    const ty: TyArrow = {
      id: raw.id ?? node.id,
      kind: "TyArrow",
      from: fromNode ? reconstructType(fromNode, nodeMap, edges, visiting) : defaultType(`${node.id}-from`),
      to: toNode ? reconstructType(toNode, nodeMap, edges, visiting) : defaultType(`${node.id}-to`),
    } as TyArrow;
    visiting.delete(node.id);
    return ty;
  }

  visiting.delete(node.id);
  return (raw as Type) ?? defaultType(node.id);
}

function reconstruct(node: AstFlowNode, nodeMap: NodeMap, edges: Edge[], visiting: Set<string>): ASTNode {
  if (visiting.has(node.id)) return node.data.term as ASTNode;
  visiting.add(node.id);

  const raw = node.data.term as any;
  const byHandle = groupOutgoingByHandle(edges, node.id);

  switch (raw.kind) {
    case "TyVar":
    case "TyArrow": {
      visiting.delete(node.id);
      return reconstructType(node, nodeMap, edges, visiting) as any;
    }

    case "Program": {
      const program: Program = {
        id: raw.id ?? node.id,
        kind: "Program",
        globals: [],
      };

      const globals: Array<{ index: number; decl: GlobalDecl }> = [];
      for (const handle of Object.keys(byHandle)) {
        const idx = parseGlobalIndex(handle);
        if (idx === null) continue;

        // Support multiple connections from a single global-decl handle
        const edgesForHandle = byHandle[handle] ?? [];
        edgesForHandle.forEach((edge, localIndex) => {
          if (!edge?.target) return;
          const targetNode = nodeMap.get(edge.target);
          if (!targetNode) return;
          const effectiveIndex = handle === "global-decl" ? localIndex : idx;
          globals.push({
            index: effectiveIndex,
            decl: reconstruct(targetNode, nodeMap, edges, visiting) as GlobalDecl,
          });
        });
      }

      globals.sort((a, b) => a.index - b.index);
      program.globals = globals.map((g) => g.decl);

      const termNode = firstTargetNode(byHandle, "term", nodeMap);
      if (termNode) program.term = reconstruct(termNode, nodeMap, edges, visiting) as Term;

      visiting.delete(node.id);
      return program;
    }

    case "VarDecl": {
      const vd: VarDecl = {
        id: raw.id ?? node.id,
        kind: "VarDecl",
        name: raw.name ?? "a",
        type: defaultType(`${node.id}-type`),
        value: {} as Term,
      };

      // type can come from edge
      const typeNode = firstTargetNode(byHandle, "type", nodeMap);
      if (typeNode) vd.type = reconstructType(typeNode, nodeMap, edges, visiting);
      else if (raw.type) vd.type = raw.type as Type;

      const valueNode = firstTargetNode(byHandle, "value", nodeMap);
      if (valueNode) vd.value = reconstruct(valueNode, nodeMap, edges, visiting) as Term;
      visiting.delete(node.id);
      return vd;
    }

    case "FunDecl": {
      const fd: FunDecl = {
        id: raw.id ?? node.id,
        kind: "FunDecl",
        name: raw.name ?? "f",
        type: defaultType(`${node.id}-type`),
        value: defaultVar(`${node.id}-value`, "x"),
      };

      const typeNode = firstTargetNode(byHandle, "type", nodeMap);
      if (typeNode) fd.type = reconstructType(typeNode, nodeMap, edges, visiting);
      else if (raw.type) fd.type = raw.type as Type;

      const valueNode = firstTargetNode(byHandle, "value", nodeMap);
      if (valueNode) fd.value = reconstruct(valueNode, nodeMap, edges, visiting) as Term;
      visiting.delete(node.id);
      return fd;
    }

    case "Abs": {
      const abs: Abs = {
        id: raw.id ?? node.id,
        kind: "Abs",
        param: raw.param ?? "x",
        paramType: defaultType(`${node.id}-paramType`),
        body: defaultVar(`${node.id}-body`, "x"),
        type: defaultType(`${node.id}-type`),
      };

      const paramTypeNode = firstTargetNode(byHandle, "paramType", nodeMap);
      if (paramTypeNode) abs.paramType = reconstructType(paramTypeNode, nodeMap, edges, visiting);
      else if (raw.paramType) abs.paramType = raw.paramType as Type;

      const typeNode = firstTargetNode(byHandle, "type", nodeMap);
      if (typeNode) abs.type = reconstructType(typeNode, nodeMap, edges, visiting);
      else if (raw.type) abs.type = raw.type as Type;

      const bodyNode = firstTargetNode(byHandle, "body", nodeMap);
      if (bodyNode) abs.body = reconstruct(bodyNode, nodeMap, edges, visiting) as Term;

      visiting.delete(node.id);
      return abs;
    }

    case "App": {
      const app: App = {
        id: raw.id ?? node.id,
        kind: "App",
        func: defaultVar(`${node.id}-func`, "f"),
        arg: defaultVar(`${node.id}-arg`, "x"),
      };
      const funcNode = firstTargetNode(byHandle, "left", nodeMap);
      if (funcNode) app.func = reconstruct(funcNode, nodeMap, edges, visiting) as Term;
      const argNode = firstTargetNode(byHandle, "right", nodeMap);
      if (argNode) app.arg = reconstruct(argNode, nodeMap, edges, visiting) as Term;
      visiting.delete(node.id);
      return app;
    }

    case "Var": {
      const v: Var = { id: raw.id ?? node.id, kind: "Var", name: raw.name ?? "x" };
      visiting.delete(node.id);
      return v;
    }

    case "Lit": {
      const lit = { id: raw.id ?? node.id, kind: "Lit", value: String(raw.value ?? "0") };
      visiting.delete(node.id);
      return lit as any;
    }

    default:
      visiting.delete(node.id);
      return node.data.term as ASTNode;
  }
}

export function graphToAst(graph: AstFlowGraph): Program {
  const programNode = graph.nodes.find((n) => n.type === "program");
  const nodeMap: NodeMap = new Map(graph.nodes.map((n) => [n.id, n] as const));

  if (!programNode) {
    return { id: `program-${Date.now()}`, kind: "Program", globals: [] };
  }

  return reconstruct(programNode, nodeMap, graph.edges, new Set()) as Program;
}
