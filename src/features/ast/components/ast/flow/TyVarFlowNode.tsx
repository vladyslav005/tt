import { Handle, Position } from "@xyflow/react";
import { Input } from "@/shared/components/ui/input";
import type { TypeNodeData } from "@/shared/presentation/flow/types";
import { cn } from "@/shared/lib/utils";

export function TyVarFlowNode({ data, selected }: { data: TypeNodeData; selected?: boolean }) {
  const term = data.term as any;

  return (
    <div className={cn(
      "min-w-40 rounded-2xl border-2 bg-gradient-to-br from-card to-slate-500/5 text-card-foreground p-4 transition-all duration-150",
      selected
        ? "border-slate-500 shadow-2xl shadow-slate-500/30"
        : "border-slate-500/30 shadow-xl",
    )}>
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-slate-500 !border-2 !border-slate-300"
      />

      <div className="mb-3 flex items-center gap-2">
        <div className="text-base font-bold text-slate-600 dark:text-slate-400">Type</div>
        <div className="text-xs font-semibold text-slate-600 dark:text-slate-400"></div>
      </div>

      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-background px-3 py-2">
        {data.editable ? (
          <Input
            value={term.name ?? "T"}
            onChange={(e) => data.onChange?.({ name: e.target.value })}
            className="h-8 text-sm font-mono"
          />
        ) : (
          <code className="text-sm font-mono text-foreground/80">{term.name}</code>
        )}
      </div>
    </div>
  );
}
