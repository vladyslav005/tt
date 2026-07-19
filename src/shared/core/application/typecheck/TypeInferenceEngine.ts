
import {
  type Constraint, type ProofTree,
  type Substitution,
  type TypeScheme,
} from "@/shared/core/application/typecheck/ProofTree.ts";
import type {Type, TyMetaVar} from "@/shared/core/domain/ast";
import {Gamma} from "@/shared/core/application/typecheck/Gamma.ts";
import {metaVarName, typeToString} from "@/shared/core/application/typecheck/utils.ts";

export class TypeInferenceEngine {

  private freshCounter = 0;

  toSchemeGamma(gamma: Gamma<Type>): Gamma<TypeScheme> {
    const result = new Gamma<TypeScheme>();

    for (const [name, type] of gamma.entries()) {
      result.add(name, {
        kind: "TypeScheme",
        vars: [],
        type,
      });
    }

    return result;
  }

  applySubstitution(type: Type, substitution: Substitution): Type {
    switch (type.kind) {
      case "TyMetaVar": {
        const replacement = substitution.get(type.name);

        if (!replacement) {
          return type;
        }

        return this.applySubstitution(replacement, substitution);
      }

      case "TyVar":
        return type;

      case "TyArrow":
        return {
          ...type,
          from: this.applySubstitution(type.from, substitution),
          to: this.applySubstitution(type.to, substitution),
        };

      case "TupleType":
        return {
          ...type,
          elements: type.elements.map((element) =>
            this.applySubstitution(element, substitution),
          ),
        };

      case "SumType":
        return {
          ...type,
          left: this.applySubstitution(type.left, substitution),
          right: this.applySubstitution(type.right, substitution),
        };

      case "VariantType":
        return {
          ...type,
          variants: type.variants.map((variant) => ({
            ...variant,
            type: this.applySubstitution(variant.type, substitution),
          })),
        };

      case "RecordType":
        return {
          ...type,
          fields: type.fields.map((field) => ({
            ...field,
            type: this.applySubstitution(field.type, substitution),
          })),
        };

      default:
        return this.assertNever(type);
    }
  }

  solve(constraints: Constraint[]): Substitution {
    let substitution: Substitution = new Map();

    for (const constraint of constraints) {
      substitution = this.unify(
        this.applySubstitution(constraint.left, substitution),
        this.applySubstitution(constraint.right, substitution),
        substitution,
      );
    }

    return substitution;
  }

  unify(
    left: Type,
    right: Type,
    substitution: Substitution,
  ): Substitution {
    const a = this.applySubstitution(left, substitution);
    const b = this.applySubstitution(right, substitution);

    if (a.kind === "TyMetaVar") {
      return this.bindTypeVariable(a.name, b, substitution);
    }

    if (b.kind === "TyMetaVar") {
      return this.bindTypeVariable(b.name, a, substitution);
    }

    if (a.kind === "TyVar" && b.kind === "TyVar") {
      if (a.name === b.name) {
        return substitution;
      }

      throw new Error(`Cannot unify ${typeToString(a)} with ${typeToString(b)}`);
    }

    if (a.kind === "TyArrow" && b.kind === "TyArrow") {
      let nextSubstitution = this.unify(a.from, b.from, substitution);

      nextSubstitution = this.unify(
        this.applySubstitution(a.to, nextSubstitution),
        this.applySubstitution(b.to, nextSubstitution),
        nextSubstitution,
      );

      return nextSubstitution;
    }

    if (a.kind === "TupleType" && b.kind === "TupleType") {
      if (a.elements.length !== b.elements.length) {
        throw new Error("Cannot unify tuple types with different lengths");
      }

      let nextSubstitution = substitution;

      for (let i = 0; i < a.elements.length; i++) {
        nextSubstitution = this.unify(
          a.elements[i],
          b.elements[i],
          nextSubstitution,
        );
      }

      return nextSubstitution;
    }

    if (a.kind === "SumType" && b.kind === "SumType") {
      let nextSubstitution = this.unify(a.left, b.left, substitution);

      nextSubstitution = this.unify(
        a.right,
        b.right,
        nextSubstitution,
      );

      return nextSubstitution;
    }

    if (a.kind === "RecordType" && b.kind === "RecordType") {
      if (a.fields.length !== b.fields.length) {
        throw new Error("Cannot unify record types with different fields");
      }

      let nextSubstitution = substitution;

      for (const fieldA of a.fields) {
        const fieldB = b.fields.find((field) => field.label === fieldA.label);

        if (!fieldB) {
          throw new Error(`Record field "${fieldA.label}" is missing`);
        }

        nextSubstitution = this.unify(
          fieldA.type,
          fieldB.type,
          nextSubstitution,
        );
      }

      return nextSubstitution;
    }

    if (a.kind === "VariantType" && b.kind === "VariantType") {
      if (a.variants.length !== b.variants.length) {
        throw new Error("Cannot unify variant types with different labels");
      }

      let nextSubstitution = substitution;

      for (const variantA of a.variants) {
        const variantB = b.variants.find(
          (variant) => variant.label === variantA.label,
        );

        if (!variantB) {
          throw new Error(`Variant label "${variantA.label}" is missing`);
        }

        nextSubstitution = this.unify(
          variantA.type,
          variantB.type,
          nextSubstitution,
        );
      }

      return nextSubstitution;
    }

    throw new Error(
      `Cannot unify ${typeToString(a)} with ${typeToString(b)}`,
    );
  }

