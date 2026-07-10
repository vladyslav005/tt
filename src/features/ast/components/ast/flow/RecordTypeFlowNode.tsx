import {Handle, Position} from "@xyflow/react";
import {Plus, X} from "lucide-react";
import type {TypeNodeData} from "@/shared/presentation/flow/types";
import {Input} from "@/shared/components/ui/input";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function RecordTypeFlowNode({data, selected}: { data: TypeNodeData; selected?: boolean }) {
  const term = data.term as Extract<TypeNodeData["term"], {kind: "RecordType"}>;
  const editable = !!data.editable;

  const addField = () => {
    const i = term.fields.length;
    const id = `${term.id}-field-${i}-${Date.now()}`;
    data.onChange?.({fields: [...term.fields, {label: `l${i + 1}`, type: {id, kind: "TyVar", name: "T"}}]} as any);
  };

  const removeField = (index: number) => {
    data.onChange?.({fields: term.fields.filter((_, i) => i !== index)} as any);
  };

  const renameField = (index: number, label: string) => {
    data.onChange?.({fields: term.fields.map((f, i) => (i === index ? {...f, label} : f))} as any);
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
        <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{"{l:}"}</span>
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Record Type</span>
      </div>

      <div className="p-4 space-y-2">
        {term.fields.map((f, i) => (
          <div key={i}
            className="relative flex items-center justify-between gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-background/50 px-3 py-2">
            {editable ? (
              <Input value={f.label} onChange={(e) => renameField(i, e.target.value)}
                className="h-6 text-xs font-mono"/>
            ) : (
              <code className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400">{f.label}</code>
            )}
            <div className="flex items-center gap-2 shrink-0">
              {editable && (
                <button type="button" title="Remove field" onClick={() => removeField(i)}
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
          <button type="button" onClick={addField}
            className="flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-400 hover:underline">
            <Plus className="h-3 w-3"/> add field
          </button>
        )}
      </div>
    </div>
  );
}
