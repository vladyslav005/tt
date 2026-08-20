import {useMemo, useState} from "react";
import type {TexTree} from "@vladyslav005/tt-core";
import {collectBuildOrder} from "@/features/proof-tree/components/proof-tree-using-css/stepBuild.ts";

// Manual, click-through reveal of a proof tree in build order (the goal
// judgement first, then each premise needed to justify it) — the same order
// you'd fill the tree in by hand, starting from the conclusion.
export function useStepBuild(tree: TexTree | null, treeKey: string, enabled: boolean) {
  const buildOrder = useMemo(() => (tree ? collectBuildOrder(tree) : []), [tree]);
  const total = buildOrder.length;
  const initialStep = total > 0 ? 1 : 0;

  // Restart at the goal judgement whenever a new proof loads or step mode is toggled on.
  const runId = `${treeKey}:${enabled}`;
  const [prevRunId, setPrevRunId] = useState(runId);
  const [step, setStep] = useState(initialStep);
  if (runId !== prevRunId) {
    setPrevRunId(runId);
    setStep(initialStep);
  }

  const revealedSet = useMemo(() => new Set(buildOrder.slice(0, step)), [buildOrder, step]);

  return {
    isRevealed: (node: TexTree) => !enabled || revealedSet.has(node),
    step,
    total,
    canGoNext: step < total,
    canGoPrev: step > initialStep,
    goNext: () => setStep((s) => Math.min(s + 1, total)),
    goPrev: () => setStep((s) => Math.max(s - 1, initialStep)),
    reset: () => setStep(initialStep),
  };
}
