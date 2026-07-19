// A piece of a judgement that's rendered as its own small inline MathJax
// span ("tex") or as a clickable, independently expandable reference to a
// numbered Γ/C set ("ref") — see TexRegistryEntry.
export type TexSegment =
  | { kind: "tex"; value: string }
  | { kind: "ref"; key: string }

// One entry in a TexTree's registry: a numbered Γ_n/C_n label together with
// the "recipe" that explains how it was built (e.g. Γ_2 = Γ_1 ∪ {id : T}).
// Looked up by TexSegment's "ref" key.
export interface TexRegistryEntry {
  shortTex: string
  fullTex: string
}

export interface TexTree {
  judgement: string
  judgementFull?: string
  // When present, the UI renders this instead of `judgement` — each "ref"
  // segment is independently clickable to toggle between its shortTex and
  // fullTex (looked up in `registry`). Currently only produced by
  // LetPolymorphismTexMapper for the numbered Γ/C sets a CT-* judgement
  // introduces; plain "T-*" nodes keep using judgement/judgementFull.
  judgementSegments?: TexSegment[]
  // Shared across every node of one derivation (same object reference) so
  // any node can resolve any "ref" segment's key, including ones minted by
  // an ancestor or a sibling.
  registry?: Record<string, TexRegistryEntry>
  rule: string
  children?: TexTree[]
  id?: string
  error?: string
  meta?: string
  // How this node should render while collapsed (currently only used by
  // T-Def, so a collapsed global-variable reference looks like a plain
  // T-Var leaf instead of an empty "T-Def" box). Ignored unless expanded.
  collapsedRule?: string
  collapsedChildren?: TexTree[]
}