import type {TexTree} from "@/shared/presentation/tex/texTree.ts";
import {type Constraint, type InferProofTree, type ProofTree, Rule} from "@/shared/core/application/typecheck/ProofTree.ts";
import {TexMapper} from "@/shared/presentation/tex/TexMapper.ts";

// The rules produced by LetPolymorphismInferenceVisitor's constraint-typing
// (CT) judgment — kept separate from TexMapper's plain "T-*" rule set so
// neither visitor grows to cover both judgments.
export const CT_RULES: ReadonlySet<Rule> = new Set([
  Rule.CtVar,
  Rule.CtVarLet,
  Rule.CtAbs,
  Rule.CtApp,
  Rule.CtLit,
  Rule.CtIf,
  Rule.CtInl,
  Rule.CtInr,
  Rule.CtCase,
  Rule.CtVariantCase,
  Rule.CtVariant,
  Rule.CtAscribe,
  Rule.CtTuple,
  Rule.CtTupleProjection,
  Rule.CtRecord,
  Rule.CtRecordProjection,
  Rule.CtSequencing,
  Rule.CtDummyAbs,
  Rule.CtLet,
]);

// Renders the constraint-typing (CT) proof trees produced by
// LetPolymorphismInferenceVisitor into TexTree, mirroring TexMapper's "T-*"
// rules as "CT-*" rules and additionally showing each judgment's pending
// constraint set (Γ ⊢ t : T | C). A node whose rule isn't one of CT_RULES
// (e.g. a global definition's plain-rule proof, attached as a premise) is
// delegated back to TexMapper — the two mappers compose across whichever
// judgment a given subtree was produced under.
export class LetPolymorphismTexMapper {

  visit(node: ProofTree): TexTree {
    if (!CT_RULES.has(node.rule)) {
      return new TexMapper().visit(node);
    }

    const tex = this.dispatch(node as InferProofTree);
    if (node.error) tex.error = node.error;
    tex.id = node.id;
    return tex;
  }

  private dispatch(node: InferProofTree): TexTree {
    switch (node.rule) {
      case Rule.CtVar:
      case Rule.CtVarLet:
        return this.visitVar(node);
      case Rule.CtAbs:
      case Rule.CtDummyAbs:
        return this.visitAbs(node);
      case Rule.CtApp:
        return this.visitApp(node);
      case Rule.CtLit:
        return this.visitLit(node);
      case Rule.CtIf:
        return this.visitIfCondition(node);
      case Rule.CtInl:
        return this.visitInlInr(node, "CT-Inl");
      case Rule.CtInr:
        return this.visitInlInr(node, "CT-Inr");
      case Rule.CtCase:
        return this.visitChildren(node, "CT-Case");
      case Rule.CtVariantCase:
        return this.visitChildren(node, "CT-VariantCase");
      case Rule.CtVariant:
        return this.visitChildren(node, "CT-Variant");
      case Rule.CtAscribe:
        return this.visitChildren(node, "CT-Ascribe");
      case Rule.CtTuple:
        return this.visitChildren(node, "CT-Tuple");
      case Rule.CtTupleProjection:
        return this.visitChildren(node, "CT-Proj");
      case Rule.CtRecord:
        return this.visitChildren(node, "CT-Record");
      case Rule.CtRecordProjection:
        return this.visitChildren(node, "CT-RecordProj");
      case Rule.CtSequencing:
        return this.visitChildren(node, "CT-Seq");
      case Rule.CtLet:
        return this.visitLet(node);
      default:
        throw new Error("Unknown constraint-typing rule: " + node.rule);
    }
  }

  private visitVar(node: InferProofTree): TexTree {
    const ruleLabel = node.rule === Rule.CtVarLet ? "CT-VarLet" : "CT-Var";

    if (node.premises.length > 0) {
      return {
        ...LetPolymorphismTexMapper.judgements(node),
        rule: "CT-Def",
        meta: (node.term as any).name as string,
        children: node.premises.map((child) => this.visit(child)),
        // Collapsed, a global-variable reference is indistinguishable from a
        // plain CT-Var/CT-VarLet lookup — only expanding it reveals the proof.
        collapsedRule: ruleLabel,
        collapsedChildren: [this.variableMembershipTex(node)],
      };
    }

    return {
      ...LetPolymorphismTexMapper.judgements(node),
      rule: ruleLabel,
      children: [this.variableMembershipTex(node)],
    };
  }

