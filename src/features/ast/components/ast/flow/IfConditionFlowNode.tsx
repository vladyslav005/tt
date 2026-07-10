import {Handle, Position} from "@xyflow/react";
import type {IfConditionNodeData} from "@/shared/presentation/flow/types.ts";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function IfConditionFlowNode({data, selected}: { data: IfConditionNodeData; selected?: boolean }) {
  return (
    <div className={cn(
      "min-w-64 rounded-xl border-2 bg-gradient-to-br from-card to-cyan-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-cyan-500 shadow-cyan-500/20"
        : "border-cyan-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-cyan-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-cyan-500/15">
        <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">if</span>
        <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">Conditional</span>
      </div>

      <div className="p-4 space-y-2">
        <div className="relative flex items-center justify-between rounded-lg border border-cyan-200 dark:border-cyan-800 bg-background/50 px-3 py-2">
          <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400">if</span>
          <LimitedHandle type="source" position={Position.Right} id="condition" maxConnections={1}
            className="!w-3 !h-3 !bg-cyan-500 !border-2 !border-background"/>
        </div>
        <div className="relative flex items-center justify-between rounded-lg border border-cyan-200 dark:border-cyan-800 bg-background/50 px-3 py-2">
          <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400">then</span>
          <LimitedHandle type="source" position={Position.Right} id="then" maxConnections={1}
            className="!w-3 !h-3 !bg-cyan-500 !border-2 !border-background"/>
        </div>

        {(data.term.elif ?? []).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="relative flex items-center justify-between rounded-lg border border-cyan-200 dark:border-cyan-800 bg-background/50 px-3 py-2">
              <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400">elseif</span>
              <LimitedHandle type="source" position={Position.Right} id={`elif-${i}-condition`} maxConnections={1}
                className="!w-3 !h-3 !bg-cyan-500 !border-2 !border-background"/>
            </div>
            <div className="relative flex items-center justify-between rounded-lg border border-cyan-200 dark:border-cyan-800 bg-background/50 px-3 py-2">
              <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400">then</span>
              <LimitedHandle type="source" position={Position.Right} id={`elif-${i}-then`} maxConnections={1}
                className="!w-3 !h-3 !bg-cyan-500 !border-2 !border-background"/>
            </div>
          </div>
        ))}

        {data.term.else && (
          <div className="relative flex items-center justify-between rounded-lg border border-cyan-200 dark:border-cyan-800 bg-background/50 px-3 py-2">
            <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400">else</span>
            <LimitedHandle type="source" position={Position.Right} id="else" maxConnections={1}
              className="!w-3 !h-3 !bg-cyan-500 !border-2 !border-background"/>
          </div>
        )}
      </div>
    </div>
  );
}
