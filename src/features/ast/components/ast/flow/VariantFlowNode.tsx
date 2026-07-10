import {Handle, Position} from "@xyflow/react";
import type {VariantNodeData} from "@/shared/presentation/flow/types.ts";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function VariantFlowNode({data, selected}: { data: VariantNodeData; selected?: boolean }) {
  return (
    <div className={cn(
      "min-w-56 rounded-xl border-2 bg-gradient-to-br from-card to-fuchsia-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-fuchsia-500 shadow-fuchsia-500/20"
        : "border-fuchsia-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-fuchsia-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-fuchsia-500/15">
        <span className="text-sm font-bold text-fuchsia-600 dark:text-fuchsia-400">[l=]</span>
        <span className="text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-400">Variant</span>
      </div>

      <div className="p-4 space-y-2">
        {data.term.variants.map((v, i) => (
          <div key={i}
            className="relative flex items-center justify-between rounded-lg border border-fuchsia-200 dark:border-fuchsia-800 bg-background/50 px-3 py-2">
            <code className="text-xs font-mono font-medium text-fuchsia-600 dark:text-fuchsia-400">{v.label}</code>
            <LimitedHandle type="source" position={Position.Right} id={`field-${i}`} maxConnections={1}
              className="!w-3 !h-3 !bg-fuchsia-500 !border-2 !border-background"/>
          </div>
        ))}
      </div>

      <div className="px-4 pb-4 flex items-center justify-between border-t border-fuchsia-500/15 pt-3">
        <span className="text-xs font-medium text-muted-foreground">as type</span>
        <LimitedHandle type="source" position={Position.Bottom} id="type" maxConnections={1}
          className="!w-3 !h-3 !bg-fuchsia-500 !border-2 !border-background"/>
      </div>
    </div>
  );
}
