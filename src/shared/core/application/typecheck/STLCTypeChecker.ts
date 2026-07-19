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
  RecordProjection,
  RecordType,
  Sequencing,
  Tuple,
  TupleProjection,
  TupleType,
  TyArrow,
  Type,
  TyVar,
  Var,
  Variant,
  VariantCase,
} from "@/shared/core/domain/ast";
import {Gamma} from "@/shared/core/application/typecheck/Gamma.ts";
import {isArithmeticOperator, typeEquals, typeToString} from "@/shared/core/application/typecheck/utils.ts";
import {ERROR_TYPE, type ProofTree, Rule} from "@/shared/core/application/typecheck/ProofTree.ts";
import {LetPolymorphismInferenceVisitor} from "@/shared/core/application/typecheck/LetPolymorphismInferenceVisitor.ts";

export class SLTLCTypeChecker extends AstVisitor<ProofTree> {

  private context: Gamma<Type> = new Gamma<Type>();
  private errorBuffer: Error[] = [];
  private globalProofs: Map<string, ProofTree> = new Map();

  public getErrors(): Error[] {
    return this.errorBuffer;
  }

  // Binds `name` for the duration of `fn`, then restores whatever was there
  // before (or removes the binding entirely if there was nothing) — even if
  // `fn` throws. Needed because Gamma.add throws on a name already present,
  // so a lambda/case parameter shadowing an outer binding of the same name
  // would otherwise crash instead of shadowing it.
  private withBinding<T>(name: string, type: Type, fn: () => T): T {
    const hadPrevious = this.context.has(name);
    const previous = hadPrevious ? this.context.get(name) : undefined;

    if (hadPrevious) {
      this.context.delete(name);
    }
    this.context.add(name, type);

    try {
      return fn();
    } finally {
      this.context.delete(name);
      if (hadPrevious) {
        this.context.add(name, previous!);
      }
    }
  }

  visit(node: ASTNode): ProofTree {
    const proof = super.visit(node);
    proof.id = node.id;
    return proof;
  }

  protected visitProgram(node: Program): ProofTree {
    this.context.clear();
    this.errorBuffer = [];
    this.globalProofs = new Map();
    node.globals.forEach((g) => this.visit(g));

    if (!node.term) {
      const msg = "No main expression — write a term after your declarations";
      this.errorBuffer.push(new Error(msg));
      return {
        rule: Rule.Var,
        term: { kind: "Var", id: node.id, name: "(empty)" } as any,
        type: ERROR_TYPE,
        gamma: this.context.serializeGamma(),
        premises: [],
        error: msg,
      };
    }

    return this.visit(node.term);
  }

  protected visitAbs(node: Abs): ProofTree {
    if (!node.paramType) {
      const msg = `Lambda parameter "${node.param}" needs a type annotation (λ${node.param}:T. ...) — an unannotated parameter is only allowed inside a let-bound value, where its type can be inferred`;
      this.errorBuffer.push(new Error(msg));

      return {
        rule: Rule.Abs,
        term: node,
        type: ERROR_TYPE,
        gamma: this.context.serializeGamma(),
        premises: [],
        error: msg,
      };
    }

    const bodyProof: ProofTree = this.withBinding(
      node.param,
      node.paramType,
      () => this.visit(node.body),
    );

    const abstractionType: TyArrow = {
      kind: "TyArrow",
      id: crypto.randomUUID(),
      from: node.paramType,
      to: bodyProof.type,
    };

    return {
      rule: Rule.Abs,
      term: node,
      type: abstractionType,
      gamma: this.context.serializeGamma(),
      premises: [bodyProof],
    };
  }

  protected visitApp(node: App): ProofTree {
    const funcProof: ProofTree = this.visit(node.func);
    const argProof: ProofTree = this.visit(node.arg);

    const returnProof: ProofTree = {
      rule: Rule.App,
      term: node,
      type: ERROR_TYPE,
      gamma: this.context.serializeGamma(),
      premises: [funcProof, argProof],
    };

    if (funcProof.type.kind !== "TyArrow") {
      const msg = `Cannot apply a non-function — the left-hand side has type ${typeToString(funcProof.type)}, which is not a function type`;
      this.errorBuffer.push(new Error(msg));
      returnProof.error = msg;
      return returnProof;
    }

    const funcType = funcProof.type as TyArrow;
    returnProof.type = funcType.to;

    if (!typeEquals(funcType.from, argProof.type)) {
      const msg = `Argument type mismatch — function expects ${typeToString(funcType.from)}, but got ${typeToString(argProof.type)}`;
      this.errorBuffer.push(new Error(msg));
      returnProof.error = msg;
    }

    return returnProof;
  }

