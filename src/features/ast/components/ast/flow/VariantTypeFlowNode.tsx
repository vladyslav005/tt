import {Handle, Position} from "@xyflow/react";
import type {TypeNodeData} from "@/shared/presentation/flow/types";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function VariantTypeFlowNode({data, selected}: { data: TypeNodeData; selected?: boolean }) {
  const term = data.term as Extract<TypeNodeData["term"], {kind: "VariantType"}>;

  return (
    <div className={cn(
      "min-w-56 rounded-xl border-2 bg-gradient-to-br from-card to-slate-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-slate-500 shadow-slate-500/20"
        : "border-slate-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-slate-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-slate-500/15">
        <span className="text-sm font-bold text-slate-600 dark:text-slate-400">[l:]</span>
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Variant Type</span>
      </div>

      <div className="p-4 space-y-2">
        {term.variants.map((v, i) => (
          <div key={i}
            className="relative flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-800 bg-background/50 px-3 py-2">
            <code className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400">{v.label}</code>
            <LimitedHandle type="source" position={Position.Right} id={`field-${i}`} maxConnections={1}
              className="!w-3 !h-3 !bg-slate-500 !border-2 !border-background"/>
          </div>
        ))}
      </div>
    </div>
  );
}