  private visitAbs(node: InferProofTree): TexTree {
    return {
      ...LetPolymorphismTexMapper.judgements(node),
      rule: "CT-Abs",
      children: node.premises.map((child) => this.visit(child)),
    };
  }

  private visitApp(node: InferProofTree): TexTree {
    return {
      ...LetPolymorphismTexMapper.judgements(node),
      rule: "CT-App",
      children: node.premises.map((child) => this.visit(child)),
    };
  }

  private visitLit(node: InferProofTree): TexTree {
    const value = (node.term as any).value as string;
    const rule = (value === "unit" || value === "Unit") ? "CT-Unit"
      : (value === "true" || value === "True" || value === "false" || value === "False") ? "CT-Bool"
      : "CT-Nat";

    return {
      ...LetPolymorphismTexMapper.judgements(node),
      rule,
      children: [],
    };
  }

  private visitIfCondition(node: InferProofTree): TexTree {
    return {
      ...LetPolymorphismTexMapper.judgements(node),
      rule: "CT-If",
      children: node.premises.map((child) => this.visit(child)),
    };
  }

  private visitInlInr(node: InferProofTree, rule: string): TexTree {
    return {
      ...LetPolymorphismTexMapper.judgements(node),
      rule,
      children: node.premises.map((child) => this.visit(child)),
    };
  }

  private visitChildren(node: InferProofTree, rule: string): TexTree {
    return {
      ...LetPolymorphismTexMapper.judgements(node),
      rule,
      children: node.premises.map((child) => this.visit(child)),
    };
  }

  private visitLet(node: InferProofTree): TexTree {
    return {
      ...LetPolymorphismTexMapper.judgements(node),
      rule: "CT-Let",
      children: node.premises.map((child) => this.visit(child)),
    };
  }

  private variableMembershipTex(node: InferProofTree): TexTree {
    const variableName = (node.term as any).name;
    const variableType = TexMapper.typeToTex(node.type);
    const entries = Object.entries(node.gamma);

    const judgementFull = entries.length > 0
      ? `${variableName} : ${variableType} \\in \\{ ${entries.map(([n, t]) => `${n} : ${TexMapper.typeToTex(t)}`).join(", ")} \\}`
      : undefined;

    return {
      judgement: `${variableName} : ${variableType} \\in \\Gamma`,
      judgementFull,
      rule: "",
    };
  }

  static judgementToTex(node: InferProofTree): string {
    const gamma = TexMapper.gammaToTex(node.gamma);
    const term = TexMapper.termToTex(node.term);
    const type = TexMapper.typeToTex(node.type);
    const constraints = this.constraintsToTex(node.constraints);
    return `${gamma} \\vdash ${term} : ${type} \\mid ${constraints}`;
  }

  static judgementCollapsedToTex(node: InferProofTree): string {
    const hasEntries = Object.keys(node.gamma).length > 0;
    const gamma = hasEntries ? "\\Gamma" : "\\emptyset";
    const term = TexMapper.termToTex(node.term);
    const type = TexMapper.typeToTex(node.type);
    const constraints = this.constraintsToTex(node.constraints);
    return `${gamma} \\vdash ${term} : ${type} \\mid ${constraints}`;
  }

  static judgements(node: InferProofTree): { judgement: string; judgementFull?: string } {
    const hasEntries = Object.keys(node.gamma).length > 0;
    return {
      judgement: this.judgementCollapsedToTex(node),
      judgementFull: hasEntries ? this.judgementToTex(node) : undefined,
    };
  }

  static constraintsToTex(constraints: Constraint[]): string {
    if (constraints.length === 0) {
      return "\\emptyset";
    }
    return `\\{ ${constraints.map((c) => `${TexMapper.typeToTex(c.left)} = ${TexMapper.typeToTex(c.right)}`).join(", ")} \\}`;
  }
}
