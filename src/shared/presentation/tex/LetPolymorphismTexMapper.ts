import type {TexRegistryEntry, TexSegment, TexTree} from "@/shared/presentation/tex/texTree.ts";
import {type Constraint, type InferProofTree, type ProofTree, Rule} from "@/shared/core/application/typecheck/ProofTree.ts";
import {TexMapper} from "@/shared/presentation/tex/TexMapper.ts";
import {GammaRegistry, type SetRegistration} from "@/shared/presentation/tex/GammaRegistry.ts";

// The rules produced by LetPolymorphismInferenceVisitor's constraint-typing
// (CT) judgment — kept separate from TexMapper's plain "T-*" rule set so
// neither visitor grows to cover both judgments.
export const CT_RULES: ReadonlySet<Rule> = new Set([
  Rule.CtVar,
  Rule.CtVarLet,
  Rule.CtAbs,
  Rule.CtAbsInf,
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
  Rule.CtBinOp,
  Rule.CtFix,
]);

// Renders the constraint-typing (CT) proof trees produced by
// LetPolymorphismInferenceVisitor into TexTree, mirroring TexMapper's "T-*"
// rules as "CT-*" rules and additionally showing each judgment's pending
// constraint set (Γ ⊢ t : T | C). A node whose rule isn't one of CT_RULES
// (e.g. a global definition's plain-rule proof, attached as a premise) is
// delegated back to TexMapper — the two mappers compose across whichever
// judgment a given subtree was produced under.
//
// Every distinct Γ/constraint-set encountered while walking one derivation
// is numbered (Γ_1, Γ_2, ... / C_1, C_2, ...) the first time it appears, and
// carries a "recipe" explaining how it was built from the previous one plus
// whatever was just added (Γ_2 = Γ_1 ∪ {id : ∀A.A→A}), mirroring how
// instantiate(...) already explains a CT-VarLet lookup. The UI renders each
// reference as independently clickable — collapsed to just its label, or
// expanded to its recipe — via `registry` (shared by reference across every
// node of one derivation) and each judgement's `judgementSegments`.
export class LetPolymorphismTexMapper {

  private readonly registry: Record<string, TexRegistryEntry> = {};
  private readonly gammaRegistry = new GammaRegistry();
  private readonly constraintsByRef = new Map<Constraint[], SetRegistration>();
  private nextConstraintIndex = 1;
  private registryBuilt = false;

  visit(node: ProofTree): TexTree {
    if (!CT_RULES.has(node.rule)) {
      return new TexMapper().visit(node);
    }

    if (!this.registryBuilt) {
      this.buildRegistry(node as InferProofTree, null);
      Object.assign(this.registry, this.gammaRegistry.registry);
      this.registryBuilt = true;
    }

    const tex = this.dispatch(node as InferProofTree);
    if (node.error) tex.error = node.error;
    tex.id = node.id;
    return tex;
  }

  // ===== registry building: one pass over the whole derivation ===========

  private buildRegistry(node: InferProofTree, parent: InferProofTree | null): void {
    this.gammaRegistry.register(node.gamma, parent?.gamma ?? null);

    for (const premise of node.premises) {
      if (CT_RULES.has(premise.rule)) {
        this.buildRegistry(premise as InferProofTree, node);
      }
    }

    this.registerConstraints(node);
  }

