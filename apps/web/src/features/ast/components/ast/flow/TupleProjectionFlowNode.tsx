import {Handle, Position} from "@xyflow/react";
import type {TupleProjectionNodeData} from "@/shared/presentation/flow/types.ts";
import {Input} from "@/shared/components/ui/input";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function TupleProjectionFlowNode({data, selected}: { data: TupleProjectionNodeData; selected?: boolean }) {
  return (
    <div className={cn(
      "min-w-56 rounded-xl border-2 bg-gradient-to-br from-card to-lime-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-lime-500 shadow-lime-500/20"
        : "border-lime-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-lime-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-lime-500/15">
        <span className="text-sm font-bold text-lime-600 dark:text-lime-400">.i</span>
        <span className="text-xs font-semibold text-lime-600 dark:text-lime-400">Tuple Projection</span>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Index</label>
          <div className="rounded-lg border border-lime-200 dark:border-lime-800 bg-background px-3 py-2">
            {data.editable ? (
              <Input
                type="number"
                min={1}
                value={data.term.index}
                onChange={(e) => data.onChange?.({index: Number(e.target.value)} as any)}
                className="h-7 text-sm font-mono text-lime-700 dark:text-lime-300"
              />
            ) : (
              <code className="text-sm font-mono text-lime-700 dark:text-lime-300">{data.term.index}</code>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 flex items-center justify-between border-t border-lime-500/15 pt-3">
        <span className="text-xs font-medium text-muted-foreground">tuple</span>
        <LimitedHandle type="source" position={Position.Bottom} id="tuple" maxConnections={1}
          className="!w-3 !h-3 !bg-lime-500 !border-2 !border-background"/>
      </div>
    </div>
  );
}
