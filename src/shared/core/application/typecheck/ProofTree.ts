import type {Term, Type, TyIdentifier} from "@/shared/core/domain/ast";

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

  // System F is explicit/syntax-directed (no unification involved), so it
  // gets plain (non-Ct) rule names regardless of whether it appears inside
  // a `let` — TexMapper renders these directly rather than delegating to
  // LetPolymorphismTexMapper.
  TypeAbs = "TypeAbs",
  TypeApp = "TypeApp",

  // System λω̲ — grammar/AST wiring only so far; kind-checking itself isn't
  // implemented yet, so these rules only ever appear on a reject() node.
  TyConstructorAbs = "TyConstructorAbs",
  TyConstructorApp = "TyConstructorApp",

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
export const ERROR_TYPE: TyIdentifier = { kind: "TyIdentifier", id: "error-sentinel", name: "?" };


