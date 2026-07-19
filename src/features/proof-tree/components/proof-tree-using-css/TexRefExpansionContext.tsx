import {createContext, useCallback, useContext, useMemo, useState, type ReactNode} from "react";

interface TexRefExpansionValue {
  isExpanded: (key: string) => boolean;
  toggle: (key: string) => void;
}

const TexRefExpansionContext = createContext<TexRefExpansionValue | null>(null);

// Owns which specific Γ_n/C_n occurrences are currently shown expanded
// (their recipe) rather than collapsed (just the label). Keyed per rendered
// occurrence (node id + position within its judgement), not per label, so
// clicking one Γ_2 only expands that one instance — other occurrences of
// the same Γ_2 elsewhere in the tree are unaffected.
export function TexRefExpansionProvider({children}: { children: ReactNode }) {
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(new Set());

  const toggle = useCallback((key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const isExpanded = useCallback((key: string) => expanded.has(key), [expanded]);

  const value = useMemo(() => ({isExpanded, toggle}), [isExpanded, toggle]);

  return (
    <TexRefExpansionContext.Provider value={value}>
      {children}
    </TexRefExpansionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTexRefExpansion(): TexRefExpansionValue {
  const ctx = useContext(TexRefExpansionContext);
  if (!ctx) {
    throw new Error("useTexRefExpansion must be used within a TexRefExpansionProvider");
  }
  return ctx;
}
