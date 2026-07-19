import {
  type Constraint,
  ERROR_TYPE,
  type InferProofTree, type ProofTree, Rule, type Substitution, type TypeScheme,
} from "@/shared/core/application/typecheck/ProofTree.ts";
import type {
  Abs,
  App,
  Ascribe,
  ASTNode,
  Case,
  DummyAbstraction, GlobalDecl,
  IfCondition,
  Inl,
  Inr, Let,
  Lit, Program,
  Record,
  RecordProjection, RecordType, Sequencing, Tuple, TupleProjection, TupleType, TyArrow, TyVar, Type, Var, Variant, VariantCase
} from "@/shared/core/domain/ast";
import {AstVisitor} from "@/shared/core/application/AstVisitor.ts";
import {Gamma} from "@/shared/core/application/typecheck/Gamma.ts";
import {TypeInferenceEngine} from "@/shared/core/application/typecheck/TypeInferenceEngine.ts";
import {typeToString} from "@/shared/core/application/typecheck/utils.ts";

// Whether a variable was bound by an ordinary binder (a lambda parameter,
// monomorphic within its scope) or by `let` (looked up as a TypeScheme and
// freshly instantiated on every use) — purely for labeling the proof tree
// with the matching CT-Var / CT-VarLet rule; it has no effect on the type
// that gets computed.
type VarOrigin = Rule.CtVar | Rule.CtVarLet;

export class LetPolymorphismInferenceVisitor extends AstVisitor<InferProofTree> {

  private schemeContext: Gamma<TypeScheme> = new Gamma<TypeScheme>();
  private varOrigin: Gamma<VarOrigin> = new Gamma<VarOrigin>();
  private errorBuffer: Error[] = [];
  private globalProofs: Map<string, ProofTree> = new Map();
  private readonly engine: TypeInferenceEngine = new TypeInferenceEngine();


  constructor(context: Gamma<Type>, errorBuffer: Error[], globalProofs: Map<string, ProofTree>) {
    super();
    this.schemeContext = this.engine.toSchemeGamma(context);
    this.errorBuffer = errorBuffer;
    this.globalProofs = globalProofs;
  }

  // Matches STLCTypeChecker.visit()'s override — every returned proof node
  // needs the originating term's id (used e.g. to key UI state per node).
  override visit(node: ASTNode): InferProofTree {
    const proof = super.visit(node);
    proof.id = node.id;
    return proof;
  }

