import {Handle, Position} from "@xyflow/react";
import type {TypeNodeData} from "@/shared/presentation/flow/types";
import type {TyPi} from "@vladyslav005/tt-core";
import {typeToString} from "@vladyslav005/tt-core";
import {cn} from "@/shared/lib/utils";
import {Input} from "@/shared/components/ui/input.tsx";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function TyPiFlowNode({data, selected}: { data: TypeNodeData; selected?: boolean }) {
  const term = data.term as TyPi;

  return (
    <div className={cn(
      "min-w-56 rounded-xl border-2 bg-gradient-to-br from-card to-amber-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-amber-500 shadow-amber-500/20"
        : "border-amber-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-amber-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 border-b border-amber-500/15">
        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">Dependent Function Type</span>
      </div>

      <div className="p-4 space-y-3">
        {data.editable ? (
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-amber-600 dark:text-amber-400 shrink-0">Π</span>
            <Input
              value={term.paramVar}
              onChange={(e) => data.onChange?.({paramVar: e.target.value})}
              className="h-7 text-sm font-mono text-amber-700 dark:text-amber-300 w-20"
            />
          </div>
        ) : (
          <span className="text-sm font-bold text-amber-600 dark:text-amber-400">Π{term.paramVar}</span>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="relative flex flex-col items-center gap-1 rounded-lg border border-amber-200 dark:border-amber-800 bg-background/50 px-3 py-3">
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">{term.paramVar} : {typeToString(term.paramType)}</span>
            <LimitedHandle type="source" position={Position.Bottom} id="paramType" maxConnections={1}
              className="!w-3 !h-3 !bg-amber-500 !border-2 !border-background"/>
          </div>

          <div className="relative flex flex-col items-center gap-1 rounded-lg border border-amber-200 dark:border-amber-800 bg-background/50 px-3 py-3">
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">body</span>
            <LimitedHandle type="source" position={Position.Bottom} id="body" maxConnections={1}
              className="!w-3 !h-3 !bg-amber-500 !border-2 !border-background"/>
          </div>
        </div>
      </div>
    </div>
  );
}
