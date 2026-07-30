import {Fragment, memo} from "react";
import {MathJax} from "better-react-mathjax";
import {RotateCcw} from "lucide-react";
import type {ProofTree, TypeScheme} from "@/shared/core/application/typecheck/ProofTree.ts";
import {Rule} from "@/shared/core/application/typecheck/ProofTree.ts";
import type {Type} from "@/shared/core/domain/ast";
import type {StudentProofNode} from "@/shared/ui-state/studentProof.ts";
import {ConclusionBuilder, gammaTex} from "@/features/proof-tree/components/proof-tree-builder/ConclusionBuilder.tsx";
import {RulePickerPopover} from "@/features/proof-tree/components/proof-tree-builder/RulePickerPopover.tsx";
import {RULE_LABELS} from "@/features/proof-tree/components/proof-tree-builder/ruleLabels.ts";
import {TexMapper} from "@/shared/presentation/tex/TexMapper.ts";
import {useAppDispatch} from "@/shared/hooks/reduxHooks.ts";
import {resetNode} from "@/shared/ui-state/termSlice.ts";
import {cn} from "@/shared/lib/utils.ts";
import "@/features/proof-tree/components/proof-tree-using-css/ProofTree.css";

interface ProofTreeBuilderNodeProps {
  studentNode: StudentProofNode;
  answerNode: ProofTree;
  // The context this node's own Γ was built on top of — its parent's real
  // gamma (or its own, at the root, where there's nothing to extend).
  parentGamma: Record<string, Type | TypeScheme>;
  // Student-controlled (ProofTreeBuilder's "Highlight mistakes" switch) —
  // off by default so a wrong rule pick or a failed Check Proof doesn't
  // visually give away "this one's wrong" just by looking at the tree; the
  // underlying structural rejection (no premises spawn from an invalid
  // rule) still applies either way, only the red/tooltip feedback is gated.
  highlightMistakes: boolean;
  root?: boolean;
}

// T-Var's real ProofTree premises (when present) are the "jump to
// definition" sub-proof for a global reference — a separate, already-
// established fact, not something this exercise asks the student to
// re-derive (same "mechanical, not worth quizzing" treatment already given
// to context extension). The automatic view shows this fact instead, not
// as a real derivation step but as a fixed leaf stating "name : Type is a
// member of Γ" (TexMapper.variableMembershipTex) — reproduced here as a
// static, non-interactive node so a Var leaf looks the same as it does
// there, rather than a bare box with nothing underneath it.
function VariableMembershipLeaf({answerNode}: { answerNode: ProofTree }) {
  const name = (answerNode.term as {name?: string}).name ?? "?";
  const judgement = `${name} : ${TexMapper.typeToTex(answerNode.type)} \\in ${gammaTex(answerNode.gamma)}`;
  return (
    <div className="proof-node">
      <div className="conclusion not-root leaf-node">
        <div className="conclusion-left"/>
        <div className="conclusion-center leaf-node not-root rounded-md my-1.5 px-2 flex items-center gap-2 text-muted-foreground">
          <MathJax key={judgement}>{`\\[ ${judgement} \\]`}</MathJax>
        </div>
        <div className="conclusion-right"/>
      </div>
    </div>
  );
}