  protected visitTermDecl(node: GlobalDecl): ProofTree {
    const valueProof: ProofTree = this.visit(node.value);

    // Always add the declared type to context so subsequent declarations
    // and the main term can still be type-checked.
    this.context.add(node.name, node.type);
    this.globalProofs.set(node.name, valueProof);

    if (!typeEquals(valueProof.type, node.type)) {
      const msg = `Declaration "${node.name}": declared type is ${typeToString(node.type)}, but the value has type ${typeToString(valueProof.type)}`;
      this.errorBuffer.push(new Error(msg));
      // Attach the error to the value proof so it surfaces in a T-Def expansion.
      valueProof.error = (valueProof.error ? valueProof.error + "; " : "") + msg;
    }

    return {} as ProofTree;
  }

  protected visitTypeDecl(node: GlobalDecl): ProofTree {
    this.context.add(node.name, node.type);
    return {} as ProofTree;
  }

  protected visitVar(node: Var): ProofTree {
    const varType = this.context.get(node.name);

    const returnProof: ProofTree = {
      rule: Rule.Var,
      term: node,
      type: ERROR_TYPE,
      gamma: this.context.serializeGamma(),
      premises: [],
    };

    if (!varType) {
      const contextKeys = Object.keys(this.context.serializeGamma());
      const contextHint = contextKeys.length > 0
        ? ` (in-scope variables: ${contextKeys.join(", ")})`
        : " (context is empty)";
      const msg = `Variable "${node.name}" is not in scope${contextHint}`;
      returnProof.error = msg;
      this.errorBuffer.push(new Error(msg));
      return returnProof;
    }

    returnProof.type = varType;

    const definitionProof = this.globalProofs.get(node.name);
    if (definitionProof) {
      returnProof.premises = [definitionProof];
    }

    return returnProof;
  }

