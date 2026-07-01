import {Handle, Position} from "@xyflow/react";
import type {ProgramNodeData} from "@/shared/presentation/flow/types.ts";
import {LimitedHandle} from "./LimitedHandle.tsx";
import {cn} from "@/shared/lib/utils";
import {FileCode2} from "lucide-react";

export function ProgramFlowNode({data, selected}: { data: ProgramNodeData; selected?: boolean }) {
  return (
    <div className={cn(
      "min-w-64 rounded-xl border-2 bg-gradient-to-br from-primary/5 to-primary/10 text-card-foreground shadow-lg transition-all duration-150",
      selected
        ? "border-primary shadow-primary/20"
        : "border-primary/40",
    )}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-2 border-b border-primary/15">
        <FileCode2 className="h-4 w-4 text-primary"/>
        <span className="text-xs font-semibold text-primary">Program</span>
        <span className="ml-auto text-xs text-muted-foreground">Root</span>
      </div>

      {/* Stats */}
      <div className="px-4 py-3 space-y-1.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Globals</span>
          <span className="font-bold text-primary">{data.term.globals.length}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Main term</span>
          <span className={cn("font-bold", data.term.term ? "text-green-600 dark:text-green-400" : "text-muted-foreground")}>
            {data.term.term ? "Yes" : "None"}
          </span>
        </div>
      </div>

      {/* Handles section */}
      <div className="px-4 pb-4 grid grid-cols-2 gap-3 border-t border-primary/15 pt-3">
        <div className="relative flex flex-col items-center gap-1 rounded-lg border border-primary/20 bg-primary/5 px-3 py-3">
          <span className="text-xs font-medium text-primary">Declarations</span>
          <Handle type="source" position={Position.Left} id="global-decl"
            className="!w-3 !h-3 !bg-primary !border-2 !border-background"/>
        </div>

        <div className="relative flex flex-col items-center gap-1 rounded-lg border border-green-500/20 bg-green-500/5 px-3 py-3">
          <span className="text-xs font-medium text-green-600 dark:text-green-400">Main Term</span>
          <LimitedHandle type="source" position={Position.Bottom} id="term" maxConnections={1}
            className="!w-3 !h-3 !bg-green-500 !border-2 !border-background"/>
        </div>
      </div>
    </div>
  );
}
