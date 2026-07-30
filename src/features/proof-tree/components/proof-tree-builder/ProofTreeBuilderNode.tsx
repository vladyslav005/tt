import {Fragment, memo} from "react";
import type {ProofTree} from "@/shared/core/application/typecheck/ProofTree.ts";
import type {StudentProofNode} from "@/shared/ui-state/studentProof.ts";
import {ConclusionBuilder} from "@/features/proof-tree/components/proof-tree-builder/ConclusionBuilder.tsx";
import {RulePickerPopover} from "@/features/proof-tree/components/proof-tree-builder/RulePickerPopover.tsx";
import {RULE_LABELS} from "@/features/proof-tree/components/proof-tree-builder/ruleLabels.ts";
import {cn} from "@/shared/lib/utils.ts";
import "@/features/proof-tree/components/proof-tree-using-css/ProofTree.css";

interface ProofTreeBuilderNodeProps {
  studentNode: StudentProofNode;
  answerNode: ProofTree;
  root?: boolean;
}

// Structurally mirrors ProofTreeComponentUsingCss (same .proof-node >
// .premises + .conclusion shape, same ProofTree.css classes, imported
// above) so a finished hand-built tree looks the same as the automatic
// one — but recurses over the (student, answer) pair in lockstep instead
// of a single already-solved TexTree, and only shows premises the student
// has revealed by picking a structurally valid rule.
// Memoized so that picking a rule / writing a type on one node — which,
// under Immer, gives every ANCESTOR of that node a new object reference —
// doesn't force every UNTOUCHED sibling subtree (and its own MathJax
// typesetting) to re-render too. Immer's structural sharing means a node
// whose own data didn't change keeps the exact same object reference, so
// a plain reference-equality check here is exactly the right comparison.
export const ProofTreeBuilderNode = memo(function ProofTreeBuilderNode({studentNode, answerNode, root = true}: ProofTreeBuilderNodeProps) {
  const hasChosenValidRule = studentNode.chosenRule !== undefined && studentNode.ruleValid === true;
  const isLeaf = hasChosenValidRule && studentNode.premises.length === 0;
  const showDashedPlaceholder = !hasChosenValidRule;
  const premisesToShow = hasChosenValidRule
    ? studentNode.premises.filter((p) => p.revealed)
    : [];

  const typeSlotUnlocked = hasChosenValidRule
    && studentNode.premises.every((p) => p.writtenType !== undefined);

  const isItRoot = root ? "root" : "not-root";
  const isItLeaf = isLeaf ? "leaf-node" : "not-leaf-node";

  const ruleLabel = studentNode.chosenRule !== undefined ? RULE_LABELS[studentNode.chosenRule] : undefined;

  return (
    <div className="proof-node">
      {(!isLeaf) && (
        <div
          className="premises"
          style={showDashedPlaceholder ? {borderBottomStyle: "dashed", opacity: 0.5} : undefined}
        >
          {premisesToShow.map((premise, index) => {
            const answerPremise = answerNode.premises[index];
            if (!answerPremise) return null;
            return (
              <Fragment key={premise.id}>
                <ProofTreeBuilderNode root={false} studentNode={premise} answerNode={answerPremise}/>
                {index !== premisesToShow.length - 1 && <div className="inter-proof"/>}
              </Fragment>
            );
          })}
        </div>
      )}

      <div className={`conclusion ${isItRoot} ${isItLeaf}`}>
        <div className="conclusion-left"/>

        <div
          className={cn(
            `conclusion-center ${isItLeaf} ${isItRoot} rounded-md my-1.5 px-2 flex items-center gap-2 transition-all duration-200`,
            studentNode.ruleValid === false && "bg-destructive/10 border border-destructive/30 dark:bg-destructive/15 dark:border-destructive/40",
            studentNode.typeCheck === "invalid" && "bg-destructive/10 border border-destructive/30 dark:bg-destructive/15 dark:border-destructive/40",
            studentNode.typeCheck === "valid" && "bg-emerald-500/10 border border-emerald-500/30 dark:bg-emerald-500/15 dark:border-emerald-500/40",
          )}
          title={studentNode.ruleValid === false
            ? `"${studentNode.chosenRule !== undefined ? RULE_LABELS[studentNode.chosenRule] : ""}" doesn't apply to this term`
            : studentNode.typeCheck === "invalid"
              ? "Type doesn't match — press Check Proof again after fixing it"
              : undefined}
        >
          <ConclusionBuilder studentNode={studentNode} answerNode={answerNode} typeSlotUnlocked={typeSlotUnlocked}/>
        </div>

        <div className="conclusion-right">
          <RulePickerPopover nodeId={studentNode.id}>
            <p
              className={cn(
                "rule-name cursor-pointer select-none hover:underline",
                studentNode.ruleValid === false && "text-destructive",
              )}
            >
              {ruleLabel ?? "pick rule"}
            </p>
          </RulePickerPopover>
        </div>
      </div>
    </div>
  );
});