  protected visitLit(node: Lit): ProofTree {
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
      rule: Rule.Lit,
      term: node,
      type: litType,
      gamma: this.context.serializeGamma(),
      premises: [],
    };
  }

  protected visitIfCondition(node: IfCondition): ProofTree {
    const boolType: TyVar = {kind: "TyVar", id: "bool-sentinel", name: "Bool"};
    const unitType: TyVar = {kind: "TyVar", id: "unit-sentinel", name: "Unit"};

    const conditionProof = this.visit(node.condition);
    const thenProof = this.visit(node.then);
    const premises: ProofTree[] = [conditionProof, thenProof];
    const errors: string[] = [];

    if (!typeEquals(conditionProof.type, boolType)) {
      errors.push(`"if" condition must have type Bool, but got ${typeToString(conditionProof.type)}`);
    }

    let resultType = thenProof.type;

    for (const branch of node.elif ?? []) {
      const branchConditionProof = this.visit(branch.condition);
      const branchThenProof = this.visit(branch.then);
      premises.push(branchConditionProof, branchThenProof);

      if (!typeEquals(branchConditionProof.type, boolType)) {
        errors.push(`"elseif" condition must have type Bool, but got ${typeToString(branchConditionProof.type)}`);
      }
      if (!typeEquals(branchThenProof.type, resultType)) {
        errors.push(`"elseif" branch has type ${typeToString(branchThenProof.type)}, expected ${typeToString(resultType)}`);
      }
    }

    if (node.else) {
      const elseProof = this.visit(node.else);
      premises.push(elseProof);
      if (!typeEquals(elseProof.type, resultType)) {
        errors.push(`"else" branch has type ${typeToString(elseProof.type)}, expected ${typeToString(resultType)}`);
      }
    } else if (!typeEquals(resultType, unitType)) {
      errors.push(`"if" without "else" must have branches of type Unit, but got ${typeToString(resultType)}`);
      resultType = unitType;
    }

    const returnProof: ProofTree = {
      rule: Rule.If,
      term: node,
      type: resultType,
      gamma: this.context.serializeGamma(),
      premises,
    };

    if (errors.length > 0) {
      const msg = errors.join("; ");
      this.errorBuffer.push(new Error(msg));
      returnProof.error = msg;
    }

    return returnProof;
  }

  protected visitInl(node: Inl): ProofTree {
    const termProof = this.visit(node.term);
    const ascribedType = node.type;

    const returnProof: ProofTree = {
      rule: Rule.Inl,
      term: node,
      type: ascribedType,
      gamma: this.context.serializeGamma(),
      premises: [termProof],
    };

    if (ascribedType.kind !== "SumType") {
      const msg = `"inl" must be ascribed a sum type (e.g. "inl t as T1+T2"), but got ${typeToString(ascribedType)}`;
      this.errorBuffer.push(new Error(msg));
      returnProof.error = msg;
      return returnProof;
    }

    if (!typeEquals(termProof.type, ascribedType.left)) {
      const msg = `"inl" expects a term of type ${typeToString(ascribedType.left)} (the left side of ${typeToString(ascribedType)}), but got ${typeToString(termProof.type)}`;
      this.errorBuffer.push(new Error(msg));
      returnProof.error = msg;
    }

    return returnProof;
  }

  protected visitInr(node: Inr): ProofTree {
    const termProof = this.visit(node.term);
    const ascribedType = node.type;

    const returnProof: ProofTree = {
      rule: Rule.Inr,
      term: node,
      type: ascribedType,
      gamma: this.context.serializeGamma(),
      premises: [termProof],
    };

    if (ascribedType.kind !== "SumType") {
      const msg = `"inr" must be ascribed a sum type (e.g. "inr t as T1+T2"), but got ${typeToString(ascribedType)}`;
      this.errorBuffer.push(new Error(msg));
      returnProof.error = msg;
      return returnProof;
    }

    if (!typeEquals(termProof.type, ascribedType.right)) {
      const msg = `"inr" expects a term of type ${typeToString(ascribedType.right)} (the right side of ${typeToString(ascribedType)}), but got ${typeToString(termProof.type)}`;
      this.errorBuffer.push(new Error(msg));
      returnProof.error = msg;
    }

    return returnProof;
  }

  protected visitCase(node: Case): ProofTree {
    const scrutineeProof = this.visit(node.variable);
    const scrutineeType = scrutineeProof.type;

    const returnProof: ProofTree = {
      rule: Rule.Case,
      term: node,
      type: ERROR_TYPE,
      gamma: this.context.serializeGamma(),
      premises: [scrutineeProof],
    };

    if (scrutineeType.kind !== "SumType") {
      const msg = `"case" scrutinee must have a sum type, but got ${typeToString(scrutineeType)}`;
      this.errorBuffer.push(new Error(msg));
      returnProof.error = msg;
      return returnProof;
    }

    const inlProof = this.withBinding(
      node.inl.variable,
      scrutineeType.left,
      () => this.visit(node.inl.term),
    );

    const inrProof = this.withBinding(
      node.inr.variable,
      scrutineeType.right,
      () => this.visit(node.inr.term),
    );

    returnProof.premises = [scrutineeProof, inlProof, inrProof];
    returnProof.type = inlProof.type;

    if (!typeEquals(inlProof.type, inrProof.type)) {
      const msg = `"case" branches must have the same type — the "inl" branch has type ${typeToString(inlProof.type)}, the "inr" branch has type ${typeToString(inrProof.type)}`;
      this.errorBuffer.push(new Error(msg));
      returnProof.error = msg;
    }

    return returnProof;
  }

  protected visitVariantCase(node: VariantCase): ProofTree {
    const scrutineeProof = this.visit(node.variable);
    const scrutineeType = scrutineeProof.type;

    const returnProof: ProofTree = {
      rule: Rule.VariantCase,
      term: node,
      type: ERROR_TYPE,
      gamma: this.context.serializeGamma(),
      premises: [scrutineeProof],
    };

    if (scrutineeType.kind !== "VariantType") {
      const msg = `"case" scrutinee must have a variant type, but got ${typeToString(scrutineeType)}`;
      this.errorBuffer.push(new Error(msg));
      returnProof.error = msg;
      return returnProof;
    }

    const premises: ProofTree[] = [scrutineeProof];
    const errors: string[] = [];
    let resultType: Type | undefined;

    for (const c of node.cases) {
      const field = scrutineeType.variants.find((v) => v.label === c.label);

      if (!field) {
        errors.push(`Label "${c.label}" is not a member of variant type ${typeToString(scrutineeType)}`);
        premises.push(this.visit(c.body));
        continue;
      }

      const branchProof = this.withBinding(
        c.variable,
        field.type,
        () => this.visit(c.body),
      );
      premises.push(branchProof);

      if (resultType === undefined) {
        resultType = branchProof.type;
      } else if (!typeEquals(resultType, branchProof.type)) {
        errors.push(`Case branch "${c.label}" has type ${typeToString(branchProof.type)}, expected ${typeToString(resultType)}`);
      }
    }

    returnProof.premises = premises;
    returnProof.type = resultType ?? ERROR_TYPE;

    if (errors.length > 0) {
      const msg = errors.join("; ");
      this.errorBuffer.push(new Error(msg));
      returnProof.error = msg;
    }

    return returnProof;
  }

  protected visitVariant(node: Variant): ProofTree {
    const ascribedType = node.type;
    const errors: string[] = [];

    if (ascribedType.kind !== "VariantType") {
      errors.push(`Variant literal must be ascribed a variant type (e.g. "[l=t] as [l:T, ...]"), but got ${typeToString(ascribedType)}`);
    }

    const premises: ProofTree[] = node.variants.map((v) => {
      const termProof = this.visit(v.term);

      if (ascribedType.kind === "VariantType") {
        const field = ascribedType.variants.find((f) => f.label === v.label);
        if (!field) {
          errors.push(`Label "${v.label}" is not a member of variant type ${typeToString(ascribedType)}`);
        } else if (!typeEquals(termProof.type, field.type)) {
          errors.push(`Field "${v.label}" has type ${typeToString(termProof.type)}, expected ${typeToString(field.type)}`);
        }
      }

      return termProof;
    });

    const returnProof: ProofTree = {
      rule: Rule.Variant,
      term: node,
      type: ascribedType,
      gamma: this.context.serializeGamma(),
      premises,
    };

    if (errors.length > 0) {
      const msg = errors.join("; ");
      this.errorBuffer.push(new Error(msg));
      returnProof.error = msg;
    }

    return returnProof;
  }

  protected visitAscribe(node: Ascribe): ProofTree {
    const termProof = this.visit(node.term);

    const returnProof: ProofTree = {
      rule: Rule.Ascribe,
      term: node,
      type: node.type,
      gamma: this.context.serializeGamma(),
      premises: [termProof],
    };

    if (!typeEquals(termProof.type, node.type)) {
      const msg = `Ascription mismatch — term has type ${typeToString(termProof.type)}, but was ascribed ${typeToString(node.type)}`;
      this.errorBuffer.push(new Error(msg));
      returnProof.error = msg;
    }

    return returnProof;
  }

  protected visitTuple(node: Tuple): ProofTree {
    const elementProofs = node.elements.map((el) => this.visit(el));

    const tupleType: TupleType = {
      kind: "TupleType",
      id: crypto.randomUUID(),
      elements: elementProofs.map((p) => p.type),
    };

    return {
      rule: Rule.Tuple,
      term: node,
      type: tupleType,
      gamma: this.context.serializeGamma(),
      premises: elementProofs,
    };
  }

  protected visitTupleProjection(node: TupleProjection): ProofTree {
    const tupleProof = this.visit(node.tuple);
    const tupleType = tupleProof.type;

    const returnProof: ProofTree = {
      rule: Rule.TupleProjection,
      term: node,
      type: ERROR_TYPE,
      gamma: this.context.serializeGamma(),
      premises: [tupleProof],
    };

    if (tupleType.kind !== "TupleType") {
      const msg = `Projection ".${node.index}" requires a tuple type, but got ${typeToString(tupleType)}`;
      this.errorBuffer.push(new Error(msg));
      returnProof.error = msg;
      return returnProof;
    }

    if (node.index < 1 || node.index > tupleType.elements.length) {
      const msg = `Tuple index ${node.index} is out of bounds for ${typeToString(tupleType)} (valid range: 1..${tupleType.elements.length})`;
      this.errorBuffer.push(new Error(msg));
      returnProof.error = msg;
      return returnProof;
    }

    returnProof.type = tupleType.elements[node.index - 1];
    return returnProof;
  }

  protected visitRecord(node: Record): ProofTree {
    const fieldProofs = node.fields.map((f) => this.visit(f.term));

    const recordType: RecordType = {
      kind: "RecordType",
      id: crypto.randomUUID(),
      fields: node.fields.map((f, i) => ({label: f.label, type: fieldProofs[i].type})),
    };

    return {
      rule: Rule.Record,
      term: node,
      type: recordType,
      gamma: this.context.serializeGamma(),
      premises: fieldProofs,
    };
  }

  protected visitRecordProjection(node: RecordProjection): ProofTree {
    const recordProof = this.visit(node.term);
    const recordType = recordProof.type;

    const returnProof: ProofTree = {
      rule: Rule.RecordProjection,
      term: node,
      type: ERROR_TYPE,
      gamma: this.context.serializeGamma(),
      premises: [recordProof],
    };

    if (recordType.kind !== "RecordType") {
      const msg = `Projection ".${node.label}" requires a record type, but got ${typeToString(recordType)}`;
      this.errorBuffer.push(new Error(msg));
      returnProof.error = msg;
      return returnProof;
    }

    const field = recordType.fields.find((f) => f.label === node.label);
    if (!field) {
      const msg = `Record type ${typeToString(recordType)} has no field "${node.label}"`;
      this.errorBuffer.push(new Error(msg));
      returnProof.error = msg;
      return returnProof;
    }

    returnProof.type = field.type;
    return returnProof;
  }

  protected visitSequencing(node: Sequencing): ProofTree {
    const unitType: TyVar = {kind: "TyVar", id: "unit-sentinel", name: "Unit"};

    const firstProof = this.visit(node.first);
    const secondProof = this.visit(node.second);

    const returnProof: ProofTree = {
      rule: Rule.Sequencing,
      term: node,
      type: secondProof.type,
      gamma: this.context.serializeGamma(),
      premises: [firstProof, secondProof],
    };

    if (!typeEquals(firstProof.type, unitType)) {
      const msg = `The first part of a sequence "t1; t2" must have type Unit, but got ${typeToString(firstProof.type)}`;
      this.errorBuffer.push(new Error(msg));
      returnProof.error = msg;
    }

    return returnProof;
  }

  protected visitDummyAbstraction(node: DummyAbstraction): ProofTree {
    const bodyProof = this.visit(node.body);

    const abstractionType: TyArrow = {
      kind: "TyArrow",
      id: crypto.randomUUID(),
      from: node.paramType,
      to: bodyProof.type,
    };

    return {
      rule: Rule.DummyAbs,
      term: node,
      type: abstractionType,
      gamma: this.context.serializeGamma(),
      premises: [bodyProof],
    };
  }

  protected visitBinOp(node: BinOp): ProofTree {
    const natType: TyVar = {kind: "TyVar", id: "nat-sentinel", name: "Nat"};
    const boolType: TyVar = {kind: "TyVar", id: "bool-sentinel", name: "Bool"};

    const leftProof = this.visit(node.left);
    const rightProof = this.visit(node.right);

    const returnProof: ProofTree = {
      rule: Rule.BinOp,
      term: node,
      type: isArithmeticOperator(node.operator) ? natType : boolType,
      gamma: this.context.serializeGamma(),
      premises: [leftProof, rightProof],
    };

    if (!typeEquals(leftProof.type, natType) || !typeEquals(rightProof.type, natType)) {
      const msg = `Operator "${node.operator}" expects both operands to have type Nat, but got ${typeToString(leftProof.type)} and ${typeToString(rightProof.type)}`;
      this.errorBuffer.push(new Error(msg));
      returnProof.error = msg;
    }

    return returnProof;
  }

  protected visitFix(node: Fix): ProofTree {
    const termProof = this.visit(node.term);

    const returnProof: ProofTree = {
      rule: Rule.Fix,
      term: node,
      type: ERROR_TYPE,
      gamma: this.context.serializeGamma(),
      premises: [termProof],
    };

    if (termProof.type.kind !== "TyArrow" || !typeEquals(termProof.type.from, termProof.type.to)) {
      const msg = `"fix" requires a function of type T -> T, but got ${typeToString(termProof.type)}`;
      this.errorBuffer.push(new Error(msg));
      returnProof.error = msg;
      return returnProof;
    }

    returnProof.type = termProof.type.from;
    return returnProof;
  }

  protected visitLet(node: Let): ProofTree {
    return new LetPolymorphismInferenceVisitor(
      this.context,
      this.errorBuffer,
      this.globalProofs,
    ).check(node);
  }

  protected visitType(node: Type): ProofTree {
    return {
      rule: "Type" as any,
      term: node as any,
      type: node as any,
      gamma: this.context.serializeGamma(),
      premises: [],
    } as ProofTree;
  }



}
