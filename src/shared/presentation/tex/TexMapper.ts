import {ProofTreeVisitor} from "@/shared/core/application/ProofTreeVisitor.ts";
import type {TexTree} from "@/shared/presentation/tex/texTree.ts";
import type {ProofTree, TypeScheme} from "@/shared/core/application/typecheck/ProofTree.ts";
import type {Term, Type} from "@/shared/core/domain/ast";
import {CT_RULES, LetPolymorphismTexMapper} from "@/shared/presentation/tex/LetPolymorphismTexMapper.ts";

export class TexMapper extends ProofTreeVisitor<TexTree> {


  visit(node: ProofTree): TexTree {
    // A constraint-typing (CT-*) proof tree — e.g. a `let` embedded in an
    // otherwise plain-rule tree — belongs to LetPolymorphismTexMapper.
    if (CT_RULES.has(node.rule)) {
      return new LetPolymorphismTexMapper().visit(node);
    }

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
        children: node.premises.map(child => this.visit(child)),
        // Collapsed, a global-variable reference is indistinguishable from
        // a plain variable lookup — only expanding it reveals the T-Def proof.
        collapsedRule: "T-Var",
        collapsedChildren: [this.variableMembershipTex(node)],
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
    const rule = (value === "unit" || value === "Unit") ? "T-Unit"
      : (value === "true" || value === "True" || value === "false" || value === "False") ? "T-Bool"
      : "T-Nat"
    return {
      ...TexMapper.judgements(node),
      rule,
      children: []
    }
  }

  protected visitIfCondition(node: ProofTree): TexTree {
    return {
      ...TexMapper.judgements(node),
      rule: "T-If",
      children: node.premises.map(child => this.visit(child))
    }
  }

  protected visitInl(node: ProofTree): TexTree {
    return {
      ...TexMapper.judgements(node),
      rule: "T-Inl",
      children: node.premises.map(child => this.visit(child))
    }
  }

  protected visitInr(node: ProofTree): TexTree {
    return {
      ...TexMapper.judgements(node),
      rule: "T-Inr",
      children: node.premises.map(child => this.visit(child))
    }
  }

  protected visitCase(node: ProofTree): TexTree {
    return {
      ...TexMapper.judgements(node),
      rule: "T-Case",
      children: node.premises.map(child => this.visit(child))
    }
  }

  protected visitVariantCase(node: ProofTree): TexTree {
    return {
      ...TexMapper.judgements(node),
      rule: "T-VariantCase",
      children: node.premises.map(child => this.visit(child))
    }
  }

  protected visitVariant(node: ProofTree): TexTree {
    return {
      ...TexMapper.judgements(node),
      rule: "T-Variant",
      children: node.premises.map(child => this.visit(child))
    }
  }

  protected visitAscribe(node: ProofTree): TexTree {
    return {
      ...TexMapper.judgements(node),
      rule: "T-Ascribe",
      children: node.premises.map(child => this.visit(child))
    }
  }

  protected visitTuple(node: ProofTree): TexTree {
    return {
      ...TexMapper.judgements(node),
      rule: "T-Tuple",
      children: node.premises.map(child => this.visit(child))
    }
  }

  protected visitTupleProjection(node: ProofTree): TexTree {
    return {
      ...TexMapper.judgements(node),
      rule: "T-Proj",
      children: node.premises.map(child => this.visit(child))
    }
  }

  protected visitRecord(node: ProofTree): TexTree {
    return {
      ...TexMapper.judgements(node),
      rule: "T-Record",
      children: node.premises.map(child => this.visit(child))
    }
  }

  protected visitRecordProjection(node: ProofTree): TexTree {
    return {
      ...TexMapper.judgements(node),
      rule: "T-RecordProj",
      children: node.premises.map(child => this.visit(child))
    }
  }

  protected visitSequencing(node: ProofTree): TexTree {
    return {
      ...TexMapper.judgements(node),
      rule: "T-Seq",
      children: node.premises.map(child => this.visit(child))
    }
  }

