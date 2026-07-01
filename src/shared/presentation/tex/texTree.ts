export interface TexTree {
  judgement: string
  judgementFull?: string
  rule: string
  children?: TexTree[]
  id?: string
  error?: string
  meta?: string
}