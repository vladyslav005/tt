import type {Term, Type} from "@/shared/core/domain/ast";

export interface ProofTree {
  rule: Rule
  premises: ProofTree[]
  term: Term
  type: Type
  gamma: Record<string, Type>
  error?: string
}


export enum Rule {
  Var = "Var",
  Abs = "Abs",
  App = "App",
  If = "If",
  Inl = "Inl",
  Inr = "Inr",
  Case = "Case"
}

