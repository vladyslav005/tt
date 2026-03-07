import { Handle, Position } from "@xyflow/react";
import type { VarDeclNodeData } from "../../../../../shared/presentation/flow/types.ts";
import { typeToString } from "@/shared/core/domain/typecheck/utils.ts";

export function VarDeclFlowNode({
                                  data,
                                }: { data: VarDeclNodeData }) {
  return (
    <div className="min-w-64 rounded-2xl border-2 border-cyan-500/30 bg-gradient-to-br from-card to-cyan-500/5 text-card-foreground p-5 shadow-xl">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-cyan-500 !border-2 !border-cyan-300"
      />

      <div className="mb-4 flex items-center gap-2">
        <div className="text-lg font-bold text-cyan-600 dark:text-cyan-400">let</div>
        <div className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Variable Declaration</div>
      </div>

      <div className="mb-3">
        <label className="mb-1 block text-xs font-medium text-muted-foreground">Name</label>
        <div className="rounded-lg border-2 border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/30 px-3 py-2">
          <code className="text-sm font-bold font-mono text-cyan-700 dark:text-cyan-300">{data.term.name}</code>
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-xs font-medium text-muted-foreground">Type</label>
        <div className="rounded-lg border border-cyan-200 dark:border-cyan-800 bg-background px-3 py-2">
          <code className="text-xs font-mono text-foreground/80">{typeToString(data.term.type)}</code>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 pt-2 border-t border-cyan-200 dark:border-cyan-800">
        <span className="text-xs font-medium text-muted-foreground">value</span>
        <span className="text-xs text-cyan-500">↓</span>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="value"
        className="!w-3 !h-3 !bg-cyan-500 !border-2 !border-cyan-300"
      />
    </div>
  );
}

