import type {Edge, Node} from "@xyflow/react";
import type {
  Abs,
  App,
  Ascribe,
  Case,
  DummyAbstraction,
  FunDecl,
  IfCondition,
  Inl,
  Inr,
  Lit,
  Program,
  Record,
  RecordProjection,
  Sequencing,
  Tuple,
  TupleProjection,
  Type,
  Var,
  VarDecl,
  Variant,
  VariantCase,
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

export type InlNodeData = { term: Inl; editable?: boolean; onChange?: (patch: any) => void };
export type InrNodeData = { term: Inr; editable?: boolean; onChange?: (patch: any) => void };
export type IfConditionNodeData = { term: IfCondition; editable?: boolean; onChange?: (patch: any) => void };
export type CaseNodeData = { term: Case; editable?: boolean; onChange?: (patch: any) => void };
export type VariantCaseNodeData = { term: VariantCase; editable?: boolean; onChange?: (patch: any) => void };
export type VariantNodeData = { term: Variant; editable?: boolean; onChange?: (patch: any) => void };
export type AscribeNodeData = { term: Ascribe; editable?: boolean; onChange?: (patch: any) => void };
export type TupleProjectionNodeData = { term: TupleProjection; editable?: boolean; onChange?: (patch: any) => void };
export type RecordProjectionNodeData = { term: RecordProjection; editable?: boolean; onChange?: (patch: any) => void };
export type RecordNodeData = { term: Record; editable?: boolean; onChange?: (patch: any) => void };
export type SequencingNodeData = { term: Sequencing; editable?: boolean; onChange?: (patch: any) => void };
export type TupleNodeData = { term: Tuple; editable?: boolean; onChange?: (patch: any) => void };
export type DummyAbstractionNodeData = { term: DummyAbstraction; editable?: boolean; onChange?: (patch: any) => void };

export type ProgramFlowNode = Node<ProgramNodeData, "program">;
export type FunDeclFlowNode = Node<FunDeclNodeData, "funDecl">;
export type VarDeclFlowNode = Node<VarDeclNodeData, "varDecl">;
export type VariableFlowNode = Node<VariableNodeData, "variable">;
export type AbstractionFlowNode = Node<AbstractionNodeData, "abstraction">;
export type ApplicationFlowNode = Node<ApplicationNodeData, "application">;
export type LiteralFlowNode = Node<LiteralNodeData, "literal">;
export type TypeFlowNode = Node<TypeNodeData, "type">;
export type InlFlowNode = Node<InlNodeData, "inl">;
export type InrFlowNode = Node<InrNodeData, "inr">;
export type IfConditionFlowNode = Node<IfConditionNodeData, "ifCondition">;
export type CaseFlowNode = Node<CaseNodeData, "case">;
export type VariantCaseFlowNode = Node<VariantCaseNodeData, "variantCase">;
export type VariantFlowNode = Node<VariantNodeData, "variant">;
export type AscribeFlowNode = Node<AscribeNodeData, "ascribe">;
export type TupleProjectionFlowNode = Node<TupleProjectionNodeData, "tupleProjection">;
export type RecordProjectionFlowNode = Node<RecordProjectionNodeData, "recordProjection">;
export type RecordFlowNode = Node<RecordNodeData, "record">;
export type SequencingFlowNode = Node<SequencingNodeData, "sequencing">;
export type TupleFlowNode = Node<TupleNodeData, "tuple">;
export type DummyAbstractionFlowNode = Node<DummyAbstractionNodeData, "dummyAbstraction">;

export type AstFlowNode =
  | ProgramFlowNode
  | FunDeclFlowNode
  | VarDeclFlowNode
  | VariableFlowNode
  | AbstractionFlowNode
  | ApplicationFlowNode
  | LiteralFlowNode
  | TypeFlowNode
  | InlFlowNode
  | InrFlowNode
  | IfConditionFlowNode
  | CaseFlowNode
  | VariantCaseFlowNode
  | VariantFlowNode
  | AscribeFlowNode
  | TupleProjectionFlowNode
  | RecordProjectionFlowNode
  | RecordFlowNode
  | SequencingFlowNode
  | TupleFlowNode
  | DummyAbstractionFlowNode;

// Type aliases for component props
export type ProgramFlowNodeType = ProgramNodeData;
export type FunDeclFlowNodeType = FunDeclNodeData;
export type VarDeclFlowNodeType = VarDeclNodeData;
export type VariableFlowNodeType = VariableNodeData;
export type AbstractionFlowNodeType = AbstractionNodeData;
export type ApplicationFlowNodeType = ApplicationNodeData;
export type LiteralFlowNodeType = LiteralNodeData;
export type TypeFlowNodeType = TypeNodeData;
export type InlFlowNodeType = InlNodeData;
export type InrFlowNodeType = InrNodeData;
export type IfConditionFlowNodeType = IfConditionNodeData;
export type CaseFlowNodeType = CaseNodeData;
export type VariantCaseFlowNodeType = VariantCaseNodeData;
export type VariantFlowNodeType = VariantNodeData;
export type AscribeFlowNodeType = AscribeNodeData;
export type TupleProjectionFlowNodeType = TupleProjectionNodeData;
export type RecordProjectionFlowNodeType = RecordProjectionNodeData;
export type RecordFlowNodeType = RecordNodeData;
export type SequencingFlowNodeType = SequencingNodeData;
export type TupleFlowNodeType = TupleNodeData;
export type DummyAbstractionFlowNodeType = DummyAbstractionNodeData;

export type AstFlowGraph = {
  nodes: AstFlowNode[];
  edges: Edge[];
};
