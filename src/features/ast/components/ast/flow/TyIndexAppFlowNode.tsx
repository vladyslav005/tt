import {Handle, Position} from "@xyflow/react";
import type {TypeNodeData} from "@/shared/presentation/flow/types";
import type {TyIndexApp} from "@vladyslav005/tt-core";
import {termIndexToString} from "@vladyslav005/tt-core";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function TyIndexAppFlowNode({data, selected}: { data: TypeNodeData; selected?: boolean }) {
  const term = data.term as TyIndexApp;

  return (
    <div className={cn(
      "min-w-56 rounded-xl border-2 bg-gradient-to-br from-card to-amber-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-amber-500 shadow-amber-500/20"
        : "border-amber-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-amber-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-amber-500/15">
        <span className="text-sm font-bold text-amber-600 dark:text-amber-400">F[t]</span>
        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">Term-Indexed Type Application</span>
      </div>

      <div className="p-4 grid grid-cols-2 gap-3">
        <div className="relative flex flex-col items-center gap-1 rounded-lg border border-amber-200 dark:border-amber-800 bg-background/50 px-3 py-3">
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400">func</span>
          <LimitedHandle type="source" position={Position.Bottom} id="func" maxConnections={1}
            className="!w-3 !h-3 !bg-amber-500 !border-2 !border-background"/>
        </div>

        <div className="relative flex flex-col items-center gap-1 rounded-lg border border-amber-200 dark:border-amber-800 bg-background/50 px-3 py-3">
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400">[{termIndexToString(term.arg)}]</span>
          <LimitedHandle type="source" position={Position.Bottom} id="arg" maxConnections={1}
            className="!w-3 !h-3 !bg-amber-500 !border-2 !border-background"/>
        </div>
      </div>
    </div>
  );
}
