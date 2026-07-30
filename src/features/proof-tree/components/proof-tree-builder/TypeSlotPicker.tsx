import {useState} from "react";
import type {Type} from "@/shared/core/domain/ast";
import {Button} from "@/shared/components/ui/button.tsx";
import {Input} from "@/shared/components/ui/input.tsx";
import {cn} from "@/shared/lib/utils.ts";

// A type under construction — click-only, no free text (except naming a
// custom base type, e.g. a type variable like "T"). Scoped to exactly what
// Phase 1's rules (Var/Abs/App/Lit) can ever need as an answer: a base type
// or an arrow of two further slots, recursively. Extend alongside
// ruleSchemas.ts as more rules join the builder — this is not meant to be
// the general type language's full picker (see RecordType, which has no
// surface syntax anywhere in this app to begin with).
export type DraftType =
  | {kind: "base"; name: string}
  | {kind: "arrow"; from: DraftType | null; to: DraftType | null};

const BASE_TYPES = ["Nat", "Bool", "Unit"] as const;

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

// For re-opening the picker on an already-written answer, so editing a
// filled slot starts from what's there instead of blank.
export function typeToDraft(type: Type): DraftType {
  if (type.kind === "TyArrow") {
    return {kind: "arrow", from: typeToDraft(type.from), to: typeToDraft(type.to)};
  }
  if (type.kind === "TyIdentifier") {
    return {kind: "base", name: type.name};
  }
  // Outside Phase 1's scope (e.g. a stale value from before this picker
  // existed) — fall back to a plain named slot rather than crashing;
  // clicking it just lets the student re-pick from scratch.
  return {kind: "base", name: ""};
}

interface TypeSlotPickerProps {
  value: DraftType | null;
  onChange: (next: DraftType | null) => void;
}

export function TypeSlotPicker({value, onChange}: TypeSlotPickerProps) {
  const [customOpen, setCustomOpen] = useState(false);
  const [customName, setCustomName] = useState("");

  if (value === null) {
    return (
      <div className="flex flex-wrap items-center gap-1">
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
            {/* Explicit confirm button — the previous Enter-only submit had
                no visible affordance, so a typed name with no Enter press
                (e.g. clicking away) silently went nowhere. */}
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

  if (value.kind === "base") {
    return (
      <button
        type="button"
        onClick={() => onChange(null)}
        className={cn(
          "font-mono text-xs px-2 py-1 rounded border border-input hover:bg-accent hover:border-accent-foreground/30 transition-colors",
          !value.name && "text-muted-foreground italic",
        )}
        title="Click to change"
      >
        {value.name || "(empty)"}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <TypeSlotPicker value={value.from} onChange={(next) => onChange({...value, from: next})}/>
      <span className="text-muted-foreground text-xs">→</span>
      <TypeSlotPicker value={value.to} onChange={(next) => onChange({...value, to: next})}/>
      <button
        type="button"
        onClick={() => onChange(null)}
        className="text-muted-foreground hover:text-destructive text-xs px-1"
        title="Clear"
      >
        ✕
      </button>
    </div>
  );
}
