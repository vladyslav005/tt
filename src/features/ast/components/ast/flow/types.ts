import type {Edge, Node} from "@xyflow/react";
import type {
  Abs,
  App,
  FunDecl,
  Lit,
  Program,
  Var,
  VarDecl,
} from "@/shared/core/domain/ast";

export type ProgramNodeData = {
  term: Program;
};

export type FunDeclNodeData = {
  term: FunDecl;
};

export type VarDeclNodeData = {
  term: VarDecl;
};

export type VariableNodeData = {
  term: Var;
};

export type AbstractionNodeData = {
  term: Abs;
};

export type ApplicationNodeData = {
  term: App;
};

export type LiteralNodeData = {
  term: Lit;
};

export type ProgramFlowNode = Node<ProgramNodeData, "program">;
export type FunDeclFlowNode = Node<FunDeclNodeData, "funDecl">;
export type VarDeclFlowNode = Node<VarDeclNodeData, "varDecl">;
export type VariableFlowNode = Node<VariableNodeData, "variable">;
export type AbstractionFlowNode = Node<AbstractionNodeData, "abstraction">;
export type ApplicationFlowNode = Node<ApplicationNodeData, "application">;
export type LiteralFlowNode = Node<LiteralNodeData, "literal">;

export type AstFlowNode =
  | ProgramFlowNode
  | FunDeclFlowNode
  | VarDeclFlowNode
  | VariableFlowNode
  | AbstractionFlowNode
  | ApplicationFlowNode
  | LiteralFlowNode;

// Type aliases for component props
export type ProgramFlowNodeType = ProgramNodeData;
export type FunDeclFlowNodeType = FunDeclNodeData;
export type VarDeclFlowNodeType = VarDeclNodeData;
export type VariableFlowNodeType = VariableNodeData;
export type AbstractionFlowNodeType = AbstractionNodeData;
export type ApplicationFlowNodeType = ApplicationNodeData;
export type LiteralFlowNodeType = LiteralNodeData;

export type AstFlowGraph = {
  nodes: AstFlowNode[];
  edges: Edge[];
};
