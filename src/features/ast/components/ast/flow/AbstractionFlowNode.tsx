import { Handle, Position } from "@xyflow/react";
import type { AbstractionNodeData } from "../../../../../shared/presentation/flow/types.ts";
import {typeToString} from "@/shared/core/domain/typecheck/utils.ts";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";

export function AbstractionFlowNode({
                                      data,
                                      selected,
                                    }: { data: AbstractionNodeData; selected?: boolean }) {
  return (
    <div className={cn(
      "min-w-60 rounded-2xl border-2 bg-gradient-to-br from-card to-purple-500/5 text-card-foreground p-5 transition-all duration-150",
      selected
        ? "border-purple-500 shadow-2xl shadow-purple-500/30"
        : "border-purple-500/30 shadow-xl",
    )}>
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-purple-500 !border-2 !border-purple-300"
      />

      <div className="mb-4 flex items-center gap-2">
        <div className="text-lg font-bold text-purple-600 dark:text-purple-400">λ</div>
        <div className="text-sm font-semibold text-purple-600 dark:text-purple-400">Abstraction</div>
      </div>

      <div className="mb-3">
        <label className="mb-1 block text-xs font-medium text-muted-foreground">Parameter</label>
        <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-background px-3 py-2">
          {data.editable ? (
            <Input
              value={data.term.param}
              onChange={(e) => data.onChange?.({ param: e.target.value } as any)}
              className="h-8 text-sm font-mono text-purple-700 dark:text-purple-300"
            />
          ) : (
            <code className="text-sm font-mono text-purple-700 dark:text-purple-300">{data.term.param}</code>
          )}
        </div>
      </div>

      <div className="relative mb-4">
        <label className="mb-1 block text-xs font-medium text-muted-foreground">Param Type</label>
        {data.editable ? (
          <div className="h-9 rounded-lg border border-dashed border-purple-200 dark:border-purple-800 bg-background/30" />
        ) : (
          <div className="rounded-lg border border-purple-200 dark:border-purple-800 bg-background px-3 py-2">
            <code className="text-xs font-mono text-foreground/80">{typeToString(data.term.paramType)}</code>
          </div>
        )}
        <Handle
          type="source"
          position={Position.Right}
          id="paramType"
          className="!w-3 !h-3 !bg-purple-500 !border-2 !border-purple-300"
        />
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-purple-200 dark:border-purple-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">type</span>
          <span className="text-xs text-purple-500">→</span>
        </div>
        <Handle
          type="source"
          position={Position.Bottom}
          id="body"
          className="!w-3 !h-3 !bg-purple-500 !border-2 !border-purple-300"
        />
      </div>
    </div>
  );
}
