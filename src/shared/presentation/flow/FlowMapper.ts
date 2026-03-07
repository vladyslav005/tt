import type {Edge} from "@xyflow/react";
import type {Abs, App, ASTNode, GlobalDecl, Lit, Program, Var,} from "@/shared/core/domain/ast";
import {AstVisitor} from "@/shared/core/application/AstVisitor";
import type {AstFlowGraph, AstFlowNode} from "@/features/ast/components/ast/flow/types.ts";

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
    node.globals.forEach((decl, index) => {
      this.visit(decl);
      this.pushEdge({
        id: `e-${node.id}-global-${decl.id}`,
        source: node.id,
        sourceHandle: `global-${index}`,
        target: decl.id,
      });
    });

  }

  protected visitVar(node: Var): void {
    this.pushNode(node);
  }

  protected visitAbs(node: Abs): void {
    this.pushNode(node);
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
    // This handles FunDecl nodes
    this.pushNode(node);
    // Visit the function's value (body)
    this.visit(node.value);
    this.pushEdge({
      id: `e-${node.id}-value-${node.value.id}`,
      source: node.id,
      sourceHandle: "value",
      target: node.value.id,
    });
  }

  protected visitTypeDecl(node: GlobalDecl): void {
    // This handles VarDecl nodes
    this.pushNode(node);
    // Visit the variable's value
    // this.visit(node.value);
    this.pushEdge({
      id: `e-${node.id}-value-${node.value.id}`,
      source: node.id,
      sourceHandle: "value",
      target: node.value.id,
    });
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
    }
  }

  private pushEdge(edge: Edge): void {
    // Prevent duplicate edges
    if (this.visitedEdges.has(edge.id)) {
      return;
    }
    this.visitedEdges.add(edge.id);
    this.edges.push(edge);
  }
}
