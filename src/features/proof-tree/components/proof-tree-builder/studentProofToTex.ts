import type {ProofTree, TypeScheme} from "@/shared/core/application/typecheck/ProofTree.ts";
import {Rule} from "@/shared/core/application/typecheck/ProofTree.ts";
import type {Type} from "@/shared/core/domain/ast";
import type {StudentProofNode} from "@/shared/ui-state/studentProof.ts";
import type {GammaRegistry} from "@/shared/presentation/tex/GammaRegistry.ts";
import type {ExportTree} from "@/shared/presentation/tex/ebproofExport.ts";
import {TexMapper} from "@/shared/presentation/tex/TexMapper.ts";
import {gammaRefTex} from "@/features/proof-tree/components/proof-tree-builder/ConclusionBuilder.tsx";
import {RULE_LABELS} from "@/features/proof-tree/components/proof-tree-builder/ruleLabels.ts";

export interface StudentExportOptions {
  // Keys currently expanded in the browser, `${studentNode.id}:gamma` per
  // ConclusionBuilder's gammaKey — checked directly rather than through the
  // segment-index scheme the automatic/logic trees use, since a builder
  // node's judgement is one hand-assembled string, not a TexSegment[].
  expandedKeys: ReadonlySet<string>;
  highlightMistakes: boolean;
}

// A local variable's Γ membership is a given fact — mirrors
// ProofTreeBuilderNode's VariableMembershipLeaf.
function variableMembershipLeaf(answerNode: ProofTree, registry: GammaRegistry): ExportTree {
  const name = (answerNode.term as {name?: string}).name ?? "?";
  const judgement = `${name} : ${TexMapper.typeToTex(answerNode.type)} \\in ${gammaRefTex(answerNode.gamma, registry, false)}`;
  return {judgement, rule: ""};
}

// Converts the student's in-progress (studentNode, answerNode) pair into a
// TexTree snapshot of exactly what's currently on screen: only revealed
// premises, "?" for anything not yet filled in, and — when requested — the
// same green/red correctness highlighting as the "Highlight mistakes" toggle.
export function studentNodeToExportTree(
  studentNode: StudentProofNode,
  answerNode: ProofTree,
  parentGamma: Record<string, Type | TypeScheme>,
  registry: GammaRegistry,
  opts: StudentExportOptions,
): ExportTree {
  const hasChosenRule = studentNode.chosenRule !== undefined;
  const isLocalVar = hasChosenRule && answerNode.rule === Rule.Var && answerNode.premises.length === 0;

  const gammaKey = `${studentNode.id}:gamma`;
  const gammaExpanded = opts.expandedKeys.has(gammaKey);

  const termTex = TexMapper.termToTex(answerNode.term);
  const rhsTex = studentNode.writtenType ? TexMapper.typeToTex(studentNode.writtenType) : "?";
  const bindingTex = studentNode.writtenBindings?.length
    ? studentNode.writtenBindings.map((b) => `${b.name}:${TexMapper.typeToTex(b.type)}`).join(", ")
    : "?";

  const parentGammaRef = registry.refFor(parentGamma);
  const parentGammaTex = parentGammaRef ? gammaRefTex(parentGamma, registry, gammaExpanded) : null;
  const bindingSetTex = `\\{${bindingTex}\\}`;

  const gammaSegment = studentNode.requiresContextBuild
    ? (parentGammaTex ? `${parentGammaTex} \\cup ${bindingSetTex}` : bindingSetTex)
    : gammaRefTex(answerNode.gamma, registry, gammaExpanded);

  const judgement = `${gammaSegment} \\vdash ${termTex} : ${rhsTex}`;
  const ruleLabel = hasChosenRule ? (RULE_LABELS[studentNode.chosenRule!] ?? "?") : "pick rule";

  const anyInvalid = studentNode.ruleCheck === "invalid"
    || studentNode.typeCheck === "invalid"
    || studentNode.contextCheck === "invalid";
  const allValid = studentNode.ruleCheck === "valid"
    && studentNode.typeCheck === "valid"
    && (!studentNode.requiresContextBuild || studentNode.contextCheck === "valid");
  const highlight: ExportTree["highlight"] = !opts.highlightMistakes
    ? undefined
    : anyInvalid ? "invalid" : allValid ? "valid" : undefined;

  if (isLocalVar) {
    return {
      judgement,
      rule: ruleLabel,
      id: studentNode.id,
      highlight,
      children: [variableMembershipLeaf(answerNode, registry)],
    };
  }

  if (!hasChosenRule) {
    return {judgement, rule: ruleLabel, id: studentNode.id, highlight};
  }

  // Original index, not position in the filtered list — premises can be
  // revealed out of order (mirrors ProofTreeBuilderNode's premisesToShow).
  const children = studentNode.premises
    .map((premise, index) => ({premise, answer: answerNode.premises[index]}))
    .filter((p): p is {premise: StudentProofNode; answer: ProofTree} => p.premise.revealed && p.answer !== undefined)
    .map(({premise, answer}) => {
      const childParentGamma = answerNode.rule === Rule.Var ? answer.gamma : answerNode.gamma;
      return studentNodeToExportTree(premise, answer, childParentGamma, registry, opts);
    });

  return {judgement, rule: ruleLabel, id: studentNode.id, highlight, children};
}
