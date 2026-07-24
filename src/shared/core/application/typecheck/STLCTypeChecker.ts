import {AstVisitor} from "@/shared/core/application/AstVisitor.ts";
import type {
  Abs,
  App,
  Ascribe,
  ASTNode,
  BinOp,
  Case,
  DummyAbstraction,
  Fix,
  GlobalDecl,
  IfCondition,
  Inl,
  Inr, Let,
  Lit,
  Program,
  Record,
  RecordProjection, RecordType,
  Sequencing,
  Tuple,
  TupleProjection, TupleType,
  TyArrow, TyForall, TyIdentifier,
  Type,
  TypeAbs,
  TypeApp,
  Var,
  Variant,
  VariantCase,
} from "@/shared/core/domain/ast";
import {Gamma} from "@/shared/core/application/typecheck/Gamma.ts";
import {isArithmeticOperator, substituteTypeVariable, typeEquals, typeToString} from "@/shared/core/application/typecheck/utils.ts";
import {
  type Constraint,
  ERROR_TYPE,
  type InferProofTree,
  type ProofTree,
  Rule,
  type Substitution,
  type TypeScheme,
} from "@/shared/core/application/typecheck/ProofTree.ts";
import {TypeInferenceEngine} from "@/shared/core/application/typecheck/TypeInferenceEngine.ts";
import {DEFAULT_TYPE_THEORY_CONFIG, type TypeTheoryConfig} from "@/shared/core/domain/typeTheory.ts";

// Whether a variable was bound by an ordinary binder (a lambda parameter,
// monomorphic within its scope) or by `let` (looked up as a TypeScheme and
// freshly instantiated on every use) — purely for labeling the proof tree
// with the matching CT-Var / CT-VarLet rule; it has no effect on the type
// that gets computed.
type VarOrigin = Rule.CtVar | Rule.CtVarLet;

// Single typechecker for the whole language: every rule is written once, in
// constraint-generation/unification style, so that theories compose freely
// (a System F type application inside a `let`-bound value works because
// there's only one traversal — not two visitors blind to each other's node
// kinds). "Plain STLC" isn't a different algorithm here, just this same
// engine with `inferring` false: no metavariables get introduced (an
// unannotated lambda is rejected instead), so unification degenerates to
// ordinary type equality checking, and proof nodes keep their plain (T-*)
// rule labels instead of the constraint (CT-*) ones.
export class SLTLCTypeChecker extends AstVisitor<InferProofTree> {

  private schemeContext: Gamma<TypeScheme> = new Gamma<TypeScheme>();
  private varOrigin: Gamma<VarOrigin> = new Gamma<VarOrigin>();
  private errorBuffer: Error[] = [];
  private globalProofs: Map<string, ProofTree> = new Map();
  private theories: TypeTheoryConfig = DEFAULT_TYPE_THEORY_CONFIG;
  private readonly engine: TypeInferenceEngine = new TypeInferenceEngine();

  // >0 while checking a `let`'s value+body (nesting-safe via a counter, not
  // a boolean, since a `let` can appear inside another `let`'s value). While
  // true — or while the Type inference theory is on — rules use their CT-*
  // label and an unannotated lambda parameter is allowed.
  private polymorphicScope = 0;

  private get inferring(): boolean {
    return this.polymorphicScope > 0 || this.theories.typeInference;
  }

  private ruleFor(plain: Rule, ct: Rule): Rule {
    return this.inferring ? ct : plain;
  }

  public getErrors(): Error[] {
    return this.errorBuffer;
  }

  // Which optional type theories (beyond core STLC, which is always on) the
  // next check() run should honor. Set before checking — a visitLet or
  // visitTypeAbstraction/visitTypeApplication belonging to a disabled theory
  // is rejected as a type error instead of being checked, so switching a
  // theory off shows the user how the very same term stops typechecking.
  public setTheories(theories: TypeTheoryConfig): void {
    this.theories = theories;
  }

