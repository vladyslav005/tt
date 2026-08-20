import {Handle, Position} from "@xyflow/react";
import type {RecordProjectionNodeData} from "@/shared/presentation/flow/types.ts";
import {Input} from "@/shared/components/ui/input";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function RecordProjectionFlowNode({data, selected}: { data: RecordProjectionNodeData; selected?: boolean }) {
  return (
    <div className={cn(
      "min-w-56 rounded-xl border-2 bg-gradient-to-br from-card to-orange-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-orange-500 shadow-orange-500/20"
        : "border-orange-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-orange-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-orange-500/15">
        <span className="text-sm font-bold text-orange-600 dark:text-orange-400">.l</span>
        <span className="text-xs font-semibold text-orange-600 dark:text-orange-400">Record Projection</span>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Label</label>
          <div className="rounded-lg border border-orange-200 dark:border-orange-800 bg-background px-3 py-2">
            {data.editable ? (
              <Input
                value={data.term.label}
                onChange={(e) => data.onChange?.({label: e.target.value} as any)}
                className="h-7 text-sm font-mono text-orange-700 dark:text-orange-300"
              />
            ) : (
              <code className="text-sm font-mono text-orange-700 dark:text-orange-300">{data.term.label}</code>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 flex items-center justify-between border-t border-orange-500/15 pt-3">
        <span className="text-xs font-medium text-muted-foreground">record</span>
        <LimitedHandle type="source" position={Position.Bottom} id="term" maxConnections={1}
          className="!w-3 !h-3 !bg-orange-500 !border-2 !border-background"/>
      </div>
    </div>
  );
}
