import {ProofTreeVisitor} from "@/shared/core/application/ProofTreeVisitor.ts";
import type {TexTree} from "@/shared/presentation/texTree.ts";
import type {ProofTree} from "@/shared/core/domain/typecheck/ProofTree.ts";
import type {Term, Type} from "@/shared/core/domain/ast";

export class TexMapper extends ProofTreeVisitor<TexTree> {

  protected visitAbs(node: ProofTree): TexTree {
    return {
      judgement: this.judgementToTex(node),
      rule: "T-Abs",
      children: node.premises.map(child => this.visit(child))
    }
  }

  protected visitApp(node: ProofTree): TexTree {
    return {
      judgement: this.judgementToTex(node),
      rule: "T-App",
      children: node.premises.map(child => this.visit(child))
    }
  }
  protected visitVar(node: ProofTree): TexTree {
    return {
      judgement: this.judgementToTex(node),
      rule: "T-Var",
      children: [this.variableMembershipTex(node)]
    }
  }

  private variableMembershipTex(node: ProofTree): TexTree {
    const variableName = (node.term as any).name
    const variableType = this.typeToTex(node.type)

    return {
      judgement: `${variableName} : ${variableType} \\in \\Gamma`,
      rule: ""
    }
  }

  private judgementToTex(node: ProofTree): string {
    const gamma = this.gammaToTex(node.gamma)
    const term = this.termToTex(node.term)
    const type = this.typeToTex(node.type)

    return `${gamma} \\vdash ${term} : ${type}`
  }

  private termToTex(term: Term): string {
    switch (term.kind) {
      case "Var":
        return term.name
      case "Abs":
        return `\\lambda ${term.param} : ${this.typeToTex(term.paramType)} . ${this.termToTex(term.body)}`
      case "Lit":
        return term.value.toString()
      case "App":
        return `${this.termToTex(term.func)}\\ ${this.termToTex(term.arg)}`
    }
  }

  private gammaToTex(gamma: Record<string, Type>): string {
    const entries = Object.entries(gamma);

    if (entries.length === 0) {
      // Empty context
      return "\\emptyset";
    }

    // Map each variable to its type
    const formatted = entries.map(([name, type]) => {
      return `${name} : ${this.typeToTex(type)}`;
    });

    // Join with commas for LaTeX
    return `\\Gamma = \\{ ${formatted.join(", ")} \\}`;
  }

  private typeToTex(type: Type): string {
    switch (type.kind) {
      case "TyVar":
        return `${type.name}`
      case "TyArrow":
        return `${this.typeToTex(type.from)} \\to ${this.typeToTex(type.to)}`
    }
  }
}