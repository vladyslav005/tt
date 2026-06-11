import {useAppSelector} from "@/shared/hooks/reduxHooks.ts";
import {useRef} from "react";
import {useFullscreen} from "@/shared/hooks/useFullscreen.ts";
import {motion} from "framer-motion";
import {cn} from "@/shared/lib/utils.ts";
import {fadeInUp} from "@/features/error-output/components/ErrorOutput.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/components/ui/card.tsx";
import {Calculator, Maximize2, Minimize2} from "lucide-react";
import {Button} from "@/shared/components/ui/button.tsx";
import {EvaluationStepsViewer} from "@/features/evaluation/components/EvaluationStepsViewer.tsx";
import {EvaluationStrategy} from "@/shared/core/domain/evaluation/type.ts";

const strategyLabel: Record<EvaluationStrategy, string> = {
  [EvaluationStrategy.NORMAL]: "Normal Order",
  [EvaluationStrategy.CALL_BY_VALUE]: "Call by Value",
  [EvaluationStrategy.CALL_BY_NAME]: "Call by Name",
};

interface EvaluationVisualisationProps {
  className?: string;
}

export function EvaluationVisualisation({
  className,
}: EvaluationVisualisationProps) {
  const evaluation = useAppSelector((state) => state.term.evaluation);
  const hasEvaluation = evaluation !== null && evaluation !== undefined;
  const containerRef = useRef<HTMLDivElement>(null);
  const {isFullscreen, isPseudoFullscreen, toggle} = useFullscreen(containerRef);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        className,
        "h-full",
        isPseudoFullscreen && "fixed inset-0 z-50 m-0 h-[100dvh] w-[100dvw] overflow-auto bg-background",
      )}
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-500">
                <Calculator className="h-5 w-5"/>
              </div>
              <div>
                <CardTitle className="text-2xl">Evaluation</CardTitle>
                <CardDescription>
                  {hasEvaluation ? (
                    <span className="flex items-center gap-2 flex-wrap">
                      <span>Step-by-step reduction</span>
                      <span className="inline-flex items-center rounded-md border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 text-xs font-medium text-orange-600 dark:text-orange-400">
                        {strategyLabel[evaluation.strategy]}
                      </span>
                    </span>
                  ) : "No evaluation available"}
                </CardDescription>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={toggle}
              className="shrink-0"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          {hasEvaluation ? (
            <div className="space-y-4 h-full flex flex-col">
              <div className="flex-1 rounded-xl border overflow-hidden bg-muted/30 p-4">
                <EvaluationStepsViewer key={evaluation.result.id} evaluation={evaluation} />
              </div>
              <details className="group">
                <summary
                  className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-3 rounded-lg hover:bg-muted/50">
                  <span className="inline-flex items-center gap-2">
                    View Raw Steps Data (DEBUG)
                  </span>
                </summary>
                <div className="mt-3 p-4 rounded-xl bg-muted/50 border">
                  <pre className="text-xs overflow-x-auto text-foreground/80">
                    {JSON.stringify(evaluation, null, 2)}
                  </pre>
                </div>
              </details>
            </div>
          ) : (
            <div className="p-6 text-center rounded-xl bg-muted/30 border">
              <p className="text-sm text-muted-foreground">
                Type a valid expression to generate an AST.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