  public check(node: Let): InferProofTree {
    const proof = this.visit(node);

    try {
      const substitution = this.engine.solve(proof.constraints);

      return this.engine.applySubstitutionToProof(
        proof,
        substitution,
      );
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      this.errorBuffer.push(new Error(msg));

      return {
        ...proof,
        type: ERROR_TYPE,
        error: msg,
      };
    }
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

  protected visitVar(node: Var): InferProofTree {
    const scheme = this.schemeContext.get(node.name);
    const rule = this.varOrigin.get(node.name) ?? Rule.CtVar;

    if (!scheme) {
      const msg = `Variable "${node.name}" is not in scope`;
      this.errorBuffer.push(new Error(msg));

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

    // Only a name that isn't locally shadowed (by an Abs/Let inside this
    // visitor's own traversal) can still refer to a global declaration —
    // mirrors STLCTypeChecker.visitVar's "jump to definition" premise.
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

    const bodyProof = this.withBinding(
      node.param,
      {kind: "TypeScheme", vars: [], type: node.paramType},
      Rule.CtVar,
      () => this.visit(node.body),
    );

    const type: TyArrow = {
      kind: "TyArrow",
      id: crypto.randomUUID(),
      from: node.paramType,
      to: bodyProof.type,
    };

    return {
      rule: Rule.CtAbs,
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
      rule: Rule.CtApp,
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

    const litType: TyVar = {
      kind: "TyVar",
      id: crypto.randomUUID(),
      name: typeName,
    };

    return {
      rule: Rule.CtLit,
      term: node,
      type: litType,
      gamma: this.schemeContext.serializeGamma(),
      premises: [],
      constraints: [],
    };
  }

  protected visitVariantCase(node: VariantCase): InferProofTree {
    const scrutineeProof = this.visit(node.variable);

    if (scrutineeProof.type.kind !== "VariantType") {
      const msg = `"case" scrutinee must have a variant type, but got ${typeToString(scrutineeProof.type)}`;
      this.errorBuffer.push(new Error(msg));

      return {
        rule: Rule.CtVariantCase,
        term: node,
        type: ERROR_TYPE,
        gamma: this.schemeContext.serializeGamma(),
        premises: [scrutineeProof],
        constraints: scrutineeProof.constraints,
        error: msg,
      };
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
      rule: Rule.CtVariantCase,
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

  protected visitInl(node: Inl): InferProofTree {
    const termProof = this.visit(node.term);
    const ascribedType = node.type;

    if (ascribedType.kind !== "SumType") {
      const msg = `"inl" must be ascribed a sum type (e.g. "inl t as T1+T2"), but got ${typeToString(ascribedType)}`;
      this.errorBuffer.push(new Error(msg));

      return {
        rule: Rule.CtInl,
        term: node,
        type: ERROR_TYPE,
        gamma: this.schemeContext.serializeGamma(),
        premises: [termProof],
        constraints: termProof.constraints,
        error: msg,
      };
    }

    return {
      rule: Rule.CtInl,
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
      this.errorBuffer.push(new Error(msg));

      return {
        rule: Rule.CtInr,
        term: node,
        type: ERROR_TYPE,
        gamma: this.schemeContext.serializeGamma(),
        premises: [termProof],
        constraints: termProof.constraints,
        error: msg,
      };
    }

    return {
      rule: Rule.CtInr,
      term: node,
      type: ascribedType,
      gamma: this.schemeContext.serializeGamma(),
      premises: [termProof],
      constraints: [...termProof.constraints, {left: termProof.type, right: ascribedType.right}],
    };
  }

  protected visitIfCondition(node: IfCondition): InferProofTree {
    const boolType: TyVar = {kind: "TyVar", id: crypto.randomUUID(), name: "Bool"};
    const unitType: TyVar = {kind: "TyVar", id: crypto.randomUUID(), name: "Unit"};

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
      rule: Rule.CtIf,
      term: node,
      type: resultType,
      gamma: this.schemeContext.serializeGamma(),
      premises,
      constraints,
    };
  }

  protected visitCase(node: Case): InferProofTree {
    const scrutineeProof = this.visit(node.variable);

    if (scrutineeProof.type.kind !== "SumType") {
      const msg = `"case" scrutinee must have a sum type, but got ${typeToString(scrutineeProof.type)}`;
      this.errorBuffer.push(new Error(msg));

      return {
        rule: Rule.CtCase,
        term: node,
        type: ERROR_TYPE,
        gamma: this.schemeContext.serializeGamma(),
        premises: [scrutineeProof],
        constraints: scrutineeProof.constraints,
        error: msg,
      };
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
      rule: Rule.CtCase,
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
      rule: Rule.CtVariant,
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
      rule: Rule.CtAscribe,
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
      this.errorBuffer.push(new Error(msg));

      return {
        rule: Rule.CtRecordProjection,
        term: node,
        type: ERROR_TYPE,
        gamma: this.schemeContext.serializeGamma(),
        premises: [recordProof],
        constraints: recordProof.constraints,
        error: msg,
      };
    }

    const field = recordProof.type.fields.find((f) => f.label === node.label);
    if (!field) {
      const msg = `Record type ${typeToString(recordProof.type)} has no field "${node.label}"`;
      this.errorBuffer.push(new Error(msg));

      return {
        rule: Rule.CtRecordProjection,
        term: node,
        type: ERROR_TYPE,
        gamma: this.schemeContext.serializeGamma(),
        premises: [recordProof],
        constraints: recordProof.constraints,
        error: msg,
      };
    }

    return {
      rule: Rule.CtRecordProjection,
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
      rule: Rule.CtRecord,
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
      rule: Rule.CtTuple,
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
      this.errorBuffer.push(new Error(msg));

      return {
        rule: Rule.CtTupleProjection,
        term: node,
        type: ERROR_TYPE,
        gamma: this.schemeContext.serializeGamma(),
        premises: [tupleProof],
        constraints: tupleProof.constraints,
        error: msg,
      };
    }

    if (node.index < 1 || node.index > tupleProof.type.elements.length) {
      const msg = `Tuple index ${node.index} is out of bounds for ${typeToString(tupleProof.type)} (valid range: 1..${tupleProof.type.elements.length})`;
      this.errorBuffer.push(new Error(msg));

      return {
        rule: Rule.CtTupleProjection,
        term: node,
        type: ERROR_TYPE,
        gamma: this.schemeContext.serializeGamma(),
        premises: [tupleProof],
        constraints: tupleProof.constraints,
        error: msg,
      };
    }

    return {
      rule: Rule.CtTupleProjection,
      term: node,
      type: tupleProof.type.elements[node.index - 1],
      gamma: this.schemeContext.serializeGamma(),
      premises: [tupleProof],
      constraints: tupleProof.constraints,
    };
  }

  protected visitSequencing(node: Sequencing): InferProofTree {
    const unitType: TyVar = {kind: "TyVar", id: crypto.randomUUID(), name: "Unit"};

    const firstProof = this.visit(node.first);
    const secondProof = this.visit(node.second);

    return {
      rule: Rule.CtSequencing,
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
      rule: Rule.CtDummyAbs,
      term: node,
      type,
      gamma: this.schemeContext.serializeGamma(),
      premises: [bodyProof],
      constraints: bodyProof.constraints,
    };
  }

  protected visitLet(node: Let): InferProofTree {
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
    // enclosing `check()` (or an outer `let`) solves those.
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

  // Unreachable: this visitor only ever runs over a `Let` node's value/body
  // subtree (see `check`), which is always a `Term` — declarations, the
  // top-level `Program`, and bare `Type` nodes never occur inside it.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected visitTermDecl(_node: GlobalDecl): InferProofTree {
    throw new Error("GlobalDecl cannot appear inside a let expression");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected visitTypeDecl(_node: GlobalDecl): InferProofTree {
    throw new Error("GlobalDecl cannot appear inside a let expression");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected visitProgram(_node: Program): InferProofTree {
    throw new Error("Program cannot appear inside a let expression");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected visitType(_node: Type): InferProofTree {
    throw new Error("A bare Type node cannot appear inside a let expression");
  }

}
