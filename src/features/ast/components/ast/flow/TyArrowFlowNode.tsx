import { Handle, Position } from "@xyflow/react";
import type { TypeNodeData } from "@/shared/presentation/flow/types";
import { cn } from "@/shared/lib/utils";

export function TyArrowFlowNode({ data, selected }: { data: TypeNodeData; selected?: boolean }) {
  const editable = !!data.editable;

  return (
    <div className={cn(
      "min-w-60 rounded-2xl border-2 bg-gradient-to-br from-card to-slate-500/5 text-card-foreground p-4 transition-all duration-150",
      selected
        ? "border-slate-500 shadow-2xl shadow-slate-500/30"
        : "border-slate-500/30 shadow-xl",
    )}>
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-slate-500 !border-2 !border-slate-300"
      />

      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="text-base font-bold text-slate-600 dark:text-slate-400">→</div>
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">Arrow Type</div>
        </div>
        {editable && <div className="text-[10px] text-muted-foreground">connect from/to</div>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="relative flex flex-col items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-background/50 p-3">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">from</span>
          <span className="text-xs text-slate-500">↓</span>
          <Handle
            type="source"
            position={Position.Bottom}
            id="from"
            className="!w-3 !h-3 !bg-slate-500 !border-2 !border-slate-300"
          />
        </div>

        <div className="relative flex flex-col items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-background/50 p-3">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">to</span>
          <span className="text-xs text-slate-500">↓</span>
          <Handle
            type="source"
            position={Position.Bottom}
            id="to"
            className="!w-3 !h-3 !bg-slate-500 !border-2 !border-slate-300"
          />
        </div>
      </div>
    </div>
  );
}
