import {Handle, Position} from "@xyflow/react";
import type {AbstractionNodeData} from "@/shared/presentation/flow/types.ts";
import {typeToString} from "@/shared/core/application/typecheck/utils.ts";
import {Input} from "@/shared/components/ui/input";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function AbstractionFlowNode({data, selected}: { data: AbstractionNodeData; selected?: boolean }) {
  return (
    <div className={cn(
      "min-w-56 rounded-xl border-2 bg-gradient-to-br from-card to-purple-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-purple-500 shadow-purple-500/20"
        : "border-purple-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-purple-500 !border-2 !border-background"/>

      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-purple-500/15">
        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">λ</span>
        <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">Abstraction</span>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Parameter</label>
          <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-background px-3 py-2">
            {data.editable ? (
              <Input
                value={data.term.param}
                onChange={(e) => data.onChange?.({param: e.target.value} as any)}
                className="h-7 text-sm font-mono text-purple-700 dark:text-purple-300"
              />
            ) : (
              <code className="text-sm font-mono text-purple-700 dark:text-purple-300">{data.term.param}</code>
            )}
          </div>
        </div>

        <div className="relative">
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Param Type</label>
          {data.editable ? (
            <div className="h-9 rounded-lg border border-dashed border-purple-300 dark:border-purple-700 bg-background/30"/>
          ) : (
            <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-background px-3 py-2">
              <code className="text-xs font-mono text-foreground/80">{typeToString(data.term.paramType)}</code>
            </div>
          )}
          <LimitedHandle type="source" position={Position.Right} id="paramType" maxConnections={1}
            className="!w-3 !h-3 !bg-purple-500 !border-2 !border-background"/>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 flex items-center justify-between border-t border-purple-500/15 pt-3">
        <span className="text-xs font-medium text-muted-foreground">body</span>
        <LimitedHandle type="source" position={Position.Bottom} id="body" maxConnections={1}
          className="!w-3 !h-3 !bg-purple-500 !border-2 !border-background"/>
      </div>
    </div>
  );
}
