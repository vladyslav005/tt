import {Handle, Position} from "@xyflow/react";
import type {AscribeNodeData} from "@/shared/presentation/flow/types.ts";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function AscribeFlowNode({selected}: { data: AscribeNodeData; selected?: boolean }) {
  return (
    <div className={cn(
      "min-w-56 rounded-xl border-2 bg-gradient-to-br from-card to-teal-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-teal-500 shadow-teal-500/20"
        : "border-teal-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-teal-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-teal-500/15">
        <span className="text-sm font-bold text-teal-600 dark:text-teal-400">as</span>
        <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">Ascription</span>
      </div>

      <div className="p-4 grid grid-cols-2 gap-3">
        <div className="relative flex flex-col items-center gap-1 rounded-lg border border-teal-200 dark:border-teal-800 bg-background/50 px-3 py-3">
          <span className="text-xs font-medium text-teal-600 dark:text-teal-400">term</span>
          <LimitedHandle type="source" position={Position.Bottom} id="term" maxConnections={1}
            className="!w-3 !h-3 !bg-teal-500 !border-2 !border-background"/>
        </div>

        <div className="relative flex flex-col items-center gap-1 rounded-lg border border-teal-200 dark:border-teal-800 bg-background/50 px-3 py-3">
          <span className="text-xs font-medium text-teal-600 dark:text-teal-400">type</span>
          <LimitedHandle type="source" position={Position.Bottom} id="type" maxConnections={1}
            className="!w-3 !h-3 !bg-teal-500 !border-2 !border-background"/>
        </div>
      </div>
    </div>
  );
}
