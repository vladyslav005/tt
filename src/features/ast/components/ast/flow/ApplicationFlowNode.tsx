import { Handle, Position } from "@xyflow/react";
import type { ApplicationNodeData } from "../../../../../shared/presentation/flow/types.ts";

export function ApplicationFlowNode({
                                      // data,
                                    }: { data: ApplicationNodeData }) {
  return (
    <div className="min-w-60 rounded-2xl border-2 border-blue-500/30 bg-gradient-to-br from-card to-blue-500/5 text-card-foreground p-5 shadow-xl">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-blue-500 !border-2 !border-blue-300"
      />

      <div className="mb-4 flex items-center gap-2">
        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">@</div>
        <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">Application</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="relative flex flex-col items-center gap-2 rounded-lg border-2 border-blue-200 dark:border-blue-800 bg-background/50 p-3">
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Function</span>
          <span className="text-xs text-blue-500">↓</span>
          <Handle
            type="source"
            position={Position.Bottom}
            id="left"
            // style={{ left: '25%' }}
            className="!w-3 !h-3 !bg-blue-500 !border-2 !border-blue-300"
          />
        </div>

        <div className="relative flex flex-col items-center gap-2 rounded-lg border-2 border-blue-200 dark:border-blue-800 bg-background/50 p-3">
          <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Argument</span>
          <span className="text-xs text-blue-500">↓</span>
          <Handle
            type="source"
            position={Position.Bottom}
            id="right"
            // style={{ left: '75%' }}
            className="!w-3 !h-3 !bg-blue-500 !border-2 !border-blue-300"
          />
        </div>
      </div>
    </div>
  );
}

