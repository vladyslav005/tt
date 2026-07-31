import type {Kind, Term, Type, TyIdentifier} from "@/shared/core/domain/ast";

export interface ProofTree {
  rule: Rule
  premises: ProofTree[]
  id?: string
  term: Term
  type: Type
  gamma: Record<string, Type | TypeScheme>
  error?: string
  // A kind derivation (Δ ⊢ T :: K) justifying that this node's own type is
  // well-kinded — only ever set when that type mentions a System λω̲ type
  // constructor; every other node (the overwhelming majority) leaves this
  // unset, since an ordinary type's kind is trivially * and not worth
  // showing. Rendered as an extra premise alongside `premises`, not merged
  // into it, since a KindProofTree judges a Type rather than a Term.
  kindPremise?: KindProofTree
  // The (Conv) rule made visible: set only when this node's annotation
  // needed an actual β-reduction to reach normal form (e.g. "Endo Nat" ->
  // "Nat -> Nat") — never set for a type that was already normal. This
  // checker applies Conv eagerly (see normalizeType) rather than keeping
  // both forms around and reconciling them lazily during unification, so
  // there's no separate moment elsewhere where this conversion "happens" —
  // this field exists purely to show the reader that it did.
  typeConversion?: TypeConversion
}

export interface TypeConversion {
  before: Type;
  after: Type;
}

// A kinding derivation Δ ⊢ subject :: resultKind — the System λω̲ analogue of
// ProofTree, but for the judgment that classifies a *type* rather than a
// term. Kept as a separate shape (not squeezed into ProofTree) because its
// subject is a Type, not a Term, and its context is a kind context (type
// constructor variable -> Kind), not a Gamma.
export interface KindProofTree {
  rule: Rule
  premises: KindProofTree[]
  id?: string
  subject: Type
  resultKind: Kind
  delta: Record<string, Kind>
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

  // Lists (Lecture 06).
  Nil = "Nil",
  Cons = "Cons",
  IsNil = "IsNil",
  Head = "Head",
  Tail = "Tail",

  // Iso-recursive types (Lecture 06).
  Fold = "Fold",
  Unfold = "Unfold",

  // System F is explicit/syntax-directed (no unification involved), so it
  // gets plain (non-Ct) rule names regardless of whether it appears inside
  // a `let` — TexMapper renders these directly rather than delegating to
  // LetPolymorphismTexMapper.
  TypeAbs = "TypeAbs",
  TypeApp = "TypeApp",

  // System λω̲ term-level dispatch targets — unreachable in practice (a Type
  // node, including these two, is never fed through AstVisitor.visit(); see
  // kindOf/checkKindAnnotation in STLCTypeChecker for where kind-checking
  // actually happens), kept only so AstVisitor's dispatch stays exhaustive.
  TyConstructorAbs = "TyConstructorAbs",
  TyConstructorApp = "TyConstructorApp",

  // System λP: applying a Π-typed function — distinct from ordinary App
  // because the result type is the body with the argument substituted in,
  // not a plain arrow's codomain.
  TPiApp = "TPiApp",

  // The kinding judgment (Δ ⊢ T :: K) — rendered on KindProofTree nodes,
  // attached to a term-level node via ProofTree.kindPremise.
  KindBase = "KindBase",
  KindVar = "KindVar",
  KindForm = "KindForm",
  KindForall = "KindForall",
  KindAbs = "KindAbs",
  KindApp = "KindApp",
  // System λP kinding rules: Π-type formation, and applying a dependently-
  // kinded type constructor to a term index.
  KindPi = "KindPi",
  KindIndexApp = "KindIndexApp",
  // μX.T is well-kinded (*) whenever T is, with X:* bound for the duration —
  // mirrors KindForall's shape (TyForall reuses the same binder-kinding
  // pattern).
  KindMu = "KindMu",
  // The (Conv) rule made visible — see ProofTree.typeConversion.
  Conv = "Conv",

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
  CtNil = "CtNil",
  CtCons = "CtCons",
  CtIsNil = "CtIsNil",
  CtHead = "CtHead",
  CtTail = "CtTail",
  CtFold = "CtFold",
  CtUnfold = "CtUnfold",
}

// Sentinel type used as a placeholder when the real type cannot be inferred due to an error.
export const ERROR_TYPE: TyIdentifier = { kind: "TyIdentifier", id: "error-sentinel", name: "?" };