  // Public entry point: runs inference over the whole program, then solves
  // whatever constraints are still outstanding once, at the end, and
  // applies the resulting substitution to the whole proof tree. (A nested
  // `let` still solves+generalizes its own value eagerly, via checkLet —
  // this only closes out whatever constraints that process legitimately
  // deferred, e.g. from an App or BinOp outside of any let.)
  public check(program: Program): InferProofTree {
    this.schemeContext = new Gamma<TypeScheme>();
    this.varOrigin = new Gamma<VarOrigin>();
    this.errorBuffer = [];
    this.globalProofs = new Map();
    this.polymorphicScope = 0;
    this.engine.reset();

    const proof = this.visit(program);

    try {
      const substitution = this.engine.solve(proof.constraints);
      return this.engine.applySubstitutionToProof(proof, substitution);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      this.errorBuffer.push(new Error(msg));
      return {...proof, type: ERROR_TYPE, error: msg};
    }
  }

  visit(node: ASTNode): InferProofTree {
    const proof = super.visit(node);
    proof.id = node.id;
    return proof;
  }

  // Extends both the type context and the var-origin tracking with a single
  // binding for the duration of `fn`, then restores both — even if `fn`
  // throws. Handles shadowing (Gamma.add throws on a name already present).
  private withBinding<T>(
    name: string,
    scheme: TypeScheme,
    origin: VarOrigin,
    fn: () => T,
  ): T {
    const previousContext = this.schemeContext;
    const previousVarOrigin = this.varOrigin;

    const childContext = previousContext.copy();
    if (childContext.has(name)) {
      childContext.delete(name);
    }
    childContext.add(name, scheme);

    const childVarOrigin = previousVarOrigin.copy();
    if (childVarOrigin.has(name)) {
      childVarOrigin.delete(name);
    }
    childVarOrigin.add(name, origin);

    this.schemeContext = childContext;
    this.varOrigin = childVarOrigin;

    try {
      return fn();
    } finally {
      this.schemeContext = previousContext;
      this.varOrigin = previousVarOrigin;
    }
  }

  // Builds a leaf error proof and records the message — shared by every
  // "this construct isn't allowed here" gate (disabled theory, missing
  // annotation, ...).
  private reject(term: ASTNode, rule: Rule, msg: string, premises: InferProofTree[] = []): InferProofTree {
    this.errorBuffer.push(new Error(msg));
    return {
      rule,
      term: term as never,
      type: ERROR_TYPE,
      gamma: this.schemeContext.serializeGamma(),
      premises,
      constraints: premises.flatMap((p) => p.constraints),
      error: msg,
    };
  }

  // Solves + applies a proof's own constraints immediately (rather than
  // deferring to the top-level check()) — needed wherever a fully concrete
  // type is required right now: a global declaration's value, compared
  // against its declared type before the next declaration can be checked.
  private solveLocally(proof: InferProofTree): InferProofTree {
    try {
      const substitution = this.engine.solve(proof.constraints);
      return this.engine.applySubstitutionToProof(proof, substitution);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      this.errorBuffer.push(new Error(msg));
      return {...proof, type: ERROR_TYPE, error: msg};
    }
  }

  protected visitProgram(node: Program): InferProofTree {
    node.globals.forEach((g) => this.visit(g));

    if (!node.term) {
      const msg = "No main expression — write a term after your declarations";
      this.errorBuffer.push(new Error(msg));
      return {
        rule: Rule.Var,
        term: {kind: "Var", id: node.id, name: "(empty)"} as never,
        type: ERROR_TYPE,
        gamma: this.schemeContext.serializeGamma(),
        premises: [],
        constraints: [],
        error: msg,
      };
    }

    return this.visit(node.term);
  }

