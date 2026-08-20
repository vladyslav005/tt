import {Handle, Position} from "@xyflow/react";
import {Plus, X} from "lucide-react";
import type {RecordNodeData} from "@/shared/presentation/flow/types.ts";
import {Input} from "@/shared/components/ui/input";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function RecordFlowNode({data, selected}: { data: RecordNodeData; selected?: boolean }) {
  const editable = !!data.editable;

  const addField = () => {
    const i = data.term.fields.length;
    const id = `${data.term.id}-field-${i}-${Date.now()}`;
    data.onChange?.({fields: [...data.term.fields, {label: `l${i + 1}`, term: {id, kind: "Var", name: "x"}}]} as any);
  };

  const removeField = (index: number) => {
    data.onChange?.({fields: data.term.fields.filter((_, i) => i !== index)} as any);
  };

  const renameField = (index: number, label: string) => {
    data.onChange?.({fields: data.term.fields.map((f, i) => (i === index ? {...f, label} : f))} as any);
  };

  return (
    <div className={cn(
      "min-w-56 rounded-xl border-2 bg-gradient-to-br from-card to-orange-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-orange-500 shadow-orange-500/20"
        : "border-orange-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-orange-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-orange-500/15">
        <span className="text-sm font-bold text-orange-600 dark:text-orange-400">⟨l=⟩</span>
        <span className="text-xs font-semibold text-orange-600 dark:text-orange-400">Record</span>
      </div>

      <div className="p-4 space-y-2">
        {data.term.fields.map((field, i) => (
          <div key={i}
            className="relative flex items-center justify-between gap-2 rounded-lg border border-orange-200 dark:border-orange-800 bg-background/50 px-3 py-2">
            {editable ? (
              <Input value={field.label} onChange={(e) => renameField(i, e.target.value)}
                className="h-6 text-xs font-mono text-orange-700 dark:text-orange-300"/>
            ) : (
              <code className="text-xs font-mono font-medium text-orange-600 dark:text-orange-400">{field.label}</code>
            )}
            <div className="flex items-center gap-2 shrink-0">
              {editable && (
                <button type="button" title="Remove field" onClick={() => removeField(i)}
                  className="text-orange-600/60 hover:text-destructive transition-colors">
                  <X className="h-3 w-3"/>
                </button>
              )}
              <LimitedHandle type="source" position={Position.Right} id={`field-${i}`} maxConnections={1}
                className="!w-3 !h-3 !bg-orange-500 !border-2 !border-background"/>
            </div>
          </div>
        ))}
        {data.term.fields.length === 0 && (
          <div className="text-xs text-muted-foreground italic">empty record</div>
        )}
        {editable && (
          <button type="button" onClick={addField}
            className="flex items-center gap-1 text-xs font-medium text-orange-600 dark:text-orange-400 hover:underline">
            <Plus className="h-3 w-3"/> add field
          </button>
        )}
      </div>
    </div>
  );
}
