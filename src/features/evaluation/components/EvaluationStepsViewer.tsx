import { useState } from "react";
import type { Term, Type } from "@/shared/core/domain/ast";
import type { EvaluationResult, ReductionStep } from "@/shared/core/application/evaluation/type";
import { Button } from "@/shared/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowDown, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
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
    case "SumType":
      return (
        <>
          <TypeView type={type.left} />
          <span className="text-muted-foreground"> + </span>
          <TypeView type={type.right} />
        </>
      );
    case "TupleType":
      return (
        <>
          <span className="text-muted-foreground">⟨</span>
          {type.elements.map((e, i) => (
            <span key={i}>
              {i > 0 && <span className="text-muted-foreground"> × </span>}
              <TypeView type={e} />
            </span>
          ))}
          <span className="text-muted-foreground">⟩</span>
        </>
      );
    case "VariantType":
      return (
        <>
          <span className="text-muted-foreground">⟨</span>
          {type.variants.map((v, i) => (
            <span key={v.label}>
              {i > 0 && <span className="text-muted-foreground">, </span>}
              {v.label}:<TypeView type={v.type} />
            </span>
          ))}
          <span className="text-muted-foreground">⟩</span>
        </>
      );
    case "RecordType":
      return (
        <>
          <span className="text-muted-foreground">{"{"}</span>
          {type.fields.map((f, i) => (
            <span key={f.label}>
              {i > 0 && <span className="text-muted-foreground">, </span>}
              {f.label}:<TypeView type={f.type} />
            </span>
          ))}
          <span className="text-muted-foreground">{"}"}</span>
        </>
      );
  }
}

