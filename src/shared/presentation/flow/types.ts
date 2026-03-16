import type {Edge, Node} from "@xyflow/react";
import type {
  Abs,
  App,
  FunDecl,
  Lit,
  Program,
  Var,
  VarDecl,
  Type,
} from "@/shared/core/domain/ast";

export type ProgramNodeData = {
  term: Program;
  editable?: boolean;
  onChange?: (patch: any) => void;
};

export type FunDeclNodeData = {
  term: FunDecl;
  editable?: boolean;
  onChange?: (patch: any) => void;
};

export type VarDeclNodeData = {
  term: VarDecl;
  editable?: boolean;
  onChange?: (patch: any) => void;
};

export type VariableNodeData = {
  term: Var;
  editable?: boolean;
  onChange?: (patch: any) => void;
};

export type AbstractionNodeData = {
  term: Abs;
  editable?: boolean;
  onChange?: (patch: any) => void;
};

export type ApplicationNodeData = {
  term: App;
  editable?: boolean;
  onChange?: (patch: any) => void;
};

export type LiteralNodeData = {
  term: Lit;
  editable?: boolean;
  onChange?: (patch: any) => void;
};

export type TypeNodeData = {
  term: Type;
  editable?: boolean;
  onChange?: (patch: any) => void;
};

export type ProgramFlowNode = Node<ProgramNodeData, "program">;
export type FunDeclFlowNode = Node<FunDeclNodeData, "funDecl">;
export type VarDeclFlowNode = Node<VarDeclNodeData, "varDecl">;
export type VariableFlowNode = Node<VariableNodeData, "variable">;
export type AbstractionFlowNode = Node<AbstractionNodeData, "abstraction">;
export type ApplicationFlowNode = Node<ApplicationNodeData, "application">;
export type LiteralFlowNode = Node<LiteralNodeData, "literal">;
export type TypeFlowNode = Node<TypeNodeData, "type">;

export type AstFlowNode =
  | ProgramFlowNode
  | FunDeclFlowNode
  | VarDeclFlowNode
  | VariableFlowNode
  | AbstractionFlowNode
  | ApplicationFlowNode
  | LiteralFlowNode
  | TypeFlowNode;

// Type aliases for component props
export type ProgramFlowNodeType = ProgramNodeData;
export type FunDeclFlowNodeType = FunDeclNodeData;
export type VarDeclFlowNodeType = VarDeclNodeData;
export type VariableFlowNodeType = VariableNodeData;
export type AbstractionFlowNodeType = AbstractionNodeData;
export type ApplicationFlowNodeType = ApplicationNodeData;
export type LiteralFlowNodeType = LiteralNodeData;
export type TypeFlowNodeType = TypeNodeData;

export type AstFlowGraph = {
  nodes: AstFlowNode[];
  edges: Edge[];
};
