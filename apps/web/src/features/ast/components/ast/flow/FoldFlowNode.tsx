import {Handle, Position} from "@xyflow/react";
import type {FoldNodeData} from "@/shared/presentation/flow/types.ts";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function FoldFlowNode({selected}: { data: FoldNodeData; selected?: boolean }) {
  return (
    <div className={cn(
      "min-w-56 rounded-xl border-2 bg-gradient-to-br from-card to-green-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-green-500 shadow-green-500/20"
        : "border-green-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-green-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-green-500/15">
        <span className="text-sm font-bold text-green-600 dark:text-green-400">fold</span>
        <span className="text-xs font-semibold text-green-600 dark:text-green-400">Into μ</span>
      </div>

      <div className="p-4 grid grid-cols-2 gap-3">
        <div className="relative flex flex-col items-center gap-1 rounded-lg border border-green-200 dark:border-green-800 bg-background/50 px-3 py-3">
          <span className="text-xs font-medium text-green-600 dark:text-green-400">term</span>
          <LimitedHandle type="source" position={Position.Bottom} id="term" maxConnections={1}
            className="!w-3 !h-3 !bg-green-500 !border-2 !border-background"/>
        </div>

        <div className="relative flex flex-col items-center gap-1 rounded-lg border border-green-200 dark:border-green-800 bg-background/50 px-3 py-3">
          <span className="text-xs font-medium text-green-600 dark:text-green-400">as μX.T</span>
          <LimitedHandle type="source" position={Position.Bottom} id="type" maxConnections={1}
            className="!w-3 !h-3 !bg-green-500 !border-2 !border-background"/>
        </div>
      </div>
    </div>
  );
}