  private registerConstraints(node: InferProofTree): SetRegistration | null {
    if (node.constraints.length === 0) {
      return null;
    }

    const existing = this.constraintsByRef.get(node.constraints);
    if (existing) {
      return existing;
    }

    const covered = new Set<Constraint>();
    const parts: string[] = [];

    for (const premise of node.premises) {
      if (!CT_RULES.has(premise.rule)) {
        continue;
      }

      const premiseConstraints = (premise as InferProofTree).constraints;
      premiseConstraints.forEach((c) => covered.add(c));

      if (premiseConstraints.length === 0) {
        parts.push("\\emptyset");
      } else {
        const reg = this.constraintsByRef.get(premiseConstraints);
        parts.push(reg ? reg.shortTex : LetPolymorphismTexMapper.constraintSetLiteral(premiseConstraints));
      }
    }

    const newOnes = node.constraints.filter((c) => !covered.has(c));
    if (newOnes.length > 0) {
      parts.push(LetPolymorphismTexMapper.constraintSetLiteral(newOnes));
    }

    const index = this.nextConstraintIndex++;
    const key = `C${index}`;
    const shortTex = `C_{${index}}`;
    const recipe = parts.length > 0 ? parts.join(" \\cup ") : "\\emptyset";

    const registration: SetRegistration = {key, shortTex, fullTex: `${shortTex} = ${recipe}`};
    this.constraintsByRef.set(node.constraints, registration);
    this.registry[key] = {shortTex: registration.shortTex, fullTex: registration.fullTex};
    return registration;
  }

  private static constraintSetLiteral(constraints: Constraint[]): string {
    return `\\{ ${constraints.map((c) => `${TexMapper.typeToTex(c.left)} = ${TexMapper.typeToTex(c.right)}`).join(", ")} \\}`;
  }

  private gammaRefFor(node: InferProofTree): SetRegistration | null {
    return this.gammaRegistry.refFor(node.gamma);
  }

  private constraintsRefFor(node: InferProofTree): SetRegistration | null {
    if (node.constraints.length === 0) {
      return null;
    }
    return this.constraintsByRef.get(node.constraints) ?? null;
  }

  // ===== dispatch ==========================================================

  private dispatch(node: InferProofTree): TexTree {
    switch (node.rule) {
      case Rule.CtVar:
      case Rule.CtVarLet:
        return this.visitVar(node);
      case Rule.CtAbs:
      case Rule.CtAbsInf:
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
      case Rule.CtBinOp:
        return this.visitBinOp(node);
      case Rule.CtFix:
        return this.visitChildren(node, "CT-Fix");
      default:
        throw new Error("Unknown constraint-typing rule: " + node.rule);
    }
  }

