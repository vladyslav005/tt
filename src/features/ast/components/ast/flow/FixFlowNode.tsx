import {Handle, Position} from "@xyflow/react";
import type {FixNodeData} from "@/shared/presentation/flow/types.ts";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function FixFlowNode({selected}: { data: FixNodeData; selected?: boolean }) {
  return (
    <div className={cn(
      "min-w-48 rounded-xl border-2 bg-gradient-to-br from-card to-red-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-red-500 shadow-red-500/20"
        : "border-red-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-red-500 !border-2 !border-background"/>

      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-red-500/15">
        <span className="text-sm font-bold text-red-600 dark:text-red-400">fix</span>
        <span className="text-xs font-semibold text-red-600 dark:text-red-400">Fixpoint</span>
      </div>

      {/* Single slot */}
      <div className="p-4">
        <div className="relative flex flex-col items-center gap-1 rounded-lg border border-red-200 dark:border-red-800 bg-background/50 px-3 py-3">
          <span className="text-xs font-medium text-red-600 dark:text-red-400">t : T → T</span>
          <LimitedHandle type="source" position={Position.Bottom} id="term" maxConnections={1}
            className="!w-3 !h-3 !bg-red-500 !border-2 !border-background"/>
        </div>
      </div>
    </div>
  );
}
