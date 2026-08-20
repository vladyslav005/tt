import {Handle, Position} from "@xyflow/react";
import type {ConsNodeData} from "@/shared/presentation/flow/types.ts";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function ConsFlowNode({selected}: { data: ConsNodeData; selected?: boolean }) {
  return (
    <div className={cn(
      "min-w-56 rounded-xl border-2 bg-gradient-to-br from-card to-sky-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-sky-500 shadow-sky-500/20"
        : "border-sky-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-sky-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-sky-500/15">
        <span className="text-sm font-bold text-sky-600 dark:text-sky-400">cons</span>
        <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">Cons</span>
      </div>

      <div className="p-4 space-y-2">
        <div className="relative flex items-center justify-between rounded-lg border border-sky-200 dark:border-sky-800 bg-background/50 px-3 py-2">
          <span className="text-xs font-medium text-sky-600 dark:text-sky-400">head</span>
          <LimitedHandle type="source" position={Position.Right} id="head" maxConnections={1}
            className="!w-3 !h-3 !bg-sky-500 !border-2 !border-background"/>
        </div>

        <div className="relative flex items-center justify-between rounded-lg border border-sky-200 dark:border-sky-800 bg-background/50 px-3 py-2">
          <span className="text-xs font-medium text-sky-600 dark:text-sky-400">tail</span>
          <LimitedHandle type="source" position={Position.Right} id="tail" maxConnections={1}
            className="!w-3 !h-3 !bg-sky-500 !border-2 !border-background"/>
        </div>

        <div className="relative flex items-center justify-between rounded-lg border border-sky-200 dark:border-sky-800 bg-background/50 px-3 py-2">
          <span className="text-xs font-medium text-sky-600 dark:text-sky-400">elem type</span>
          <LimitedHandle type="source" position={Position.Right} id="type" maxConnections={1}
            className="!w-3 !h-3 !bg-sky-500 !border-2 !border-background"/>
        </div>
      </div>
    </div>
  );
}
