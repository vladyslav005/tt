import type {TexTree} from "@/shared/presentation/texTree.ts";
import {MathJax} from "better-react-mathjax";
import "./ProofTree.css"
import {cn} from "@/shared/lib/utils.ts";
import {AlertCircle} from "lucide-react";

interface ConclusionCenterProps {
  isItLeaf: string;
  isItRoot: string;
  node: TexTree;
}

export const Conclusion = (props: ConclusionCenterProps) => {

  const containsError = props.node.error !== undefined;

  return (
    <div className={cn(
      `conclusion-center ${props.isItLeaf} ${props.isItRoot} rounded-md my-1.5 px-2 flex items-center gap-2 transition-all duration-200`,
      containsError
        ? "bg-destructive/10 border border-destructive/20 dark:bg-destructive/20 dark:border-destructive/30 hover:bg-destructive/15 dark:hover:bg-destructive/25"
        : ""
    )}>
      <MathJax className="flex-1">
        {`\\[ ${props.node.judgement} \\]`}
      </MathJax>

      {containsError && (
        <div
          className="flex items-center gap-1.5 text-destructive group cursor-help"
          title={props.node.error}
        >
          <AlertCircle className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
          <span className="text-xs font-medium whitespace-nowrap">Error</span>
        </div>
      )}
    </div>
  )
}