  protected visitTermDecl(node: GlobalDecl): InferProofTree {
    const valueProof = this.solveLocally(this.visit(node.value));

    // Always add the declared type to context so subsequent declarations
    // and the main term can still be type-checked.
    this.schemeContext.add(node.name, {kind: "TypeScheme", vars: [], type: node.type});
    this.globalProofs.set(node.name, valueProof);

    if (!valueProof.error && !typeEquals(valueProof.type, node.type)) {
      const msg = `Declaration "${node.name}": declared type is ${typeToString(node.type)}, but the value has type ${typeToString(valueProof.type)}`;
      this.errorBuffer.push(new Error(msg));
      valueProof.error = msg;
    }

    return {} as InferProofTree;
  }

  protected visitTypeDecl(node: GlobalDecl): InferProofTree {
    this.schemeContext.add(node.name, {kind: "TypeScheme", vars: [], type: node.type});
    return {} as InferProofTree;
  }

  protected visitVar(node: Var): InferProofTree {
    const scheme = this.schemeContext.get(node.name);
    const rule = this.inferring ? (this.varOrigin.get(node.name) ?? Rule.CtVar) : Rule.Var;

    if (!scheme) {
      const contextKeys = Object.keys(this.schemeContext.serializeGamma());
      const contextHint = contextKeys.length > 0
        ? ` (in-scope variables: ${contextKeys.join(", ")})`
        : " (context is empty)";
      const msg = `Variable "${node.name}" is not in scope${contextHint}`;

      return {
        rule,
        term: node,
        type: ERROR_TYPE,
        gamma: this.schemeContext.serializeGamma(),
        premises: [],
        constraints: [],
        error: msg,
      };
    }

    const type = this.engine.instantiate(scheme);

    const proof: InferProofTree = {
      rule,
      term: node,
      type,
      gamma: this.schemeContext.serializeGamma(),
      premises: [],
      constraints: [],
    };

    // Only a name that isn't locally shadowed can still refer to a global
    // declaration — used to show a "jump to definition" premise.
    if (!this.varOrigin.has(node.name)) {
      const definitionProof = this.globalProofs.get(node.name);
      if (definitionProof) {
        proof.premises = [definitionProof];
      }
    }

    return proof;
  }

  protected visitAbs(node: Abs): InferProofTree {
    const outerGamma = this.schemeContext.serializeGamma();

    if (!node.paramType && !this.inferring) {
      return this.reject(
        node,
        Rule.Abs,
        `Lambda parameter "${node.param}" needs a type annotation (λ${node.param}:T. ...) — an unannotated parameter is only allowed inside a let-bound value or when the Type inference theory is enabled`,
      );
    }

    // An omitted annotation (λx.t) gets a fresh metavariable instead of a
    // rigid, given type — this is the one thing that lets `generalize` at
    // the enclosing `let` (or plain unification, under Type inference)
    // find something genuinely free to pin down or quantify over.
    const paramType = node.paramType ?? this.engine.freshTyMetaVar();

    const bodyProof = this.withBinding(
      node.param,
      {kind: "TypeScheme", vars: [], type: paramType},
      Rule.CtVar,
      () => this.visit(node.body),
    );

    const type: TyArrow = {
      kind: "TyArrow",
      id: crypto.randomUUID(),
      from: paramType,
      to: bodyProof.type,
    };

    return {
      rule: this.inferring ? (node.paramType ? Rule.CtAbs : Rule.CtAbsInf) : Rule.Abs,
      term: node,
      type,
      gamma: outerGamma,
      premises: [bodyProof],
      constraints: bodyProof.constraints,
    };
  }

  protected visitApp(node: App): InferProofTree {
    const funcProof = this.visit(node.func);
    const argProof = this.visit(node.arg);

    const resultType = this.engine.freshTyMetaVar();

    const expectedFuncType: TyArrow = {
      kind: "TyArrow",
      id: crypto.randomUUID(),
      from: argProof.type,
      to: resultType,
    };

    const constraints: Constraint[] = [
      ...funcProof.constraints,
      ...argProof.constraints,
      {left: funcProof.type, right: expectedFuncType},
    ];

    return {
      rule: this.ruleFor(Rule.App, Rule.CtApp),
      term: node,
      type: resultType,
      gamma: this.schemeContext.serializeGamma(),
      premises: [funcProof, argProof],
      constraints,
    };
  }

