export interface SourcePosition {
  line: number
  column: number
  length: number
  // The span's end, for callers that need to highlight/select a range that may cross
  // multiple lines (e.g. a multi-line lambda body) — `length` alone can't express that.
  // Optional since some producers (syntax errors) only ever describe a single token.
  endLine?: number
  endColumn?: number
}

export interface Node {
  kind: string
  id: string
  pos?: SourcePosition
}
