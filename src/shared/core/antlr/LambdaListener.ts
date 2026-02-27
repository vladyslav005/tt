// Generated from ./src/shared/core/antlr/Lambda.g4 by ANTLR 4.13.2

import {ParseTreeListener} from "antlr4";


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
 * This interface defines a complete listener for a parse tree produced by
 * `LambdaParser`.
 */
export default class LambdaListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `Expr`
	 * labeled alternative in `LambdaParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpr?: (ctx: ExprContext) => void;
	/**
	 * Exit a parse tree produced by the `Expr`
	 * labeled alternative in `LambdaParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpr?: (ctx: ExprContext) => void;
	/**
	 * Enter a parse tree produced by the `GlobalVariableDeclaration`
	 * labeled alternative in `LambdaParser.globalDecl`.
	 * @param ctx the parse tree
	 */
	enterGlobalVariableDeclaration?: (ctx: GlobalVariableDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by the `GlobalVariableDeclaration`
	 * labeled alternative in `LambdaParser.globalDecl`.
	 * @param ctx the parse tree
	 */
	exitGlobalVariableDeclaration?: (ctx: GlobalVariableDeclarationContext) => void;
	/**
	 * Enter a parse tree produced by the `GlobalFunctionDeclaration`
	 * labeled alternative in `LambdaParser.globalDecl`.
	 * @param ctx the parse tree
	 */
	enterGlobalFunctionDeclaration?: (ctx: GlobalFunctionDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by the `GlobalFunctionDeclaration`
	 * labeled alternative in `LambdaParser.globalDecl`.
	 * @param ctx the parse tree
	 */
	exitGlobalFunctionDeclaration?: (ctx: GlobalFunctionDeclarationContext) => void;
	/**
	 * Enter a parse tree produced by the `LambdaAbstraction`
	 * labeled alternative in `LambdaParser.term`.
	 * @param ctx the parse tree
	 */
	enterLambdaAbstraction?: (ctx: LambdaAbstractionContext) => void;
	/**
	 * Exit a parse tree produced by the `LambdaAbstraction`
	 * labeled alternative in `LambdaParser.term`.
	 * @param ctx the parse tree
	 */
	exitLambdaAbstraction?: (ctx: LambdaAbstractionContext) => void;
	/**
	 * Enter a parse tree produced by the `Variable`
	 * labeled alternative in `LambdaParser.term`.
	 * @param ctx the parse tree
	 */
	enterVariable?: (ctx: VariableContext) => void;
	/**
	 * Exit a parse tree produced by the `Variable`
	 * labeled alternative in `LambdaParser.term`.
	 * @param ctx the parse tree
	 */
	exitVariable?: (ctx: VariableContext) => void;
	/**
	 * Enter a parse tree produced by the `Literal`
	 * labeled alternative in `LambdaParser.term`.
	 * @param ctx the parse tree
	 */
	enterLiteral?: (ctx: LiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `Literal`
	 * labeled alternative in `LambdaParser.term`.
	 * @param ctx the parse tree
	 */
	exitLiteral?: (ctx: LiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `Application`
	 * labeled alternative in `LambdaParser.term`.
	 * @param ctx the parse tree
	 */
	enterApplication?: (ctx: ApplicationContext) => void;
	/**
	 * Exit a parse tree produced by the `Application`
	 * labeled alternative in `LambdaParser.term`.
	 * @param ctx the parse tree
	 */
	exitApplication?: (ctx: ApplicationContext) => void;
	/**
	 * Enter a parse tree produced by the `Parentheses`
	 * labeled alternative in `LambdaParser.term`.
	 * @param ctx the parse tree
	 */
	enterParentheses?: (ctx: ParenthesesContext) => void;
	/**
	 * Exit a parse tree produced by the `Parentheses`
	 * labeled alternative in `LambdaParser.term`.
	 * @param ctx the parse tree
	 */
	exitParentheses?: (ctx: ParenthesesContext) => void;
	/**
	 * Enter a parse tree produced by the `TypeIdentifier`
	 * labeled alternative in `LambdaParser.type`.
	 * @param ctx the parse tree
	 */
	enterTypeIdentifier?: (ctx: TypeIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by the `TypeIdentifier`
	 * labeled alternative in `LambdaParser.type`.
	 * @param ctx the parse tree
	 */
	exitTypeIdentifier?: (ctx: TypeIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by the `FunctionType`
	 * labeled alternative in `LambdaParser.type`.
	 * @param ctx the parse tree
	 */
	enterFunctionType?: (ctx: FunctionTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `FunctionType`
	 * labeled alternative in `LambdaParser.type`.
	 * @param ctx the parse tree
	 */
	exitFunctionType?: (ctx: FunctionTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `ParenType`
	 * labeled alternative in `LambdaParser.type`.
	 * @param ctx the parse tree
	 */
	enterParenType?: (ctx: ParenTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `ParenType`
	 * labeled alternative in `LambdaParser.type`.
	 * @param ctx the parse tree
	 */
	exitParenType?: (ctx: ParenTypeContext) => void;
	/**
	 * Enter a parse tree produced by `LambdaParser.constant`.
	 * @param ctx the parse tree
	 */
	enterConstant?: (ctx: ConstantContext) => void;
	/**
	 * Exit a parse tree produced by `LambdaParser.constant`.
	 * @param ctx the parse tree
	 */
	exitConstant?: (ctx: ConstantContext) => void;
}