  protected visitLit(node: Lit): InferProofTree {
    const typeName = (node.value === "unit" || node.value === "Unit")
      ? "Unit"
      : (node.value === "true" || node.value === "True" || node.value === "false" || node.value === "False")
        ? "Bool"
        : "Nat";

    const litType: TyIdentifier = {
      kind: "TyIdentifier",
      id: crypto.randomUUID(),
      name: typeName,
    };

    return {
      rule: this.ruleFor(Rule.Lit, Rule.CtLit),
      term: node,
      type: litType,
      gamma: this.schemeContext.serializeGamma(),
      premises: [],
      constraints: [],
    };
  }

  protected visitIfCondition(node: IfCondition): InferProofTree {
    const boolType: TyIdentifier = {kind: "TyIdentifier", id: crypto.randomUUID(), name: "Bool"};
    const unitType: TyIdentifier = {kind: "TyIdentifier", id: crypto.randomUUID(), name: "Unit"};

    const conditionProof = this.visit(node.condition);
    const thenProof = this.visit(node.then);

    const premises: InferProofTree[] = [conditionProof, thenProof];
    const constraints: Constraint[] = [
      ...conditionProof.constraints,
      ...thenProof.constraints,
      {left: conditionProof.type, right: boolType},
    ];

    let resultType: Type = thenProof.type;

    for (const branch of node.elif ?? []) {
      const branchConditionProof = this.visit(branch.condition);
      const branchThenProof = this.visit(branch.then);

      premises.push(branchConditionProof, branchThenProof);
      constraints.push(
        ...branchConditionProof.constraints,
        ...branchThenProof.constraints,
        {left: branchConditionProof.type, right: boolType},
        {left: branchThenProof.type, right: resultType},
      );
    }

    if (node.else) {
      const elseProof = this.visit(node.else);

      premises.push(elseProof);
      constraints.push(
        ...elseProof.constraints,
        {left: elseProof.type, right: resultType},
      );
    } else {
      constraints.push({left: resultType, right: unitType});
      resultType = unitType;
    }

    return {
      rule: this.ruleFor(Rule.If, Rule.CtIf),
      term: node,
      type: resultType,
      gamma: this.schemeContext.serializeGamma(),
      premises,
      constraints,
    };
  }

  protected visitInl(node: Inl): InferProofTree {
    const termProof = this.visit(node.term);
    const ascribedType = node.type;

    if (ascribedType.kind !== "SumType") {
      const msg = `"inl" must be ascribed a sum type (e.g. "inl t as T1+T2"), but got ${typeToString(ascribedType)}`;
      return this.reject(node, this.ruleFor(Rule.Inl, Rule.CtInl), msg, [termProof]);
    }

    return {
      rule: this.ruleFor(Rule.Inl, Rule.CtInl),
      term: node,
      type: ascribedType,
      gamma: this.schemeContext.serializeGamma(),
      premises: [termProof],
      constraints: [...termProof.constraints, {left: termProof.type, right: ascribedType.left}],
    };
  }

  protected visitInr(node: Inr): InferProofTree {
    const termProof = this.visit(node.term);
    const ascribedType = node.type;

    if (ascribedType.kind !== "SumType") {
      const msg = `"inr" must be ascribed a sum type (e.g. "inr t as T1+T2"), but got ${typeToString(ascribedType)}`;
      return this.reject(node, this.ruleFor(Rule.Inr, Rule.CtInr), msg, [termProof]);
    }

    return {
      rule: this.ruleFor(Rule.Inr, Rule.CtInr),
      term: node,
      type: ascribedType,
      gamma: this.schemeContext.serializeGamma(),
      premises: [termProof],
      constraints: [...termProof.constraints, {left: termProof.type, right: ascribedType.right}],
    };
  }