  private visitVar(node: InferProofTree): TexTree {
    const ruleLabel = node.rule === Rule.CtVarLet ? "CT-VarLet" : "CT-Var";

    if (node.premises.length > 0) {
      return {
        ...this.judgements(node),
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
      ...this.judgements(node),
      rule: ruleLabel,
      children: [this.variableMembershipTex(node)],
    };
  }

  private visitAbs(node: InferProofTree): TexTree {
    const rule = node.rule === Rule.CtAbsInf ? "CT-AbsInf" : "CT-Abs";
    return {
      ...this.judgements(node),
      rule,
      children: node.premises.map((child) => this.visit(child)),
    };
  }

  private visitApp(node: InferProofTree): TexTree {
    return {
      ...this.judgements(node),
      rule: "CT-App",
      children: node.premises.map((child) => this.visit(child)),
    };
  }

  private visitLit(node: InferProofTree): TexTree {
    const value = (node.term as any).value as string;
    const rule = (value === "unit" || value === "Unit") ? "CT-Unit"
      : (value === "true" || value === "True") ? "CT-True"
      : (value === "false" || value === "False") ? "CT-False"
      : "CT-Nv";

    return {
      ...this.judgements(node),
      rule,
      children: [],
    };
  }

  private visitIfCondition(node: InferProofTree): TexTree {
    return {
      ...this.judgements(node),
      rule: "CT-If",
      children: node.premises.map((child) => this.visit(child)),
    };
  }

  private visitInlInr(node: InferProofTree, rule: string): TexTree {
    return {
      ...this.judgements(node),
      rule,
      children: node.premises.map((child) => this.visit(child)),
    };
  }

  private visitChildren(node: InferProofTree, rule: string): TexTree {
    return {
      ...this.judgements(node),
      rule,
      children: node.premises.map((child) => this.visit(child)),
    };
  }

  private visitBinOp(node: InferProofTree): TexTree {
    const operator = (node.term as any).operator;
    return this.visitChildren(node, `CT-${TexMapper.binOpRuleName(operator)}`);
  }

  private visitLet(node: InferProofTree): TexTree {
    const [valueProof, bodyProof] = node.premises;
    const letName = (node.term as any).name as string;

    // The value itself may have failed to type-check (e.g. an occurs-check
    // or unification failure while solving its own constraints) — that
    // error path returns only the value's proof, with no body to
    // generalize into.
    if (!bodyProof) {
      return {
        ...this.judgements(node),
        rule: "CT-Let",
        children: [this.visit(valueProof)],
      };
    }

    return {
      ...this.judgements(node),
      rule: "CT-Let",
      children: [
        this.visit(valueProof),
        this.generalizeTex(valueProof, bodyProof, letName),
        this.visit(bodyProof),
      ],
    };
  }

  // Shows the generalize(T, Γ) = S step that turns the value's solved type
  // into the scheme bound for the body — the dual of instantiate(...) shown
  // at each CT-VarLet use site.
  private generalizeTex(valueProof: ProofTree, bodyProof: ProofTree, letName: string): TexTree {
    const scheme = bodyProof.gamma[letName];
    const schemeTex = scheme !== undefined ? TexMapper.typeToTex(scheme) : TexMapper.typeToTex(valueProof.type);
    const gammaRef = CT_RULES.has(valueProof.rule) ? this.gammaRefFor(valueProof as InferProofTree) : null;
    const gammaTex = gammaRef ? gammaRef.shortTex : "\\Gamma";

    return {
      judgement: `\\mathit{generalize}(${TexMapper.typeToTex(valueProof.type)}, ${gammaTex}) = ${schemeTex}`,
      rule: "",
    };
  }

  private variableMembershipTex(node: InferProofTree): TexTree {
    const variableName = (node.term as any).name;
    const gammaRef = this.gammaRefFor(node);
    const gammaTex = gammaRef ? gammaRef.shortTex : "\\Gamma";

    // CT-VarLet looks up a TypeScheme and instantiates it — show the scheme
    // that was found (∀X.T when generalized) rather than a plain membership
    // fact, matching the lecture's "instantiate(x : scheme ∈ Γ)" notation.
    if (node.rule === Rule.CtVarLet) {
      const scheme = node.gamma[variableName];
      const schemeTex = scheme !== undefined ? TexMapper.typeToTex(scheme) : TexMapper.typeToTex(node.type);
      return {
        judgement: `\\mathit{instantiate}(${variableName} : ${schemeTex} \\in ${gammaTex})`,
        rule: "",
      };
    }

    return {
      judgement: `${variableName} : ${TexMapper.typeToTex(node.type)} \\in ${gammaTex}`,
      rule: "",
    };
  }

  // ===== judgement construction ============================================

  private judgements(node: InferProofTree): Pick<TexTree, "judgement" | "judgementSegments" | "registry"> {
    const gammaRef = this.gammaRefFor(node);
    const constraintsRef = this.constraintsRefFor(node);
    const term = TexMapper.termToTex(node.term);
    const type = TexMapper.typeToTex(node.type);

    const gammaSeg: TexSegment = gammaRef
      ? {kind: "ref", key: gammaRef.key}
      : {kind: "tex", value: "\\emptyset"};
    const constraintsSeg: TexSegment = constraintsRef
      ? {kind: "ref", key: constraintsRef.key}
      : {kind: "tex", value: "\\emptyset"};

    const judgementSegments: TexSegment[] = [
      gammaSeg,
      {kind: "tex", value: ` \\vdash ${term} : ${type} \\mid `},
      constraintsSeg,
    ];

    const gammaTex = gammaRef ? gammaRef.shortTex : "\\emptyset";
    const constraintsTex = constraintsRef ? constraintsRef.shortTex : "\\emptyset";

    return {
      judgement: `${gammaTex} \\vdash ${term} : ${type} \\mid ${constraintsTex}`,
      judgementSegments,
      registry: this.registry,
    };
  }
}
