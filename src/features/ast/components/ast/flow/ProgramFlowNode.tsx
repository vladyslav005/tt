import { Handle, Position } from "@xyflow/react";
import type { ProgramNodeData } from "./types";

export function ProgramFlowNode({
                                  data,
                                }: { data: ProgramNodeData }) {
  return (
    <div className="min-w-72 rounded-2xl border-4 border-primary/40 bg-gradient-to-br from-primary/5 to-primary/10 text-card-foreground p-6 shadow-2xl">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
          <span className="text-xl font-bold text-primary">📄</span>
        </div>
        <div>
          <div className="text-lg font-bold text-primary">Program</div>
          <div className="text-xs text-muted-foreground">Root Node</div>
        </div>
      </div>

      <div className="space-y-2 rounded-lg bg-background/50 p-3 backdrop-blur-sm">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Global Declarations:</span>
          <span className="font-bold text-primary">{data.term.globals.length}</span>
        </div>
        {data.term.term && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Main Expression:</span>
            <span className="font-bold text-green-600 dark:text-green-400">Yes</span>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-3">
        {data.term.globals.length > 0 && (
          <div className="relative rounded-lg border-2 border-primary/20 bg-primary/5 p-2">
            <div className="mb-2 text-center text-xs font-medium text-primary">
              Declarations ↓
            </div>
            <div className="flex justify-center gap-2">
              {data.term.globals.map((decl, index) => (
                <Handle
                  key={decl.id}
                  type="source"
                  position={Position.Left}
                  id={`global-${index}`}
                  style={{
                    // bottom: "5%"
                  }}
                  className="!w-3 !h-3 !bg-primary !border-2 !border-primary/50"
                />
              ))}
            </div>
          </div>
        )}

        {data.term.term && (
          <div className="relative rounded-lg border-2 border-green-500/20 bg-green-500/5 p-2">
            <div className="text-center text-xs font-medium text-green-600 dark:text-green-400">
              Main Term ↓
            </div>
            <Handle
              type="source"
              position={Position.Bottom}
              id="term"
              className="!w-3 !h-3 !bg-green-500 !border-2 !border-green-300"
            />
          </div>
        )}
      </div>
    </div>
  );
}

