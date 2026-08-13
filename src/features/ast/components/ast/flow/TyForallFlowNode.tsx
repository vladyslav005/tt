import {Handle, Position} from "@xyflow/react";
import type {TypeNodeData} from "@/shared/presentation/flow/types";
import type {TyForall} from "@/shared/core/domain/ast";
import {cn} from "@/shared/lib/utils";
import {Input} from "@/shared/components/ui/input.tsx";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function TyForallFlowNode({data, selected}: { data: TypeNodeData; selected?: boolean }) {
  const term = data.term as TyForall;

  return (
    <div className={cn(
      "min-w-48 rounded-xl border-2 bg-gradient-to-br from-card to-purple-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-purple-500 shadow-purple-500/20"
        : "border-purple-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-purple-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 border-b border-purple-500/15">
        <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">Forall Type</span>
      </div>

      <div className="p-4 space-y-3">
        {data.editable ? (
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-purple-600 dark:text-purple-400 shrink-0">∀</span>
            <Input
              value={term.typeVariable}
              onChange={(e) => data.onChange?.({typeVariable: e.target.value})}
              className="h-7 text-sm font-mono text-purple-700 dark:text-purple-300 w-20"
            />
          </div>
        ) : (
          <span className="text-sm font-bold text-purple-600 dark:text-purple-400">∀{term.typeVariable}</span>
        )}

        <div className="relative flex flex-col items-center gap-1 rounded-lg border border-purple-200 dark:border-purple-800 bg-background/50 px-3 py-3">
          <span className="text-xs font-medium text-purple-600 dark:text-purple-400">type</span>
          <LimitedHandle type="source" position={Position.Bottom} id="type" maxConnections={1}
            className="!w-3 !h-3 !bg-purple-500 !border-2 !border-background"/>
        </div>
      </div>
    </div>
  );
}