  protected visitCase(node: Case): InferProofTree {
    const scrutineeProof = this.visit(node.variable);

    if (scrutineeProof.type.kind !== "SumType") {
      const msg = `"case" scrutinee must have a sum type, but got ${typeToString(scrutineeProof.type)}`;
      return this.reject(node, this.ruleFor(Rule.Case, Rule.CtCase), msg, [scrutineeProof]);
    }

    const scrutineeType = scrutineeProof.type;

    const inlProof = this.withBinding(
      node.inl.variable,
      {kind: "TypeScheme", vars: [], type: scrutineeType.left},
      Rule.CtVar,
      () => this.visit(node.inl.term),
    );

    const inrProof = this.withBinding(
      node.inr.variable,
      {kind: "TypeScheme", vars: [], type: scrutineeType.right},
      Rule.CtVar,
      () => this.visit(node.inr.term),
    );

    return {
      rule: this.ruleFor(Rule.Case, Rule.CtCase),
      term: node,
      type: inlProof.type,
      gamma: this.schemeContext.serializeGamma(),
      premises: [scrutineeProof, inlProof, inrProof],
      constraints: [
        ...scrutineeProof.constraints,
        ...inlProof.constraints,
        ...inrProof.constraints,
        {left: inlProof.type, right: inrProof.type},
      ],
    };
  }

  protected visitVariantCase(node: VariantCase): InferProofTree {
    const scrutineeProof = this.visit(node.variable);

    if (scrutineeProof.type.kind !== "VariantType") {
      const msg = `"case" scrutinee must have a variant type, but got ${typeToString(scrutineeProof.type)}`;
      return this.reject(node, this.ruleFor(Rule.VariantCase, Rule.CtVariantCase), msg, [scrutineeProof]);
    }

    const scrutineeType = scrutineeProof.type;
    const premises: InferProofTree[] = [scrutineeProof];
    const constraints: Constraint[] = [...scrutineeProof.constraints];
    const errors: string[] = [];
    let resultType: Type | undefined;

    for (const c of node.cases) {
      const field = scrutineeType.variants.find((v) => v.label === c.label);

      if (!field) {
        errors.push(`Label "${c.label}" is not a member of variant type ${typeToString(scrutineeType)}`);
        const branchProof = this.visit(c.body);
        premises.push(branchProof);
        constraints.push(...branchProof.constraints);
        continue;
      }

      const branchProof = this.withBinding(
        c.variable,
        {kind: "TypeScheme", vars: [], type: field.type},
        Rule.CtVar,
        () => this.visit(c.body),
      );
      premises.push(branchProof);
      constraints.push(...branchProof.constraints);

      if (resultType === undefined) {
        resultType = branchProof.type;
      } else {
        constraints.push({left: resultType, right: branchProof.type});
      }
    }

    const proof: InferProofTree = {
      rule: this.ruleFor(Rule.VariantCase, Rule.CtVariantCase),
      term: node,
      type: resultType ?? ERROR_TYPE,
      gamma: this.schemeContext.serializeGamma(),
      premises,
      constraints,
    };

    if (errors.length > 0) {
      const msg = errors.join("; ");
      this.errorBuffer.push(new Error(msg));
      proof.error = msg;
    }

    return proof;
  }

