// @ts-nocheck
// Generated from ./src/shared/core/antlr/Lambda.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import LambdaListener from "./LambdaListener.js";
import LambdaVisitor from "./LambdaVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class LambdaParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly LAMBDA = 9;
	public static readonly LABMDA_CAPITALIZED = 10;
	public static readonly LET = 11;
	public static readonly IN = 12;
	public static readonly FIX = 13;
	public static readonly CASE = 14;
	public static readonly OF = 15;
	public static readonly INL = 16;
	public static readonly INR = 17;
	public static readonly OR = 18;
	public static readonly AS = 19;
	public static readonly IF = 20;
	public static readonly THEN = 21;
	public static readonly ELSEIF = 22;
	public static readonly ELSE = 23;
	public static readonly UNDERSCORE = 24;
	public static readonly EQEQ = 25;
	public static readonly NEQ = 26;
	public static readonly LEQ = 27;
	public static readonly GEQ = 28;
	public static readonly EQ = 29;
	public static readonly LT = 30;
	public static readonly MT = 31;
	public static readonly MUL = 32;
	public static readonly PLUS = 33;
	public static readonly MINUS = 34;
	public static readonly DIV = 35;
	public static readonly LBRACK = 36;
	public static readonly RBRACK = 37;
	public static readonly LPAREN = 38;
	public static readonly RPAREN = 39;
	public static readonly COMMA = 40;
	public static readonly ARROW = 41;
	public static readonly DOUBLEARROW = 42;
	public static readonly COLON = 43;
	public static readonly DOT = 44;
	public static readonly SEMI = 45;
	public static readonly GREEK = 46;
	public static readonly NATURAL_NUMBER = 47;
	public static readonly ZERO = 48;
	public static readonly ID = 49;
	public static readonly LINE_COMMENT = 50;
	public static readonly WS = 51;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_expression = 0;
	public static readonly RULE_globalDecl = 1;
	public static readonly RULE_term = 2;
	public static readonly RULE_type = 3;
	public static readonly RULE_constant = 4;
	public static readonly literalNames: (string | null)[] = [ null, "'Nat'", 
                                                            "'Bool'", "'Unit'", 
                                                            "'true'", "'True'", 
                                                            "'false'", "'False'", 
                                                            "'unit'", null, 
                                                            "'\\u039B'", 
                                                            "'let'", "'in'", 
                                                            "'fix'", "'case'", 
                                                            "'of'", "'inl'", 
                                                            "'inr'", "'||'", 
                                                            "'as'", "'if'", 
                                                            "'then'", "'elseif'", 
                                                            "'else'", "'_'", 
                                                            "'=='", "'!='", 
                                                            "'<='", "'>='", 
                                                            "'='", "'<'", 
                                                            "'>'", null, 
                                                            "'+'", "'-'", 
                                                            "'/'", "'['", 
                                                            "']'", "'('", 
                                                            "')'", "','", 
                                                            null, null, 
                                                            "':'", "'.'", 
                                                            "';'", null, 
                                                            null, "'0'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, "LAMBDA", 
                                                             "LABMDA_CAPITALIZED", 
                                                             "LET", "IN", 
                                                             "FIX", "CASE", 
                                                             "OF", "INL", 
                                                             "INR", "OR", 
                                                             "AS", "IF", 
                                                             "THEN", "ELSEIF", 
                                                             "ELSE", "UNDERSCORE", 
                                                             "EQEQ", "NEQ", 
                                                             "LEQ", "GEQ", 
                                                             "EQ", "LT", 
                                                             "MT", "MUL", 
                                                             "PLUS", "MINUS", 
                                                             "DIV", "LBRACK", 
                                                             "RBRACK", "LPAREN", 
                                                             "RPAREN", "COMMA", 
                                                             "ARROW", "DOUBLEARROW", 
                                                             "COLON", "DOT", 
                                                             "SEMI", "GREEK", 
                                                             "NATURAL_NUMBER", 
                                                             "ZERO", "ID", 
                                                             "LINE_COMMENT", 
                                                             "WS" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"expression", "globalDecl", "term", "type", "constant",
	];
	public get grammarFileName(): string { return "Lambda.g4"; }
	public get literalNames(): (string | null)[] { return LambdaParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return LambdaParser.symbolicNames; }
	public get ruleNames(): string[] { return LambdaParser.ruleNames; }
	public get serializedATN(): number[] { return LambdaParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, LambdaParser._ATN, LambdaParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public expression(): ExpressionContext {
		let localctx: ExpressionContext = new ExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, LambdaParser.RULE_expression);
		let _la: number;
		try {
			let _alt: number;
			localctx = new ExprContext(this, localctx);
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 13;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 0, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 10;
					this.globalDecl();
					}
					}
				}
				this.state = 15;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 0, this._ctx);
			}
			this.state = 19;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1075014648) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 14341) !== 0)) {
				{
				this.state = 16;
				this.term(0);
				this.state = 17;
				this.match(LambdaParser.SEMI);
				}
			}

			this.state = 21;
			this.match(LambdaParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public globalDecl(): GlobalDeclContext {
		let localctx: GlobalDeclContext = new GlobalDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, LambdaParser.RULE_globalDecl);
		try {
			this.state = 35;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				localctx = new GlobalVariableDeclarationContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 23;
				this.match(LambdaParser.ID);
				this.state = 24;
				this.match(LambdaParser.COLON);
				this.state = 25;
				this.type_(0);
				this.state = 26;
				this.match(LambdaParser.SEMI);
				}
				break;
			case 2:
				localctx = new GlobalFunctionDeclarationContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 28;
				this.match(LambdaParser.ID);
				this.state = 29;
				this.match(LambdaParser.EQ);
				this.state = 30;
				this.term(0);
				this.state = 31;
				this.match(LambdaParser.COLON);
				this.state = 32;
				this.type_(0);
				this.state = 33;
				this.match(LambdaParser.SEMI);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public term(): TermContext;
	public term(_p: number): TermContext;
	// @RuleVersion(0)
	public term(_p?: number): TermContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: TermContext = new TermContext(this, this._ctx, _parentState);
		let _prevctx: TermContext = localctx;
		let _startState: number = 4;
		this.enterRecursionRule(localctx, 4, LambdaParser.RULE_term, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 178;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				{
				localctx = new LetExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 38;
				this.match(LambdaParser.LET);
				this.state = 39;
				this.match(LambdaParser.ID);
				this.state = 40;
				this.match(LambdaParser.EQ);
				this.state = 41;
				this.term(0);
				this.state = 42;
				this.match(LambdaParser.IN);
				this.state = 43;
				this.term(20);
				}
				break;
			case 2:
				{
				localctx = new DummyAbstractionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 45;
				this.match(LambdaParser.LAMBDA);
				this.state = 46;
				this.match(LambdaParser.UNDERSCORE);
				this.state = 47;
				this.match(LambdaParser.COLON);
				this.state = 48;
				this.type_(0);
				this.state = 49;
				this.match(LambdaParser.DOT);
				this.state = 50;
				this.term(15);
				}
				break;
			case 3:
				{
				localctx = new LambdaAbstractionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 52;
				this.match(LambdaParser.LAMBDA);
				this.state = 53;
				this.match(LambdaParser.ID);
				this.state = 54;
				this.match(LambdaParser.COLON);
				this.state = 55;
				this.type_(0);
				this.state = 56;
				this.match(LambdaParser.DOT);
				this.state = 57;
				this.term(14);
				}
				break;
			case 4:
				{
				localctx = new LambdaAbstractionUntypedContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 59;
				this.match(LambdaParser.LAMBDA);
				this.state = 60;
				this.match(LambdaParser.ID);
				this.state = 61;
				this.match(LambdaParser.DOT);
				this.state = 62;
				this.term(13);
				}
				break;
			case 5:
				{
				localctx = new IfConditionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 63;
				this.match(LambdaParser.IF);
				this.state = 64;
				this.term(0);
				this.state = 65;
				this.match(LambdaParser.THEN);
				this.state = 66;
				this.term(0);
				this.state = 74;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 67;
						this.match(LambdaParser.ELSEIF);
						this.state = 68;
						this.term(0);
						this.state = 69;
						this.match(LambdaParser.THEN);
						this.state = 70;
						this.term(0);
						}
						}
					}
					this.state = 76;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
				}
				this.state = 79;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 4, this._ctx) ) {
				case 1:
					{
					this.state = 77;
					this.match(LambdaParser.ELSE);
					this.state = 78;
					this.term(0);
					}
					break;
				}
				}
				break;
			case 6:
				{
				localctx = new CaseContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 81;
				this.match(LambdaParser.CASE);
				this.state = 82;
				this.term(0);
				this.state = 83;
				this.match(LambdaParser.OR);
				this.state = 84;
				this.match(LambdaParser.INL);
				this.state = 85;
				this.match(LambdaParser.ID);
				this.state = 86;
				this.match(LambdaParser.DOUBLEARROW);
				this.state = 87;
				this.term(0);
				this.state = 88;
				this.match(LambdaParser.OR);
				this.state = 89;
				this.match(LambdaParser.INR);
				this.state = 90;
				this.match(LambdaParser.ID);
				this.state = 91;
				this.match(LambdaParser.DOUBLEARROW);
				this.state = 92;
				this.term(11);
				}
				break;
			case 7:
				{
				localctx = new VariantCaseContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 94;
				this.match(LambdaParser.CASE);
				this.state = 95;
				this.term(0);
				this.state = 96;
				this.match(LambdaParser.OF);
				this.state = 97;
				this.match(LambdaParser.LBRACK);
				this.state = 98;
				this.match(LambdaParser.ID);
				this.state = 99;
				this.match(LambdaParser.EQ);
				this.state = 100;
				this.match(LambdaParser.ID);
				this.state = 101;
				this.match(LambdaParser.RBRACK);
				this.state = 102;
				this.match(LambdaParser.DOUBLEARROW);
				this.state = 103;
				this.term(0);
				this.state = 114;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 104;
						this.match(LambdaParser.OR);
						this.state = 105;
						this.match(LambdaParser.LBRACK);
						this.state = 106;
						this.match(LambdaParser.ID);
						this.state = 107;
						this.match(LambdaParser.EQ);
						this.state = 108;
						this.match(LambdaParser.ID);
						this.state = 109;
						this.match(LambdaParser.RBRACK);
						this.state = 110;
						this.match(LambdaParser.DOUBLEARROW);
						this.state = 111;
						this.term(0);
						}
						}
					}
					this.state = 116;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
				}
				}
				break;
			case 8:
				{
				localctx = new InlContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 117;
				this.match(LambdaParser.INL);
				this.state = 118;
				this.term(0);
				this.state = 119;
				this.match(LambdaParser.AS);
				this.state = 120;
				this.type_(0);
				}
				break;
			case 9:
				{
				localctx = new InrContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 122;
				this.match(LambdaParser.INR);
				this.state = 123;
				this.term(0);
				this.state = 124;
				this.match(LambdaParser.AS);
				this.state = 125;
				this.type_(0);
				}
				break;
			case 10:
				{
				localctx = new FixContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 127;
				this.match(LambdaParser.FIX);
				this.state = 128;
				this.term(7);
				}
				break;
			case 11:
				{
				localctx = new RecordContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 129;
				this.match(LambdaParser.LT);
				this.state = 130;
				this.match(LambdaParser.ID);
				this.state = 131;
				this.match(LambdaParser.EQ);
				this.state = 132;
				this.term(0);
				this.state = 139;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===40) {
					{
					{
					this.state = 133;
					this.match(LambdaParser.COMMA);
					this.state = 134;
					this.match(LambdaParser.ID);
					this.state = 135;
					this.match(LambdaParser.EQ);
					this.state = 136;
					this.term(0);
					}
					}
					this.state = 141;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 142;
				this.match(LambdaParser.MT);
				}
				break;
			case 12:
				{
				localctx = new TupleContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 144;
				this.match(LambdaParser.LT);
				this.state = 145;
				this.term(0);
				this.state = 150;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===40) {
					{
					{
					this.state = 146;
					this.match(LambdaParser.COMMA);
					this.state = 147;
					this.term(0);
					}
					}
					this.state = 152;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 153;
				this.match(LambdaParser.MT);
				}
				break;
			case 13:
				{
				localctx = new VariantContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 155;
				this.match(LambdaParser.LBRACK);
				this.state = 156;
				this.match(LambdaParser.ID);
				this.state = 157;
				this.match(LambdaParser.EQ);
				this.state = 158;
				this.term(0);
				this.state = 165;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===40) {
					{
					{
					this.state = 159;
					this.match(LambdaParser.COMMA);
					this.state = 160;
					this.match(LambdaParser.ID);
					this.state = 161;
					this.match(LambdaParser.EQ);
					this.state = 162;
					this.term(0);
					}
					}
					this.state = 167;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 168;
				this.match(LambdaParser.RBRACK);
				this.state = 169;
				this.match(LambdaParser.AS);
				this.state = 170;
				this.type_(0);
				}
				break;
			case 14:
				{
				localctx = new VariableContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 172;
				this.match(LambdaParser.ID);
				}
				break;
			case 15:
				{
				localctx = new ParenthesesContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 173;
				this.match(LambdaParser.LPAREN);
				this.state = 174;
				this.term(0);
				this.state = 175;
				this.match(LambdaParser.RPAREN);
				}
				break;
			case 16:
				{
				localctx = new LiteralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 177;
				this.constant();
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 199;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 11, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 197;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 10, this._ctx) ) {
					case 1:
						{
						localctx = new ApplicationContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 180;
						if (!(this.precpred(this._ctx, 19))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 19)");
						}
						this.state = 181;
						this.term(20);
						}
						break;
					case 2:
						{
						localctx = new BinaryOpContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 182;
						if (!(this.precpred(this._ctx, 18))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 18)");
						}
						this.state = 183;
						(localctx as BinaryOpContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(((((_la - 25)) & ~0x1F) === 0 && ((1 << (_la - 25)) & 2031) !== 0))) {
						    (localctx as BinaryOpContext)._op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 184;
						this.term(19);
						}
						break;
					case 3:
						{
						localctx = new SequencingContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 185;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 186;
						this.match(LambdaParser.SEMI);
						this.state = 187;
						this.term(16);
						}
						break;
					case 4:
						{
						localctx = new TupleProjectionContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 188;
						if (!(this.precpred(this._ctx, 22))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 22)");
						}
						this.state = 189;
						this.match(LambdaParser.DOT);
						this.state = 190;
						this.match(LambdaParser.NATURAL_NUMBER);
						}
						break;
					case 5:
						{
						localctx = new RecordProjectionContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 191;
						if (!(this.precpred(this._ctx, 21))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 21)");
						}
						this.state = 192;
						this.match(LambdaParser.DOT);
						this.state = 193;
						this.match(LambdaParser.ID);
						}
						break;
					case 6:
						{
						localctx = new AscribeContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 194;
						if (!(this.precpred(this._ctx, 17))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 17)");
						}
						this.state = 195;
						this.match(LambdaParser.AS);
						this.state = 196;
						this.type_(0);
						}
						break;
					}
					}
				}
				this.state = 201;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 11, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}

	public type_(): TypeContext;
	public type_(_p: number): TypeContext;
	// @RuleVersion(0)
	public type_(_p?: number): TypeContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: TypeContext = new TypeContext(this, this._ctx, _parentState);
		let _prevctx: TypeContext = localctx;
		let _startState: number = 6;
		this.enterRecursionRule(localctx, 6, LambdaParser.RULE_type, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 234;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 30:
				{
				localctx = new TupleTypeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 203;
				this.match(LambdaParser.LT);
				this.state = 204;
				this.type_(0);
				this.state = 209;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===32) {
					{
					{
					this.state = 205;
					this.match(LambdaParser.MUL);
					this.state = 206;
					this.type_(0);
					}
					}
					this.state = 211;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 212;
				this.match(LambdaParser.MT);
				}
				break;
			case 36:
				{
				localctx = new VariantTypeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 214;
				this.match(LambdaParser.LBRACK);
				this.state = 215;
				this.match(LambdaParser.ID);
				this.state = 216;
				this.match(LambdaParser.COLON);
				this.state = 217;
				this.type_(0);
				this.state = 224;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===40) {
					{
					{
					this.state = 218;
					this.match(LambdaParser.COMMA);
					this.state = 219;
					this.match(LambdaParser.ID);
					this.state = 220;
					this.match(LambdaParser.COLON);
					this.state = 221;
					this.type_(0);
					}
					}
					this.state = 226;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 227;
				this.match(LambdaParser.RBRACK);
				}
				break;
			case 38:
				{
				localctx = new ParenTypeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 229;
				this.match(LambdaParser.LPAREN);
				this.state = 230;
				this.type_(0);
				this.state = 231;
				this.match(LambdaParser.RPAREN);
				}
				break;
			case 1:
			case 2:
			case 3:
			case 46:
			case 49:
				{
				localctx = new TypeIdentifierContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 233;
				_la = this._input.LA(1);
				if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || _la===46 || _la===49)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 244;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 16, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 242;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 15, this._ctx) ) {
					case 1:
						{
						localctx = new SumTypeContext(this, new TypeContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_type);
						this.state = 236;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 237;
						this.match(LambdaParser.PLUS);
						this.state = 238;
						this.type_(7);
						}
						break;
					case 2:
						{
						localctx = new FunctionTypeContext(this, new TypeContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_type);
						this.state = 239;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 240;
						this.match(LambdaParser.ARROW);
						this.state = 241;
						this.type_(5);
						}
						break;
					}
					}
				}
				this.state = 246;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 16, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}
	// @RuleVersion(0)
	public constant(): ConstantContext {
		let localctx: ConstantContext = new ConstantContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, LambdaParser.RULE_constant);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 247;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 504) !== 0) || _la===47 || _la===48)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 2:
			return this.term_sempred(localctx as TermContext, predIndex);
		case 3:
			return this.type_sempred(localctx as TypeContext, predIndex);
		}
		return true;
	}
	private term_sempred(localctx: TermContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 19);
		case 1:
			return this.precpred(this._ctx, 18);
		case 2:
			return this.precpred(this._ctx, 16);
		case 3:
			return this.precpred(this._ctx, 22);
		case 4:
			return this.precpred(this._ctx, 21);
		case 5:
			return this.precpred(this._ctx, 17);
		}
		return true;
	}
	private type_sempred(localctx: TypeContext, predIndex: number): boolean {
		switch (predIndex) {
		case 6:
			return this.precpred(this._ctx, 6);
		case 7:
			return this.precpred(this._ctx, 5);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,51,250,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,1,0,5,0,12,8,0,10,0,12,0,15,9,0,1,0,1,0,1,
	0,3,0,20,8,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,
	1,36,8,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
	2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
	2,1,2,5,2,73,8,2,10,2,12,2,76,9,2,1,2,1,2,3,2,80,8,2,1,2,1,2,1,2,1,2,1,
	2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
	2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,5,2,113,8,2,10,2,12,2,116,9,2,1,2,1,2,
	1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,
	5,2,138,8,2,10,2,12,2,141,9,2,1,2,1,2,1,2,1,2,1,2,1,2,5,2,149,8,2,10,2,
	12,2,152,9,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,5,2,164,8,2,10,2,12,
	2,167,9,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,179,8,2,1,2,1,2,1,
	2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,5,2,198,8,2,10,
	2,12,2,201,9,2,1,3,1,3,1,3,1,3,1,3,5,3,208,8,3,10,3,12,3,211,9,3,1,3,1,
	3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,5,3,223,8,3,10,3,12,3,226,9,3,1,3,1,3,
	1,3,1,3,1,3,1,3,1,3,3,3,235,8,3,1,3,1,3,1,3,1,3,1,3,1,3,5,3,243,8,3,10,
	3,12,3,246,9,3,1,4,1,4,1,4,0,2,4,6,5,0,2,4,6,8,0,3,2,0,25,28,30,35,3,0,
	1,3,46,46,49,49,2,0,3,8,47,48,281,0,13,1,0,0,0,2,35,1,0,0,0,4,178,1,0,0,
	0,6,234,1,0,0,0,8,247,1,0,0,0,10,12,3,2,1,0,11,10,1,0,0,0,12,15,1,0,0,0,
	13,11,1,0,0,0,13,14,1,0,0,0,14,19,1,0,0,0,15,13,1,0,0,0,16,17,3,4,2,0,17,
	18,5,45,0,0,18,20,1,0,0,0,19,16,1,0,0,0,19,20,1,0,0,0,20,21,1,0,0,0,21,
	22,5,0,0,1,22,1,1,0,0,0,23,24,5,49,0,0,24,25,5,43,0,0,25,26,3,6,3,0,26,
	27,5,45,0,0,27,36,1,0,0,0,28,29,5,49,0,0,29,30,5,29,0,0,30,31,3,4,2,0,31,
	32,5,43,0,0,32,33,3,6,3,0,33,34,5,45,0,0,34,36,1,0,0,0,35,23,1,0,0,0,35,
	28,1,0,0,0,36,3,1,0,0,0,37,38,6,2,-1,0,38,39,5,11,0,0,39,40,5,49,0,0,40,
	41,5,29,0,0,41,42,3,4,2,0,42,43,5,12,0,0,43,44,3,4,2,20,44,179,1,0,0,0,
	45,46,5,9,0,0,46,47,5,24,0,0,47,48,5,43,0,0,48,49,3,6,3,0,49,50,5,44,0,
	0,50,51,3,4,2,15,51,179,1,0,0,0,52,53,5,9,0,0,53,54,5,49,0,0,54,55,5,43,
	0,0,55,56,3,6,3,0,56,57,5,44,0,0,57,58,3,4,2,14,58,179,1,0,0,0,59,60,5,
	9,0,0,60,61,5,49,0,0,61,62,5,44,0,0,62,179,3,4,2,13,63,64,5,20,0,0,64,65,
	3,4,2,0,65,66,5,21,0,0,66,74,3,4,2,0,67,68,5,22,0,0,68,69,3,4,2,0,69,70,
	5,21,0,0,70,71,3,4,2,0,71,73,1,0,0,0,72,67,1,0,0,0,73,76,1,0,0,0,74,72,
	1,0,0,0,74,75,1,0,0,0,75,79,1,0,0,0,76,74,1,0,0,0,77,78,5,23,0,0,78,80,
	3,4,2,0,79,77,1,0,0,0,79,80,1,0,0,0,80,179,1,0,0,0,81,82,5,14,0,0,82,83,
	3,4,2,0,83,84,5,18,0,0,84,85,5,16,0,0,85,86,5,49,0,0,86,87,5,42,0,0,87,
	88,3,4,2,0,88,89,5,18,0,0,89,90,5,17,0,0,90,91,5,49,0,0,91,92,5,42,0,0,
	92,93,3,4,2,11,93,179,1,0,0,0,94,95,5,14,0,0,95,96,3,4,2,0,96,97,5,15,0,
	0,97,98,5,36,0,0,98,99,5,49,0,0,99,100,5,29,0,0,100,101,5,49,0,0,101,102,
	5,37,0,0,102,103,5,42,0,0,103,114,3,4,2,0,104,105,5,18,0,0,105,106,5,36,
	0,0,106,107,5,49,0,0,107,108,5,29,0,0,108,109,5,49,0,0,109,110,5,37,0,0,
	110,111,5,42,0,0,111,113,3,4,2,0,112,104,1,0,0,0,113,116,1,0,0,0,114,112,
	1,0,0,0,114,115,1,0,0,0,115,179,1,0,0,0,116,114,1,0,0,0,117,118,5,16,0,
	0,118,119,3,4,2,0,119,120,5,19,0,0,120,121,3,6,3,0,121,179,1,0,0,0,122,
	123,5,17,0,0,123,124,3,4,2,0,124,125,5,19,0,0,125,126,3,6,3,0,126,179,1,
	0,0,0,127,128,5,13,0,0,128,179,3,4,2,7,129,130,5,30,0,0,130,131,5,49,0,
	0,131,132,5,29,0,0,132,139,3,4,2,0,133,134,5,40,0,0,134,135,5,49,0,0,135,
	136,5,29,0,0,136,138,3,4,2,0,137,133,1,0,0,0,138,141,1,0,0,0,139,137,1,
	0,0,0,139,140,1,0,0,0,140,142,1,0,0,0,141,139,1,0,0,0,142,143,5,31,0,0,
	143,179,1,0,0,0,144,145,5,30,0,0,145,150,3,4,2,0,146,147,5,40,0,0,147,149,
	3,4,2,0,148,146,1,0,0,0,149,152,1,0,0,0,150,148,1,0,0,0,150,151,1,0,0,0,
	151,153,1,0,0,0,152,150,1,0,0,0,153,154,5,31,0,0,154,179,1,0,0,0,155,156,
	5,36,0,0,156,157,5,49,0,0,157,158,5,29,0,0,158,165,3,4,2,0,159,160,5,40,
	0,0,160,161,5,49,0,0,161,162,5,29,0,0,162,164,3,4,2,0,163,159,1,0,0,0,164,
	167,1,0,0,0,165,163,1,0,0,0,165,166,1,0,0,0,166,168,1,0,0,0,167,165,1,0,
	0,0,168,169,5,37,0,0,169,170,5,19,0,0,170,171,3,6,3,0,171,179,1,0,0,0,172,
	179,5,49,0,0,173,174,5,38,0,0,174,175,3,4,2,0,175,176,5,39,0,0,176,179,
	1,0,0,0,177,179,3,8,4,0,178,37,1,0,0,0,178,45,1,0,0,0,178,52,1,0,0,0,178,
	59,1,0,0,0,178,63,1,0,0,0,178,81,1,0,0,0,178,94,1,0,0,0,178,117,1,0,0,0,
	178,122,1,0,0,0,178,127,1,0,0,0,178,129,1,0,0,0,178,144,1,0,0,0,178,155,
	1,0,0,0,178,172,1,0,0,0,178,173,1,0,0,0,178,177,1,0,0,0,179,199,1,0,0,0,
	180,181,10,19,0,0,181,198,3,4,2,20,182,183,10,18,0,0,183,184,7,0,0,0,184,
	198,3,4,2,19,185,186,10,16,0,0,186,187,5,45,0,0,187,198,3,4,2,16,188,189,
	10,22,0,0,189,190,5,44,0,0,190,198,5,47,0,0,191,192,10,21,0,0,192,193,5,
	44,0,0,193,198,5,49,0,0,194,195,10,17,0,0,195,196,5,19,0,0,196,198,3,6,
	3,0,197,180,1,0,0,0,197,182,1,0,0,0,197,185,1,0,0,0,197,188,1,0,0,0,197,
	191,1,0,0,0,197,194,1,0,0,0,198,201,1,0,0,0,199,197,1,0,0,0,199,200,1,0,
	0,0,200,5,1,0,0,0,201,199,1,0,0,0,202,203,6,3,-1,0,203,204,5,30,0,0,204,
	209,3,6,3,0,205,206,5,32,0,0,206,208,3,6,3,0,207,205,1,0,0,0,208,211,1,
	0,0,0,209,207,1,0,0,0,209,210,1,0,0,0,210,212,1,0,0,0,211,209,1,0,0,0,212,
	213,5,31,0,0,213,235,1,0,0,0,214,215,5,36,0,0,215,216,5,49,0,0,216,217,
	5,43,0,0,217,224,3,6,3,0,218,219,5,40,0,0,219,220,5,49,0,0,220,221,5,43,
	0,0,221,223,3,6,3,0,222,218,1,0,0,0,223,226,1,0,0,0,224,222,1,0,0,0,224,
	225,1,0,0,0,225,227,1,0,0,0,226,224,1,0,0,0,227,228,5,37,0,0,228,235,1,
	0,0,0,229,230,5,38,0,0,230,231,3,6,3,0,231,232,5,39,0,0,232,235,1,0,0,0,
	233,235,7,1,0,0,234,202,1,0,0,0,234,214,1,0,0,0,234,229,1,0,0,0,234,233,
	1,0,0,0,235,244,1,0,0,0,236,237,10,6,0,0,237,238,5,33,0,0,238,243,3,6,3,
	7,239,240,10,5,0,0,240,241,5,41,0,0,241,243,3,6,3,5,242,236,1,0,0,0,242,
	239,1,0,0,0,243,246,1,0,0,0,244,242,1,0,0,0,244,245,1,0,0,0,245,7,1,0,0,
	0,246,244,1,0,0,0,247,248,7,2,0,0,248,9,1,0,0,0,17,13,19,35,74,79,114,139,
	150,165,178,197,199,209,224,234,242,244];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!LambdaParser.__ATN) {
			LambdaParser.__ATN = new ATNDeserializer().deserialize(LambdaParser._serializedATN);
		}

		return LambdaParser.__ATN;
	}


	static DecisionsToDFA = LambdaParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class ExpressionContext extends ParserRuleContext {
	constructor(parser?: LambdaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return LambdaParser.RULE_expression;
	}
	public override copyFrom(ctx: ExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class ExprContext extends ExpressionContext {
	constructor(parser: LambdaParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public EOF(): TerminalNode {
		return this.getToken(LambdaParser.EOF, 0);
	}
	public globalDecl_list(): GlobalDeclContext[] {
		return this.getTypedRuleContexts(GlobalDeclContext) as GlobalDeclContext[];
	}
	public globalDecl(i: number): GlobalDeclContext {
		return this.getTypedRuleContext(GlobalDeclContext, i) as GlobalDeclContext;
	}
	public term(): TermContext {
		return this.getTypedRuleContext(TermContext, 0) as TermContext;
	}
	public SEMI(): TerminalNode {
		return this.getToken(LambdaParser.SEMI, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterExpr) {
	 		listener.enterExpr(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitExpr) {
	 		listener.exitExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitExpr) {
			return visitor.visitExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GlobalDeclContext extends ParserRuleContext {
	constructor(parser?: LambdaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return LambdaParser.RULE_globalDecl;
	}
	public override copyFrom(ctx: GlobalDeclContext): void {
		super.copyFrom(ctx);
	}
}
export class GlobalFunctionDeclarationContext extends GlobalDeclContext {
	constructor(parser: LambdaParser, ctx: GlobalDeclContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public ID(): TerminalNode {
		return this.getToken(LambdaParser.ID, 0);
	}
	public EQ(): TerminalNode {
		return this.getToken(LambdaParser.EQ, 0);
	}
	public term(): TermContext {
		return this.getTypedRuleContext(TermContext, 0) as TermContext;
	}
	public COLON(): TerminalNode {
		return this.getToken(LambdaParser.COLON, 0);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public SEMI(): TerminalNode {
		return this.getToken(LambdaParser.SEMI, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterGlobalFunctionDeclaration) {
	 		listener.enterGlobalFunctionDeclaration(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitGlobalFunctionDeclaration) {
	 		listener.exitGlobalFunctionDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitGlobalFunctionDeclaration) {
			return visitor.visitGlobalFunctionDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class GlobalVariableDeclarationContext extends GlobalDeclContext {
	constructor(parser: LambdaParser, ctx: GlobalDeclContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public ID(): TerminalNode {
		return this.getToken(LambdaParser.ID, 0);
	}
	public COLON(): TerminalNode {
		return this.getToken(LambdaParser.COLON, 0);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public SEMI(): TerminalNode {
		return this.getToken(LambdaParser.SEMI, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterGlobalVariableDeclaration) {
	 		listener.enterGlobalVariableDeclaration(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitGlobalVariableDeclaration) {
	 		listener.exitGlobalVariableDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitGlobalVariableDeclaration) {
			return visitor.visitGlobalVariableDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TermContext extends ParserRuleContext {
	constructor(parser?: LambdaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return LambdaParser.RULE_term;
	}
	public override copyFrom(ctx: TermContext): void {
		super.copyFrom(ctx);
	}
}
export class VariableContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public ID(): TerminalNode {
		return this.getToken(LambdaParser.ID, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterVariable) {
	 		listener.enterVariable(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitVariable) {
	 		listener.exitVariable(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitVariable) {
			return visitor.visitVariable(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LambdaAbstractionUntypedContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LAMBDA(): TerminalNode {
		return this.getToken(LambdaParser.LAMBDA, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(LambdaParser.ID, 0);
	}
	public DOT(): TerminalNode {
		return this.getToken(LambdaParser.DOT, 0);
	}
	public term(): TermContext {
		return this.getTypedRuleContext(TermContext, 0) as TermContext;
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterLambdaAbstractionUntyped) {
	 		listener.enterLambdaAbstractionUntyped(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitLambdaAbstractionUntyped) {
	 		listener.exitLambdaAbstractionUntyped(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitLambdaAbstractionUntyped) {
			return visitor.visitLambdaAbstractionUntyped(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class VariantCaseContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public CASE(): TerminalNode {
		return this.getToken(LambdaParser.CASE, 0);
	}
	public term_list(): TermContext[] {
		return this.getTypedRuleContexts(TermContext) as TermContext[];
	}
	public term(i: number): TermContext {
		return this.getTypedRuleContext(TermContext, i) as TermContext;
	}
	public OF(): TerminalNode {
		return this.getToken(LambdaParser.OF, 0);
	}
	public LBRACK_list(): TerminalNode[] {
	    	return this.getTokens(LambdaParser.LBRACK);
	}
	public LBRACK(i: number): TerminalNode {
		return this.getToken(LambdaParser.LBRACK, i);
	}
	public ID_list(): TerminalNode[] {
	    	return this.getTokens(LambdaParser.ID);
	}
	public ID(i: number): TerminalNode {
		return this.getToken(LambdaParser.ID, i);
	}
	public EQ_list(): TerminalNode[] {
	    	return this.getTokens(LambdaParser.EQ);
	}
	public EQ(i: number): TerminalNode {
		return this.getToken(LambdaParser.EQ, i);
	}
	public RBRACK_list(): TerminalNode[] {
	    	return this.getTokens(LambdaParser.RBRACK);
	}
	public RBRACK(i: number): TerminalNode {
		return this.getToken(LambdaParser.RBRACK, i);
	}
	public DOUBLEARROW_list(): TerminalNode[] {
	    	return this.getTokens(LambdaParser.DOUBLEARROW);
	}
	public DOUBLEARROW(i: number): TerminalNode {
		return this.getToken(LambdaParser.DOUBLEARROW, i);
	}
	public OR_list(): TerminalNode[] {
	    	return this.getTokens(LambdaParser.OR);
	}
	public OR(i: number): TerminalNode {
		return this.getToken(LambdaParser.OR, i);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterVariantCase) {
	 		listener.enterVariantCase(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitVariantCase) {
	 		listener.exitVariantCase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitVariantCase) {
			return visitor.visitVariantCase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InlContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public INL(): TerminalNode {
		return this.getToken(LambdaParser.INL, 0);
	}
	public term(): TermContext {
		return this.getTypedRuleContext(TermContext, 0) as TermContext;
	}
	public AS(): TerminalNode {
		return this.getToken(LambdaParser.AS, 0);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterInl) {
	 		listener.enterInl(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitInl) {
	 		listener.exitInl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitInl) {
			return visitor.visitInl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IfConditionContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public IF(): TerminalNode {
		return this.getToken(LambdaParser.IF, 0);
	}
	public term_list(): TermContext[] {
		return this.getTypedRuleContexts(TermContext) as TermContext[];
	}
	public term(i: number): TermContext {
		return this.getTypedRuleContext(TermContext, i) as TermContext;
	}
	public THEN_list(): TerminalNode[] {
	    	return this.getTokens(LambdaParser.THEN);
	}
	public THEN(i: number): TerminalNode {
		return this.getToken(LambdaParser.THEN, i);
	}
	public ELSEIF_list(): TerminalNode[] {
	    	return this.getTokens(LambdaParser.ELSEIF);
	}
	public ELSEIF(i: number): TerminalNode {
		return this.getToken(LambdaParser.ELSEIF, i);
	}
	public ELSE(): TerminalNode {
		return this.getToken(LambdaParser.ELSE, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterIfCondition) {
	 		listener.enterIfCondition(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitIfCondition) {
	 		listener.exitIfCondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitIfCondition) {
			return visitor.visitIfCondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InrContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public INR(): TerminalNode {
		return this.getToken(LambdaParser.INR, 0);
	}
	public term(): TermContext {
		return this.getTypedRuleContext(TermContext, 0) as TermContext;
	}
	public AS(): TerminalNode {
		return this.getToken(LambdaParser.AS, 0);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterInr) {
	 		listener.enterInr(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitInr) {
	 		listener.exitInr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitInr) {
			return visitor.visitInr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CaseContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public CASE(): TerminalNode {
		return this.getToken(LambdaParser.CASE, 0);
	}
	public term_list(): TermContext[] {
		return this.getTypedRuleContexts(TermContext) as TermContext[];
	}
	public term(i: number): TermContext {
		return this.getTypedRuleContext(TermContext, i) as TermContext;
	}
	public OR_list(): TerminalNode[] {
	    	return this.getTokens(LambdaParser.OR);
	}
	public OR(i: number): TerminalNode {
		return this.getToken(LambdaParser.OR, i);
	}
	public INL(): TerminalNode {
		return this.getToken(LambdaParser.INL, 0);
	}
	public ID_list(): TerminalNode[] {
	    	return this.getTokens(LambdaParser.ID);
	}
	public ID(i: number): TerminalNode {
		return this.getToken(LambdaParser.ID, i);
	}
	public DOUBLEARROW_list(): TerminalNode[] {
	    	return this.getTokens(LambdaParser.DOUBLEARROW);
	}
	public DOUBLEARROW(i: number): TerminalNode {
		return this.getToken(LambdaParser.DOUBLEARROW, i);
	}
	public INR(): TerminalNode {
		return this.getToken(LambdaParser.INR, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterCase) {
	 		listener.enterCase(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitCase) {
	 		listener.exitCase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitCase) {
			return visitor.visitCase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LambdaAbstractionContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LAMBDA(): TerminalNode {
		return this.getToken(LambdaParser.LAMBDA, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(LambdaParser.ID, 0);
	}
	public COLON(): TerminalNode {
		return this.getToken(LambdaParser.COLON, 0);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(LambdaParser.DOT, 0);
	}
	public term(): TermContext {
		return this.getTypedRuleContext(TermContext, 0) as TermContext;
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterLambdaAbstraction) {
	 		listener.enterLambdaAbstraction(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitLambdaAbstraction) {
	 		listener.exitLambdaAbstraction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitLambdaAbstraction) {
			return visitor.visitLambdaAbstraction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class VariantContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LBRACK(): TerminalNode {
		return this.getToken(LambdaParser.LBRACK, 0);
	}
	public ID_list(): TerminalNode[] {
	    	return this.getTokens(LambdaParser.ID);
	}
	public ID(i: number): TerminalNode {
		return this.getToken(LambdaParser.ID, i);
	}
	public EQ_list(): TerminalNode[] {
	    	return this.getTokens(LambdaParser.EQ);
	}
	public EQ(i: number): TerminalNode {
		return this.getToken(LambdaParser.EQ, i);
	}
	public term_list(): TermContext[] {
		return this.getTypedRuleContexts(TermContext) as TermContext[];
	}
	public term(i: number): TermContext {
		return this.getTypedRuleContext(TermContext, i) as TermContext;
	}
	public RBRACK(): TerminalNode {
		return this.getToken(LambdaParser.RBRACK, 0);
	}
	public AS(): TerminalNode {
		return this.getToken(LambdaParser.AS, 0);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(LambdaParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(LambdaParser.COMMA, i);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterVariant) {
	 		listener.enterVariant(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitVariant) {
	 		listener.exitVariant(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitVariant) {
			return visitor.visitVariant(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AscribeContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public term(): TermContext {
		return this.getTypedRuleContext(TermContext, 0) as TermContext;
	}
	public AS(): TerminalNode {
		return this.getToken(LambdaParser.AS, 0);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterAscribe) {
	 		listener.enterAscribe(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitAscribe) {
	 		listener.exitAscribe(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitAscribe) {
			return visitor.visitAscribe(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FixContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public FIX(): TerminalNode {
		return this.getToken(LambdaParser.FIX, 0);
	}
	public term(): TermContext {
		return this.getTypedRuleContext(TermContext, 0) as TermContext;
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterFix) {
	 		listener.enterFix(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitFix) {
	 		listener.exitFix(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitFix) {
			return visitor.visitFix(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TupleProjectionContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public term(): TermContext {
		return this.getTypedRuleContext(TermContext, 0) as TermContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(LambdaParser.DOT, 0);
	}
	public NATURAL_NUMBER(): TerminalNode {
		return this.getToken(LambdaParser.NATURAL_NUMBER, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterTupleProjection) {
	 		listener.enterTupleProjection(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitTupleProjection) {
	 		listener.exitTupleProjection(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitTupleProjection) {
			return visitor.visitTupleProjection(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RecordProjectionContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public term(): TermContext {
		return this.getTypedRuleContext(TermContext, 0) as TermContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(LambdaParser.DOT, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(LambdaParser.ID, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterRecordProjection) {
	 		listener.enterRecordProjection(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitRecordProjection) {
	 		listener.exitRecordProjection(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitRecordProjection) {
			return visitor.visitRecordProjection(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LiteralContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public constant(): ConstantContext {
		return this.getTypedRuleContext(ConstantContext, 0) as ConstantContext;
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterLiteral) {
	 		listener.enterLiteral(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitLiteral) {
	 		listener.exitLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitLiteral) {
			return visitor.visitLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LetExpressionContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LET(): TerminalNode {
		return this.getToken(LambdaParser.LET, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(LambdaParser.ID, 0);
	}
	public EQ(): TerminalNode {
		return this.getToken(LambdaParser.EQ, 0);
	}
	public term_list(): TermContext[] {
		return this.getTypedRuleContexts(TermContext) as TermContext[];
	}
	public term(i: number): TermContext {
		return this.getTypedRuleContext(TermContext, i) as TermContext;
	}
	public IN(): TerminalNode {
		return this.getToken(LambdaParser.IN, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterLetExpression) {
	 		listener.enterLetExpression(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitLetExpression) {
	 		listener.exitLetExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitLetExpression) {
			return visitor.visitLetExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RecordContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LT(): TerminalNode {
		return this.getToken(LambdaParser.LT, 0);
	}
	public ID_list(): TerminalNode[] {
	    	return this.getTokens(LambdaParser.ID);
	}
	public ID(i: number): TerminalNode {
		return this.getToken(LambdaParser.ID, i);
	}
	public EQ_list(): TerminalNode[] {
	    	return this.getTokens(LambdaParser.EQ);
	}
	public EQ(i: number): TerminalNode {
		return this.getToken(LambdaParser.EQ, i);
	}
	public term_list(): TermContext[] {
		return this.getTypedRuleContexts(TermContext) as TermContext[];
	}
	public term(i: number): TermContext {
		return this.getTypedRuleContext(TermContext, i) as TermContext;
	}
	public MT(): TerminalNode {
		return this.getToken(LambdaParser.MT, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(LambdaParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(LambdaParser.COMMA, i);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterRecord) {
	 		listener.enterRecord(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitRecord) {
	 		listener.exitRecord(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitRecord) {
			return visitor.visitRecord(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ApplicationContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public term_list(): TermContext[] {
		return this.getTypedRuleContexts(TermContext) as TermContext[];
	}
	public term(i: number): TermContext {
		return this.getTypedRuleContext(TermContext, i) as TermContext;
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterApplication) {
	 		listener.enterApplication(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitApplication) {
	 		listener.exitApplication(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitApplication) {
			return visitor.visitApplication(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SequencingContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public term_list(): TermContext[] {
		return this.getTypedRuleContexts(TermContext) as TermContext[];
	}
	public term(i: number): TermContext {
		return this.getTypedRuleContext(TermContext, i) as TermContext;
	}
	public SEMI(): TerminalNode {
		return this.getToken(LambdaParser.SEMI, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterSequencing) {
	 		listener.enterSequencing(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitSequencing) {
	 		listener.exitSequencing(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitSequencing) {
			return visitor.visitSequencing(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TupleContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LT(): TerminalNode {
		return this.getToken(LambdaParser.LT, 0);
	}
	public term_list(): TermContext[] {
		return this.getTypedRuleContexts(TermContext) as TermContext[];
	}
	public term(i: number): TermContext {
		return this.getTypedRuleContext(TermContext, i) as TermContext;
	}
	public MT(): TerminalNode {
		return this.getToken(LambdaParser.MT, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(LambdaParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(LambdaParser.COMMA, i);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterTuple) {
	 		listener.enterTuple(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitTuple) {
	 		listener.exitTuple(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitTuple) {
			return visitor.visitTuple(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParenthesesContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(LambdaParser.LPAREN, 0);
	}
	public term(): TermContext {
		return this.getTypedRuleContext(TermContext, 0) as TermContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(LambdaParser.RPAREN, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterParentheses) {
	 		listener.enterParentheses(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitParentheses) {
	 		listener.exitParentheses(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitParentheses) {
			return visitor.visitParentheses(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DummyAbstractionContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LAMBDA(): TerminalNode {
		return this.getToken(LambdaParser.LAMBDA, 0);
	}
	public UNDERSCORE(): TerminalNode {
		return this.getToken(LambdaParser.UNDERSCORE, 0);
	}
	public COLON(): TerminalNode {
		return this.getToken(LambdaParser.COLON, 0);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(LambdaParser.DOT, 0);
	}
	public term(): TermContext {
		return this.getTypedRuleContext(TermContext, 0) as TermContext;
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterDummyAbstraction) {
	 		listener.enterDummyAbstraction(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitDummyAbstraction) {
	 		listener.exitDummyAbstraction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitDummyAbstraction) {
			return visitor.visitDummyAbstraction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BinaryOpContext extends TermContext {
	public _op!: Token;
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public term_list(): TermContext[] {
		return this.getTypedRuleContexts(TermContext) as TermContext[];
	}
	public term(i: number): TermContext {
		return this.getTypedRuleContext(TermContext, i) as TermContext;
	}
	public PLUS(): TerminalNode {
		return this.getToken(LambdaParser.PLUS, 0);
	}
	public MINUS(): TerminalNode {
		return this.getToken(LambdaParser.MINUS, 0);
	}
	public MUL(): TerminalNode {
		return this.getToken(LambdaParser.MUL, 0);
	}
	public DIV(): TerminalNode {
		return this.getToken(LambdaParser.DIV, 0);
	}
	public LT(): TerminalNode {
		return this.getToken(LambdaParser.LT, 0);
	}
	public MT(): TerminalNode {
		return this.getToken(LambdaParser.MT, 0);
	}
	public LEQ(): TerminalNode {
		return this.getToken(LambdaParser.LEQ, 0);
	}
	public GEQ(): TerminalNode {
		return this.getToken(LambdaParser.GEQ, 0);
	}
	public EQEQ(): TerminalNode {
		return this.getToken(LambdaParser.EQEQ, 0);
	}
	public NEQ(): TerminalNode {
		return this.getToken(LambdaParser.NEQ, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterBinaryOp) {
	 		listener.enterBinaryOp(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitBinaryOp) {
	 		listener.exitBinaryOp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitBinaryOp) {
			return visitor.visitBinaryOp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeContext extends ParserRuleContext {
	constructor(parser?: LambdaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return LambdaParser.RULE_type;
	}
	public override copyFrom(ctx: TypeContext): void {
		super.copyFrom(ctx);
	}
}
export class SumTypeContext extends TypeContext {
	constructor(parser: LambdaParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public type__list(): TypeContext[] {
		return this.getTypedRuleContexts(TypeContext) as TypeContext[];
	}
	public type_(i: number): TypeContext {
		return this.getTypedRuleContext(TypeContext, i) as TypeContext;
	}
	public PLUS(): TerminalNode {
		return this.getToken(LambdaParser.PLUS, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterSumType) {
	 		listener.enterSumType(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitSumType) {
	 		listener.exitSumType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitSumType) {
			return visitor.visitSumType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeIdentifierContext extends TypeContext {
	constructor(parser: LambdaParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public GREEK(): TerminalNode {
		return this.getToken(LambdaParser.GREEK, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(LambdaParser.ID, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterTypeIdentifier) {
	 		listener.enterTypeIdentifier(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitTypeIdentifier) {
	 		listener.exitTypeIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitTypeIdentifier) {
			return visitor.visitTypeIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class VariantTypeContext extends TypeContext {
	constructor(parser: LambdaParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LBRACK(): TerminalNode {
		return this.getToken(LambdaParser.LBRACK, 0);
	}
	public ID_list(): TerminalNode[] {
	    	return this.getTokens(LambdaParser.ID);
	}
	public ID(i: number): TerminalNode {
		return this.getToken(LambdaParser.ID, i);
	}
	public COLON_list(): TerminalNode[] {
	    	return this.getTokens(LambdaParser.COLON);
	}
	public COLON(i: number): TerminalNode {
		return this.getToken(LambdaParser.COLON, i);
	}
	public type__list(): TypeContext[] {
		return this.getTypedRuleContexts(TypeContext) as TypeContext[];
	}
	public type_(i: number): TypeContext {
		return this.getTypedRuleContext(TypeContext, i) as TypeContext;
	}
	public RBRACK(): TerminalNode {
		return this.getToken(LambdaParser.RBRACK, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(LambdaParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(LambdaParser.COMMA, i);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterVariantType) {
	 		listener.enterVariantType(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitVariantType) {
	 		listener.exitVariantType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitVariantType) {
			return visitor.visitVariantType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FunctionTypeContext extends TypeContext {
	constructor(parser: LambdaParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public type__list(): TypeContext[] {
		return this.getTypedRuleContexts(TypeContext) as TypeContext[];
	}
	public type_(i: number): TypeContext {
		return this.getTypedRuleContext(TypeContext, i) as TypeContext;
	}
	public ARROW(): TerminalNode {
		return this.getToken(LambdaParser.ARROW, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterFunctionType) {
	 		listener.enterFunctionType(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitFunctionType) {
	 		listener.exitFunctionType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitFunctionType) {
			return visitor.visitFunctionType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TupleTypeContext extends TypeContext {
	constructor(parser: LambdaParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LT(): TerminalNode {
		return this.getToken(LambdaParser.LT, 0);
	}
	public type__list(): TypeContext[] {
		return this.getTypedRuleContexts(TypeContext) as TypeContext[];
	}
	public type_(i: number): TypeContext {
		return this.getTypedRuleContext(TypeContext, i) as TypeContext;
	}
	public MT(): TerminalNode {
		return this.getToken(LambdaParser.MT, 0);
	}
	public MUL_list(): TerminalNode[] {
	    	return this.getTokens(LambdaParser.MUL);
	}
	public MUL(i: number): TerminalNode {
		return this.getToken(LambdaParser.MUL, i);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterTupleType) {
	 		listener.enterTupleType(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitTupleType) {
	 		listener.exitTupleType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitTupleType) {
			return visitor.visitTupleType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParenTypeContext extends TypeContext {
	constructor(parser: LambdaParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(LambdaParser.LPAREN, 0);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(LambdaParser.RPAREN, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterParenType) {
	 		listener.enterParenType(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitParenType) {
	 		listener.exitParenType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitParenType) {
			return visitor.visitParenType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstantContext extends ParserRuleContext {
	constructor(parser?: LambdaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NATURAL_NUMBER(): TerminalNode {
		return this.getToken(LambdaParser.NATURAL_NUMBER, 0);
	}
	public ZERO(): TerminalNode {
		return this.getToken(LambdaParser.ZERO, 0);
	}
    public get ruleIndex(): number {
    	return LambdaParser.RULE_constant;
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterConstant) {
	 		listener.enterConstant(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitConstant) {
	 		listener.exitConstant(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitConstant) {
			return visitor.visitConstant(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
