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
	public static readonly LAMBDA_CAPITALIZED = 10;
	public static readonly LET = 11;
	public static readonly IN = 12;
	public static readonly FIX = 13;
	public static readonly TYPEDEF = 14;
	public static readonly KIND_STAR = 15;
	public static readonly APOSTROPHE = 16;
	public static readonly FORALL = 17;
	public static readonly PI = 18;
	public static readonly CASE = 19;
	public static readonly OF = 20;
	public static readonly INL = 21;
	public static readonly INR = 22;
	public static readonly OR = 23;
	public static readonly AS = 24;
	public static readonly IF = 25;
	public static readonly THEN = 26;
	public static readonly ELSEIF = 27;
	public static readonly ELSE = 28;
	public static readonly UNDERSCORE = 29;
	public static readonly EQEQ = 30;
	public static readonly NEQ = 31;
	public static readonly LEQ = 32;
	public static readonly GEQ = 33;
	public static readonly EQ = 34;
	public static readonly LT = 35;
	public static readonly MT = 36;
	public static readonly MUL = 37;
	public static readonly PLUS = 38;
	public static readonly MINUS = 39;
	public static readonly DIV = 40;
	public static readonly LBRACK = 41;
	public static readonly RBRACK = 42;
	public static readonly LPAREN = 43;
	public static readonly RPAREN = 44;
	public static readonly COMMA = 45;
	public static readonly ARROW = 46;
	public static readonly DOUBLEARROW = 47;
	public static readonly COLON = 48;
	public static readonly DOT = 49;
	public static readonly SEMI = 50;
	public static readonly GREEK = 51;
	public static readonly NATURAL_NUMBER = 52;
	public static readonly ZERO = 53;
	public static readonly ID = 54;
	public static readonly LINE_COMMENT = 55;
	public static readonly WS = 56;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_expression = 0;
	public static readonly RULE_globalDecl = 1;
	public static readonly RULE_term = 2;
	public static readonly RULE_type = 3;
	public static readonly RULE_typeVariable = 4;
	public static readonly RULE_constant = 5;
	public static readonly RULE_kind = 6;
	public static readonly literalNames: (string | null)[] = [ null, "'Nat'", 
                                                            "'Bool'", "'Unit'", 
                                                            "'true'", "'True'", 
                                                            "'false'", "'False'", 
                                                            "'unit'", null, 
                                                            "'\\u039B'", 
                                                            "'let'", "'in'", 
                                                            "'fix'", "'typedef'", 
                                                            "'@'", "'''", 
                                                            "'\\u2200'", 
                                                            "'\\u03A0'", 
                                                            "'case'", "'of'", 
                                                            "'inl'", "'inr'", 
                                                            "'||'", "'as'", 
                                                            "'if'", "'then'", 
                                                            "'elseif'", 
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
                                                             "LAMBDA_CAPITALIZED", 
                                                             "LET", "IN", 
                                                             "FIX", "TYPEDEF", 
                                                             "KIND_STAR", 
                                                             "APOSTROPHE", 
                                                             "FORALL", "PI", 
                                                             "CASE", "OF", 
                                                             "INL", "INR", 
                                                             "OR", "AS", 
                                                             "IF", "THEN", 
                                                             "ELSEIF", "ELSE", 
                                                             "UNDERSCORE", 
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
		"expression", "globalDecl", "term", "type", "typeVariable", "constant", 
		"kind",
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
			this.state = 17;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 0, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 14;
					this.globalDecl();
					}
					}
				}
				this.state = 19;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 0, this._ctx);
			}
			this.state = 23;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 40382456) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 917825) !== 0)) {
				{
				this.state = 20;
				this.term(0);
				this.state = 21;
				this.match(LambdaParser.SEMI);
				}
			}

			this.state = 25;
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
			this.state = 51;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				localctx = new GlobalVariableDeclarationContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 27;
				this.match(LambdaParser.ID);
				this.state = 28;
				this.match(LambdaParser.COLON);
				this.state = 29;
				this.type_(0);
				this.state = 30;
				this.match(LambdaParser.SEMI);
				}
				break;
			case 2:
				localctx = new GlobalFunctionDeclarationContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 32;
				this.match(LambdaParser.ID);
				this.state = 33;
				this.match(LambdaParser.EQ);
				this.state = 34;
				this.term(0);
				this.state = 35;
				this.match(LambdaParser.COLON);
				this.state = 36;
				this.type_(0);
				this.state = 37;
				this.match(LambdaParser.SEMI);
				}
				break;
			case 3:
				localctx = new TypeAliasDeclarationContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 39;
				this.match(LambdaParser.TYPEDEF);
				this.state = 40;
				this.match(LambdaParser.ID);
				this.state = 41;
				this.match(LambdaParser.EQ);
				this.state = 42;
				this.type_(0);
				this.state = 43;
				this.match(LambdaParser.SEMI);
				}
				break;
			case 4:
				localctx = new TypeConstructorDeclarationContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 45;
				this.match(LambdaParser.TYPEDEF);
				this.state = 46;
				this.match(LambdaParser.ID);
				this.state = 47;
				this.match(LambdaParser.COLON);
				this.state = 48;
				this.kind(0);
				this.state = 49;
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
			this.state = 199;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				{
				localctx = new DummyAbstractionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 54;
				this.match(LambdaParser.LAMBDA);
				this.state = 55;
				this.match(LambdaParser.UNDERSCORE);
				this.state = 56;
				this.match(LambdaParser.COLON);
				this.state = 57;
				this.type_(0);
				this.state = 58;
				this.match(LambdaParser.DOT);
				this.state = 59;
				this.term(17);
				}
				break;
			case 2:
				{
				localctx = new LambdaAbstractionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 61;
				this.match(LambdaParser.LAMBDA);
				this.state = 62;
				this.match(LambdaParser.ID);
				this.state = 63;
				this.match(LambdaParser.COLON);
				this.state = 64;
				this.type_(0);
				this.state = 65;
				this.match(LambdaParser.DOT);
				this.state = 66;
				this.term(16);
				}
				break;
			case 3:
				{
				localctx = new LambdaAbstractionUntypedContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 68;
				this.match(LambdaParser.LAMBDA);
				this.state = 69;
				this.match(LambdaParser.ID);
				this.state = 70;
				this.match(LambdaParser.DOT);
				this.state = 71;
				this.term(15);
				}
				break;
			case 4:
				{
				localctx = new TypeAbstractionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 72;
				this.match(LambdaParser.LAMBDA_CAPITALIZED);
				this.state = 73;
				this.typeVariable();
				this.state = 74;
				this.match(LambdaParser.DOT);
				this.state = 75;
				this.term(14);
				}
				break;
			case 5:
				{
				localctx = new LetExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 77;
				this.match(LambdaParser.LET);
				this.state = 78;
				this.match(LambdaParser.ID);
				this.state = 79;
				this.match(LambdaParser.EQ);
				this.state = 80;
				this.term(0);
				this.state = 81;
				this.match(LambdaParser.IN);
				this.state = 82;
				this.term(13);
				}
				break;
			case 6:
				{
				localctx = new IfConditionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 84;
				this.match(LambdaParser.IF);
				this.state = 85;
				this.term(0);
				this.state = 86;
				this.match(LambdaParser.THEN);
				this.state = 87;
				this.term(0);
				this.state = 95;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 88;
						this.match(LambdaParser.ELSEIF);
						this.state = 89;
						this.term(0);
						this.state = 90;
						this.match(LambdaParser.THEN);
						this.state = 91;
						this.term(0);
						}
						}
					}
					this.state = 97;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
				}
				this.state = 100;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 4, this._ctx) ) {
				case 1:
					{
					this.state = 98;
					this.match(LambdaParser.ELSE);
					this.state = 99;
					this.term(0);
					}
					break;
				}
				}
				break;
			case 7:
				{
				localctx = new CaseContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 102;
				this.match(LambdaParser.CASE);
				this.state = 103;
				this.term(0);
				this.state = 104;
				this.match(LambdaParser.OR);
				this.state = 105;
				this.match(LambdaParser.INL);
				this.state = 106;
				this.match(LambdaParser.ID);
				this.state = 107;
				this.match(LambdaParser.DOUBLEARROW);
				this.state = 108;
				this.term(0);
				this.state = 109;
				this.match(LambdaParser.OR);
				this.state = 110;
				this.match(LambdaParser.INR);
				this.state = 111;
				this.match(LambdaParser.ID);
				this.state = 112;
				this.match(LambdaParser.DOUBLEARROW);
				this.state = 113;
				this.term(11);
				}
				break;
			case 8:
				{
				localctx = new VariantCaseContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 115;
				this.match(LambdaParser.CASE);
				this.state = 116;
				this.term(0);
				this.state = 117;
				this.match(LambdaParser.OF);
				this.state = 118;
				this.match(LambdaParser.LBRACK);
				this.state = 119;
				this.match(LambdaParser.ID);
				this.state = 120;
				this.match(LambdaParser.EQ);
				this.state = 121;
				this.match(LambdaParser.ID);
				this.state = 122;
				this.match(LambdaParser.RBRACK);
				this.state = 123;
				this.match(LambdaParser.DOUBLEARROW);
				this.state = 124;
				this.term(0);
				this.state = 135;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 125;
						this.match(LambdaParser.OR);
						this.state = 126;
						this.match(LambdaParser.LBRACK);
						this.state = 127;
						this.match(LambdaParser.ID);
						this.state = 128;
						this.match(LambdaParser.EQ);
						this.state = 129;
						this.match(LambdaParser.ID);
						this.state = 130;
						this.match(LambdaParser.RBRACK);
						this.state = 131;
						this.match(LambdaParser.DOUBLEARROW);
						this.state = 132;
						this.term(0);
						}
						}
					}
					this.state = 137;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
				}
				}
				break;
			case 9:
				{
				localctx = new InlContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 138;
				this.match(LambdaParser.INL);
				this.state = 139;
				this.term(0);
				this.state = 140;
				this.match(LambdaParser.AS);
				this.state = 141;
				this.type_(0);
				}
				break;
			case 10:
				{
				localctx = new InrContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 143;
				this.match(LambdaParser.INR);
				this.state = 144;
				this.term(0);
				this.state = 145;
				this.match(LambdaParser.AS);
				this.state = 146;
				this.type_(0);
				}
				break;
			case 11:
				{
				localctx = new FixContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 148;
				this.match(LambdaParser.FIX);
				this.state = 149;
				this.term(7);
				}
				break;
			case 12:
				{
				localctx = new RecordContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 150;
				this.match(LambdaParser.LT);
				this.state = 151;
				this.match(LambdaParser.ID);
				this.state = 152;
				this.match(LambdaParser.EQ);
				this.state = 153;
				this.term(0);
				this.state = 160;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===45) {
					{
					{
					this.state = 154;
					this.match(LambdaParser.COMMA);
					this.state = 155;
					this.match(LambdaParser.ID);
					this.state = 156;
					this.match(LambdaParser.EQ);
					this.state = 157;
					this.term(0);
					}
					}
					this.state = 162;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 163;
				this.match(LambdaParser.MT);
				}
				break;
			case 13:
				{
				localctx = new TupleContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 165;
				this.match(LambdaParser.LT);
				this.state = 166;
				this.term(0);
				this.state = 171;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===45) {
					{
					{
					this.state = 167;
					this.match(LambdaParser.COMMA);
					this.state = 168;
					this.term(0);
					}
					}
					this.state = 173;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 174;
				this.match(LambdaParser.MT);
				}
				break;
			case 14:
				{
				localctx = new VariantContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 176;
				this.match(LambdaParser.LBRACK);
				this.state = 177;
				this.match(LambdaParser.ID);
				this.state = 178;
				this.match(LambdaParser.EQ);
				this.state = 179;
				this.term(0);
				this.state = 186;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===45) {
					{
					{
					this.state = 180;
					this.match(LambdaParser.COMMA);
					this.state = 181;
					this.match(LambdaParser.ID);
					this.state = 182;
					this.match(LambdaParser.EQ);
					this.state = 183;
					this.term(0);
					}
					}
					this.state = 188;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 189;
				this.match(LambdaParser.RBRACK);
				this.state = 190;
				this.match(LambdaParser.AS);
				this.state = 191;
				this.type_(0);
				}
				break;
			case 15:
				{
				localctx = new VariableContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 193;
				this.match(LambdaParser.ID);
				}
				break;
			case 16:
				{
				localctx = new ParenthesesContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 194;
				this.match(LambdaParser.LPAREN);
				this.state = 195;
				this.term(0);
				this.state = 196;
				this.match(LambdaParser.RPAREN);
				}
				break;
			case 17:
				{
				localctx = new LiteralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 198;
				this.constant();
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 225;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 11, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 223;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 10, this._ctx) ) {
					case 1:
						{
						localctx = new ApplicationContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 201;
						if (!(this.precpred(this._ctx, 22))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 22)");
						}
						this.state = 202;
						this.term(23);
						}
						break;
					case 2:
						{
						localctx = new BinaryOpContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 203;
						if (!(this.precpred(this._ctx, 20))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 20)");
						}
						this.state = 204;
						(localctx as BinaryOpContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(((((_la - 30)) & ~0x1F) === 0 && ((1 << (_la - 30)) & 2031) !== 0))) {
						    (localctx as BinaryOpContext)._op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 205;
						this.term(21);
						}
						break;
					case 3:
						{
						localctx = new SequencingContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 206;
						if (!(this.precpred(this._ctx, 18))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 18)");
						}
						this.state = 207;
						this.match(LambdaParser.SEMI);
						this.state = 208;
						this.term(18);
						}
						break;
					case 4:
						{
						localctx = new TupleProjectionContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 209;
						if (!(this.precpred(this._ctx, 24))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 24)");
						}
						this.state = 210;
						this.match(LambdaParser.DOT);
						this.state = 211;
						this.match(LambdaParser.NATURAL_NUMBER);
						}
						break;
					case 5:
						{
						localctx = new RecordProjectionContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 212;
						if (!(this.precpred(this._ctx, 23))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 23)");
						}
						this.state = 213;
						this.match(LambdaParser.DOT);
						this.state = 214;
						this.match(LambdaParser.ID);
						}
						break;
					case 6:
						{
						localctx = new TypeApplicationContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 215;
						if (!(this.precpred(this._ctx, 21))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 21)");
						}
						this.state = 216;
						this.match(LambdaParser.LBRACK);
						this.state = 217;
						this.type_(0);
						this.state = 218;
						this.match(LambdaParser.RBRACK);
						}
						break;
					case 7:
						{
						localctx = new AscribeContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 220;
						if (!(this.precpred(this._ctx, 19))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 19)");
						}
						this.state = 221;
						this.match(LambdaParser.AS);
						this.state = 222;
						this.type_(0);
						}
						break;
					}
					}
				}
				this.state = 227;
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
			this.state = 279;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 17:
				{
				localctx = new ForallTypeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 229;
				this.match(LambdaParser.FORALL);
				this.state = 230;
				this.typeVariable();
				this.state = 231;
				this.match(LambdaParser.DOT);
				this.state = 232;
				this.type_(7);
				}
				break;
			case 9:
				{
				localctx = new TypeConstructorAbstractionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 234;
				this.match(LambdaParser.LAMBDA);
				this.state = 235;
				this.typeVariable();
				this.state = 236;
				this.match(LambdaParser.COLON);
				this.state = 237;
				this.kind(0);
				this.state = 238;
				this.match(LambdaParser.DOT);
				this.state = 239;
				this.type_(6);
				}
				break;
			case 18:
				{
				localctx = new PiTypeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 241;
				this.match(LambdaParser.PI);
				this.state = 242;
				this.match(LambdaParser.ID);
				this.state = 243;
				this.match(LambdaParser.COLON);
				this.state = 244;
				this.type_(0);
				this.state = 245;
				this.match(LambdaParser.DOT);
				this.state = 246;
				this.type_(5);
				}
				break;
			case 35:
				{
				localctx = new TupleTypeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 248;
				this.match(LambdaParser.LT);
				this.state = 249;
				this.type_(0);
				this.state = 254;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===37) {
					{
					{
					this.state = 250;
					this.match(LambdaParser.MUL);
					this.state = 251;
					this.type_(0);
					}
					}
					this.state = 256;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 257;
				this.match(LambdaParser.MT);
				}
				break;
			case 41:
				{
				localctx = new VariantTypeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 259;
				this.match(LambdaParser.LBRACK);
				this.state = 260;
				this.match(LambdaParser.ID);
				this.state = 261;
				this.match(LambdaParser.COLON);
				this.state = 262;
				this.type_(0);
				this.state = 269;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===45) {
					{
					{
					this.state = 263;
					this.match(LambdaParser.COMMA);
					this.state = 264;
					this.match(LambdaParser.ID);
					this.state = 265;
					this.match(LambdaParser.COLON);
					this.state = 266;
					this.type_(0);
					}
					}
					this.state = 271;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 272;
				this.match(LambdaParser.RBRACK);
				}
				break;
			case 43:
				{
				localctx = new ParenTypeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 274;
				this.match(LambdaParser.LPAREN);
				this.state = 275;
				this.type_(0);
				this.state = 276;
				this.match(LambdaParser.RPAREN);
				}
				break;
			case 1:
			case 2:
			case 3:
			case 51:
			case 54:
				{
				localctx = new TypeIdentifierContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 278;
				_la = this._input.LA(1);
				if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || _la===51 || _la===54)) {
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
			this.state = 296;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 16, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 294;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 15, this._ctx) ) {
					case 1:
						{
						localctx = new TypeConstructorApplicationContext(this, new TypeContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_type);
						this.state = 281;
						if (!(this.precpred(this._ctx, 11))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 11)");
						}
						this.state = 282;
						this.type_(12);
						}
						break;
					case 2:
						{
						localctx = new SumTypeContext(this, new TypeContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_type);
						this.state = 283;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 284;
						this.match(LambdaParser.PLUS);
						this.state = 285;
						this.type_(10);
						}
						break;
					case 3:
						{
						localctx = new FunctionTypeContext(this, new TypeContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_type);
						this.state = 286;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 287;
						this.match(LambdaParser.ARROW);
						this.state = 288;
						this.type_(8);
						}
						break;
					case 4:
						{
						localctx = new TypeIndexApplicationContext(this, new TypeContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_type);
						this.state = 289;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 290;
						this.match(LambdaParser.LBRACK);
						this.state = 291;
						this.term(0);
						this.state = 292;
						this.match(LambdaParser.RBRACK);
						}
						break;
					}
					}
				}
				this.state = 298;
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
	public typeVariable(): TypeVariableContext {
		let localctx: TypeVariableContext = new TypeVariableContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, LambdaParser.RULE_typeVariable);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 299;
			_la = this._input.LA(1);
			if(!(_la===51 || _la===54)) {
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
	// @RuleVersion(0)
	public constant(): ConstantContext {
		let localctx: ConstantContext = new ConstantContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, LambdaParser.RULE_constant);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 301;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 504) !== 0) || _la===52 || _la===53)) {
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

	public kind(): KindContext;
	public kind(_p: number): KindContext;
	// @RuleVersion(0)
	public kind(_p?: number): KindContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: KindContext = new KindContext(this, this._ctx, _parentState);
		let _prevctx: KindContext = localctx;
		let _startState: number = 12;
		this.enterRecursionRule(localctx, 12, LambdaParser.RULE_kind, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 313;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 17, this._ctx) ) {
			case 1:
				{
				localctx = new StarKindContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 304;
				this.match(LambdaParser.KIND_STAR);
				}
				break;
			case 2:
				{
				localctx = new DependentKindArrowContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 305;
				this.type_(0);
				this.state = 306;
				this.match(LambdaParser.ARROW);
				this.state = 307;
				this.kind(2);
				}
				break;
			case 3:
				{
				localctx = new ParenKindContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 309;
				this.match(LambdaParser.LPAREN);
				this.state = 310;
				this.kind(0);
				this.state = 311;
				this.match(LambdaParser.RPAREN);
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 320;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 18, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					{
					localctx = new KindArrowContext(this, new KindContext(this, _parentctx, _parentState));
					this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_kind);
					this.state = 315;
					if (!(this.precpred(this._ctx, 3))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
					}
					this.state = 316;
					this.match(LambdaParser.ARROW);
					this.state = 317;
					this.kind(3);
					}
					}
				}
				this.state = 322;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 18, this._ctx);
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

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 2:
			return this.term_sempred(localctx as TermContext, predIndex);
		case 3:
			return this.type_sempred(localctx as TypeContext, predIndex);
		case 6:
			return this.kind_sempred(localctx as KindContext, predIndex);
		}
		return true;
	}
	private term_sempred(localctx: TermContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 22);
		case 1:
			return this.precpred(this._ctx, 20);
		case 2:
			return this.precpred(this._ctx, 18);
		case 3:
			return this.precpred(this._ctx, 24);
		case 4:
			return this.precpred(this._ctx, 23);
		case 5:
			return this.precpred(this._ctx, 21);
		case 6:
			return this.precpred(this._ctx, 19);
		}
		return true;
	}
	private type_sempred(localctx: TypeContext, predIndex: number): boolean {
		switch (predIndex) {
		case 7:
			return this.precpred(this._ctx, 11);
		case 8:
			return this.precpred(this._ctx, 9);
		case 9:
			return this.precpred(this._ctx, 8);
		case 10:
			return this.precpred(this._ctx, 10);
		}
		return true;
	}
	private kind_sempred(localctx: KindContext, predIndex: number): boolean {
		switch (predIndex) {
		case 11:
			return this.precpred(this._ctx, 3);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,56,324,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,1,0,5,0,16,8,0,10,0,12,0,
	19,9,0,1,0,1,0,1,0,3,0,24,8,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,52,8,
	1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
	2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
	2,1,2,1,2,1,2,1,2,5,2,94,8,2,10,2,12,2,97,9,2,1,2,1,2,3,2,101,8,2,1,2,1,
	2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
	2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,5,2,134,8,2,10,2,12,2,137,
	9,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,
	1,2,1,2,1,2,5,2,159,8,2,10,2,12,2,162,9,2,1,2,1,2,1,2,1,2,1,2,1,2,5,2,170,
	8,2,10,2,12,2,173,9,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,5,2,185,8,
	2,10,2,12,2,188,9,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,200,8,2,
	1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,
	1,2,1,2,1,2,1,2,5,2,224,8,2,10,2,12,2,227,9,2,1,3,1,3,1,3,1,3,1,3,1,3,1,
	3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,5,
	3,253,8,3,10,3,12,3,256,9,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,5,3,
	268,8,3,10,3,12,3,271,9,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,280,8,3,1,3,1,
	3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,5,3,295,8,3,10,3,12,3,298,
	9,3,1,4,1,4,1,5,1,5,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,3,6,314,8,6,
	1,6,1,6,1,6,5,6,319,8,6,10,6,12,6,322,9,6,1,6,0,3,4,6,12,7,0,2,4,6,8,10,
	12,0,4,2,0,30,33,35,40,3,0,1,3,51,51,54,54,2,0,51,51,54,54,2,0,3,8,52,53,
	365,0,17,1,0,0,0,2,51,1,0,0,0,4,199,1,0,0,0,6,279,1,0,0,0,8,299,1,0,0,0,
	10,301,1,0,0,0,12,313,1,0,0,0,14,16,3,2,1,0,15,14,1,0,0,0,16,19,1,0,0,0,
	17,15,1,0,0,0,17,18,1,0,0,0,18,23,1,0,0,0,19,17,1,0,0,0,20,21,3,4,2,0,21,
	22,5,50,0,0,22,24,1,0,0,0,23,20,1,0,0,0,23,24,1,0,0,0,24,25,1,0,0,0,25,
	26,5,0,0,1,26,1,1,0,0,0,27,28,5,54,0,0,28,29,5,48,0,0,29,30,3,6,3,0,30,
	31,5,50,0,0,31,52,1,0,0,0,32,33,5,54,0,0,33,34,5,34,0,0,34,35,3,4,2,0,35,
	36,5,48,0,0,36,37,3,6,3,0,37,38,5,50,0,0,38,52,1,0,0,0,39,40,5,14,0,0,40,
	41,5,54,0,0,41,42,5,34,0,0,42,43,3,6,3,0,43,44,5,50,0,0,44,52,1,0,0,0,45,
	46,5,14,0,0,46,47,5,54,0,0,47,48,5,48,0,0,48,49,3,12,6,0,49,50,5,50,0,0,
	50,52,1,0,0,0,51,27,1,0,0,0,51,32,1,0,0,0,51,39,1,0,0,0,51,45,1,0,0,0,52,
	3,1,0,0,0,53,54,6,2,-1,0,54,55,5,9,0,0,55,56,5,29,0,0,56,57,5,48,0,0,57,
	58,3,6,3,0,58,59,5,49,0,0,59,60,3,4,2,17,60,200,1,0,0,0,61,62,5,9,0,0,62,
	63,5,54,0,0,63,64,5,48,0,0,64,65,3,6,3,0,65,66,5,49,0,0,66,67,3,4,2,16,
	67,200,1,0,0,0,68,69,5,9,0,0,69,70,5,54,0,0,70,71,5,49,0,0,71,200,3,4,2,
	15,72,73,5,10,0,0,73,74,3,8,4,0,74,75,5,49,0,0,75,76,3,4,2,14,76,200,1,
	0,0,0,77,78,5,11,0,0,78,79,5,54,0,0,79,80,5,34,0,0,80,81,3,4,2,0,81,82,
	5,12,0,0,82,83,3,4,2,13,83,200,1,0,0,0,84,85,5,25,0,0,85,86,3,4,2,0,86,
	87,5,26,0,0,87,95,3,4,2,0,88,89,5,27,0,0,89,90,3,4,2,0,90,91,5,26,0,0,91,
	92,3,4,2,0,92,94,1,0,0,0,93,88,1,0,0,0,94,97,1,0,0,0,95,93,1,0,0,0,95,96,
	1,0,0,0,96,100,1,0,0,0,97,95,1,0,0,0,98,99,5,28,0,0,99,101,3,4,2,0,100,
	98,1,0,0,0,100,101,1,0,0,0,101,200,1,0,0,0,102,103,5,19,0,0,103,104,3,4,
	2,0,104,105,5,23,0,0,105,106,5,21,0,0,106,107,5,54,0,0,107,108,5,47,0,0,
	108,109,3,4,2,0,109,110,5,23,0,0,110,111,5,22,0,0,111,112,5,54,0,0,112,
	113,5,47,0,0,113,114,3,4,2,11,114,200,1,0,0,0,115,116,5,19,0,0,116,117,
	3,4,2,0,117,118,5,20,0,0,118,119,5,41,0,0,119,120,5,54,0,0,120,121,5,34,
	0,0,121,122,5,54,0,0,122,123,5,42,0,0,123,124,5,47,0,0,124,135,3,4,2,0,
	125,126,5,23,0,0,126,127,5,41,0,0,127,128,5,54,0,0,128,129,5,34,0,0,129,
	130,5,54,0,0,130,131,5,42,0,0,131,132,5,47,0,0,132,134,3,4,2,0,133,125,
	1,0,0,0,134,137,1,0,0,0,135,133,1,0,0,0,135,136,1,0,0,0,136,200,1,0,0,0,
	137,135,1,0,0,0,138,139,5,21,0,0,139,140,3,4,2,0,140,141,5,24,0,0,141,142,
	3,6,3,0,142,200,1,0,0,0,143,144,5,22,0,0,144,145,3,4,2,0,145,146,5,24,0,
	0,146,147,3,6,3,0,147,200,1,0,0,0,148,149,5,13,0,0,149,200,3,4,2,7,150,
	151,5,35,0,0,151,152,5,54,0,0,152,153,5,34,0,0,153,160,3,4,2,0,154,155,
	5,45,0,0,155,156,5,54,0,0,156,157,5,34,0,0,157,159,3,4,2,0,158,154,1,0,
	0,0,159,162,1,0,0,0,160,158,1,0,0,0,160,161,1,0,0,0,161,163,1,0,0,0,162,
	160,1,0,0,0,163,164,5,36,0,0,164,200,1,0,0,0,165,166,5,35,0,0,166,171,3,
	4,2,0,167,168,5,45,0,0,168,170,3,4,2,0,169,167,1,0,0,0,170,173,1,0,0,0,
	171,169,1,0,0,0,171,172,1,0,0,0,172,174,1,0,0,0,173,171,1,0,0,0,174,175,
	5,36,0,0,175,200,1,0,0,0,176,177,5,41,0,0,177,178,5,54,0,0,178,179,5,34,
	0,0,179,186,3,4,2,0,180,181,5,45,0,0,181,182,5,54,0,0,182,183,5,34,0,0,
	183,185,3,4,2,0,184,180,1,0,0,0,185,188,1,0,0,0,186,184,1,0,0,0,186,187,
	1,0,0,0,187,189,1,0,0,0,188,186,1,0,0,0,189,190,5,42,0,0,190,191,5,24,0,
	0,191,192,3,6,3,0,192,200,1,0,0,0,193,200,5,54,0,0,194,195,5,43,0,0,195,
	196,3,4,2,0,196,197,5,44,0,0,197,200,1,0,0,0,198,200,3,10,5,0,199,53,1,
	0,0,0,199,61,1,0,0,0,199,68,1,0,0,0,199,72,1,0,0,0,199,77,1,0,0,0,199,84,
	1,0,0,0,199,102,1,0,0,0,199,115,1,0,0,0,199,138,1,0,0,0,199,143,1,0,0,0,
	199,148,1,0,0,0,199,150,1,0,0,0,199,165,1,0,0,0,199,176,1,0,0,0,199,193,
	1,0,0,0,199,194,1,0,0,0,199,198,1,0,0,0,200,225,1,0,0,0,201,202,10,22,0,
	0,202,224,3,4,2,23,203,204,10,20,0,0,204,205,7,0,0,0,205,224,3,4,2,21,206,
	207,10,18,0,0,207,208,5,50,0,0,208,224,3,4,2,18,209,210,10,24,0,0,210,211,
	5,49,0,0,211,224,5,52,0,0,212,213,10,23,0,0,213,214,5,49,0,0,214,224,5,
	54,0,0,215,216,10,21,0,0,216,217,5,41,0,0,217,218,3,6,3,0,218,219,5,42,
	0,0,219,224,1,0,0,0,220,221,10,19,0,0,221,222,5,24,0,0,222,224,3,6,3,0,
	223,201,1,0,0,0,223,203,1,0,0,0,223,206,1,0,0,0,223,209,1,0,0,0,223,212,
	1,0,0,0,223,215,1,0,0,0,223,220,1,0,0,0,224,227,1,0,0,0,225,223,1,0,0,0,
	225,226,1,0,0,0,226,5,1,0,0,0,227,225,1,0,0,0,228,229,6,3,-1,0,229,230,
	5,17,0,0,230,231,3,8,4,0,231,232,5,49,0,0,232,233,3,6,3,7,233,280,1,0,0,
	0,234,235,5,9,0,0,235,236,3,8,4,0,236,237,5,48,0,0,237,238,3,12,6,0,238,
	239,5,49,0,0,239,240,3,6,3,6,240,280,1,0,0,0,241,242,5,18,0,0,242,243,5,
	54,0,0,243,244,5,48,0,0,244,245,3,6,3,0,245,246,5,49,0,0,246,247,3,6,3,
	5,247,280,1,0,0,0,248,249,5,35,0,0,249,254,3,6,3,0,250,251,5,37,0,0,251,
	253,3,6,3,0,252,250,1,0,0,0,253,256,1,0,0,0,254,252,1,0,0,0,254,255,1,0,
	0,0,255,257,1,0,0,0,256,254,1,0,0,0,257,258,5,36,0,0,258,280,1,0,0,0,259,
	260,5,41,0,0,260,261,5,54,0,0,261,262,5,48,0,0,262,269,3,6,3,0,263,264,
	5,45,0,0,264,265,5,54,0,0,265,266,5,48,0,0,266,268,3,6,3,0,267,263,1,0,
	0,0,268,271,1,0,0,0,269,267,1,0,0,0,269,270,1,0,0,0,270,272,1,0,0,0,271,
	269,1,0,0,0,272,273,5,42,0,0,273,280,1,0,0,0,274,275,5,43,0,0,275,276,3,
	6,3,0,276,277,5,44,0,0,277,280,1,0,0,0,278,280,7,1,0,0,279,228,1,0,0,0,
	279,234,1,0,0,0,279,241,1,0,0,0,279,248,1,0,0,0,279,259,1,0,0,0,279,274,
	1,0,0,0,279,278,1,0,0,0,280,296,1,0,0,0,281,282,10,11,0,0,282,295,3,6,3,
	12,283,284,10,9,0,0,284,285,5,38,0,0,285,295,3,6,3,10,286,287,10,8,0,0,
	287,288,5,46,0,0,288,295,3,6,3,8,289,290,10,10,0,0,290,291,5,41,0,0,291,
	292,3,4,2,0,292,293,5,42,0,0,293,295,1,0,0,0,294,281,1,0,0,0,294,283,1,
	0,0,0,294,286,1,0,0,0,294,289,1,0,0,0,295,298,1,0,0,0,296,294,1,0,0,0,296,
	297,1,0,0,0,297,7,1,0,0,0,298,296,1,0,0,0,299,300,7,2,0,0,300,9,1,0,0,0,
	301,302,7,3,0,0,302,11,1,0,0,0,303,304,6,6,-1,0,304,314,5,15,0,0,305,306,
	3,6,3,0,306,307,5,46,0,0,307,308,3,12,6,2,308,314,1,0,0,0,309,310,5,43,
	0,0,310,311,3,12,6,0,311,312,5,44,0,0,312,314,1,0,0,0,313,303,1,0,0,0,313,
	305,1,0,0,0,313,309,1,0,0,0,314,320,1,0,0,0,315,316,10,3,0,0,316,317,5,
	46,0,0,317,319,3,12,6,3,318,315,1,0,0,0,319,322,1,0,0,0,320,318,1,0,0,0,
	320,321,1,0,0,0,321,13,1,0,0,0,322,320,1,0,0,0,19,17,23,51,95,100,135,160,
	171,186,199,223,225,254,269,279,294,296,313,320];

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
export class TypeConstructorDeclarationContext extends GlobalDeclContext {
	constructor(parser: LambdaParser, ctx: GlobalDeclContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public TYPEDEF(): TerminalNode {
		return this.getToken(LambdaParser.TYPEDEF, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(LambdaParser.ID, 0);
	}
	public COLON(): TerminalNode {
		return this.getToken(LambdaParser.COLON, 0);
	}
	public kind(): KindContext {
		return this.getTypedRuleContext(KindContext, 0) as KindContext;
	}
	public SEMI(): TerminalNode {
		return this.getToken(LambdaParser.SEMI, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterTypeConstructorDeclaration) {
	 		listener.enterTypeConstructorDeclaration(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitTypeConstructorDeclaration) {
	 		listener.exitTypeConstructorDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitTypeConstructorDeclaration) {
			return visitor.visitTypeConstructorDeclaration(this);
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
export class TypeAliasDeclarationContext extends GlobalDeclContext {
	constructor(parser: LambdaParser, ctx: GlobalDeclContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public TYPEDEF(): TerminalNode {
		return this.getToken(LambdaParser.TYPEDEF, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(LambdaParser.ID, 0);
	}
	public EQ(): TerminalNode {
		return this.getToken(LambdaParser.EQ, 0);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public SEMI(): TerminalNode {
		return this.getToken(LambdaParser.SEMI, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterTypeAliasDeclaration) {
	 		listener.enterTypeAliasDeclaration(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitTypeAliasDeclaration) {
	 		listener.exitTypeAliasDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitTypeAliasDeclaration) {
			return visitor.visitTypeAliasDeclaration(this);
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
export class TypeAbstractionContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LAMBDA_CAPITALIZED(): TerminalNode {
		return this.getToken(LambdaParser.LAMBDA_CAPITALIZED, 0);
	}
	public typeVariable(): TypeVariableContext {
		return this.getTypedRuleContext(TypeVariableContext, 0) as TypeVariableContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(LambdaParser.DOT, 0);
	}
	public term(): TermContext {
		return this.getTypedRuleContext(TermContext, 0) as TermContext;
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterTypeAbstraction) {
	 		listener.enterTypeAbstraction(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitTypeAbstraction) {
	 		listener.exitTypeAbstraction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitTypeAbstraction) {
			return visitor.visitTypeAbstraction(this);
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
export class TypeApplicationContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public term(): TermContext {
		return this.getTypedRuleContext(TermContext, 0) as TermContext;
	}
	public LBRACK(): TerminalNode {
		return this.getToken(LambdaParser.LBRACK, 0);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public RBRACK(): TerminalNode {
		return this.getToken(LambdaParser.RBRACK, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterTypeApplication) {
	 		listener.enterTypeApplication(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitTypeApplication) {
	 		listener.exitTypeApplication(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitTypeApplication) {
			return visitor.visitTypeApplication(this);
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
export class PiTypeContext extends TypeContext {
	constructor(parser: LambdaParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public PI(): TerminalNode {
		return this.getToken(LambdaParser.PI, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(LambdaParser.ID, 0);
	}
	public COLON(): TerminalNode {
		return this.getToken(LambdaParser.COLON, 0);
	}
	public type__list(): TypeContext[] {
		return this.getTypedRuleContexts(TypeContext) as TypeContext[];
	}
	public type_(i: number): TypeContext {
		return this.getTypedRuleContext(TypeContext, i) as TypeContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(LambdaParser.DOT, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterPiType) {
	 		listener.enterPiType(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitPiType) {
	 		listener.exitPiType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitPiType) {
			return visitor.visitPiType(this);
		} else {
			return visitor.visitChildren(this);
		}
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
export class TypeConstructorAbstractionContext extends TypeContext {
	constructor(parser: LambdaParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LAMBDA(): TerminalNode {
		return this.getToken(LambdaParser.LAMBDA, 0);
	}
	public typeVariable(): TypeVariableContext {
		return this.getTypedRuleContext(TypeVariableContext, 0) as TypeVariableContext;
	}
	public COLON(): TerminalNode {
		return this.getToken(LambdaParser.COLON, 0);
	}
	public kind(): KindContext {
		return this.getTypedRuleContext(KindContext, 0) as KindContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(LambdaParser.DOT, 0);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterTypeConstructorAbstraction) {
	 		listener.enterTypeConstructorAbstraction(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitTypeConstructorAbstraction) {
	 		listener.exitTypeConstructorAbstraction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitTypeConstructorAbstraction) {
			return visitor.visitTypeConstructorAbstraction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeConstructorApplicationContext extends TypeContext {
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
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterTypeConstructorApplication) {
	 		listener.enterTypeConstructorApplication(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitTypeConstructorApplication) {
	 		listener.exitTypeConstructorApplication(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitTypeConstructorApplication) {
			return visitor.visitTypeConstructorApplication(this);
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
export class TypeIndexApplicationContext extends TypeContext {
	constructor(parser: LambdaParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public LBRACK(): TerminalNode {
		return this.getToken(LambdaParser.LBRACK, 0);
	}
	public term(): TermContext {
		return this.getTypedRuleContext(TermContext, 0) as TermContext;
	}
	public RBRACK(): TerminalNode {
		return this.getToken(LambdaParser.RBRACK, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterTypeIndexApplication) {
	 		listener.enterTypeIndexApplication(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitTypeIndexApplication) {
	 		listener.exitTypeIndexApplication(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitTypeIndexApplication) {
			return visitor.visitTypeIndexApplication(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ForallTypeContext extends TypeContext {
	constructor(parser: LambdaParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public FORALL(): TerminalNode {
		return this.getToken(LambdaParser.FORALL, 0);
	}
	public typeVariable(): TypeVariableContext {
		return this.getTypedRuleContext(TypeVariableContext, 0) as TypeVariableContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(LambdaParser.DOT, 0);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterForallType) {
	 		listener.enterForallType(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitForallType) {
	 		listener.exitForallType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitForallType) {
			return visitor.visitForallType(this);
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


export class TypeVariableContext extends ParserRuleContext {
	constructor(parser?: LambdaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public GREEK(): TerminalNode {
		return this.getToken(LambdaParser.GREEK, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(LambdaParser.ID, 0);
	}
    public get ruleIndex(): number {
    	return LambdaParser.RULE_typeVariable;
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterTypeVariable) {
	 		listener.enterTypeVariable(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitTypeVariable) {
	 		listener.exitTypeVariable(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitTypeVariable) {
			return visitor.visitTypeVariable(this);
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


export class KindContext extends ParserRuleContext {
	constructor(parser?: LambdaParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return LambdaParser.RULE_kind;
	}
	public override copyFrom(ctx: KindContext): void {
		super.copyFrom(ctx);
	}
}
export class DependentKindArrowContext extends KindContext {
	constructor(parser: LambdaParser, ctx: KindContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public ARROW(): TerminalNode {
		return this.getToken(LambdaParser.ARROW, 0);
	}
	public kind(): KindContext {
		return this.getTypedRuleContext(KindContext, 0) as KindContext;
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterDependentKindArrow) {
	 		listener.enterDependentKindArrow(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitDependentKindArrow) {
	 		listener.exitDependentKindArrow(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitDependentKindArrow) {
			return visitor.visitDependentKindArrow(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StarKindContext extends KindContext {
	constructor(parser: LambdaParser, ctx: KindContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public KIND_STAR(): TerminalNode {
		return this.getToken(LambdaParser.KIND_STAR, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterStarKind) {
	 		listener.enterStarKind(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitStarKind) {
	 		listener.exitStarKind(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitStarKind) {
			return visitor.visitStarKind(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class KindArrowContext extends KindContext {
	constructor(parser: LambdaParser, ctx: KindContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public kind_list(): KindContext[] {
		return this.getTypedRuleContexts(KindContext) as KindContext[];
	}
	public kind(i: number): KindContext {
		return this.getTypedRuleContext(KindContext, i) as KindContext;
	}
	public ARROW(): TerminalNode {
		return this.getToken(LambdaParser.ARROW, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterKindArrow) {
	 		listener.enterKindArrow(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitKindArrow) {
	 		listener.exitKindArrow(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitKindArrow) {
			return visitor.visitKindArrow(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParenKindContext extends KindContext {
	constructor(parser: LambdaParser, ctx: KindContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(LambdaParser.LPAREN, 0);
	}
	public kind(): KindContext {
		return this.getTypedRuleContext(KindContext, 0) as KindContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(LambdaParser.RPAREN, 0);
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterParenKind) {
	 		listener.enterParenKind(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitParenKind) {
	 		listener.exitParenKind(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitParenKind) {
			return visitor.visitParenKind(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
