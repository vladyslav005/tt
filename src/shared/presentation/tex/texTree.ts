export interface TexTree {
  judgement: string
  judgementFull?: string
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