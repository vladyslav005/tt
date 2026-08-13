import {Handle, Position} from "@xyflow/react";
import type {TypeNodeData} from "@/shared/presentation/flow/types";
import type {RecursiveType} from "@/shared/core/domain/ast";
import {cn} from "@/shared/lib/utils";
import {Input} from "@/shared/components/ui/input.tsx";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function RecursiveTypeFlowNode({data, selected}: { data: TypeNodeData; selected?: boolean }) {
  const term = data.term as RecursiveType;

  return (
    <div className={cn(
      "min-w-48 rounded-xl border-2 bg-gradient-to-br from-card to-green-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-green-500 shadow-green-500/20"
        : "border-green-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-green-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 border-b border-green-500/15">
        <span className="text-xs font-semibold text-green-600 dark:text-green-400">Recursive Type</span>
      </div>

      <div className="p-4 space-y-3">
        {data.editable ? (
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-green-600 dark:text-green-400 shrink-0">μ</span>
            <Input
              value={term.typeVariable}
              onChange={(e) => data.onChange?.({typeVariable: e.target.value})}
              className="h-7 text-sm font-mono text-green-700 dark:text-green-300 w-20"
            />
          </div>
        ) : (
          <span className="text-sm font-bold text-green-600 dark:text-green-400">μ{term.typeVariable}</span>
        )}

        <div className="relative flex flex-col items-center gap-1 rounded-lg border border-green-200 dark:border-green-800 bg-background/50 px-3 py-3">
          <span className="text-xs font-medium text-green-600 dark:text-green-400">body</span>
          <LimitedHandle type="source" position={Position.Bottom} id="type" maxConnections={1}
            className="!w-3 !h-3 !bg-green-500 !border-2 !border-background"/>
        </div>
      </div>
    </div>
  );
}
