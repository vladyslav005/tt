import { useState } from "react";
import type { Term, Type } from "@/shared/core/domain/ast";
import type { EvaluationResult } from "@/shared/core/domain/evaluation/type";
import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowDown, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/shared/lib/utils";

function TypeView({ type }: { type: Type }) {
  switch (type.kind) {
    case "TyVar":
      return <span className="text-blue-600 dark:text-blue-400">{type.name}</span>;
    case "TyArrow":
      return (
        <>
          <TypeView type={type.from} />
          <span className="text-muted-foreground"> → </span>
          <TypeView type={type.to} />
        </>
      );
  }
}

function TermView({ term, selectedId }: { term: Term; selectedId?: string }) {
  const isSelected = selectedId !== undefined && term.id === selectedId;

  const inner = (() => {
    switch (term.kind) {
      case "Var":
        return <span>{term.name}</span>;
      case "Lit":
        return <span className="text-amber-600 dark:text-amber-400">{term.value}</span>;
      case "Abs":
        return (
          <>
            <span className="text-purple-600 dark:text-purple-400">λ</span>
            <span> {term.param}</span>
            <span className="text-muted-foreground"> : </span>
            <TypeView type={term.paramType} />
            <span className="text-muted-foreground"> . </span>
            <TermView term={term.body} selectedId={selectedId} />
          </>
        );
      case "App":
        return (
          <>
            <span className="text-muted-foreground">(</span>
            <TermView term={term.func} selectedId={selectedId} />
            <span className="text-muted-foreground"> </span>
            <TermView term={term.arg} selectedId={selectedId} />
            <span className="text-muted-foreground">)</span>
          </>
        );
    }
  })();

  if (isSelected) {
    return (
      <span className="bg-orange-500/15 text-orange-600 dark:text-orange-400 rounded px-0.5 ring-1 ring-orange-500/40 font-semibold">
        {inner}
      </span>
    );
  }

  return <>{inner}</>;
}

function TermBox({
  term,
  selectedId,
  label,
  className,
}: {
  term: Term;
  selectedId?: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">{label}</div>
      <div className="p-4 rounded-xl bg-muted/30 border font-mono text-sm leading-relaxed overflow-x-auto">
        <TermView term={term} selectedId={selectedId} />
      </div>
    </div>
  );
}

interface EvaluationStepsViewerProps {
  evaluation: EvaluationResult;
}

export function EvaluationStepsViewer({ evaluation }: EvaluationStepsViewerProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const { steps, result, reachedStepLimit } = evaluation;

  if (steps.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full">
        <div className="p-4 rounded-xl bg-muted/30 border text-center">
          <p className="text-sm text-muted-foreground">Expression is already in normal form — no reduction steps needed.</p>
        </div>
        <TermBox term={result} label="Normal form" />
      </div>
    );
  }

  const currentStep = steps[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === steps.length - 1;

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      {/* Navigation */}
      <div className="flex items-center justify-between gap-3 sticky top-0 bg-background/80 backdrop-blur-sm py-1 z-10">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
          disabled={isFirstStep}
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </Button>

        <div className="flex flex-col items-center gap-1.5 flex-1">
          <span className="text-sm font-medium">
            Step {stepIndex + 1} of {steps.length}
          </span>
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setStepIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-200",
                  i === stepIndex
                    ? "w-4 bg-orange-500"
                    : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60",
                )}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setStepIndex((i) => Math.min(steps.length - 1, i + 1))}
          disabled={isLastStep}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Step display */}
      <TermBox term={currentStep.before} selectedId={currentStep.selectedId} label="Before" />

      <div className="flex items-center gap-2 text-muted-foreground px-2">
        <ArrowDown className="h-4 w-4 shrink-0" />
        <span className="text-xs">β-reduction</span>
      </div>

      <TermBox term={currentStep.after} label="After" />

      {/* Final result */}
      {isLastStep && (
        <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-4 w-4 text-orange-600 dark:text-orange-500" />
            <span className="text-xs font-medium text-orange-600 dark:text-orange-500 uppercase tracking-wide">
              Final result
            </span>
          </div>
          <div className="font-mono text-sm overflow-x-auto">
            <TermView term={result} />
          </div>
        </div>
      )}

      {/* Step limit warning */}
      {reachedStepLimit && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-yellow-700 dark:text-yellow-500 text-sm">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>Step limit reached — evaluation may not be complete.</span>
        </div>
      )}
    </div>
  );
}