  protected visitVariant(node: Variant): InferProofTree {
    const ascribedType = node.type;
    const errors: string[] = [];

    if (ascribedType.kind !== "VariantType") {
      errors.push(`Variant literal must be ascribed a variant type (e.g. "[l=t] as [l:T, ...]"), but got ${typeToString(ascribedType)}`);
    }

    const constraints: Constraint[] = [];
    const premises: InferProofTree[] = node.variants.map((v) => {
      const termProof = this.visit(v.term);
      constraints.push(...termProof.constraints);

      if (ascribedType.kind === "VariantType") {
        const field = ascribedType.variants.find((f) => f.label === v.label);
        if (!field) {
          errors.push(`Label "${v.label}" is not a member of variant type ${typeToString(ascribedType)}`);
        } else {
          constraints.push({left: termProof.type, right: field.type});
        }
      }

      return termProof;
    });

    const proof: InferProofTree = {
      rule: this.ruleFor(Rule.Variant, Rule.CtVariant),
      term: node,
      type: ascribedType,
      gamma: this.schemeContext.serializeGamma(),
      premises,
      constraints,
    };

    if (errors.length > 0) {
      const msg = errors.join("; ");
      this.errorBuffer.push(new Error(msg));
      proof.error = msg;
    }

    return proof;
  }

  protected visitAscribe(node: Ascribe): InferProofTree {
    const termProof = this.visit(node.term);

    return {
      rule: this.ruleFor(Rule.Ascribe, Rule.CtAscribe),
      term: node,
      type: node.type,
      gamma: this.schemeContext.serializeGamma(),
      premises: [termProof],
      constraints: [...termProof.constraints, {left: termProof.type, right: node.type}],
    };
  }

  protected visitRecordProjection(node: RecordProjection): InferProofTree {
    const recordProof = this.visit(node.term);

    if (recordProof.type.kind !== "RecordType") {
      const msg = `Projection ".${node.label}" requires a record type, but got ${typeToString(recordProof.type)}`;
      return this.reject(node, this.ruleFor(Rule.RecordProjection, Rule.CtRecordProjection), msg, [recordProof]);
    }

    const field = recordProof.type.fields.find((f) => f.label === node.label);
    if (!field) {
      const msg = `Record type ${typeToString(recordProof.type)} has no field "${node.label}"`;
      return this.reject(node, this.ruleFor(Rule.RecordProjection, Rule.CtRecordProjection), msg, [recordProof]);
    }

    return {
      rule: this.ruleFor(Rule.RecordProjection, Rule.CtRecordProjection),
      term: node,
      type: field.type,
      gamma: this.schemeContext.serializeGamma(),
      premises: [recordProof],
      constraints: recordProof.constraints,
    };
  }

  protected visitRecord(node: Record): InferProofTree {
    const fieldProofs = node.fields.map((f) => this.visit(f.term));

    const recordType: RecordType = {
      kind: "RecordType",
      id: crypto.randomUUID(),
      fields: node.fields.map((f, i) => ({label: f.label, type: fieldProofs[i].type})),
    };

    return {
      rule: this.ruleFor(Rule.Record, Rule.CtRecord),
      term: node,
      type: recordType,
      gamma: this.schemeContext.serializeGamma(),
      premises: fieldProofs,
      constraints: fieldProofs.flatMap((p) => p.constraints),
    };
  }

  protected visitTuple(node: Tuple): InferProofTree {
    const elementProofs = node.elements.map((el) => this.visit(el));

    const tupleType: TupleType = {
      kind: "TupleType",
      id: crypto.randomUUID(),
      elements: elementProofs.map((p) => p.type),
    };

    return {
      rule: this.ruleFor(Rule.Tuple, Rule.CtTuple),
      term: node,
      type: tupleType,
      gamma: this.schemeContext.serializeGamma(),
      premises: elementProofs,
      constraints: elementProofs.flatMap((p) => p.constraints),
    };
  }

