import LambdaVisitor from "@/shared/core/antlr/LambdaVisitor.ts";
import {TypeBuilderVisitor} from "@/shared/core/adapter/TypeBuilderVisitor.ts";
import {sourcePos} from "@/shared/core/adapter/sourcePos.ts";
import {
  type ApplicationContext,
  AscribeContext,
  BinaryOpContext,
  CaseContext,
  ConsContext,
  DummyAbstractionContext,
  FixContext,
  FoldContext,
  HeadContext,
  IfConditionContext,
  InlContext,
  InrContext,
  IsNilContext,
  LambdaAbstractionContext,
  LambdaAbstractionUntypedContext, LetExpressionContext,
  LiteralContext,
  NilContext,
  ParenthesesContext,
  RecordContext,
  RecordProjectionContext,
  SequencingContext,
  TailContext,
  TupleContext,
  TupleProjectionContext, TypeAbstractionContext, TypeApplicationContext,
  UnfoldContext,
  VariableContext,
  VariantCaseContext,
  VariantContext
} from "@/shared/core/antlr/LambdaParser.ts";
import type {
  Abs,
  App,
  Ascribe,
  BinaryOperator,
  BinOp,
  Case,
  Cons,
  DummyAbstraction,
  Fix,
  Fold,
  Head,
  IfCondition,
  Inl,
  Inr,
  IsNil,
  Let,
  Lit,
  Nil,
  Record,
  RecordProjection,
  Sequencing,
  Tail,
  Term,
  Tuple,
  TupleProjection, TypeAbs, TypeApp,
  Unfold,
  Var,
  Variant,
  VariantCase
} from "@/shared/core/domain/ast";

