import {Handle, Position} from "@xyflow/react";
import {Plus, X} from "lucide-react";
import type {VariantCaseNodeData} from "@/shared/presentation/flow/types.ts";
import {Input} from "@/shared/components/ui/input";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function VariantCaseFlowNode({data, selected}: { data: VariantCaseNodeData; selected?: boolean }) {
  const editable = !!data.editable;

  const addCase = () => {
    const i = data.term.cases.length;
    const id = `${data.term.id}-case-${i}-${Date.now()}`;
    data.onChange?.({
      cases: [...data.term.cases, {label: `l${i + 1}`, variable: "x", body: {id, kind: "Var", name: "x"}}],
    } as any);
  };

  const removeCase = (index: number) => {
    data.onChange?.({cases: data.term.cases.filter((_, i) => i !== index)} as any);
  };

  const patchCase = (index: number, patch: Partial<{label: string; variable: string}>) => {
    data.onChange?.({cases: data.term.cases.map((c, i) => (i === index ? {...c, ...patch} : c))} as any);
  };

  return (
    <div className={cn(
      "min-w-64 rounded-xl border-2 bg-gradient-to-br from-card to-violet-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-violet-500 shadow-violet-500/20"
        : "border-violet-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-violet-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-violet-500/15">
        <span className="text-sm font-bold text-violet-600 dark:text-violet-400">case</span>
        <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">Case (variant)</span>
      </div>

      <div className="p-4 space-y-2">
        <div className="relative flex items-center justify-between rounded-lg border border-violet-200 dark:border-violet-800 bg-background/50 px-3 py-2">
          <span className="text-xs font-medium text-violet-600 dark:text-violet-400">scrutinee</span>
          <LimitedHandle type="source" position={Position.Right} id="variable" maxConnections={1}
            className="!w-3 !h-3 !bg-violet-500 !border-2 !border-background"/>
        </div>

        {data.term.cases.map((c, i) => (
          <div key={i}
            className="relative flex items-center justify-between gap-1 rounded-lg border border-violet-200 dark:border-violet-800 bg-background/50 px-3 py-2">
            {editable ? (
              <div className="flex items-center gap-1 min-w-0">
                <span className="text-xs text-violet-600 dark:text-violet-400 shrink-0">[</span>
                <Input value={c.label} onChange={(e) => patchCase(i, {label: e.target.value})}
                  className="h-6 w-14 text-xs font-mono text-violet-700 dark:text-violet-300"/>
                <span className="text-xs text-violet-600 dark:text-violet-400 shrink-0">=</span>
                <Input value={c.variable} onChange={(e) => patchCase(i, {variable: e.target.value})}
                  className="h-6 w-12 text-xs font-mono text-violet-700 dark:text-violet-300"/>
                <span className="text-xs text-violet-600 dark:text-violet-400 shrink-0">] ⇒</span>
              </div>
            ) : (
              <code className="text-xs font-mono font-medium text-violet-600 dark:text-violet-400">[{c.label}={c.variable}] ⇒</code>
            )}
            <div className="flex items-center gap-2 shrink-0">
              {editable && (
                <button type="button" title="Remove case" onClick={() => removeCase(i)}
                  className="text-violet-600/60 hover:text-destructive transition-colors">
                  <X className="h-3 w-3"/>
                </button>
              )}
              <LimitedHandle type="source" position={Position.Right} id={`case-${i}`} maxConnections={1}
                className="!w-3 !h-3 !bg-violet-500 !border-2 !border-background"/>
            </div>
          </div>
        ))}

        {editable && (
          <button type="button" onClick={addCase}
            className="flex items-center gap-1 text-xs font-medium text-violet-600 dark:text-violet-400 hover:underline">
            <Plus className="h-3 w-3"/> add case
          </button>
        )}
      </div>
    </div>
  );
}
