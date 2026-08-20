import {Handle, Position} from "@xyflow/react";
import type {ApplicationNodeData} from "@/shared/presentation/flow/types.ts";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function ApplicationFlowNode({selected}: { data: ApplicationNodeData; selected?: boolean }) {
  return (
    <div className={cn(
      "min-w-56 rounded-xl border-2 bg-gradient-to-br from-card to-blue-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-blue-500 shadow-blue-500/20"
        : "border-blue-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-blue-500 !border-2 !border-background"/>

      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-blue-500/15">
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">@</span>
        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Application</span>
      </div>

      {/* Two-column slot grid */}
      <div className="p-4 grid grid-cols-2 gap-3">
        <div className="relative flex flex-col items-center gap-1 rounded-lg border border-blue-200 dark:border-blue-800 bg-background/50 px-3 py-3">
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Function</span>
          <LimitedHandle type="source" position={Position.Bottom} id="left" maxConnections={1}
            className="!w-3 !h-3 !bg-blue-500 !border-2 !border-background"/>
        </div>

        <div className="relative flex flex-col items-center gap-1 rounded-lg border border-blue-200 dark:border-blue-800 bg-background/50 px-3 py-3">
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Argument</span>
          <LimitedHandle type="source" position={Position.Bottom} id="right" maxConnections={1}
            className="!w-3 !h-3 !bg-blue-500 !border-2 !border-background"/>
        </div>
      </div>
    </div>
  );
}
