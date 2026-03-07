import { Handle, Position } from "@xyflow/react";
import type { VariableNodeData } from "../../../../../shared/presentation/flow/types.ts";

export function VariableFlowNode({
                                   data,
                                 }: { data: VariableNodeData }) {


  return (
    <div className="min-w-40 rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-card to-emerald-500/5 text-card-foreground p-4 shadow-xl">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-emerald-500 !border-2 !border-emerald-300"
      />

      <div className="mb-3 flex items-center gap-2">
        <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">x</div>
        <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Variable</div>
      </div>

      <div className="flex items-center justify-center rounded-lg border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 px-4 py-3">
        <code className="text-base font-bold font-mono text-emerald-700 dark:text-emerald-300">{data.term.name}</code>
      </div>
    </div>
  );
}