  private bindTypeVariable(
    name: string,
    type: Type,
    substitution: Substitution,
  ): Substitution {
    if (type.kind === "TyMetaVar" && type.name === name) {
      return substitution;
    }

    if (this.occursIn(name, type, substitution)) {
      throw new Error(
        `Occurs check failed: ${name} occurs in ${typeToString(type)}`,
      );
    }

    const nextSubstitution: Substitution = new Map(substitution);
    nextSubstitution.set(name, type);

    return nextSubstitution;
  }

  private occursIn(
    name: string,
    type: Type,
    substitution: Substitution,
  ): boolean {
    const applied = this.applySubstitution(type, substitution);
    return this.freeTypeVariables(applied).has(name);
  }

  private assertNever(value: never): never {
    throw new Error(`Unexpected type kind: ${JSON.stringify(value)}`);
  }

  instantiate(scheme: TypeScheme): Type {
    const substitution: Substitution = new Map();

    for (const variable of scheme.vars) {
      substitution.set(variable, this.freshTyMetaVar());
    }

    return this.applySubstitution(scheme.type, substitution);
  }

   freshTyMetaVar(): TyMetaVar {
    const name = metaVarName(this.freshCounter);
    this.freshCounter++;

    return {
      kind: "TyMetaVar",
      id: crypto.randomUUID(),
      name,
    };
  }

  applySubstitutionToScheme(
    scheme: TypeScheme,
    substitution: Substitution,
  ): TypeScheme {
    const filteredSubstitution: Substitution = new Map(substitution);

    for (const variable of scheme.vars) {
      filteredSubstitution.delete(variable);
    }

    return {
      ...scheme,
      type: this.applySubstitution(scheme.type, filteredSubstitution),
    };
  }

  applySubstitutionToContext(
    context: Gamma<TypeScheme>,
    substitution: Substitution,
  ): Gamma<TypeScheme> {
    const nextContext = new Gamma<TypeScheme>();

    for (const [name, scheme] of context.entries()) {
      nextContext.add(
        name,
        this.applySubstitutionToScheme(scheme, substitution),
      );
    }

    return nextContext;
  }

  applySubstitutionToProof<T extends ProofTree>(
    proof: T,
    substitution: Substitution,
  ): T {
    return {
      ...proof,
      type: this.applySubstitution(proof.type, substitution),
      premises: proof.premises.map((premise) =>
        this.applySubstitutionToProof(premise, substitution),
      ),
    };
  }

  freeTypeVariables(type: Type): Set<string> {
    switch (type.kind) {
      case "TyMetaVar":
        return new Set([type.name]);

      case "TyVar":
        return new Set();

      case "TyArrow":
        return this.union(
          this.freeTypeVariables(type.from),
          this.freeTypeVariables(type.to),
        );

      case "TupleType":
        return this.unionMany(
          type.elements.map((element) => this.freeTypeVariables(element)),
        );

      case "SumType":
        return this.union(
          this.freeTypeVariables(type.left),
          this.freeTypeVariables(type.right),
        );

      case "VariantType":
        return this.unionMany(
          type.variants.map((variant) =>
            this.freeTypeVariables(variant.type),
          ),
        );

      case "RecordType":
        return this.unionMany(
          type.fields.map((field) =>
            this.freeTypeVariables(field.type),
          ),
        );

      default:
        return this.assertNever(type);
    }
  }

  freeTypeVariablesScheme(scheme: TypeScheme): Set<string> {
    const variables = this.freeTypeVariables(scheme.type);

    for (const variable of scheme.vars) {
      variables.delete(variable);
    }

    return variables;
  }

  freeTypeVariablesContext(context: Gamma<TypeScheme>): Set<string> {
    const result = new Set<string>();

    for (const [, scheme] of context.entries()) {
      for (const variable of this.freeTypeVariablesScheme(scheme)) {
        result.add(variable);
      }
    }

    return result;
  }

  private union(a: Set<string>, b: Set<string>): Set<string> {
    return new Set([...a, ...b]);
  }

  private unionMany(sets: Set<string>[]): Set<string> {
    const result = new Set<string>();

    for (const set of sets) {
      for (const value of set) {
        result.add(value);
      }
    }

    return result;
  }

  generalize(type: Type, context: Gamma<TypeScheme>): TypeScheme {
    const typeVariables = this.freeTypeVariables(type);
    const contextVariables = this.freeTypeVariablesContext(context);

    const vars = [...typeVariables].filter(
      (variable) => !contextVariables.has(variable),
    );

    return {
      kind: "TypeScheme",
      vars,
      type,
    };
  }

}
