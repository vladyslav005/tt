import {Handle, Position} from "@xyflow/react";
import {Plus, X} from "lucide-react";
import type {VariantNodeData} from "@/shared/presentation/flow/types.ts";
import {Input} from "@/shared/components/ui/input";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function VariantFlowNode({data, selected}: { data: VariantNodeData; selected?: boolean }) {
  const editable = !!data.editable;

  const addVariant = () => {
    const i = data.term.variants.length;
    const id = `${data.term.id}-field-${i}-${Date.now()}`;
    data.onChange?.({variants: [...data.term.variants, {label: `l${i + 1}`, term: {id, kind: "Var", name: "x"}}]} as any);
  };

  const removeVariant = (index: number) => {
    data.onChange?.({variants: data.term.variants.filter((_, i) => i !== index)} as any);
  };

  const renameVariant = (index: number, label: string) => {
    data.onChange?.({variants: data.term.variants.map((v, i) => (i === index ? {...v, label} : v))} as any);
  };

  return (
    <div className={cn(
      "min-w-56 rounded-xl border-2 bg-gradient-to-br from-card to-fuchsia-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-fuchsia-500 shadow-fuchsia-500/20"
        : "border-fuchsia-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-fuchsia-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-fuchsia-500/15">
        <span className="text-sm font-bold text-fuchsia-600 dark:text-fuchsia-400">[l=]</span>
        <span className="text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-400">Variant</span>
      </div>

      <div className="p-4 space-y-2">
        {data.term.variants.map((v, i) => (
          <div key={i}
            className="relative flex items-center justify-between gap-2 rounded-lg border border-fuchsia-200 dark:border-fuchsia-800 bg-background/50 px-3 py-2">
            {editable ? (
              <Input value={v.label} onChange={(e) => renameVariant(i, e.target.value)}
                className="h-6 text-xs font-mono text-fuchsia-700 dark:text-fuchsia-300"/>
            ) : (
              <code className="text-xs font-mono font-medium text-fuchsia-600 dark:text-fuchsia-400">{v.label}</code>
            )}
            <div className="flex items-center gap-2 shrink-0">
              {editable && (
                <button type="button" title="Remove variant" onClick={() => removeVariant(i)}
                  className="text-fuchsia-600/60 hover:text-destructive transition-colors">
                  <X className="h-3 w-3"/>
                </button>
              )}
              <LimitedHandle type="source" position={Position.Right} id={`field-${i}`} maxConnections={1}
                className="!w-3 !h-3 !bg-fuchsia-500 !border-2 !border-background"/>
            </div>
          </div>
        ))}
        {editable && (
          <button type="button" onClick={addVariant}
            className="flex items-center gap-1 text-xs font-medium text-fuchsia-600 dark:text-fuchsia-400 hover:underline">
            <Plus className="h-3 w-3"/> add variant
          </button>
        )}
      </div>

      <div className="px-4 pb-4 flex items-center justify-between border-t border-fuchsia-500/15 pt-3">
        <span className="text-xs font-medium text-muted-foreground">as type</span>
        <LimitedHandle type="source" position={Position.Bottom} id="type" maxConnections={1}
          className="!w-3 !h-3 !bg-fuchsia-500 !border-2 !border-background"/>
      </div>
    </div>
  );
}
