import type {Term, Type} from "@/shared/core/domain/ast";
import type {Gamma} from "@/shared/core/domain/typecheck/Gamma.ts";

export interface ProofTree {
  rule: Rule
  premises: ProofTree[]
  term: Term
  type: Type
  gamma: Gamma
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

