import {Handle, Position} from "@xyflow/react";
import type {LiteralNodeData} from "@/shared/presentation/flow/types.ts";
import {Input} from "@/shared/components/ui/input";
import {cn} from "@/shared/lib/utils";

export function LiteralFlowNode({data, selected}: { data: LiteralNodeData; selected?: boolean }) {
  return (
    <div className={cn(
      "min-w-40 rounded-xl border-2 bg-gradient-to-br from-card to-amber-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-amber-500 shadow-amber-500/20"
        : "border-amber-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-amber-500 !border-2 !border-background"/>

      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-amber-500/15">
        <span className="text-sm font-bold text-amber-600 dark:text-amber-400">#</span>
        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">Literal</span>
      </div>

      <div className="p-4">
        <div className="rounded-lg border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-3 py-2 flex items-center justify-center">
          {data.editable ? (
            <Input
              value={String(data.term.value)}
              onChange={(e) => data.onChange?.({value: e.target.value} as any)}
              className="h-7 text-sm font-bold font-mono text-amber-700 dark:text-amber-300 text-center"
            />
          ) : (
            <code className="text-sm font-bold font-mono text-amber-700 dark:text-amber-300">{data.term.value}</code>
          )}
        </div>
      </div>
    </div>
  );
}
