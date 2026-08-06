export interface SourcePosition {
  line: number
  column: number
  length: number
}

export interface Node {
  kind: string
  id: string
  pos?: SourcePosition
}
