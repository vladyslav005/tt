import {Handle, Position} from "@xyflow/react";
import type {LetNodeData} from "@/shared/presentation/flow/types.ts";
import {Input} from "@/shared/components/ui/input";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function LetFlowNode({data, selected}: { data: LetNodeData; selected?: boolean }) {
  return (
    <div className={cn(
      "min-w-60 rounded-xl border-2 bg-gradient-to-br from-card to-emerald-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-emerald-500 shadow-emerald-500/20"
        : "border-emerald-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-emerald-500 !border-2 !border-background"/>

      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-emerald-500/15">
        <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">let</span>
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Let Expression</span>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Name</label>
          <div className="rounded-lg border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-2">
            {data.editable ? (
              <Input
                value={data.term.name}
                onChange={(e) => data.onChange?.({name: e.target.value} as any)}
                className="h-7 text-sm font-bold font-mono text-emerald-700 dark:text-emerald-300"
              />
            ) : (
              <code className="text-sm font-bold font-mono text-emerald-700 dark:text-emerald-300">{data.term.name}</code>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="relative flex flex-col items-center gap-1 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-background/50 px-3 py-3">
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">value</span>
            <LimitedHandle type="source" position={Position.Bottom} id="value" maxConnections={1}
              className="!w-3 !h-3 !bg-emerald-500 !border-2 !border-background"/>
          </div>

          <div className="relative flex flex-col items-center gap-1 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-background/50 px-3 py-3">
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">in body</span>
            <LimitedHandle type="source" position={Position.Bottom} id="body" maxConnections={1}
              className="!w-3 !h-3 !bg-emerald-500 !border-2 !border-background"/>
          </div>
        </div>
      </div>
    </div>
  );
}
