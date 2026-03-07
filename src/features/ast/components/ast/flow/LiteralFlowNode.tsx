import { Handle, Position } from "@xyflow/react";
import type { LiteralNodeData } from "./types";

export function LiteralFlowNode({
                                  data,
                                }: { data: LiteralNodeData }) {
  return (
    <div className="min-w-40 rounded-2xl border-2 border-amber-500/30 bg-gradient-to-br from-card to-amber-500/5 text-card-foreground p-4 shadow-xl">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-amber-500 !border-2 !border-amber-300"
      />

      <div className="mb-3 flex items-center gap-2">
        <div className="text-base font-bold text-amber-600 dark:text-amber-400">#</div>
        <div className="text-xs font-semibold text-amber-600 dark:text-amber-400">Literal</div>
      </div>

      <div className="flex items-center justify-center rounded-lg border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-4 py-3">
        <code className="text-base font-bold font-mono text-amber-700 dark:text-amber-300">{data.term.value}</code>
      </div>
    </div>
  );
}