  protected visitTupleProjection(node: TupleProjection): InferProofTree {
    const tupleProof = this.visit(node.tuple);

    if (tupleProof.type.kind !== "TupleType") {
      const msg = `Projection ".${node.index}" requires a tuple type, but got ${typeToString(tupleProof.type)}`;
      return this.reject(node, this.ruleFor(Rule.TupleProjection, Rule.CtTupleProjection), msg, [tupleProof]);
    }

    if (node.index < 1 || node.index > tupleProof.type.elements.length) {
      const msg = `Tuple index ${node.index} is out of bounds for ${typeToString(tupleProof.type)} (valid range: 1..${tupleProof.type.elements.length})`;
      return this.reject(node, this.ruleFor(Rule.TupleProjection, Rule.CtTupleProjection), msg, [tupleProof]);
    }

    return {
      rule: this.ruleFor(Rule.TupleProjection, Rule.CtTupleProjection),
      term: node,
      type: tupleProof.type.elements[node.index - 1],
      gamma: this.schemeContext.serializeGamma(),
      premises: [tupleProof],
      constraints: tupleProof.constraints,
    };
  }

  protected visitSequencing(node: Sequencing): InferProofTree {
    const unitType: TyIdentifier = {kind: "TyIdentifier", id: crypto.randomUUID(), name: "Unit"};

    const firstProof = this.visit(node.first);
    const secondProof = this.visit(node.second);

    return {
      rule: this.ruleFor(Rule.Sequencing, Rule.CtSequencing),
      term: node,
      type: secondProof.type,
      gamma: this.schemeContext.serializeGamma(),
      premises: [firstProof, secondProof],
      constraints: [
        ...firstProof.constraints,
        ...secondProof.constraints,
        {left: firstProof.type, right: unitType},
      ],
    };
  }

  protected visitDummyAbstraction(node: DummyAbstraction): InferProofTree {
    const bodyProof = this.visit(node.body);

    const type: TyArrow = {
      kind: "TyArrow",
      id: crypto.randomUUID(),
      from: node.paramType,
      to: bodyProof.type,
    };

    return {
      rule: this.ruleFor(Rule.DummyAbs, Rule.CtDummyAbs),
      term: node,
      type,
      gamma: this.schemeContext.serializeGamma(),
      premises: [bodyProof],
      constraints: bodyProof.constraints,
    };
  }

  protected visitBinOp(node: BinOp): InferProofTree {
    const natType: TyIdentifier = {kind: "TyIdentifier", id: crypto.randomUUID(), name: "Nat"};
    const boolType: TyIdentifier = {kind: "TyIdentifier", id: crypto.randomUUID(), name: "Bool"};

    const leftProof = this.visit(node.left);
    const rightProof = this.visit(node.right);

    return {
      rule: this.ruleFor(Rule.BinOp, Rule.CtBinOp),
      term: node,
      type: isArithmeticOperator(node.operator) ? natType : boolType,
      gamma: this.schemeContext.serializeGamma(),
      premises: [leftProof, rightProof],
      constraints: [
        ...leftProof.constraints,
        ...rightProof.constraints,
        {left: leftProof.type, right: natType},
        {left: rightProof.type, right: natType},
      ],
    };
  }

  protected visitFix(node: Fix): InferProofTree {
    const termProof = this.visit(node.term);
    const resultType = this.engine.freshTyMetaVar();
    const expectedType: TyArrow = {
      kind: "TyArrow",
      id: crypto.randomUUID(),
      from: resultType,
      to: resultType,
    };

    return {
      rule: this.ruleFor(Rule.Fix, Rule.CtFix),
      term: node,
      type: resultType,
      gamma: this.schemeContext.serializeGamma(),
      premises: [termProof],
      constraints: [...termProof.constraints, {left: termProof.type, right: expectedType}],
    };
  }

  protected visitLet(node: Let): InferProofTree {
    if (!this.theories.letPolymorphism) {
      return this.reject(node, Rule.Let, `"let" is not part of plain STLC — enable the Let-polymorphism theory to use it`);
    }

    this.polymorphicScope++;
    try {
      return this.checkLet(node);
    } finally {
      this.polymorphicScope--;
    }
  }