  protected visitDummyAbstraction(node: ProofTree): TexTree {
    return {
      ...TexMapper.judgements(node),
      rule: "T-Abs",
      children: node.premises.map(child => this.visit(child))
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
      case "Lit":
        return term.value.toString()
      case "Abs":
        return `(\\lambda ${term.param} : ${this.typeToTex(term.paramType)} . ${this.termToTex(term.body)})`
      case "App":
        return `(${this.termToTex(term.func)}\\ ${this.termToTex(term.arg)})`
      case "Inl":
        return `\\text{inl}\\ ${this.termToTex(term.term)}\\ \\text{as}\\ ${this.typeToTex(term.type)}`
      case "Inr":
        return `\\text{inr}\\ ${this.termToTex(term.term)}\\ \\text{as}\\ ${this.typeToTex(term.type)}`
      case "IfCondition": {
        let tex = `\\text{if}\\ ${this.termToTex(term.condition)}\\ \\text{then}\\ ${this.termToTex(term.then)}`
        for (const branch of term.elif ?? []) {
          tex += `\\ \\text{elseif}\\ ${this.termToTex(branch.condition)}\\ \\text{then}\\ ${this.termToTex(branch.then)}`
        }
        if (term.else) {
          tex += `\\ \\text{else}\\ ${this.termToTex(term.else)}`
        }
        return tex
      }
      case "Case":
        return `\\text{case}\\ ${this.termToTex(term.variable)}\\ \\text{of}\\ \\text{inl}\\ ${term.inl.variable} \\Rightarrow ${this.termToTex(term.inl.term)}\\ |\\ \\text{inr}\\ ${term.inr.variable} \\Rightarrow ${this.termToTex(term.inr.term)}`
      case "VariantCase":
        return `\\text{case}\\ ${this.termToTex(term.variable)}\\ \\text{of}\\ ${term.cases
          .map((c) => `[${c.label}=${c.variable}] \\Rightarrow ${this.termToTex(c.body)}`)
          .join("\\ |\\ ")}`
      case "Variant":
        return `[${term.variants.map((v) => `${v.label}=${this.termToTex(v.term)}`).join(", ")}]\\ \\text{as}\\ ${this.typeToTex(term.type)}`
      case "Ascribe":
        return `(${this.termToTex(term.term)}\\ \\text{as}\\ ${this.typeToTex(term.type)})`
      case "TupleProjection":
        return `${this.termToTex(term.tuple)}.${term.index}`
      case "RecordProjection":
        return `${this.termToTex(term.term)}.${term.label}`
      case "Record":
        return `\\langle ${term.fields.map((f) => `${f.label}=${this.termToTex(f.term)}`).join(", ")} \\rangle`
      case "Sequencing":
        return `${this.termToTex(term.first)}; ${this.termToTex(term.second)}`
      case "Tuple":
        return `\\langle ${term.elements.map((e) => this.termToTex(e)).join(", ")} \\rangle`
      case "DummyAbstraction":
        return `(\\lambda \\_ : ${this.typeToTex(term.paramType)} . ${this.termToTex(term.body)})`
      case "Let":
        return `\\text{let}\\ ${term.name} = ${this.termToTex(term.value)}\\ \\text{in}\\ ${this.termToTex(term.body)}`
    }
  }

  static gammaToTex(gamma: Record<string, Type | TypeScheme>): string {
    const entries = Object.entries(gamma);

    if (entries.length === 0) {
      return "\\emptyset";
    }

    const formatted = entries.map(([name, type]) => `${name} : ${this.typeToTex(type)}`);
    return `\\Gamma = \\{ ${formatted.join(", ")} \\}`;
  }

  static typeToTex(type: Type | TypeScheme): string {
    if (type.kind === "TypeScheme") {
      const body = this.typeToTex(type.type)
      return type.vars.length > 0
        ? `\\forall ${type.vars.join(", ")}.\\, ${body}`
        : body
    }

    switch (type.kind) {
      case "TyVar":
      case "TyMetaVar":
        return type.name
      case "TyArrow": {
        // Parenthesize sub-arrow on the left (non-default grouping);
        // also parenthesize on the right so right-assoc default is explicit.
        const from = type.from.kind === "TyArrow"
          ? `(${this.typeToTex(type.from)})`
          : this.typeToTex(type.from)
        const to = type.to.kind === "TyArrow"
          ? `(${this.typeToTex(type.to)})`
          : this.typeToTex(type.to)
        return `${from} \\to ${to}`
      }
      case "TupleType":
        return `\\langle ${type.elements.map((e) => this.typeToTex(e)).join(" \\times ")} \\rangle`
      case "SumType":
        return `(${this.typeToTex(type.left)} + ${this.typeToTex(type.right)})`
      case "VariantType":
        return `\\langle ${type.variants.map((v) => `${v.label}:${this.typeToTex(v.type)}`).join(", ")} \\rangle`
      case "RecordType":
        return `\\{ ${type.fields.map((f) => `${f.label}:${this.typeToTex(f.type)}`).join(", ")} \\}`
    }
  }
}