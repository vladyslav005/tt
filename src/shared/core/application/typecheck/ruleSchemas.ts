import type {Abs, App, Term} from "@/shared/core/domain/ast";
import {Rule} from "@/shared/core/application/typecheck/ProofTree.ts";

// Describes, for a single typing rule, what term shape it applies to and
// which of that term's sub-terms become premises — data the Proof Tree
// Builder needs to (a) check a rule pick structurally fits the term it was
// applied to, and (b) know which premise nodes to reveal once it does.
// Nothing like this exists elsewhere: STLCTypeChecker's visitX methods
// encode the same facts, but imperatively (as code that also does the
// actual type-checking), not as data to introspect.
//
// Phase 1 only: the four STLC core rules (Var, Lit, Abs, App). Extending
// to more rules (If, Let, System F, ...) later is just adding rows here,
// not a redesign — see the Proof Tree Builder plan.
export interface RuleSchema {
  rule: Rule;
  appliesToTermKind: Term["kind"];
  // Ordered sub-terms that become this rule's premises — empty for a leaf
  // rule (Var, Lit).
  premiseTerms: (term: Term) => Term[];
}

export const RULE_SCHEMAS: readonly RuleSchema[] = [
  {
    rule: Rule.Var,
    appliesToTermKind: "Var",
    premiseTerms: () => [],
  },
  {
    rule: Rule.Lit,
    appliesToTermKind: "Lit",
    premiseTerms: () => [],
  },
  {
    rule: Rule.Abs,
    appliesToTermKind: "Abs",
    // Matches STLCTypeChecker.visitAbs: premises: [bodyProof].
    premiseTerms: (term) => [(term as Abs).body],
  },
  {
    rule: Rule.App,
    appliesToTermKind: "App",
    // Matches STLCTypeChecker.visitApp: premises: [funcProof, argProof].
    premiseTerms: (term) => [(term as App).func, (term as App).arg],
  },
];

export function ruleSchemaFor(rule: Rule): RuleSchema | undefined {
  return RULE_SCHEMAS.find((schema) => schema.rule === rule);
}

// Whether `rule` structurally applies to `term` — the instant, no-premises-
// spawned-on-mismatch check the builder performs the moment a rule is picked.
export function ruleAppliesToTerm(rule: Rule, term: Term): boolean {
  const schema = ruleSchemaFor(rule);
  return schema !== undefined && schema.appliesToTermKind === term.kind;
}
