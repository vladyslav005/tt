import {Handle, Position} from "@xyflow/react";
import type {CaseNodeData} from "@/shared/presentation/flow/types.ts";
import {Input} from "@/shared/components/ui/input";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function CaseFlowNode({data, selected}: { data: CaseNodeData; selected?: boolean }) {
  const editable = !!data.editable;

  const renameInl = (variable: string) => data.onChange?.({inl: {...data.term.inl, variable}} as any);
  const renameInr = (variable: string) => data.onChange?.({inr: {...data.term.inr, variable}} as any);

  return (
    <div className={cn(
      "min-w-64 rounded-xl border-2 bg-gradient-to-br from-card to-indigo-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-indigo-500 shadow-indigo-500/20"
        : "border-indigo-500/30",
    )}>
      <div className="relative">
        <Handle type="target" position={Position.Top}
          className="!w-2.5 !h-2.5 !bg-indigo-500 !border-2 !border-background"/>
      </div>

      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-indigo-500/15">
        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">case</span>
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Case (sum)</span>
      </div>

      <div className="p-4 space-y-2">
        <div className="relative flex items-center justify-between rounded-lg border border-indigo-200 dark:border-indigo-800 bg-background/50 px-3 py-2">
          <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">scrutinee</span>
          <LimitedHandle type="source" position={Position.Right} id="variable" maxConnections={1}
            className="!w-3 !h-3 !bg-indigo-500 !border-2 !border-background"/>
        </div>

        <div className="relative flex items-center justify-between gap-1 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-background/50 px-3 py-2">
          {editable ? (
            <div className="flex items-center gap-1 min-w-0">
              <span className="text-xs text-indigo-600 dark:text-indigo-400 shrink-0">inl</span>
              <Input value={data.term.inl.variable} onChange={(e) => renameInl(e.target.value)}
                className="h-6 w-14 text-xs font-mono text-indigo-700 dark:text-indigo-300"/>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 shrink-0">⇒</span>
            </div>
          ) : (
            <code className="text-xs font-mono font-medium text-indigo-600 dark:text-indigo-400">inl {data.term.inl.variable} ⇒</code>
          )}
          <LimitedHandle type="source" position={Position.Right} id="inl-term" maxConnections={1}
            className="!w-3 !h-3 !bg-indigo-500 !border-2 !border-background"/>
        </div>

        <div className="relative flex items-center justify-between gap-1 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-background/50 px-3 py-2">
          {editable ? (
            <div className="flex items-center gap-1 min-w-0">
              <span className="text-xs text-indigo-600 dark:text-indigo-400 shrink-0">inr</span>
              <Input value={data.term.inr.variable} onChange={(e) => renameInr(e.target.value)}
                className="h-6 w-14 text-xs font-mono text-indigo-700 dark:text-indigo-300"/>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 shrink-0">⇒</span>
            </div>
          ) : (
            <code className="text-xs font-mono font-medium text-indigo-600 dark:text-indigo-400">inr {data.term.inr.variable} ⇒</code>
          )}
          <LimitedHandle type="source" position={Position.Right} id="inr-term" maxConnections={1}
            className="!w-3 !h-3 !bg-indigo-500 !border-2 !border-background"/>
        </div>
      </div>
    </div>
  );
}