export class TermBuilderVisitor
  extends LambdaVisitor<Term> {

  visitApplication = (ctx: ApplicationContext): App => {
    return {
      kind: "App",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      func: this.visit(ctx.term(0)),
      arg: this.visit(ctx.term(1))
    }
  }

  visitLambdaAbstraction = (ctx: LambdaAbstractionContext): Abs => {
    return {
      kind: "Abs",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      param: ctx.ID().getText(),
      paramType: new TypeBuilderVisitor().visit(ctx.type_()),
      body: this.visit(ctx.term()),
      // type: {} as TyArrow // TODO: handle this properly
    }
  }

  // λx.t with no annotation — only valid inside a `let`, where paramType gets inferred.
  visitLambdaAbstractionUntyped = (ctx: LambdaAbstractionUntypedContext): Abs => {
    return {
      kind: "Abs",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      param: ctx.ID().getText(),
      body: this.visit(ctx.term()),
    }
  }

  visitVariable = (ctx: VariableContext): Var => {
    return {
      kind: "Var",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),

      name: ctx.ID().getText()
    }
  }

  visitParentheses = (ctx: ParenthesesContext): Term => {
    return this.visit(ctx.term())
  }

  visitLiteral = (ctx: LiteralContext): Lit => {
    return {
      kind: "Lit",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      value: ctx.getText()
    }
  }

  visitVariantCase = (ctx: VariantCaseContext): VariantCase => {
    // Each case contributes two IDs ([label=variable]) and one body term.
    const cases: { label: string; variable: string; body: Term }[] = [];
    const caseCount = ctx.term_list().length - 1;

    for (let i = 0; i < caseCount; i++) {
      cases.push({
        label: ctx.ID(i * 2).getText(),
        variable: ctx.ID(i * 2 + 1).getText(),
        body: this.visit(ctx.term(i + 1))
      })
    }

    return {
      kind: "VariantCase",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      variable: this.visit(ctx.term(0)),
      cases: cases
    }
  }

  visitInl = (ctx: InlContext): Inl => {
    return {
      kind: "Inl",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      term: this.visit(ctx.term()),
      type: new TypeBuilderVisitor().visit(ctx.type_())
    }
  }

  visitInr = (ctx: InrContext): Inr => {
    return {
      kind: "Inr",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      term: this.visit(ctx.term()),
      type: new TypeBuilderVisitor().visit(ctx.type_())
    }
  }

  visitIfCondition = (ctx: IfConditionContext): IfCondition => {
    // Terms appear in source order: condition, then, (elseif-condition, elseif-then)*, else?
    const terms = ctx.term_list();
    let next = 0;

    const node: IfCondition = {
      kind: "IfCondition",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      condition: this.visit(terms[next++]),
      then: this.visit(terms[next++]),
    }

    if (ctx.ELSEIF_list().length > 0) {
      const elif: { condition: Term; then: Term }[] = []
      for (let i = 0; i < ctx.ELSEIF_list().length; i++) {
        elif.push({
          condition: this.visit(terms[next++]),
          then: this.visit(terms[next++]),
        })
      }

      node.elif = elif
    }

    if (ctx.ELSE() != null) {
      node.else = this.visit(terms[next++])
    }

    return node
  }

  visitCase = (ctx: CaseContext): Case => {
    return {
      kind: "Case",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      variable: this.visit(ctx.term(0)),
      inl: {
        variable: ctx.ID(0).getText(),
        term: this.visit(ctx.term(1))
      },
      inr: {
        variable: ctx.ID(1).getText(),
        term: this.visit(ctx.term(2))
      }
    }
  }

  visitVariant = (ctx: VariantContext): Variant => {
    return {
      kind: "Variant",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      type: new TypeBuilderVisitor().visit(ctx.type_()),
      variants: ctx.term_list().map((term, i) => ({
        label: ctx.ID(i).getText(),
        term: this.visit(term)
      }))
    }
  }

  visitAscribe = (ctx: AscribeContext): Ascribe => {
    return {
      kind: "Ascribe",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      term: this.visit(ctx.term()),
      type: new TypeBuilderVisitor().visit(ctx.type_())
    }
  }

  visitTupleProjection = (ctx: TupleProjectionContext): TupleProjection => {
    return {
      kind: "TupleProjection",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      tuple: this.visit(ctx.term()),
      index: parseInt(ctx.NATURAL_NUMBER().getText())
    }
  }

  visitRecordProjection = (ctx: RecordProjectionContext): RecordProjection => {
    return {
      kind: "RecordProjection",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      term: this.visit(ctx.term()),
      label: ctx.ID().getText()
    }
  }

  visitRecord = (ctx: RecordContext): Record => {
    return {
      kind: "Record",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      fields: ctx.term_list().map((term, i) => ({
        label: ctx.ID(i).getText(),
        term: this.visit(term)
      }))
    }
  }

  visitSequencing = (ctx: SequencingContext): Sequencing => {
    return {
      kind: "Sequencing",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      first: this.visit(ctx.term(0)),
      second: this.visit(ctx.term(1))
    }
  }

  visitTuple = (ctx: TupleContext): Tuple => {
    return {
      kind: "Tuple",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      elements: ctx.term_list().map((term) => this.visit(term))
    }
  }

  visitDummyAbstraction = (ctx: DummyAbstractionContext): DummyAbstraction => {
    return {
      kind: "DummyAbstraction",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      paramType: new TypeBuilderVisitor().visit(ctx.type_()),
      body: this.visit(ctx.term()),
    }
  }


  visitBinaryOp = (ctx: BinaryOpContext): BinOp => {
    return {
      kind: "BinOp",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      operator: ctx._op.text as BinaryOperator,
      left: this.visit(ctx.term(0)),
      right: this.visit(ctx.term(1)),
    }
  }

  visitFix = (ctx: FixContext): Fix => {
    return {
      kind: "Fix",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      term: this.visit(ctx.term()),
    }
  }

  visitLetExpression = (ctx: LetExpressionContext): Let => {
    return {
      kind: "Let",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      name: ctx.ID().getText(),
      value: this.visit(ctx.term(0)),
      body: this.visit(ctx.term(1)),
    }
  }

  visitTypeAbstraction = (ctx: TypeAbstractionContext): TypeAbs => {
    return {
      kind: "TypeAbs",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      typeParam: ctx.typeVariable().getText(),
      body: this.visit(ctx.term()),
    }
  }

  visitTypeApplication = (ctx: TypeApplicationContext): TypeApp => {
    return {
      kind: "TypeApp",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      typeArg: new TypeBuilderVisitor().visit(ctx.type_()),
      term: this.visit(ctx.term()),
    }
  }

  visitNil = (ctx: NilContext): Nil => {
    return {
      kind: "Nil",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      type: new TypeBuilderVisitor().visit(ctx.type_()),
    }
  }

  visitCons = (ctx: ConsContext): Cons => {
    return {
      kind: "Cons",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      type: new TypeBuilderVisitor().visit(ctx.type_()),
      head: this.visit(ctx.term(0)),
      tail: this.visit(ctx.term(1)),
    }
  }

  visitIsNil = (ctx: IsNilContext): IsNil => {
    return {
      kind: "IsNil",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      type: new TypeBuilderVisitor().visit(ctx.type_()),
      term: this.visit(ctx.term()),
    }
  }

  visitHead = (ctx: HeadContext): Head => {
    return {
      kind: "Head",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      type: new TypeBuilderVisitor().visit(ctx.type_()),
      term: this.visit(ctx.term()),
    }
  }

  visitTail = (ctx: TailContext): Tail => {
    return {
      kind: "Tail",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      type: new TypeBuilderVisitor().visit(ctx.type_()),
      term: this.visit(ctx.term()),
    }
  }

  visitFold = (ctx: FoldContext): Fold => {
    return {
      kind: "Fold",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      type: new TypeBuilderVisitor().visit(ctx.type_()),
      term: this.visit(ctx.term()),
    }
  }

  visitUnfold = (ctx: UnfoldContext): Unfold => {
    return {
      kind: "Unfold",
      id: crypto.randomUUID(),
      pos: sourcePos(ctx),
      type: new TypeBuilderVisitor().visit(ctx.type_()),
      term: this.visit(ctx.term()),
    }
  }

}
