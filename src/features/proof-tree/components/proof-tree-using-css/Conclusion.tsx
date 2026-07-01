import type {TexTree} from "@/shared/presentation/tex/texTree.ts";
import {MathJax} from "better-react-mathjax";
import "./ProofTree.css"
import {cn} from "@/shared/lib/utils.ts";
import {AlertCircle, ChevronDown, ChevronRight} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/shared/components/ui/tooltip.tsx";

interface ConclusionCenterProps {
  isItLeaf: string;
  isItRoot: string;
  node: TexTree;
  isDef?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export const Conclusion = (props: ConclusionCenterProps) => {
  const {isDef = false, isExpanded = false, onToggle} = props;
  const containsError = props.node.error !== undefined;

  const inner = (
    <div
      className={cn(
        `conclusion-center ${props.isItLeaf} ${props.isItRoot} rounded-md my-1.5 px-2 flex items-center gap-2 transition-all duration-200`,
        containsError
          ? "bg-destructive/10 border border-destructive/20 dark:bg-destructive/20 dark:border-destructive/30 hover:bg-destructive/15 dark:hover:bg-destructive/25"
          : "",
        isDef
          ? "cursor-pointer hover:bg-primary/10 border border-transparent hover:border-primary/20 select-none"
          : "",
      )}
      onClick={isDef ? onToggle : undefined}
    >
      {isDef && (
        <span className="text-primary shrink-0">
          {isExpanded
            ? <ChevronDown className="h-3.5 w-3.5"/>
            : <ChevronRight className="h-3.5 w-3.5"/>
          }
        </span>
      )}

      <MathJax className="flex-1" >
        {`\\[ ${props.node.judgement} \\]`}
      </MathJax>

      {containsError && (
        <div
          className="flex items-center gap-1.5 text-destructive group cursor-help"
          title={props.node.error}
        >
          <AlertCircle className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110"/>
          <span className="text-xs font-medium whitespace-nowrap">Error</span>
        </div>
      )}
    </div>
  );

  if (!isDef) return inner;

  const varName = props.node.meta ?? "variable";
  const tooltipText = isExpanded
    ? `Hide proof of ${varName}`
    : `Show proof of ${varName}`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{inner}</TooltipTrigger>
        <TooltipContent side="top">{tooltipText}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
