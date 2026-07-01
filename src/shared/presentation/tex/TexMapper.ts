import {ProofTreeVisitor} from "@/shared/core/application/ProofTreeVisitor.ts";
import type {TexTree} from "@/shared/presentation/tex/texTree.ts";
import type {ProofTree} from "@/shared/core/application/typecheck/ProofTree.ts";
import type {Term, Type} from "@/shared/core/domain/ast";

export class TexMapper extends ProofTreeVisitor<TexTree> {


  visit(node: ProofTree): TexTree {
    const tex = super.visit(node)
    if (node.error)
      tex.error = node.error;
    tex.id = node.id;
    return tex;
  }

  protected visitAbs(node: ProofTree): TexTree {
    return {
      ...TexMapper.judgements(node),
      rule: "T-Abs",
      children: node.premises.map(child => this.visit(child))
    }
  }

  protected visitApp(node: ProofTree): TexTree {
    return {
      ...TexMapper.judgements(node),
      rule: "T-App",
      children: node.premises.map(child => this.visit(child))
    }
  }

  protected visitVar(node: ProofTree): TexTree {
    if (node.premises.length > 0) {
      return {
        ...TexMapper.judgements(node),
        rule: "T-Def",
        meta: (node.term as any).name as string,
        children: node.premises.map(child => this.visit(child))
      }
    }
    return {
      ...TexMapper.judgements(node),
      rule: "T-Var",
      children: [this.variableMembershipTex(node)]
    }
  }

  protected visitLit(node: ProofTree): TexTree {
    const value = (node.term as any).value as string
    const rule = value === "unit" ? "T-Unit"
      : (value === "true" || value === "True" || value === "false" || value === "False") ? "T-Bool"
      : "T-Nat"
    return {
      ...TexMapper.judgements(node),
      rule,
      children: []
    }
  }

  private variableMembershipTex(node: ProofTree): TexTree {
    const variableName = (node.term as any).name
    const variableType = TexMapper.typeToTex(node.type)
    const entries = Object.entries(node.gamma)

    const judgementFull = entries.length > 0
      ? `${variableName} : ${variableType} \\in \\{ ${entries.map(([n, t]) => `${n} : ${TexMapper.typeToTex(t)}`).join(", ")} \\}`
      : undefined

    return {
      judgement: `${variableName} : ${variableType} \\in \\Gamma`,
      judgementFull,
      rule: ""
    }
  }

  static judgementToTex(node: ProofTree): string {
    const gamma = this.gammaToTex(node.gamma)
    const term = this.termToTex(node.term)
    const type = this.typeToTex(node.type)
    return `${gamma} \\vdash ${term} : ${type}`
  }

  static judgementCollapsedToTex(node: ProofTree): string {
    const hasEntries = Object.keys(node.gamma).length > 0
    const gamma = hasEntries ? "\\Gamma" : "\\emptyset"
    const term = this.termToTex(node.term)
    const type = this.typeToTex(node.type)
    return `${gamma} \\vdash ${term} : ${type}`
  }

  static judgements(node: ProofTree): { judgement: string; judgementFull?: string } {
    const hasEntries = Object.keys(node.gamma).length > 0
    return {
      judgement: this.judgementCollapsedToTex(node),
      judgementFull: hasEntries ? this.judgementToTex(node) : undefined,
    }
  }

  static termToTex(term: Term): string {
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

  static  gammaToTex(gamma: Record<string, Type>): string {
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

  static  typeToTex(type: Type): string {
    switch (type.kind) {
      case "TyVar":
        return `${type.name}`
      case "TyArrow":
        return `${this.typeToTex(type.from)} \\to ${this.typeToTex(type.to)}`
    }
  }
}