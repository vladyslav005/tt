import {Handle, Position} from "@xyflow/react";
import {Plus, X} from "lucide-react";
import type {TupleNodeData} from "@/shared/presentation/flow/types.ts";
import {cn} from "@/shared/lib/utils";
import {LimitedHandle} from "./LimitedHandle.tsx";

export function TupleFlowNode({data, selected}: { data: TupleNodeData; selected?: boolean }) {
  const editable = !!data.editable;

  const addElement = () => {
    const id = `${data.term.id}-el-${data.term.elements.length}-${Date.now()}`;
    data.onChange?.({elements: [...data.term.elements, {id, kind: "Var", name: "x"}]} as any);
  };

  const removeElement = (index: number) => {
    data.onChange?.({elements: data.term.elements.filter((_, i) => i !== index)} as any);
  };

  return (
    <div className={cn(
      "min-w-56 rounded-xl border-2 bg-gradient-to-br from-card to-lime-500/5 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-lime-500 shadow-lime-500/20"
        : "border-lime-500/30",
    )}>
      <Handle type="target" position={Position.Top}
        className="!w-2.5 !h-2.5 !bg-lime-500 !border-2 !border-background"/>

      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-lime-500/15">
        <span className="text-sm font-bold text-lime-600 dark:text-lime-400">⟨,⟩</span>
        <span className="text-xs font-semibold text-lime-600 dark:text-lime-400">Tuple</span>
      </div>

      <div className="p-4 space-y-2">
        {data.term.elements.map((_, i) => (
          <div key={i}
            className="relative flex items-center justify-between rounded-lg border border-lime-200 dark:border-lime-800 bg-background/50 px-3 py-2">
            <span className="text-xs font-medium text-lime-600 dark:text-lime-400">#{i + 1}</span>
            <div className="flex items-center gap-2">
              {editable && (
                <button type="button" title="Remove element" onClick={() => removeElement(i)}
                  className="text-lime-600/60 hover:text-destructive transition-colors">
                  <X className="h-3 w-3"/>
                </button>
              )}
              <LimitedHandle type="source" position={Position.Right} id={`el-${i}`} maxConnections={1}
                className="!w-3 !h-3 !bg-lime-500 !border-2 !border-background"/>
            </div>
          </div>
        ))}
        {data.term.elements.length === 0 && (
          <div className="text-xs text-muted-foreground italic">empty tuple</div>
        )}
        {editable && (
          <button type="button" onClick={addElement}
            className="flex items-center gap-1 text-xs font-medium text-lime-600 dark:text-lime-400 hover:underline">
            <Plus className="h-3 w-3"/> add element
          </button>
        )}
      </div>
    </div>
  );
}
