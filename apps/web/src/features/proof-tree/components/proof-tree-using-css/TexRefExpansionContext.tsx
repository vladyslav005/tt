import {createContext, useCallback, useContext, useMemo, useState, type ReactNode} from "react";

interface TexRefExpansionValue {
  isExpanded: (key: string) => boolean;
  toggle: (key: string) => void;
  // Snapshot of every currently-expanded key — read by the LaTeX export so
  // it can reproduce exactly what's expanded on screen right now.
  expandedKeys: ReadonlySet<string>;
}

const TexRefExpansionContext = createContext<TexRefExpansionValue | null>(null);

// Tracks which Γ_n/C_n occurrences are expanded, keyed per rendered
// occurrence so other instances of the same label are unaffected.
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

  const value = useMemo(() => ({isExpanded, toggle, expandedKeys: expanded}), [isExpanded, toggle, expanded]);

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
