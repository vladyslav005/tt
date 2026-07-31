import {type ProofTree, Rule, type TypeScheme} from "@/shared/core/application/typecheck/ProofTree.ts";
import type {Type} from "@/shared/core/domain/ast";
import {typeEquals} from "@/shared/core/application/typecheck/utils.ts";

export interface ContextBinding {
  name: string;
  type: Type;
}

// The student's in-progress manual derivation for "Build & Check" mode. Mirrors the frozen
// answer-key ProofTree 1:1 — only rule/type content is filled in, never the tree structure.
export interface StudentProofNode {
  id: string;
  // Revealed by clicking the corresponding sub-term (see ConclusionBuilder).
  revealed: boolean;
  chosenRule?: Rule;
  // Only stamped by Check Proof — a wrong pick doesn't block the exercise.
  ruleCheck?: "valid" | "invalid";
  writtenType?: Type;
  typeCheck?: "valid" | "invalid";
  // True when this node's real Γ adds a binding on top of its parent's.
  requiresContextBuild?: boolean;
  writtenBindings?: ContextBinding[];
  contextCheck?: "valid" | "invalid";
  premises: StudentProofNode[];
}

export function buildStudentNode(
  answer: ProofTree,
  revealed: boolean,
  parentGamma: Record<string, Type | TypeScheme> = answer.gamma,
): StudentProofNode {
  const requiresContextBuild = Object.keys(answer.gamma).some((k) => !(k in parentGamma));
  // A T-Var's "jump to definition" premise has its own unrelated scope.
  const childParentGamma = (p: ProofTree) => answer.rule === Rule.Var ? p.gamma : answer.gamma;
  return {
    id: answer.id ?? crypto.randomUUID(),
    revealed,
    requiresContextBuild: requiresContextBuild || undefined,
    premises: answer.premises.map((p) => buildStudentNode(p, false, childParentGamma(p))),
  };
}

export function findStudentNode(root: StudentProofNode, id: string): StudentProofNode | undefined {
  if (root.id === id) return root;
  for (const premise of root.premises) {
    const found = findStudentNode(premise, id);
    if (found) return found;
  }
  return undefined;
}

function bindingsMatch(written: ContextBinding[], expected: ContextBinding[]): boolean {
  if (written.length !== expected.length) return false;
  return expected.every((e) => written.some((w) => w.name === e.name && typeEquals(w.type, e.type)));
}

// Maps each constraint-mode (Ct*) rule to its plain equivalent, since the rule picker only offers
// plain ones — comparisons must normalize both sides first.
const CT_TO_PLAIN_RULE: Partial<Record<Rule, Rule>> = {
  [Rule.CtVarLet]: Rule.Var,
  [Rule.CtVar]: Rule.Var,
  [Rule.CtAbs]: Rule.Abs,
  [Rule.CtAbsInf]: Rule.Abs,
  [Rule.CtApp]: Rule.App,
  [Rule.CtLit]: Rule.Lit,
  [Rule.CtIf]: Rule.If,
  [Rule.CtInl]: Rule.Inl,
  [Rule.CtInr]: Rule.Inr,
  [Rule.CtCase]: Rule.Case,
  [Rule.CtVariantCase]: Rule.VariantCase,
  [Rule.CtVariant]: Rule.Variant,
  [Rule.CtAscribe]: Rule.Ascribe,
  [Rule.CtTuple]: Rule.Tuple,
  [Rule.CtTupleProjection]: Rule.TupleProjection,
  [Rule.CtRecord]: Rule.Record,
  [Rule.CtRecordProjection]: Rule.RecordProjection,
  [Rule.CtSequencing]: Rule.Sequencing,
  [Rule.CtDummyAbs]: Rule.DummyAbs,
  [Rule.CtLet]: Rule.Let,
  [Rule.CtBinOp]: Rule.BinOp,
  [Rule.CtFix]: Rule.Fix,
  [Rule.CtNil]: Rule.Nil,
  [Rule.CtCons]: Rule.Cons,
  [Rule.CtIsNil]: Rule.IsNil,
  [Rule.CtHead]: Rule.Head,
  [Rule.CtTail]: Rule.Tail,
  [Rule.CtFold]: Rule.Fold,
  [Rule.CtUnfold]: Rule.Unfold,
};

function canonicalRule(rule: Rule): Rule {
  return CT_TO_PLAIN_RULE[rule] ?? rule;
}

// Diffs filled-in nodes against the answer key, stamping ruleCheck/typeCheck/
// contextCheck independently — unreached nodes are left untouched.
export function diffAgainstAnswer(
  student: StudentProofNode,
  answer: ProofTree,
  parentGamma: Record<string, Type | TypeScheme> = answer.gamma,
): void {
  if (student.chosenRule !== undefined) {
    student.ruleCheck = canonicalRule(student.chosenRule) === canonicalRule(answer.rule) ? "valid" : "invalid";
  }
  if (student.chosenRule !== undefined && student.writtenType !== undefined) {
    student.typeCheck = typeEquals(student.writtenType, answer.type) ? "valid" : "invalid";
  }
  if (student.requiresContextBuild && student.writtenBindings !== undefined) {
    const expected: ContextBinding[] = Object.keys(answer.gamma)
      .filter((k) => !(k in parentGamma))
      .map((k) => {
        const bound = answer.gamma[k];
        // Γ entries are TypeScheme-wrapped — unwrap before comparing.
        const type = bound.kind === "TypeScheme" ? bound.type : bound;
        return {name: k, type};
      });
    student.contextCheck = bindingsMatch(student.writtenBindings, expected) ? "valid" : "invalid";
  }
  student.premises.forEach((premise, index) => {
    const answerPremise = answer.premises[index];
    if (!answerPremise) return;
    const childParentGamma = answer.rule === Rule.Var ? answerPremise.gamma : answer.gamma;
    diffAgainstAnswer(premise, answerPremise, childParentGamma);
  });
}

export interface ProofBuildSummary {
  total: number;
  filled: number;
  valid: number;
  invalid: number;
}

// Node counts for the "Check Proof" summary strip.
export function summarizeStudentTree(node: StudentProofNode): ProofBuildSummary {
  const children = node.premises.map(summarizeStudentTree);
  const sum = (pick: (s: ProofBuildSummary) => number) => children.reduce((n, s) => n + pick(s), 0);

  const contextFilled = !node.requiresContextBuild || node.writtenBindings !== undefined;
  const contextOk = !node.requiresContextBuild || node.contextCheck !== "invalid";
  const isFilled = node.chosenRule !== undefined && node.writtenType !== undefined && contextFilled;
  const isValid = node.ruleCheck === "valid" && node.typeCheck === "valid" && contextOk;
  const isInvalid = node.ruleCheck === "invalid"
    || node.typeCheck === "invalid"
    || (node.requiresContextBuild && node.contextCheck === "invalid");

  return {
    total: 1 + sum((s) => s.total),
    filled: (isFilled ? 1 : 0) + sum((s) => s.filled),
    valid: (isValid ? 1 : 0) + sum((s) => s.valid),
    invalid: (isInvalid ? 1 : 0) + sum((s) => s.invalid),
  };
}

// Build & Check requires the term to already type-check.
export function countProofErrors(proof: ProofTree): number {
  return (proof.error ? 1 : 0) + proof.premises.reduce((n, p) => n + countProofErrors(p), 0);
}
