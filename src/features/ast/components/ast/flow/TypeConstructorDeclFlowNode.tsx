import {Handle, Position} from "@xyflow/react";
import type {TypeConstructorDeclNodeData} from "@/shared/presentation/flow/types.ts";
import {kindToString} from "@/shared/core/application/typecheck/utils.ts";
import {Input} from "@/shared/components/ui/input";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function TypeConstructorDeclFlowNode({data, selected}: { data: TypeConstructorDeclNodeData; selected?: boolean }) {
  return (
    <div className={cn(
      "min-w-60 rounded-xl border-2 bg-gradient-to-br from-card to-amber-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-amber-500 shadow-amber-500/20"
        : "border-amber-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-amber-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-amber-500/15">
        <span className="text-sm font-bold text-amber-600 dark:text-amber-400">typedef</span>
        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">Opaque Type Constructor</span>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Name</label>
          <div className="rounded-lg border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-3 py-2">
            {data.editable ? (
              <Input
                value={data.term.name}
                onChange={(e) => data.onChange?.({name: e.target.value} as any)}
                className="h-7 text-sm font-bold font-mono text-amber-700 dark:text-amber-300"
              />
            ) : (
              <code className="text-sm font-bold font-mono text-amber-700 dark:text-amber-300">{data.term.name}</code>
            )}
          </div>
        </div>

        <div className="relative flex flex-col items-center gap-1 rounded-lg border border-amber-200 dark:border-amber-800 bg-background/50 px-3 py-3">
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
            {data.editable ? "kind" : kindToString(data.term.paramKind)}
          </span>
          <LimitedHandle type="source" position={Position.Bottom} id="paramKind" maxConnections={1}
            className="!w-3 !h-3 !bg-amber-500 !border-2 !border-background"/>
        </div>
      </div>
    </div>
  );
}
