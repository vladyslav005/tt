import type {Node} from "@/shared/core/domain/ast/node.ts";
import type {Type} from "@/shared/core/domain/ast/type.ts";

export type Term =
  Var |
  Abs |
  App |
  Lit |
  VariantCase |
  Inl |
  Inr |
  IfCondition |
  Case |
  Variant |
  Ascribe |
  TupleProjection |
  RecordProjection |
  Record |
  Sequencing |
  Tuple |
  DummyAbstraction |
  Let |
  BinOp

export interface Var extends Node {
  kind: "Var"
  name: string
}

export interface Abs extends Node {
  kind: "Abs"
  param: string
  // Omitted for an unannotated parameter (λx. t) — only legal as (part of)
  // a `let`-bound value, where LetPolymorphismInferenceVisitor infers it as
  // a fresh metavariable; STLCTypeChecker has no way to make sense of a
  // missing annotation and reports an error if one reaches it directly.
  paramType?: Type
  body: Term
  type?: Type
}

export interface App extends Node {
  kind: "App"
  func: Term
  arg: Term
}

export interface Lit extends Node {
  kind: "Lit"
  value: string
}

export interface VariantCase extends Node {
  kind: "VariantCase"
  variable: Term
  cases: {
    label: string
    variable: string
    body: Term
  }[]
}

export interface Inl extends Node {
  kind: "Inl"
  term: Term
  type: Type
}

export interface Inr extends Node {
  kind: "Inr"
  term: Term
  type: Type
}

export interface IfCondition extends Node {
  kind: "IfCondition"
  condition: Term
  then: Term
  elif?: {
    condition: Term
    then: Term
  }[]
  else?: Term
}

// Binary case
export interface Case extends Node {
  kind: "Case"
  variable: Term
  inl: {
    variable: string
    term: Term
  }
  inr: {
    variable: string
    term: Term
  }
}

export interface Variant extends Node {
  kind: "Variant"
  type: Type
  variants: {
    label: string
    term: Term
  }[]
}

export interface Ascribe extends Node {
  kind: "Ascribe"
  term: Term
  type: Type
}

export interface TupleProjection extends Node {
  kind: "TupleProjection"
  tuple: Term
  index: number
}

export interface RecordProjection extends Node {
  kind: "RecordProjection"
  term: Term
  label: string
}

export interface Record extends Node {
  kind: "Record"
  fields: {
    label: string
    term: Term
  }[]
}

export interface Sequencing extends Node {
  kind: "Sequencing"
  first: Term
  second: Term
}

export interface Tuple extends Node {
  kind: "Tuple"
  elements: Term[]
}

export interface DummyAbstraction extends Node {
  kind: "DummyAbstraction"
  paramType: Type
  body: Term
  type?: Type
}

// =====================================================================
// =                        LET POLYMORPHISM                           =
// =====================================================================

export interface Let extends Node {
  kind: "Let";
  name: string;
  value: Term;
  body: Term;
}

// =====================================================================
// =                    ARITHMETIC AND COMPARISON                      =
// =====================================================================

// Arithmetic and comparison operators share a single AST node/visitor
// method — the operator alone selects the typing rule, evaluation
// behaviour, and displayed proof-tree rule name.
export type BinaryOperator = "+" | "-" | "*" | "/" | "<" | ">" | "<=" | ">=" | "==" | "!=";

export interface BinOp extends Node {
  kind: "BinOp";
  operator: BinaryOperator;
  left: Term;
  right: Term;
}