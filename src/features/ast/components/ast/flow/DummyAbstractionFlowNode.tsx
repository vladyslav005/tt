import {Handle, Position} from "@xyflow/react";
import type {DummyAbstractionNodeData} from "@/shared/presentation/flow/types.ts";
import {typeToString} from "@/shared/core/application/typecheck/utils.ts";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function DummyAbstractionFlowNode({data, selected}: { data: DummyAbstractionNodeData; selected?: boolean }) {
  return (
    <div className={cn(
      "min-w-56 rounded-xl border-2 bg-gradient-to-br from-card to-violet-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-violet-500 shadow-violet-500/20"
        : "border-violet-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-violet-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-violet-500/15">
        <span className="text-sm font-bold text-violet-600 dark:text-violet-400">λ_</span>
        <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">Dummy Abstraction</span>
      </div>

      <div className="p-4 space-y-3">
        <div className="relative">
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Param Type</label>
          <div className="rounded-lg border border-violet-200 dark:border-violet-800 bg-background px-3 py-2">
            <code className="text-xs font-mono text-foreground/80">{typeToString(data.term.paramType)}</code>
          </div>
          <LimitedHandle type="source" position={Position.Right} id="paramType" maxConnections={1}
            className="!w-3 !h-3 !bg-violet-500 !border-2 !border-background"/>
        </div>
      </div>

      <div className="px-4 pb-4 flex items-center justify-between border-t border-violet-500/15 pt-3">
        <span className="text-xs font-medium text-muted-foreground">body</span>
        <LimitedHandle type="source" position={Position.Bottom} id="body" maxConnections={1}
          className="!w-3 !h-3 !bg-violet-500 !border-2 !border-background"/>
      </div>
    </div>
  );
}
