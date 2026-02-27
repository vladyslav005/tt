// Generated from ./src/shared/core/antlr/Lambda.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


import { ExprContext } from "./LambdaParser.js";
import { GlobalVariableDeclarationContext } from "./LambdaParser.js";
import { GlobalFunctionDeclarationContext } from "./LambdaParser.js";
import { LambdaAbstractionContext } from "./LambdaParser.js";
import { VariableContext } from "./LambdaParser.js";
import { LiteralContext } from "./LambdaParser.js";
import { ApplicationContext } from "./LambdaParser.js";
import { ParenthesesContext } from "./LambdaParser.js";
import { TypeIdentifierContext } from "./LambdaParser.js";
import { FunctionTypeContext } from "./LambdaParser.js";
import { ParenTypeContext } from "./LambdaParser.js";
import { ConstantContext } from "./LambdaParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `LambdaParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class LambdaVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `Expr`
	 * labeled alternative in `LambdaParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr?: (ctx: ExprContext) => Result;
	/**
	 * Visit a parse tree produced by the `GlobalVariableDeclaration`
	 * labeled alternative in `LambdaParser.globalDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGlobalVariableDeclaration?: (ctx: GlobalVariableDeclarationContext) => Result;
	/**
	 * Visit a parse tree produced by the `GlobalFunctionDeclaration`
	 * labeled alternative in `LambdaParser.globalDecl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGlobalFunctionDeclaration?: (ctx: GlobalFunctionDeclarationContext) => Result;
	/**
	 * Visit a parse tree produced by the `LambdaAbstraction`
	 * labeled alternative in `LambdaParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLambdaAbstraction?: (ctx: LambdaAbstractionContext) => Result;
	/**
	 * Visit a parse tree produced by the `Variable`
	 * labeled alternative in `LambdaParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable?: (ctx: VariableContext) => Result;
	/**
	 * Visit a parse tree produced by the `Literal`
	 * labeled alternative in `LambdaParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiteral?: (ctx: LiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `Application`
	 * labeled alternative in `LambdaParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitApplication?: (ctx: ApplicationContext) => Result;
	/**
	 * Visit a parse tree produced by the `Parentheses`
	 * labeled alternative in `LambdaParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParentheses?: (ctx: ParenthesesContext) => Result;
	/**
	 * Visit a parse tree produced by the `TypeIdentifier`
	 * labeled alternative in `LambdaParser.type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeIdentifier?: (ctx: TypeIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by the `FunctionType`
	 * labeled alternative in `LambdaParser.type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionType?: (ctx: FunctionTypeContext) => Result;
	/**
	 * Visit a parse tree produced by the `ParenType`
	 * labeled alternative in `LambdaParser.type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenType?: (ctx: ParenTypeContext) => Result;
	/**
	 * Visit a parse tree produced by `LambdaParser.constant`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant?: (ctx: ConstantContext) => Result;
}

