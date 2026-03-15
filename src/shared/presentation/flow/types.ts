import type {Connection, Edge, Node} from "@xyflow/react";
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
  onConnectDeclaration?: (source: AstFlowNode, target: AstFlowNode) => void;
  onDisconnectDeclaration?: (source: AstFlowNode) => void;
  onConnectTerm?: (params :   Connection) => void;
  onDisconnectTerm?: (source: AstFlowNode) => void;
  editable?: boolean;
};

export type FunDeclNodeData = {
  term: FunDecl;
  onConnectBody?: (source: AstFlowNode, target: AstFlowNode) => void;
  onDisconnectBody?: (source: AstFlowNode) => void;
  editable?: boolean;
};

export type VarDeclNodeData = {
  term: VarDecl;
  editable?: boolean;
};

export type VariableNodeData = {
  term: Var;
  editable?: boolean;
};

export type AbstractionNodeData = {
  term: Abs;
  editable?: boolean;
  onConnectBody?: (source: AstFlowNode, target: AstFlowNode) => void;
  onDisconnectBody?: (source: AstFlowNode) => void;
};

export type ApplicationNodeData = {
  term: App;
  editable?: boolean;
  onConnectFunc?: (source: AstFlowNode, target: AstFlowNode) => void;
  onDisconnectFunc?: (source: AstFlowNode) => void;
  onConnectArg?: (source: AstFlowNode, target: AstFlowNode) => void;
  onDisconnectArg?: (source: AstFlowNode) => void;
};

export type LiteralNodeData = {
  term: Lit;
  editable?: boolean;
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