function TermView({
  term,
  selectedId,
  resultId,
  errorId,
}: {
  term: Term;
  selectedId?: string;
  resultId?: string;
  errorId?: string;
}) {
  const isError = errorId !== undefined && term.id === errorId;
  const isResult = !isError && resultId !== undefined && term.id === resultId;
  const isSelected = !isError && !isResult && selectedId !== undefined && term.id === selectedId;

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
            {term.paramType && (
              <>
                <span className="text-muted-foreground"> : </span>
                <TypeView type={term.paramType} />
              </>
            )}
            <span className="text-muted-foreground"> . </span>
            <TermView term={term.body} selectedId={selectedId} resultId={resultId} errorId={errorId} />
          </>
        );
      case "App":
        return (
          <>
            <span className="text-muted-foreground">(</span>
            <TermView term={term.func} selectedId={selectedId} resultId={resultId} errorId={errorId} />
            <span className="text-muted-foreground"> </span>
            <TermView term={term.arg} selectedId={selectedId} resultId={resultId} errorId={errorId} />
            <span className="text-muted-foreground">)</span>
          </>
        );
      case "Let":
        return (
          <>
            <span className="text-emerald-600 dark:text-emerald-400">let </span>
            <span>{term.name}</span>
            <span className="text-muted-foreground"> = </span>
            <TermView term={term.value} selectedId={selectedId} resultId={resultId} errorId={errorId} />
            <span className="text-emerald-600 dark:text-emerald-400"> in </span>
            <TermView term={term.body} selectedId={selectedId} resultId={resultId} errorId={errorId} />
          </>
        );
      case "Inl":
        return (
          <>
            <span className="text-rose-600 dark:text-rose-400">inl </span>
            <TermView term={term.term} selectedId={selectedId} resultId={resultId} errorId={errorId} />
            <span className="text-muted-foreground"> as </span>
            <TypeView type={term.type} />
          </>
        );
      case "Inr":
        return (
          <>
            <span className="text-pink-600 dark:text-pink-400">inr </span>
            <TermView term={term.term} selectedId={selectedId} resultId={resultId} errorId={errorId} />
            <span className="text-muted-foreground"> as </span>
            <TypeView type={term.type} />
          </>
        );
      case "IfCondition":
        return (
          <>
            <span className="text-cyan-600 dark:text-cyan-400">if </span>
            <TermView term={term.condition} selectedId={selectedId} resultId={resultId} errorId={errorId} />
            <span className="text-cyan-600 dark:text-cyan-400"> then </span>
            <TermView term={term.then} selectedId={selectedId} resultId={resultId} errorId={errorId} />
            {(term.elif ?? []).map((b, i) => (
              <span key={i}>
                <span className="text-cyan-600 dark:text-cyan-400"> elseif </span>
                <TermView term={b.condition} selectedId={selectedId} resultId={resultId} errorId={errorId} />
                <span className="text-cyan-600 dark:text-cyan-400"> then </span>
                <TermView term={b.then} selectedId={selectedId} resultId={resultId} errorId={errorId} />
              </span>
            ))}
            {term.else && (
              <>
                <span className="text-cyan-600 dark:text-cyan-400"> else </span>
                <TermView term={term.else} selectedId={selectedId} resultId={resultId} errorId={errorId} />
              </>
            )}
          </>
        );
      case "Case":
        return (
          <>
            <span className="text-indigo-600 dark:text-indigo-400">case </span>
            <TermView term={term.variable} selectedId={selectedId} resultId={resultId} errorId={errorId} />
            <span className="text-indigo-600 dark:text-indigo-400"> of inl {term.inl.variable} ⇒ </span>
            <TermView term={term.inl.term} selectedId={selectedId} resultId={resultId} errorId={errorId} />
            <span className="text-indigo-600 dark:text-indigo-400"> | inr {term.inr.variable} ⇒ </span>
            <TermView term={term.inr.term} selectedId={selectedId} resultId={resultId} errorId={errorId} />
          </>
        );
      case "VariantCase":
        return (
          <>
            <span className="text-violet-600 dark:text-violet-400">case </span>
            <TermView term={term.variable} selectedId={selectedId} resultId={resultId} errorId={errorId} />
            <span className="text-violet-600 dark:text-violet-400"> of </span>
            {term.cases.map((c, i) => (
              <span key={i}>
                {i > 0 && <span className="text-violet-600 dark:text-violet-400"> | </span>}
                [{c.label}={c.variable}] ⇒{" "}
                <TermView term={c.body} selectedId={selectedId} resultId={resultId} errorId={errorId} />
              </span>
            ))}
          </>
        );
      case "Variant":
        return (
          <>
            <span className="text-fuchsia-600 dark:text-fuchsia-400">[</span>
            {term.variants.map((v, i) => (
              <span key={i}>
                {i > 0 && <span className="text-muted-foreground">, </span>}
                {v.label}=<TermView term={v.term} selectedId={selectedId} resultId={resultId} errorId={errorId} />
              </span>
            ))}
            <span className="text-fuchsia-600 dark:text-fuchsia-400">] </span>
            <span className="text-muted-foreground">as </span>
            <TypeView type={term.type} />
          </>
        );
      case "Ascribe":
        return (
          <>
            <TermView term={term.term} selectedId={selectedId} resultId={resultId} errorId={errorId} />
            <span className="text-teal-600 dark:text-teal-400"> as </span>
            <TypeView type={term.type} />
          </>
        );
      case "TupleProjection":
        return (
          <>
            <TermView term={term.tuple} selectedId={selectedId} resultId={resultId} errorId={errorId} />
            <span className="text-lime-600 dark:text-lime-400">.{term.index}</span>
          </>
        );
      case "RecordProjection":
        return (
          <>
            <TermView term={term.term} selectedId={selectedId} resultId={resultId} errorId={errorId} />
            <span className="text-orange-600 dark:text-orange-400">.{term.label}</span>
          </>
        );
      case "Record":
        return (
          <>
            <span className="text-orange-600 dark:text-orange-400">⟨</span>
            {term.fields.map((f, i) => (
              <span key={i}>
                {i > 0 && <span className="text-muted-foreground">, </span>}
                {f.label}=<TermView term={f.term} selectedId={selectedId} resultId={resultId} errorId={errorId} />
              </span>
            ))}
            <span className="text-orange-600 dark:text-orange-400">⟩</span>
          </>
        );
      case "Sequencing":
        return (
          <>
            <TermView term={term.first} selectedId={selectedId} resultId={resultId} errorId={errorId} />
            <span className="text-sky-600 dark:text-sky-400">; </span>
            <TermView term={term.second} selectedId={selectedId} resultId={resultId} errorId={errorId} />
          </>
        );
      case "Tuple":
        return (
          <>
            <span className="text-lime-600 dark:text-lime-400">⟨</span>
            {term.elements.map((e, i) => (
              <span key={i}>
                {i > 0 && <span className="text-muted-foreground">, </span>}
                <TermView term={e} selectedId={selectedId} resultId={resultId} errorId={errorId} />
              </span>
            ))}
            <span className="text-lime-600 dark:text-lime-400">⟩</span>
          </>
        );
      case "DummyAbstraction":
        return (
          <>
            <span className="text-violet-600 dark:text-violet-400">λ_</span>
            <span className="text-muted-foreground"> : </span>
            <TypeView type={term.paramType} />
            <span className="text-muted-foreground"> . </span>
            <TermView term={term.body} selectedId={selectedId} resultId={resultId} errorId={errorId} />
          </>
        );
      case "BinOp":
        return (
          <>
            <span className="text-muted-foreground">(</span>
            <TermView term={term.left} selectedId={selectedId} resultId={resultId} errorId={errorId} />
            <span className="text-amber-600 dark:text-amber-400"> {term.operator} </span>
            <TermView term={term.right} selectedId={selectedId} resultId={resultId} errorId={errorId} />
            <span className="text-muted-foreground">)</span>
          </>
        );
    }
  })();

  if (isError) {
    return (
      <span className="bg-destructive/15 text-destructive rounded px-0.5 ring-1 ring-destructive/40 font-semibold">
        {inner}
      </span>
    );
  }

  if (isResult) {
    return (
      <span className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 rounded px-0.5 ring-1 ring-emerald-500/30 font-semibold">
        {inner}
      </span>
    );
  }

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
  resultId,
  errorId,
  label,
  hasError,
}: {
  term: Term;
  selectedId?: string;
  resultId?: string;
  errorId?: string;
  label: string;
  hasError?: boolean;
}) {
  return (
    <div>
      <div className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">{label}</div>
      <div
        className={cn(
          "p-4 rounded-xl border font-mono text-sm leading-relaxed overflow-x-auto",
          hasError ? "bg-destructive/5 border-destructive/30" : "bg-muted/30",
        )}
      >
        <TermView term={term} selectedId={selectedId} resultId={resultId} errorId={errorId} />
      </div>
    </div>
  );
}

