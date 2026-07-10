import {Handle, Position} from "@xyflow/react";
import {Plus, X} from "lucide-react";
import type {TypeNodeData} from "@/shared/presentation/flow/types";
import {Input} from "@/shared/components/ui/input";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function VariantTypeFlowNode({data, selected}: { data: TypeNodeData; selected?: boolean }) {
  const term = data.term as Extract<TypeNodeData["term"], {kind: "VariantType"}>;
  const editable = !!data.editable;

  const addVariant = () => {
    const i = term.variants.length;
    const id = `${term.id}-field-${i}-${Date.now()}`;
    data.onChange?.({variants: [...term.variants, {label: `l${i + 1}`, type: {id, kind: "TyVar", name: "T"}}]} as any);
  };

  const removeVariant = (index: number) => {
    data.onChange?.({variants: term.variants.filter((_, i) => i !== index)} as any);
  };

  const renameVariant = (index: number, label: string) => {
    data.onChange?.({variants: term.variants.map((v, i) => (i === index ? {...v, label} : v))} as any);
  };

  return (
    <div className={cn(
      "min-w-56 rounded-xl border-2 bg-gradient-to-br from-card to-slate-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-slate-500 shadow-slate-500/20"
        : "border-slate-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-slate-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-slate-500/15">
        <span className="text-sm font-bold text-slate-600 dark:text-slate-400">[l:]</span>
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Variant Type</span>
      </div>

      <div className="p-4 space-y-2">
        {term.variants.map((v, i) => (
          <div key={i}
            className="relative flex items-center justify-between gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-background/50 px-3 py-2">
            {editable ? (
              <Input value={v.label} onChange={(e) => renameVariant(i, e.target.value)}
                className="h-6 text-xs font-mono"/>
            ) : (
              <code className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400">{v.label}</code>
            )}
            <div className="flex items-center gap-2 shrink-0">
              {editable && (
                <button type="button" title="Remove variant" onClick={() => removeVariant(i)}
                  className="text-slate-600/60 hover:text-destructive transition-colors">
                  <X className="h-3 w-3"/>
                </button>
              )}
              <LimitedHandle type="source" position={Position.Right} id={`field-${i}`} maxConnections={1}
                className="!w-3 !h-3 !bg-slate-500 !border-2 !border-background"/>
            </div>
          </div>
        ))}
        {editable && (
          <button type="button" onClick={addVariant}
            className="flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400 hover:underline">
            <Plus className="h-3 w-3"/> add variant
          </button>
        )}
      </div>
    </div>
  );
}