// Structurally mirrors ProofTreeComponentUsingCss (same .proof-node >
// .premises + .conclusion shape, same ProofTree.css classes, imported
// above) so a finished hand-built tree looks the same as the automatic
// one — including that EVERY node shows the premises line once its rule is
// decided, leaves included (the automatic view always does; a leaf's
// "children" there is an empty array, not omitted, so the line still
// draws) — but recurses over the (student, answer) pair in lockstep
// instead of a single already-solved TexTree, and only shows premises the
// student has revealed. Note this is gated on ANY rule being chosen, not a
// correct one — a wrong pick still lets the student explore the real
// premises and fill in the rest of the subtree; only Check Proof judges it.
// Memoized so that picking a rule / writing a type on one node — which,
// under Immer, gives every ANCESTOR of that node a new object reference —
// doesn't force every UNTOUCHED sibling subtree (and its own MathJax
// typesetting) to re-render too. Immer's structural sharing means a node
// whose own data didn't change keeps the exact same object reference, so
// a plain reference-equality check here is exactly the right comparison.
export const ProofTreeBuilderNode = memo(function ProofTreeBuilderNode({studentNode, answerNode, parentGamma, highlightMistakes, root = true}: ProofTreeBuilderNodeProps) {
  const dispatch = useAppDispatch();
  const hasChosenRule = studentNode.chosenRule !== undefined;
  // Keyed off the REAL rule, not the student's guess — the membership leaf
  // is a fact about the term (same category as "these are its premises"),
  // not something that should appear or vanish depending on whether the
  // student happened to guess Var.
  const isVar = hasChosenRule && answerNode.rule === Rule.Var;
  const isLeaf = hasChosenRule && studentNode.premises.length === 0;
  const showDashedPlaceholder = !hasChosenRule;
  // Pairs each shown premise with its own ORIGINAL index (not its position
  // in this filtered/shown list) — premises can be revealed in any order
  // (see ConclusionBuilder's premise-click wrapping), so a revealed premise
  // at original index 1 with index 0 still unrevealed must not shift up and
  // accidentally pair with answerNode.premises[0].
  const premisesToShow = hasChosenRule
    ? studentNode.premises
      .map((premise, originalIndex) => ({premise, originalIndex}))
      .filter(({premise}) => premise.revealed)
    : [];

  const contextFilled = !studentNode.requiresContextBuild || studentNode.writtenBindings !== undefined;
  const typeSlotUnlocked = hasChosenRule
    && contextFilled
    && studentNode.premises.every((p) => p.writtenType !== undefined);

  const isItRoot = root ? "root" : "not-root";
  const isItLeaf = isLeaf ? "leaf-node" : "not-leaf-node";

  const ruleLabel = studentNode.chosenRule !== undefined ? RULE_LABELS[studentNode.chosenRule] : undefined;

  const anyInvalid = studentNode.ruleCheck === "invalid"
    || studentNode.typeCheck === "invalid"
    || studentNode.contextCheck === "invalid";
  const allValid = studentNode.ruleCheck === "valid"
    && studentNode.typeCheck === "valid"
    && (!studentNode.requiresContextBuild || studentNode.contextCheck === "valid");

  return (
    <div className="proof-node">
      <div
        className="premises"
        style={showDashedPlaceholder ? {borderBottomStyle: "dashed", opacity: 0.5} : undefined}
      >
        {isVar && <VariableMembershipLeaf answerNode={answerNode}/>}
        {!isVar && premisesToShow.map(({premise, originalIndex}, displayIndex) => {
          const answerPremise = answerNode.premises[originalIndex];
          if (!answerPremise) return null;
          return (
            <Fragment key={premise.id}>
              <ProofTreeBuilderNode
                root={false}
                studentNode={premise}
                answerNode={answerPremise}
                parentGamma={answerNode.gamma}
                highlightMistakes={highlightMistakes}
              />
              {displayIndex !== premisesToShow.length - 1 && <div className="inter-proof"/>}
            </Fragment>
          );
        })}
      </div>

      <div className={`conclusion ${isItRoot} ${isItLeaf}`}>
        <div className="conclusion-left"/>

        <div
          className={cn(
            `conclusion-center ${isItLeaf} ${isItRoot} rounded-md my-1.5 px-2 flex items-center gap-2 transition-all duration-200`,
            highlightMistakes && anyInvalid && "bg-destructive/10 border border-destructive/30 dark:bg-destructive/15 dark:border-destructive/40",
            allValid && "bg-emerald-500/10 border border-emerald-500/30 dark:bg-emerald-500/15 dark:border-emerald-500/40",
          )}
          title={highlightMistakes && anyInvalid
            ? "Doesn't match — press Check Proof again after fixing it"
            : undefined}
        >
          <ConclusionBuilder
            studentNode={studentNode}
            answerNode={answerNode}
            parentGamma={parentGamma}
            typeSlotUnlocked={typeSlotUnlocked}
          />
          {studentNode.chosenRule !== undefined && (
            <button
              type="button"
              className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
              title="Reset this node"
              onClick={() => dispatch(resetNode({nodeId: studentNode.id}))}
            >
              <RotateCcw className="h-3 w-3"/>
            </button>
          )}
        </div>

        <div className="conclusion-right">
          <RulePickerPopover nodeId={studentNode.id}>
            <p
              className={cn(
                "rule-name cursor-pointer select-none hover:underline",
                highlightMistakes && studentNode.ruleCheck === "invalid" && "text-destructive",
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
