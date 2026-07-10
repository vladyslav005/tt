import {Handle, Position} from "@xyflow/react";
import {Plus, X} from "lucide-react";
import type {IfConditionNodeData} from "@/shared/presentation/flow/types.ts";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function IfConditionFlowNode({data, selected}: { data: IfConditionNodeData; selected?: boolean }) {
  const editable = !!data.editable;
  const elif = data.term.elif ?? [];

  const addElif = () => {
    const i = elif.length;
    const condId = `${data.term.id}-elif-${i}-cond-${Date.now()}`;
    const thenId = `${data.term.id}-elif-${i}-then-${Date.now()}`;
    data.onChange?.({
      elif: [...elif, {
        condition: {id: condId, kind: "Lit", value: "true"},
        then: {id: thenId, kind: "Var", name: "x"},
      }],
    } as any);
  };

  const removeElif = (index: number) => {
    const next = elif.filter((_, i) => i !== index);
    data.onChange?.({elif: next.length > 0 ? next : undefined} as any);
  };

  const addElse = () => {
    const id = `${data.term.id}-else-${Date.now()}`;
    data.onChange?.({else: {id, kind: "Var", name: "x"}} as any);
  };

  const removeElse = () => {
    data.onChange?.({else: undefined} as any);
  };

  return (
    <div className={cn(
      "min-w-64 rounded-xl border-2 bg-gradient-to-br from-card to-cyan-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-cyan-500 shadow-cyan-500/20"
        : "border-cyan-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-cyan-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-cyan-500/15">
        <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">if</span>
        <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">Conditional</span>
      </div>

      <div className="p-4 space-y-2">
        <div className="relative flex items-center justify-between rounded-lg border border-cyan-200 dark:border-cyan-800 bg-background/50 px-3 py-2">
          <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400">if</span>
          <LimitedHandle type="source" position={Position.Right} id="condition" maxConnections={1}
            className="!w-3 !h-3 !bg-cyan-500 !border-2 !border-background"/>
        </div>
        <div className="relative flex items-center justify-between rounded-lg border border-cyan-200 dark:border-cyan-800 bg-background/50 px-3 py-2">
          <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400">then</span>
          <LimitedHandle type="source" position={Position.Right} id="then" maxConnections={1}
            className="!w-3 !h-3 !bg-cyan-500 !border-2 !border-background"/>
        </div>

        {elif.map((_, i) => (
          <div key={i} className="space-y-2 relative">
            <div className="relative flex items-center justify-between rounded-lg border border-cyan-200 dark:border-cyan-800 bg-background/50 px-3 py-2">
              <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400">elseif</span>
              <div className="flex items-center gap-2">
                {editable && (
                  <button type="button" title="Remove elseif" onClick={() => removeElif(i)}
                    className="text-cyan-600/60 hover:text-destructive transition-colors">
                    <X className="h-3 w-3"/>
                  </button>
                )}
                <LimitedHandle type="source" position={Position.Right} id={`elif-${i}-condition`} maxConnections={1}
                  className="!w-3 !h-3 !bg-cyan-500 !border-2 !border-background"/>
              </div>
            </div>
            <div className="relative flex items-center justify-between rounded-lg border border-cyan-200 dark:border-cyan-800 bg-background/50 px-3 py-2">
              <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400">then</span>
              <LimitedHandle type="source" position={Position.Right} id={`elif-${i}-then`} maxConnections={1}
                className="!w-3 !h-3 !bg-cyan-500 !border-2 !border-background"/>
            </div>
          </div>
        ))}

        {data.term.else !== undefined && (
          <div className="relative flex items-center justify-between rounded-lg border border-cyan-200 dark:border-cyan-800 bg-background/50 px-3 py-2">
            <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400">else</span>
            <div className="flex items-center gap-2">
              {editable && (
                <button type="button" title="Remove else" onClick={removeElse}
                  className="text-cyan-600/60 hover:text-destructive transition-colors">
                  <X className="h-3 w-3"/>
                </button>
              )}
              <LimitedHandle type="source" position={Position.Right} id="else" maxConnections={1}
                className="!w-3 !h-3 !bg-cyan-500 !border-2 !border-background"/>
            </div>
          </div>
        )}

        {editable && (
          <div className="flex items-center gap-3">
            <button type="button" onClick={addElif}
              className="flex items-center gap-1 text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline">
              <Plus className="h-3 w-3"/> elseif
            </button>
            {data.term.else === undefined && (
              <button type="button" onClick={addElse}
                className="flex items-center gap-1 text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline">
                <Plus className="h-3 w-3"/> else
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
