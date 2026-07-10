import {Handle, Position} from "@xyflow/react";
import type {InrNodeData} from "@/shared/presentation/flow/types.ts";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function InrFlowNode({selected}: { data: InrNodeData; selected?: boolean }) {
  return (
    <div className={cn(
      "min-w-56 rounded-xl border-2 bg-gradient-to-br from-card to-pink-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-pink-500 shadow-pink-500/20"
        : "border-pink-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-pink-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-pink-500/15">
        <span className="text-sm font-bold text-pink-600 dark:text-pink-400">inr</span>
        <span className="text-xs font-semibold text-pink-600 dark:text-pink-400">Right Injection</span>
      </div>

      <div className="p-4 grid grid-cols-2 gap-3">
        <div className="relative flex flex-col items-center gap-1 rounded-lg border border-pink-200 dark:border-pink-800 bg-background/50 px-3 py-3">
          <span className="text-xs font-medium text-pink-600 dark:text-pink-400">value</span>
          <LimitedHandle type="source" position={Position.Bottom} id="term" maxConnections={1}
            className="!w-3 !h-3 !bg-pink-500 !border-2 !border-background"/>
        </div>

        <div className="relative flex flex-col items-center gap-1 rounded-lg border border-pink-200 dark:border-pink-800 bg-background/50 px-3 py-3">
          <span className="text-xs font-medium text-pink-600 dark:text-pink-400">as T1+T2</span>
          <LimitedHandle type="source" position={Position.Bottom} id="type" maxConnections={1}
            className="!w-3 !h-3 !bg-pink-500 !border-2 !border-background"/>
        </div>
      </div>
    </div>
  );
}
