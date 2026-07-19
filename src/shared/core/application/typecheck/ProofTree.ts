import type {Term, Type, TyVar} from "@/shared/core/domain/ast";

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

export type Substitution = Map<string, Type>;

export interface TypeScheme {
  kind: "TypeScheme";
  vars: string[];
  type: Type;
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
  // Single tag for all arithmetic/comparison operators — the operator on
  // the term itself picks the displayed rule name (T-Plus, T-Lt, ...).
  BinOp = "BinOp",
  Fix = "Fix",

  CtVarLet = "CtVarLet",
  CtVar = "CtVar",
  CtAbs = "CtAbs",
  // λx.t with no parameter annotation — the parameter's type is a fresh
  // metavariable rather than a rigid, given one (CtAbs).
  CtAbsInf = "CtAbsInf",
  CtApp = "CtApp",
  CtLit = "CtLit",
  CtIf = "CtIf",
  CtInl = "CtInl",
  CtInr = "CtInr",
  CtCase = "CtCase",
  CtVariantCase = "CtVariantCase",
  CtVariant = "CtVariant",
  CtAscribe = "CtAscribe",
  CtTuple = "CtTuple",
  CtTupleProjection = "CtTupleProjection",
  CtRecord = "CtRecord",
  CtRecordProjection = "CtRecordProjection",
  CtSequencing = "CtSequencing",
  CtDummyAbs = "CtDummyAbs",
  CtLet = "CtLet",
  CtBinOp = "CtBinOp",
  CtFix = "CtFix",
}

// Sentinel type used as a placeholder when the real type cannot be inferred due to an error.
export const ERROR_TYPE: TyVar = { kind: "TyVar", id: "error-sentinel", name: "?" };


