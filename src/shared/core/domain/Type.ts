export type Type =
  | TyVar
  | TyArrow
  | TyConst

interface TyVar {
  kind: "Var"
  name: string
}

interface TyArrow {
  kind: "Arrow"
  from: Type
  to: Type
}

interface TyConst {
  kind: "Const"
  name: "Nat" | "Bool" | "Unit"
}
