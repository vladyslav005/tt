import {Handle, Position} from "@xyflow/react";
import {Input} from "@/shared/components/ui/input";
import type {TypeNodeData} from "@/shared/presentation/flow/types";
import {cn} from "@/shared/lib/utils";

export function TyVarFlowNode({data, selected}: { data: TypeNodeData; selected?: boolean }) {
  const term = data.term as any;

  return (
    <div className={cn(
      "min-w-40 rounded-xl border-2 bg-gradient-to-br from-card to-slate-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-slate-500 shadow-slate-500/20"
        : "border-slate-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-slate-500 !border-2 !border-background"/>

      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-slate-500/15">
        <span className="text-sm font-bold text-slate-600 dark:text-slate-400">T</span>
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Type</span>
      </div>

      <div className="p-4">
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-background px-3 py-2 flex items-center justify-center">
          {data.editable ? (
            <Input
              value={term.name ?? "T"}
              onChange={(e) => data.onChange?.({name: e.target.value})}
              className="h-7 text-sm font-mono text-center"
            />
          ) : (
            <code className="text-sm font-mono text-foreground/80">{term.name}</code>
          )}
        </div>
      </div>
    </div>
  );
}
