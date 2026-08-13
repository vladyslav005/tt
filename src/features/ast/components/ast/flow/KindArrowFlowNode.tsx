import {Handle, Position} from "@xyflow/react";
import type {KindNodeData} from "@/shared/presentation/flow/types";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

// "from" accepts either another Kind node (K→K) or a Type node (T→K, System λP's dependent
// kind — e.g. "Nat -> @") — same two-slot shape as TyArrowFlowNode either way; the connected
// node's own kind is what actually decides which reading it is, nothing on this node does.
export function KindArrowFlowNode({selected}: { data: KindNodeData; selected?: boolean }) {
  return (
    <div className={cn(
      "min-w-56 rounded-xl border-2 bg-gradient-to-br from-card to-cyan-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-cyan-500 shadow-cyan-500/20"
        : "border-cyan-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-cyan-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-cyan-500/15">
        <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">→</span>
        <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">Function Kind</span>
      </div>

      <div className="p-4 grid grid-cols-2 gap-3">
        <div className="relative flex flex-col items-center gap-1 rounded-lg border border-cyan-200 dark:border-cyan-800 bg-background/50 px-3 py-3">
          <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400">from</span>
          <LimitedHandle type="source" position={Position.Bottom} id="from" maxConnections={1}
            className="!w-3 !h-3 !bg-cyan-500 !border-2 !border-background"/>
        </div>

        <div className="relative flex flex-col items-center gap-1 rounded-lg border border-cyan-200 dark:border-cyan-800 bg-background/50 px-3 py-3">
          <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400">to</span>
          <LimitedHandle type="source" position={Position.Bottom} id="to" maxConnections={1}
            className="!w-3 !h-3 !bg-cyan-500 !border-2 !border-background"/>
        </div>
      </div>
    </div>
  );
}
