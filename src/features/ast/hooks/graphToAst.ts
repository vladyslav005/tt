import type {Edge} from "@xyflow/react";
import type {AstFlowGraph, AstFlowNode} from "@/shared/presentation/flow/types";
import type {Abs, App, ASTNode, FunDecl, GlobalDecl, Program, Term, TyVar, Type, Var, VarDecl} from "@/shared/core/domain/ast";

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

function reconstruct(node: AstFlowNode, nodeMap: NodeMap, edges: Edge[], visiting: Set<string>): ASTNode {
  if (visiting.has(node.id)) return node.data.term as ASTNode;
  visiting.add(node.id);

  const raw = node.data.term as any;
  const byHandle = groupOutgoingByHandle(edges, node.id);

  switch (raw.kind) {
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
        type: (raw.type as Type) ?? defaultType(`${node.id}-type`),
        value: defaultVar(`${node.id}-value`, "x"),
      };
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
        type: (raw.type as Type) ?? defaultType(`${node.id}-type`),
        value: defaultVar(`${node.id}-value`, "x"),
      };
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
        paramType: (raw.paramType as Type) ?? defaultType(`${node.id}-paramType`),
        body: defaultVar(`${node.id}-body`, "x"),
        type: (raw.type as Type) ?? defaultType(`${node.id}-type`),
      };
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
