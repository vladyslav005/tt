import type {Term, Type, TypeScheme, TyVar} from "@/shared/core/domain/ast";

export interface ProofTree {
  rule: Rule
  premises: ProofTree[]
  id?: string
  term: Term
  type: Type
  gamma: Record<string, Type | TypeScheme>
  error?: string
}

export interface Constraint {
  left: Type;
  right: Type;
}



export interface InferProofTree extends ProofTree {
  constraints: Constraint[];
}

export enum Rule {
  Var = "Var",
  Abs = "Abs",
  App = "App",
  Lit = "Lit",
  If = "If",
  Inl = "Inl",
  Inr = "Inr",
  Case = "Case",
  VariantCase = "VariantCase",
  Variant = "Variant",
  Ascribe = "Ascribe",
  Tuple = "Tuple",
  TupleProjection = "TupleProjection",
  Record = "Record",
  RecordProjection = "RecordProjection",
  Sequencing = "Sequencing",
  DummyAbs = "DummyAbs",
  Let = "Let",
}

// Sentinel type used as a placeholder when the real type cannot be inferred due to an error.
export const ERROR_TYPE: TyVar = { kind: "TyVar", id: "error-sentinel", name: "?" };


