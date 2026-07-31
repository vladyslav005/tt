import {useState} from "react";
import type {Type} from "@/shared/core/domain/ast";
import {Button} from "@/shared/components/ui/button.tsx";
import {Input} from "@/shared/components/ui/input.tsx";
import {cn} from "@/shared/lib/utils.ts";

// Scoped to what Phase 1's rules need: a base type, or an arrow of two more slots.
export type DraftType =
  | {kind: "base"; name: string}
  | {kind: "arrow"; from: DraftType | null; to: DraftType | null};

export const BASE_TYPES = ["Nat", "Bool", "Unit"] as const;

// Plain-text (not LaTeX) label for a picker chip.
export function typeLabel(type: Type): string {
  if (type.kind === "TyArrow") {
    const from = type.from.kind === "TyArrow" ? `(${typeLabel(type.from)})` : typeLabel(type.from);
    return `${from} → ${typeLabel(type.to)}`;
  }
  if (type.kind === "TyIdentifier") return type.name;
  return "?";
}

export function draftToType(draft: DraftType): Type | null {
  if (draft.kind === "base") {
    const name = draft.name.trim();
    return name ? {kind: "TyIdentifier", id: crypto.randomUUID(), name} : null;
  }
  if (!draft.from || !draft.to) return null;
  const from = draftToType(draft.from);
  const to = draftToType(draft.to);
  return from && to ? {kind: "TyArrow", id: crypto.randomUUID(), from, to} : null;
}

// Reopens the picker pre-filled with an existing value.
export function typeToDraft(type: Type): DraftType {
  if (type.kind === "TyArrow") {
    return {kind: "arrow", from: typeToDraft(type.from), to: typeToDraft(type.to)};
  }
  if (type.kind === "TyIdentifier") {
    return {kind: "base", name: type.name};
  }
  // Unknown kind (e.g. stale data) — fall back to an empty slot.
  return {kind: "base", name: ""};
}

interface TypeSlotPickerProps {
  value: DraftType | null;
  onChange: (next: DraftType | null) => void;
  // Quick-pick chips for types already in scope.
  contextTypes?: Type[];
  // Only the outermost slot shows "wrap in arrow" — nested from/to slots don't.
  topLevel?: boolean;
}

export function TypeSlotPicker({value, onChange, contextTypes = [], topLevel = true}: TypeSlotPickerProps) {
  const [customOpen, setCustomOpen] = useState(false);
  const [customName, setCustomName] = useState("");

  if (value === null) {
    return (
      <div className="flex flex-wrap items-center gap-1 max-w-64 p-1.5 rounded-md border border-dashed border-muted-foreground/30">
        {contextTypes.length > 0 && (
          <>
            <span className="w-full text-[10px] uppercase tracking-wide text-muted-foreground">From context</span>
            {contextTypes.map((t, i) => (
              <Button
                key={i}
                type="button"
                size="sm"
                variant="secondary"
                className="h-7 px-2 text-xs font-mono"
                onClick={() => onChange(typeToDraft(t))}
              >
                {typeLabel(t)}
              </Button>
            ))}
            <span className="w-full h-px bg-border my-0.5"/>
          </>
        )}
        {BASE_TYPES.map((name) => (
          <Button
            key={name}
            type="button"
            size="sm"
            variant="outline"
            className="h-7 px-2 text-xs font-mono"
            onClick={() => onChange({kind: "base", name})}
          >
            {name}
          </Button>
        ))}
        {customOpen ? (
          <span className="inline-flex items-center gap-1">
            <Input
              autoFocus
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && customName.trim()) {
                  e.preventDefault();
                  onChange({kind: "base", name: customName.trim()});
                  setCustomName("");
                  setCustomOpen(false);
                }
              }}
              placeholder="T"
              className="h-7 w-16 text-xs font-mono px-1"
            />
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-7 px-2 text-xs"
              disabled={!customName.trim()}
              onClick={() => {
                onChange({kind: "base", name: customName.trim()});
                setCustomName("");
                setCustomOpen(false);
              }}
            >
              ✓
            </Button>
          </span>
        ) : (
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-7 px-2 text-xs"
            onClick={() => setCustomOpen(true)}
          >
            custom…
          </Button>
        )}
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-7 px-2 text-xs font-mono"
          onClick={() => onChange({kind: "arrow", from: null, to: null})}
        >
          →
        </Button>
      </div>
    );
  }

  // Wraps the current draft as the left side of a new arrow, keeping it instead of discarding it.
  const wrapInArrow = () => onChange({kind: "arrow", from: value, to: null});
  const isComplete = draftToType(value) !== null;

  const wrapButton = topLevel && isComplete && (
    <Button
      type="button"
      size="sm"
      variant="outline"
      onClick={wrapInArrow}
      className="h-7 px-2 text-xs font-mono gap-0.5 shrink-0"
      title="Turn this into an arrow type (wraps it as the left side, e.g. T → ?)"
    >
      →
    </Button>
  );

  if (value.kind === "base") {
    return (
      <span className="inline-flex items-center gap-1">
        <button
          type="button"
          onClick={() => onChange(null)}
          className={cn(
            "font-mono text-xs px-2 py-1 rounded-md border transition-colors",
            value.name
              ? "border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/60"
              : "border-dashed border-muted-foreground/40 text-muted-foreground italic hover:bg-accent",
          )}
          title="Click to change"
        >
          {value.name || "(empty)"}
        </button>
        {wrapButton}
      </span>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 flex-wrap",
        topLevel && isComplete && "px-1.5 py-1 rounded-md border border-primary/30 bg-primary/5",
      )}
    >
      <TypeSlotPicker value={value.from} onChange={(next) => onChange({...value, from: next})} contextTypes={contextTypes} topLevel={false}/>
      <span className="text-muted-foreground text-xs">→</span>
      <TypeSlotPicker value={value.to} onChange={(next) => onChange({...value, to: next})} contextTypes={contextTypes} topLevel={false}/>
      <button
        type="button"
        onClick={() => onChange(null)}
        className="text-muted-foreground hover:text-destructive text-xs px-1"
        title="Clear"
      >
        ✕
      </button>
      {wrapButton}
    </div>
  );
}
