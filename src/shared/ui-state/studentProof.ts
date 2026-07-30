import {type ProofTree, Rule, type TypeScheme} from "@/shared/core/application/typecheck/ProofTree.ts";
import type {Type} from "@/shared/core/domain/ast";
import {typeEquals} from "@/shared/core/application/typecheck/utils.ts";

export interface ContextBinding {
  name: string;
  type: Type;
}

// The student's in-progress manual derivation for the Proof Tree Builder
// ("Build & Check" mode). Mirrors the shape of the frozen answer-key
// ProofTree 1:1 (same node count, same premise order) — built once when
// entering build mode by walking that answer key — since this is a
// syntax-directed type system, the tree's *structure* is never something
// the student invents, only its rule/type content is.
export interface StudentProofNode {
  id: string;
  // False for every node except the root at start — a node only becomes
  // visible once the student clicks its corresponding sub-term inside the
  // parent's rendered judgement (see ConclusionBuilder's premise-click
  // wrapping) — an active identification step, not an automatic reveal.
  revealed: boolean;
  chosenRule?: Rule;
  // Whether the chosen rule was actually correct — like typeCheck/
  // contextCheck, only stamped by an explicit Check Proof pass. A rule
  // pick is never accepted/rejected on the spot: premises and the type
  // slot open up regardless, so a wrong guess doesn't dead-end the
  // exercise — it just gets marked wrong later, same as a wrong type.
  ruleCheck?: "valid" | "invalid";
  writtenType?: Type;
  typeCheck?: "valid" | "invalid";
  // True when this node's real Γ adds a binding on top of its parent's —
  // a purely structural fact (derived from the answer key's gamma, not the
  // binding's actual name/type), so exposing it doesn't leak the answer.
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
  // T-Var's real premise (when present) is the "jump to definition"
  // sub-proof for a global reference — a genuinely separate derivation the
  // student can build too, not a structural child of THIS node's own term.
  // Its own parentGamma is its own gamma (zero-diff root), not this node's
  // — the reference site's scope and the declaration site's scope are
  // usually unrelated, so diffing one against the other would misfire.
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

// Diffs the student's filled-in nodes against the answer key, stamping
// `ruleCheck`, `typeCheck`, and (where applicable) `contextCheck` on every
// node that has the relevant fields written — nodes the student hasn't
// reached yet are left untouched (neither valid nor invalid, just not part
// of this pass). Rule and type are checked independently — a wrong rule
// with a coincidentally-correct type still shows the type as valid; each
// mistake is its own signal, not lumped into one pass/fail per node.
export function diffAgainstAnswer(
  student: StudentProofNode,
  answer: ProofTree,
  parentGamma: Record<string, Type | TypeScheme> = answer.gamma,
): void {
  if (student.chosenRule !== undefined) {
    student.ruleCheck = student.chosenRule === answer.rule ? "valid" : "invalid";
  }
  if (student.chosenRule !== undefined && student.writtenType !== undefined) {
    student.typeCheck = typeEquals(student.writtenType, answer.type) ? "valid" : "invalid";
  }
  if (student.requiresContextBuild && student.writtenBindings !== undefined) {
    const expected: ContextBinding[] = Object.keys(answer.gamma)
      .filter((k) => !(k in parentGamma))
      .map((k) => ({name: k, type: answer.gamma[k] as Type}));
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

// Node counts for the "Check Proof" summary strip — total exercise size vs.
// how much of it the student has filled in and how much of that is right.
// A node that requires a context binding only counts as filled/valid once
// that binding is written/correct too, on top of the existing rule+type bar.
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

// Whether the answer-key proof itself contains any error node — Build &
// Check mode requires the term to already type-check; it isn't (yet) about
// proving a term is ill-typed.
export function countProofErrors(proof: ProofTree): number {
  return (proof.error ? 1 : 0) + proof.premises.reduce((n, p) => n + countProofErrors(p), 0);
}
