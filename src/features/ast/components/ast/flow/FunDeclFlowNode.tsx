import { Handle, Position } from "@xyflow/react";
import type { FunDeclNodeData } from "../../../../../shared/presentation/flow/types.ts";
import { typeToString } from "@/shared/core/domain/typecheck/utils.ts";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";

export function FunDeclFlowNode({
                                  data,
                                  selected,
                                }: { data: FunDeclNodeData; selected?: boolean }) {
  return (
    <div className={cn(
      "min-w-64 rounded-2xl border-2 bg-gradient-to-br from-card to-green-500/5 text-card-foreground p-5 transition-all duration-150",
      selected
        ? "border-green-500 shadow-2xl shadow-green-500/30"
        : "border-green-500/30 shadow-xl",
    )}>
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-green-500 !border-2 !border-green-300"
      />

      <div className="mb-4 flex items-center gap-2">
        <div className="text-lg font-bold text-green-600 dark:text-green-400">ƒ</div>
        <div className="text-sm font-semibold text-green-600 dark:text-green-400">Function Declaration</div>
      </div>

      <div className="mb-3">
        <label className="mb-1 block text-xs font-medium text-muted-foreground">Name</label>
        <div className="relative rounded-lg border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 px-3 py-2">
          {data.editable ? (
            <Input
              value={data.term.name}
              onChange={(e) => data.onChange?.({ name: e.target.value } as any)}
              className="h-8 text-sm font-bold font-mono text-green-700 dark:text-green-300"
            />
          ) : (
            <code className="text-sm font-bold font-mono text-green-700 dark:text-green-300">{data.term.name}</code>
          )}
        </div>
      </div>

      <div className="relative mb-4">
        <label className="mb-1 block text-xs font-medium text-muted-foreground">Type Signature</label>
        {data.editable ? (
          <div className="h-9 rounded-lg border border-dashed border-green-200 dark:border-green-800 bg-background/30" />
        ) : (
          <div className="rounded-lg border border-green-200 dark:border-green-800 bg-background px-3 py-2">
            <code className="text-xs font-mono text-foreground/80">{typeToString(data.term.type)}</code>
          </div>
        )}
        <Handle
          type="source"
          position={Position.Right}
          id="type"
          className="!w-3 !h-3 !bg-green-500 !border-2 !border-green-300"
        />
      </div>

      <div className="flex items-center justify-center gap-2 pt-2 border-t border-green-200 dark:border-green-800">
        <span className="text-xs font-medium text-muted-foreground">value</span>
        <span className="text-xs text-green-500">↓</span>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="value"
        className="!w-3 !h-3 !bg-green-500 !border-2 !border-green-300"
      />
    </div>
  );
}
