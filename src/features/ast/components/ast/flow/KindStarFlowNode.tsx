import {Handle, Position} from "@xyflow/react";
import type {KindNodeData} from "@/shared/presentation/flow/types";
import {cn} from "@/shared/lib/utils";

export function KindStarFlowNode({selected}: { data: KindNodeData; selected?: boolean }) {
  return (
    <div className={cn(
      "min-w-24 rounded-xl border-2 bg-gradient-to-br from-card to-cyan-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-cyan-500 shadow-cyan-500/20"
        : "border-cyan-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-cyan-500 !border-2 !border-background"/>

      <div className="px-4 py-3 text-center">
        <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">@</span>
        <div className="text-xs font-medium text-cyan-600 dark:text-cyan-400">Star Kind</div>
      </div>
    </div>
  );
}
