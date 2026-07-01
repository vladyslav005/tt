import type {Edge} from "@xyflow/react";
import type {Abs, App, ASTNode, GlobalDecl, Lit, Program, Var, Type} from "@/shared/core/domain/ast";
import {AstVisitor} from "@/shared/core/application/AstVisitor";
import type {AstFlowGraph, AstFlowNode} from "@/shared/presentation/flow/types.ts";

export class AstFlowMapper extends AstVisitor<void> {
  private nodes: AstFlowNode[] = [];
  private edges: Edge[] = [];
  private visitedNodes: Set<string> = new Set();
  private visitedEdges: Set<string> = new Set();

  map(root: ASTNode): AstFlowGraph {
    this.nodes = [];
    this.edges = [];
    this.visitedNodes = new Set();
    this.visitedEdges = new Set();
    this.visit(root);
    return {
      nodes: this.nodes,
      edges: this.edges,
    };
  }

  protected visitProgram(node: Program): void {
    // Visit main term if it exists (outside the loop!)
    if (node.term) {
      this.visit(node.term);
      this.pushEdge({
        id: `e-${node.id}-term-${node.term.id}`,
        source: node.id,
        sourceHandle: "term",
        target: node.term.id,
      });
    }

    this.pushNode(node);

    // Visit global declarations
    node.globals.forEach((decl) => {
      this.visit(decl);
      this.pushEdge({
        id: `e-${node.id}-global-${decl.id}`,
        source: node.id,
        sourceHandle: `global-decl`,
        target: decl.id,
      });
    });
  }

  protected visitVar(node: Var): void {
    this.pushNode(node);
  }

  protected visitAbs(node: Abs): void {
    this.pushNode(node);

    // paramType
    this.visit(node.paramType as any);
    this.pushEdge({
      id: `e-${node.id}-paramType-${(node.paramType as any).id}`,
      source: node.id,
      sourceHandle: "paramType",
      target: (node.paramType as any).id,
    });

    // result type (if present)
    if (node.type) {
      this.visit((node as any).type);
      this.pushEdge({
        id: `e-${node.id}-type-${(node as any).type.id}`,
        source: node.id,
        sourceHandle: "type",
        target: (node as any).type.id,
      });
    }

    this.visit(node.body);
    this.pushEdge({
      id: `e-${node.id}-body-${node.body.id}`,
      source: node.id,
      sourceHandle: "body",
      target: node.body.id,
    });
  }

  protected visitApp(node: App): void {
    this.pushNode(node);
    this.visit(node.arg);
    this.visit(node.func);
    this.pushEdge({
      id: `e-${node.id}-arg-${node.arg.id}`,
      source: node.id,
      sourceHandle: "right",
      target: node.arg.id,
    });
    this.pushEdge({
      id: `e-${node.id}-func-${node.func.id}`,
      source: node.id,
      sourceHandle: "left",
      target: node.func.id,
    });
  }

  protected visitLit(node: Lit): void {
    this.pushNode(node);
  }

  protected visitTermDecl(node: GlobalDecl): void {
    // FunDecl
    this.pushNode(node);

    // type
    this.visit((node as any).type);
    this.pushEdge({
      id: `e-${node.id}-type-${(node as any).type.id}`,
      source: node.id,
      sourceHandle: "type",
      target: (node as any).type.id,
    });

    this.visit(node.value);
    this.pushEdge({
      id: `e-${node.id}-value-${node.value.id}`,
      source: node.id,
      sourceHandle: "value",
      target: node.value.id,
    });
  }

  protected visitTypeDecl(node: GlobalDecl): void {
    // VarDecl
    this.pushNode(node);

    // type
    this.visit((node as any).type);
    this.pushEdge({
      id: `e-${node.id}-type-${(node as any).type.id}`,
      source: node.id,
      sourceHandle: "type",
      target: (node as any).type.id,
    });

    // value TODO:
    // this.visit(node.value);
    this.pushEdge({
      id: `e-${node.id}-value-${node.value.id}`,
      source: node.id,
      sourceHandle: "value",
      target: node.value.id,
    });
  }

  protected visitType(node: Type): void {
    this.pushNode(node);
    if (node.kind === "TyArrow") {
      this.visit(node.to);
      this.visit(node.from);

      this.pushEdge({
        id: `e-${node.id}-to-${node.to.id}`,
        source: node.id,
        sourceHandle: "to",
        target: node.to.id,
      });

      this.pushEdge({
        id: `e-${node.id}-from-${node.from.id}`,
        source: node.id,
        sourceHandle: "from",
        target: node.from.id,
      });

    }
  }

  private pushNode(node: ASTNode): void {
    // Prevent duplicate nodes
    if (this.visitedNodes.has(node.id)) {
      return;
    }

    this.visitedNodes.add(node.id);
    switch (node.kind) {
      case "Program":
        this.nodes.push({
          id: node.id,
          type: "program",
          position: {x: 0, y: 0},
          data: {term: node},
        });
        return;
      case "FunDecl":
        this.nodes.push({
          id: node.id,
          type: "funDecl",
          position: {x: 0, y: 0},
          data: {term: node},
        });
        return;
      case "VarDecl":
        this.nodes.push({
          id: node.id,
          type: "varDecl",
          position: {x: 0, y: 0},
          data: {term: node},
        });
        return;
      case "Var":
        this.nodes.push({
          id: node.id,
          type: "variable",
          position: {x: 0, y: 0},
          data: {term: node},
        });
        return;
      case "Abs":
        this.nodes.push({
          id: node.id,
          type: "abstraction",
          position: {x: 0, y: 0},
          data: {term: node},
        });
        return;
      case "App":
        this.nodes.push({
          id: node.id,
          type: "application",
          position: {x: 0, y: 0},
          data: {term: node},
        });
        return;
      case "Lit":
        this.nodes.push({
          id: node.id,
          type: "literal",
          position: {x: 0, y: 0},
          data: {term: node},
        });
        return;
      case "TyVar":
      case "TyArrow":
        this.nodes.push({
          id: node.id,
          type: "type",
          position: {x: 0, y: 0},
          data: {term: node as any},
        } as any);
        return;
    }
  }

  private static readonly HANDLE_LABELS: Record<string, string> = {
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
  };

  private pushEdge(edge: Edge): void {
    if (this.visitedEdges.has(edge.id)) return;
    this.visitedEdges.add(edge.id);
    const label = edge.sourceHandle ? AstFlowMapper.HANDLE_LABELS[edge.sourceHandle] : undefined;
    this.edges.push(label ? { ...edge, label } : edge);
  }
}
