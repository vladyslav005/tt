import {Visitor} from "@/shared/core/application/Visitor.ts";
import type {Abs, App, GlobalDecl, Program, TyArrow, Var} from "@/shared/core/domain/ast";
import {Gamma} from "@/shared/core/domain/typecheck/Gamma.ts";
import {typeEquals} from "@/shared/core/domain/typecheck/utils.ts";
import {type ProofTree, Rule} from "@/shared/core/domain/typecheck/ProofTree.ts";


export class SLTLCTypeChecker extends Visitor<ProofTree> {

  private context: Gamma = new Gamma();

  protected visitAbs(node: Abs): ProofTree {
    this.context.add(node.param, node.paramType);
    const bodyProof: ProofTree = this.visit(node.body);
    this.context.delete(node.param);

    const returnProof: ProofTree = {
      rule: "Abs",
      premises: [bodyProof],
      term: node,
      type: bodyProof.type
    } as ProofTree;

    return returnProof
  }

  protected visitApp(node: App): ProofTree {
    let error: string | undefined = undefined;
    const funcProof: ProofTree = this.visit(node.func);
    const argProof: ProofTree = this.visit(node.arg);

    let returnProof: ProofTree = {
      rule: Rule.App,
      premises: [funcProof, argProof],
      term: node,
      type: undefined as any,
      gamma: this.context.copy(),
      error: error
    };

    if (funcProof.type.kind !== "TyArrow") {
      console.error(`Type error: expected a function type, got ${funcProof.type.kind}`);
      returnProof.error = `Type error: expected a function type, got ${funcProof.type.kind}`;
      return returnProof;
    }

    const funcType = funcProof.type as TyArrow;
    returnProof.type = funcType.to;

    if (typeEquals((funcProof.type as TyArrow).to, argProof.type)) {
      console.error(`Type error: expected a function type, got ${funcType.to}`);
      returnProof.error = `Type error: expected a function type, got ${funcType.to}`;
    }

    return returnProof
  }

  protected visitProgram(node: Program): ProofTree {
    node.globals.forEach((g) => this.visit(g));
    return node.term ? this.visit(node.term) : {} as ProofTree;
  }

  protected visitTermDecl(node: GlobalDecl): ProofTree {
    const valueProof: ProofTree = this.visit(node.value)
    if (!typeEquals(valueProof.type, node.type)) {
      throw new Error(`Type error in declaration of ${node.name}: expected type ${node.type}, got ${valueProof.type}`);
    }

    this.context.add(node.name, node.type);
    return {} as ProofTree;
  }

  protected visitTypeDecl(node: GlobalDecl): ProofTree {
    this.context.add(node.name, node.type);
    return {} as ProofTree;
  }

  protected visitVar(node: Var): ProofTree {
    const varType = this.context.get(node.name);
    let returnProof: ProofTree = {
      rule: Rule.Var,
      term: node,
      type: undefined as any,
      gamma: this.context.copy(),
      premises: []
    }

    if (!varType) {
      console.error(`Type error: variable ${node.name} not found in context`);
      returnProof.error = `Type error: variable ${node.name} not found in context`;
      return returnProof;
    }

    returnProof.type = varType;
    return returnProof;
  }
}