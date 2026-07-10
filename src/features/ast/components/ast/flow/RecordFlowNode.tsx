import {Handle, Position} from "@xyflow/react";
import type {RecordNodeData} from "@/shared/presentation/flow/types.ts";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function RecordFlowNode({data, selected}: { data: RecordNodeData; selected?: boolean }) {
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
        <span className="text-sm font-bold text-orange-600 dark:text-orange-400">⟨l=⟩</span>
        <span className="text-xs font-semibold text-orange-600 dark:text-orange-400">Record</span>
      </div>

      <div className="p-4 space-y-2">
        {data.term.fields.map((field, i) => (
          <div key={i}
            className="relative flex items-center justify-between rounded-lg border border-orange-200 dark:border-orange-800 bg-background/50 px-3 py-2">
            <code className="text-xs font-mono font-medium text-orange-600 dark:text-orange-400">{field.label}</code>
            <LimitedHandle type="source" position={Position.Right} id={`field-${i}`} maxConnections={1}
              className="!w-3 !h-3 !bg-orange-500 !border-2 !border-background"/>
          </div>
        ))}
        {data.term.fields.length === 0 && (
          <div className="text-xs text-muted-foreground italic">empty record</div>
        )}
      </div>
    </div>
  );
}
