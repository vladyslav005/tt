export interface TexTree {
  judgement: string
  rule: string
  children?: TexTree[]
  id?: string
  error?: string
}