import type {BinaryOperator, Type} from "@/shared/core/domain/ast";

const ARITHMETIC_OPERATORS: ReadonlySet<BinaryOperator> = new Set(["+", "-", "*", "/"]);

// Arithmetic operators type as Nat -> Nat -> Nat; the rest (comparisons)
// type as Nat -> Nat -> Bool. Shared by both type checkers so the one
// BinOp visitor method in each picks the right result/rule per operator.
export function isArithmeticOperator(operator: BinaryOperator): boolean {
  return ARITHMETIC_OPERATORS.has(operator);
}

// 'C' is skipped: it's reserved for constraint sets (C_1, C_2, ...) in proof-tree rendering.
const META_VAR_ALPHABET = "ABDEFGHIJKLMNOPQRSTUVWXYZ";

export function metaVarName(index: number): string {
  const letter = META_VAR_ALPHABET[index % META_VAR_ALPHABET.length - 1];
  const cycle = Math.floor(index / META_VAR_ALPHABET.length);
  return cycle === 0 ? `'${letter}` : `'${letter}_${cycle}`;
}

export function typeEquals(a: Type, b: Type): boolean {
  if (a.kind !== b.kind) return false;

  switch (a.kind) {
    case "TyVar":
      return a.name === (b as any).name;

    case "TyArrow":
      return (
        typeEquals(a.from, (b as any).from) &&
        typeEquals(a.to, (b as any).to)
      );

    case "TupleType": {
      const bElements = (b as typeof a).elements;
      return (
        a.elements.length === bElements.length &&
        a.elements.every((el, i) => typeEquals(el, bElements[i]))
      );
    }

    case "SumType": {
      const bSum = b as typeof a;
      return typeEquals(a.left, bSum.left) && typeEquals(a.right, bSum.right);
    }

    case "VariantType": {
      const bVariants = (b as typeof a).variants;
      if (a.variants.length !== bVariants.length) return false;
      return a.variants.every((v) => {
        const match = bVariants.find((bv) => bv.label === v.label);
        return match !== undefined && typeEquals(v.type, match.type);
      });
    }

    case "RecordType": {
      const bFields = (b as typeof a).fields;
      if (a.fields.length !== bFields.length) return false;
      return a.fields.every((f) => {
        const match = bFields.find((bf) => bf.label === f.label);
        return match !== undefined && typeEquals(f.type, match.type);
      });
    }

    case "TyMetaVar" : {
      return a.name === (b as any).name;
    }
  }
}

export function typeToString(a: Type): string {
  switch (a.kind) {
    case "TyVar":
      return a.name;

    case "TyArrow": {
      const fromStr = typeToString(a.from);
      const toStr = typeToString(a.to);
      return `(${fromStr} -> ${toStr})`;
    }

    case "TupleType":
      return `<${a.elements.map(typeToString).join(" * ")}>`;

    case "SumType":
      return `(${typeToString(a.left)} + ${typeToString(a.right)})`;

    case "VariantType":
      return `<${a.variants.map((v) => `${v.label}:${typeToString(v.type)}`).join(", ")}>`;

    case "RecordType":
      return `{${a.fields.map((f) => `${f.label}:${typeToString(f.type)}`).join(", ")}}`;

    case "TyMetaVar":
      return a.name;
  }
}