function ViewToggle({
  mode,
  onChange,
}: {
  mode: "single" | "all";
  onChange: (m: "single" | "all") => void;
}) {
  return (
    <div className="flex rounded-md border overflow-hidden text-xs shrink-0">
      <button
        className={cn(
          "px-2.5 py-1 transition-colors",
          mode === "single" ? "bg-muted font-medium" : "hover:bg-muted/50",
        )}
        onClick={() => onChange("single")}
      >
        Step
      </button>
      <button
        className={cn(
          "px-2.5 py-1 border-l transition-colors",
          mode === "all" ? "bg-muted font-medium" : "hover:bg-muted/50",
        )}
        onClick={() => onChange("all")}
      >
        All
      </button>
    </div>
  );
}

interface StepRowProps {
  step: ReductionStep;
  index: number;
  isLast: boolean;
  isError: boolean;
  stuckTermId?: string;
  onClick?: () => void;
}

function StepRow({ step, index, isError: isErrorStep, stuckTermId, onClick }: StepRowProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-3 flex flex-col gap-2 transition-colors",
        isErrorStep
          ? "bg-destructive/5 border-destructive/20"
          : "bg-muted/20 hover:bg-muted/40 cursor-pointer",
      )}
      onClick={!isErrorStep ? onClick : undefined}
      title={!isErrorStep ? "Click to inspect this step" : undefined}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "text-xs font-semibold px-1.5 py-0.5 rounded-md",
            isErrorStep
              ? "bg-destructive/10 text-destructive"
              : "bg-orange-500/10 text-orange-600 dark:text-orange-400",
          )}
        >
          {index + 1}
        </span>
        <span className="text-xs text-muted-foreground">
          {isErrorStep ? "stuck — no reduction possible" : "β-reduction"}
        </span>
      </div>

      <div className="font-mono text-sm overflow-x-auto">
        <TermView term={step.before} selectedId={step.selectedId} />
      </div>

      <div className="flex items-center gap-1.5 text-muted-foreground">
        <ArrowDown className={cn("h-3.5 w-3.5 shrink-0", isErrorStep && "text-destructive")} />
      </div>

      <div className="font-mono text-sm overflow-x-auto">
        <TermView
          term={step.after}
          resultId={!isErrorStep ? step.resultId : undefined}
          errorId={isErrorStep ? stuckTermId : undefined}
        />
      </div>
    </div>
  );
}

