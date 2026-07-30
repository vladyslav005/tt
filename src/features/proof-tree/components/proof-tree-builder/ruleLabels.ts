import {Rule} from "@/shared/core/application/typecheck/ProofTree.ts";

// Display labels for the Phase-1 rule set only — mirrors the literal
// strings TexMapper's visitX methods use for the automatic derivation
// (e.g. "T-Abs", "T-App"), so a rule picked here reads identically to how
// it would show up in the "Automatic" tab. Partial, not exhaustive over
// Rule — extended alongside ruleSchemas.ts as more rules join the builder.
export const RULE_LABELS: Partial<Record<Rule, string>> = {
  [Rule.Var]: "T-Var",
  [Rule.Abs]: "T-Abs",
  [Rule.App]: "T-App",
  [Rule.Lit]: "T-Lit",
};

// Phase-1's fixed rule set, in the order offered to the student.
export const BUILDER_RULES: readonly Rule[] = [Rule.Var, Rule.Abs, Rule.App, Rule.Lit];
