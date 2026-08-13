import {Handle, Position} from "@xyflow/react";
import type {TypeAbsNodeData} from "@/shared/presentation/flow/types.ts";
import {cn} from "@/shared/lib/utils";
import {Input} from "@/shared/components/ui/input.tsx";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function TypeAbstractionFlowNode({data, selected}: { data: TypeAbsNodeData; selected?: boolean }) {
  return (
    <div className={cn(
      "min-w-48 rounded-xl border-2 bg-gradient-to-br from-card to-indigo-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-indigo-500 shadow-indigo-500/20"
        : "border-indigo-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-indigo-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 border-b border-indigo-500/15">
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Type Abstraction</span>
      </div>

      <div className="p-4 space-y-3">
        {data.editable ? (
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 shrink-0">Λ</span>
            <Input
              value={data.term.typeParam}
              onChange={(e) => data.onChange?.({typeParam: e.target.value})}
              className="h-7 text-sm font-mono text-indigo-700 dark:text-indigo-300 w-20"
            />
          </div>
        ) : (
          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">Λ{data.term.typeParam}</span>
        )}

        <div className="relative flex flex-col items-center gap-1 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-background/50 px-3 py-3">
          <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">body</span>
          <LimitedHandle type="source" position={Position.Bottom} id="body" maxConnections={1}
            className="!w-3 !h-3 !bg-indigo-500 !border-2 !border-background"/>
        </div>
      </div>
    </div>
  );
}