interface EvaluationStepsViewerProps {
  evaluation: EvaluationResult;
}

export function EvaluationStepsViewer({ evaluation }: EvaluationStepsViewerProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"single" | "all">("single");
  const { steps, result, reachedStepLimit, errors } = evaluation;

  const hasErrors = errors && errors.length > 0;
  const stuckTermId = errors?.[0]?.stuckTermId;

  if (steps.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <div className="p-4 rounded-xl bg-muted/30 border text-center">
          <p className="text-sm text-muted-foreground">
            {hasErrors
              ? "Expression is stuck — no reductions are possible."
              : "Expression is already in normal form — no reduction steps needed."}
          </p>
        </div>
        <TermBox term={result} label={hasErrors ? "Stuck term" : "Normal form"} errorId={stuckTermId} hasError={hasErrors} />
        {hasErrors && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-destructive/5 border border-destructive/20 text-destructive text-sm">
            <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{errors[0].message}</span>
          </div>
        )}
      </div>
    );
  }

  const currentStep = steps[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === steps.length - 1;
  const isErrorStep = isLastStep && hasErrors;

  if (viewMode === "all") {
    return (
      <div className="flex flex-col gap-4 h-full overflow-y-auto">
        <div className="flex items-center justify-between sticky top-0 backdrop-blur-sm py-1 z-10">
          <span className="text-sm font-medium">{steps.length} step{steps.length !== 1 ? "s" : ""}</span>
          <ViewToggle mode={viewMode} onChange={setViewMode} />
        </div>

        <div className="flex flex-col gap-2">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            const isStepError = isLast && !!hasErrors;
            return (
              <StepRow
                key={i}
                step={step}
                index={i}
                isLast={isLast}
                isError={isStepError}
                stuckTermId={stuckTermId}
                onClick={() => { setStepIndex(i); setViewMode("single"); }}
              />
            );
          })}
        </div>

        {!hasErrors && (
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

        {hasErrors && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-destructive/5 border border-destructive/20 text-destructive text-sm">
            <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{errors![0].message}</span>
          </div>
        )}

        {reachedStepLimit && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-yellow-700 dark:text-yellow-500 text-sm">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>Step limit reached — evaluation may not be complete.</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      {/* Navigation */}
      <div className="flex items-center justify-between gap-3 sticky top-0 backdrop-blur-sm py-1 z-10">
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
            {steps.map((_, i) => {
              const isLast = i === steps.length - 1;
              const isActive = i === stepIndex;
              return (
                <button
                  key={i}
                  onClick={() => setStepIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-200",
                    isActive
                      ? isLast && hasErrors
                        ? "w-4 bg-destructive"
                        : "w-4 bg-orange-500"
                      : isLast && hasErrors
                        ? "w-1.5 bg-destructive/40 hover:bg-destructive/70"
                        : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60",
                  )}
                  aria-label={`Go to step ${i + 1}`}
                />
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ViewToggle mode={viewMode} onChange={setViewMode} />
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
      </div>

      {/* Step display */}
      <TermBox
        term={currentStep.before}
        selectedId={currentStep.selectedId}
        label="Before"
      />

      <div className="flex items-center gap-2 text-muted-foreground px-2">
        <ArrowDown className={cn("h-4 w-4 shrink-0", isErrorStep && "text-destructive")} />
        <span className="text-xs">{isErrorStep ? "stuck — no reduction possible" : "β-reduction"}</span>
      </div>

      <TermBox
        term={currentStep.after}
        label="After"
        resultId={!isErrorStep ? currentStep.resultId : undefined}
        errorId={isErrorStep ? stuckTermId : undefined}
        hasError={isErrorStep}
      />

      {isErrorStep && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-destructive/5 border border-destructive/20 text-destructive text-sm">
          <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{errors![0].message}</span>
        </div>
      )}

      {isLastStep && !hasErrors && (
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

      {reachedStepLimit && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-yellow-700 dark:text-yellow-500 text-sm">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>Step limit reached — evaluation may not be complete.</span>
        </div>
      )}
    </div>
  );
}
