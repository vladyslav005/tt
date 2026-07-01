import {Handle, Position} from "@xyflow/react";
import type {VariableNodeData} from "@/shared/presentation/flow/types.ts";
import {Input} from "@/shared/components/ui/input";
import {cn} from "@/shared/lib/utils";

export function VariableFlowNode({data, selected}: { data: VariableNodeData; selected?: boolean }) {
  return (
    <div className={cn(
      "min-w-40 rounded-xl border-2 bg-gradient-to-br from-card to-emerald-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-emerald-500 shadow-emerald-500/20"
        : "border-emerald-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-emerald-500 !border-2 !border-background"/>

      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-emerald-500/15">
        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">x</span>
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Variable</span>
      </div>

      <div className="p-4">
        <div className="rounded-lg border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-2 flex items-center justify-center">
          {data.editable ? (
            <Input
              value={data.term.name}
              onChange={(e) => data.onChange?.({name: e.target.value} as any)}
              className="h-7 text-sm font-bold font-mono text-emerald-700 dark:text-emerald-300 text-center"
            />
          ) : (
            <code className="text-sm font-bold font-mono text-emerald-700 dark:text-emerald-300">{data.term.name}</code>
          )}
        </div>
      </div>
    </div>
  );
}