  private checkLet(node: Let): InferProofTree {
    // 1. Infer the bound value's type.
    const valueProof = this.visit(node.value);

    let valueSubstitution: Substitution;

    // 2. Solve only the constraints from the value — it must be fully
    // resolved before we generalize, otherwise metavariables that are
    // actually pinned down later would incorrectly look "free".
    try {
      valueSubstitution = this.engine.solve(valueProof.constraints);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      this.errorBuffer.push(new Error(msg));

      return {
        rule: Rule.CtLet,
        term: node,
        type: ERROR_TYPE,
        gamma: this.schemeContext.serializeGamma(),
        premises: [valueProof],
        constraints: [],
        error: msg,
      };
    }

    // 3. Apply the substitution to the inferred value type.
    const solvedValueType = this.engine.applySubstitution(
      valueProof.type,
      valueSubstitution,
    );

    // 4. Apply the substitution to the ambient context too — metavariables
    // from enclosing scopes may have been resolved while checking the value.
    this.schemeContext = this.engine.applySubstitutionToContext(
      this.schemeContext,
      valueSubstitution,
    );

    // 5. Generalize the solved value type over whatever metavariables are
    // free in it but not in the (substituted) surrounding context.
    const generalizedScheme = this.engine.generalize(
      solvedValueType,
      this.schemeContext,
    );

    // 6. Infer the body under the extended context, then drop the binding.
    const bodyProof = this.withBinding(
      node.name,
      generalizedScheme,
      Rule.CtVarLet,
      () => this.visit(node.body),
    );

    // 7. Return the body's type and its (still unsolved) constraints — the
    // enclosing check() (or an outer `let`) solves those.
    return {
      rule: Rule.CtLet,
      term: node,
      type: bodyProof.type,
      gamma: this.schemeContext.serializeGamma(),
      premises: [
        this.engine.applySubstitutionToProof(
          valueProof,
          valueSubstitution,
        ),
        bodyProof,
      ],
      constraints: bodyProof.constraints,
    };
  }

  // =====================================================================
  // =                        SYSTEM F                                   =
  // =====================================================================

  protected visitTypeAbstraction(node: TypeAbs): InferProofTree {
    if (!this.theories.systemF) {
      return this.reject(node, Rule.TypeAbs, `"Λ" type abstraction is not part of plain STLC — enable the System F theory to use it`);
    }

    const bodyProof = this.visit(node.body);

    const type: TyForall = {
      kind: "TyForall",
      id: crypto.randomUUID(),
      typeVariable: node.typeParam,
      type: bodyProof.type,
    };

    return {
      rule: Rule.TypeAbs,
      term: node,
      type,
      gamma: this.schemeContext.serializeGamma(),
      premises: [bodyProof],
      constraints: bodyProof.constraints,
    };
  }

  protected visitTypeApplication(node: TypeApp): InferProofTree {
    if (!this.theories.systemF) {
      return this.reject(node, Rule.TypeApp, `"[T]" type application is not part of plain STLC — enable the System F theory to use it`);
    }

    const termProof = this.visit(node.term);

    if (termProof.type.kind !== "TyForall") {
      const msg = `Type application expects a universal type (∀X. T), but got ${typeToString(termProof.type)}`;
      return this.reject(node, Rule.TypeApp, msg, [termProof]);
    }

    const instantiated = substituteTypeVariable(
      termProof.type.type,
      termProof.type.typeVariable,
      node.typeArg,
    );

    return {
      rule: Rule.TypeApp,
      term: node,
      type: instantiated,
      gamma: this.schemeContext.serializeGamma(),
      premises: [termProof],
      constraints: termProof.constraints,
    };
  }

  // =====================================================================

  protected visitType(node: Type): InferProofTree {
    return {
      rule: "Type" as never,
      term: node as never,
      type: node,
      gamma: this.schemeContext.serializeGamma(),
      premises: [],
      constraints: [],
    };
  }

}
