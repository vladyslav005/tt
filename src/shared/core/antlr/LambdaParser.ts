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
	public static readonly NIL = 15;
	public static readonly CONS = 16;
	public static readonly ISNIL = 17;
	public static readonly HEAD = 18;
	public static readonly TAIL = 19;
	public static readonly LIST = 20;
	public static readonly KIND_STAR = 21;
	public static readonly APOSTROPHE = 22;
	public static readonly FORALL = 23;
	public static readonly PI = 24;
	public static readonly CASE = 25;
	public static readonly OF = 26;
	public static readonly INL = 27;
	public static readonly INR = 28;
	public static readonly OR = 29;
	public static readonly AS = 30;
	public static readonly IF = 31;
	public static readonly THEN = 32;
	public static readonly ELSEIF = 33;
	public static readonly ELSE = 34;
	public static readonly UNDERSCORE = 35;
	public static readonly EQEQ = 36;
	public static readonly NEQ = 37;
	public static readonly LEQ = 38;
	public static readonly GEQ = 39;
	public static readonly EQ = 40;
	public static readonly LT = 41;
	public static readonly MT = 42;
	public static readonly MUL = 43;
	public static readonly PLUS = 44;
	public static readonly MINUS = 45;
	public static readonly DIV = 46;
	public static readonly LBRACK = 47;
	public static readonly RBRACK = 48;
	public static readonly LPAREN = 49;
	public static readonly RPAREN = 50;
	public static readonly COMMA = 51;
	public static readonly ARROW = 52;
	public static readonly DOUBLEARROW = 53;
	public static readonly COLON = 54;
	public static readonly DOT = 55;
	public static readonly SEMI = 56;
	public static readonly GREEK = 57;
	public static readonly NATURAL_NUMBER = 58;
	public static readonly ZERO = 59;
	public static readonly ID = 60;
	public static readonly LINE_COMMENT = 61;
	public static readonly WS = 62;
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
                                                            "'nil'", "'cons'", 
                                                            "'isnil'", "'head'", 
                                                            "'tail'", "'List'", 
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
                                                             "NIL", "CONS", 
                                                             "ISNIL", "HEAD", 
                                                             "TAIL", "LIST", 
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
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 2584719352) !== 0) || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 917825) !== 0)) {
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
			this.state = 229;
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
				this.term(22);
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
				this.term(21);
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
				this.term(20);
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
				this.term(19);
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
				this.term(18);
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
				this.term(16);
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
				this.term(12);
				}
				break;
			case 12:
				{
				localctx = new NilContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 150;
				this.match(LambdaParser.NIL);
				this.state = 151;
				this.match(LambdaParser.LBRACK);
				this.state = 152;
				this.type_(0);
				this.state = 153;
				this.match(LambdaParser.RBRACK);
				}
				break;
			case 13:
				{
				localctx = new ConsContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 155;
				this.match(LambdaParser.CONS);
				this.state = 156;
				this.match(LambdaParser.LBRACK);
				this.state = 157;
				this.type_(0);
				this.state = 158;
				this.match(LambdaParser.RBRACK);
				this.state = 159;
				this.term(0);
				this.state = 160;
				this.term(10);
				}
				break;
			case 14:
				{
				localctx = new IsNilContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 162;
				this.match(LambdaParser.ISNIL);
				this.state = 163;
				this.match(LambdaParser.LBRACK);
				this.state = 164;
				this.type_(0);
				this.state = 165;
				this.match(LambdaParser.RBRACK);
				this.state = 166;
				this.term(9);
				}
				break;
			case 15:
				{
				localctx = new HeadContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 168;
				this.match(LambdaParser.HEAD);
				this.state = 169;
				this.match(LambdaParser.LBRACK);
				this.state = 170;
				this.type_(0);
				this.state = 171;
				this.match(LambdaParser.RBRACK);
				this.state = 172;
				this.term(8);
				}
				break;
			case 16:
				{
				localctx = new TailContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 174;
				this.match(LambdaParser.TAIL);
				this.state = 175;
				this.match(LambdaParser.LBRACK);
				this.state = 176;
				this.type_(0);
				this.state = 177;
				this.match(LambdaParser.RBRACK);
				this.state = 178;
				this.term(7);
				}
				break;
			case 17:
				{
				localctx = new RecordContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 180;
				this.match(LambdaParser.LT);
				this.state = 181;
				this.match(LambdaParser.ID);
				this.state = 182;
				this.match(LambdaParser.EQ);
				this.state = 183;
				this.term(0);
				this.state = 190;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===51) {
					{
					{
					this.state = 184;
					this.match(LambdaParser.COMMA);
					this.state = 185;
					this.match(LambdaParser.ID);
					this.state = 186;
					this.match(LambdaParser.EQ);
					this.state = 187;
					this.term(0);
					}
					}
					this.state = 192;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 193;
				this.match(LambdaParser.MT);
				}
				break;
			case 18:
				{
				localctx = new TupleContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 195;
				this.match(LambdaParser.LT);
				this.state = 196;
				this.term(0);
				this.state = 201;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===51) {
					{
					{
					this.state = 197;
					this.match(LambdaParser.COMMA);
					this.state = 198;
					this.term(0);
					}
					}
					this.state = 203;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 204;
				this.match(LambdaParser.MT);
				}
				break;
			case 19:
				{
				localctx = new VariantContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 206;
				this.match(LambdaParser.LBRACK);
				this.state = 207;
				this.match(LambdaParser.ID);
				this.state = 208;
				this.match(LambdaParser.EQ);
				this.state = 209;
				this.term(0);
				this.state = 216;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===51) {
					{
					{
					this.state = 210;
					this.match(LambdaParser.COMMA);
					this.state = 211;
					this.match(LambdaParser.ID);
					this.state = 212;
					this.match(LambdaParser.EQ);
					this.state = 213;
					this.term(0);
					}
					}
					this.state = 218;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 219;
				this.match(LambdaParser.RBRACK);
				this.state = 220;
				this.match(LambdaParser.AS);
				this.state = 221;
				this.type_(0);
				}
				break;
			case 20:
				{
				localctx = new VariableContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 223;
				this.match(LambdaParser.ID);
				}
				break;
			case 21:
				{
				localctx = new ParenthesesContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 224;
				this.match(LambdaParser.LPAREN);
				this.state = 225;
				this.term(0);
				this.state = 226;
				this.match(LambdaParser.RPAREN);
				}
				break;
			case 22:
				{
				localctx = new LiteralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 228;
				this.constant();
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 255;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 11, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 253;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 10, this._ctx) ) {
					case 1:
						{
						localctx = new ApplicationContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 231;
						if (!(this.precpred(this._ctx, 27))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 27)");
						}
						this.state = 232;
						this.term(28);
						}
						break;
					case 2:
						{
						localctx = new BinaryOpContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 233;
						if (!(this.precpred(this._ctx, 25))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 25)");
						}
						this.state = 234;
						(localctx as BinaryOpContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if(!(((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 2031) !== 0))) {
						    (localctx as BinaryOpContext)._op = this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 235;
						this.term(26);
						}
						break;
					case 3:
						{
						localctx = new SequencingContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 236;
						if (!(this.precpred(this._ctx, 23))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 23)");
						}
						this.state = 237;
						this.match(LambdaParser.SEMI);
						this.state = 238;
						this.term(23);
						}
						break;
					case 4:
						{
						localctx = new TupleProjectionContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 239;
						if (!(this.precpred(this._ctx, 29))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 29)");
						}
						this.state = 240;
						this.match(LambdaParser.DOT);
						this.state = 241;
						this.match(LambdaParser.NATURAL_NUMBER);
						}
						break;
					case 5:
						{
						localctx = new RecordProjectionContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 242;
						if (!(this.precpred(this._ctx, 28))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 28)");
						}
						this.state = 243;
						this.match(LambdaParser.DOT);
						this.state = 244;
						this.match(LambdaParser.ID);
						}
						break;
					case 6:
						{
						localctx = new TypeApplicationContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 245;
						if (!(this.precpred(this._ctx, 26))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 26)");
						}
						this.state = 246;
						this.match(LambdaParser.LBRACK);
						this.state = 247;
						this.type_(0);
						this.state = 248;
						this.match(LambdaParser.RBRACK);
						}
						break;
					case 7:
						{
						localctx = new AscribeContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 250;
						if (!(this.precpred(this._ctx, 24))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 24)");
						}
						this.state = 251;
						this.match(LambdaParser.AS);
						this.state = 252;
						this.type_(0);
						}
						break;
					}
					}
				}
				this.state = 257;
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
			this.state = 311;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 20:
				{
				localctx = new ListTypeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 259;
				this.match(LambdaParser.LIST);
				this.state = 260;
				this.type_(10);
				}
				break;
			case 23:
				{
				localctx = new ForallTypeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 261;
				this.match(LambdaParser.FORALL);
				this.state = 262;
				this.typeVariable();
				this.state = 263;
				this.match(LambdaParser.DOT);
				this.state = 264;
				this.type_(7);
				}
				break;
			case 9:
				{
				localctx = new TypeConstructorAbstractionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 266;
				this.match(LambdaParser.LAMBDA);
				this.state = 267;
				this.typeVariable();
				this.state = 268;
				this.match(LambdaParser.COLON);
				this.state = 269;
				this.kind(0);
				this.state = 270;
				this.match(LambdaParser.DOT);
				this.state = 271;
				this.type_(6);
				}
				break;
			case 24:
				{
				localctx = new PiTypeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 273;
				this.match(LambdaParser.PI);
				this.state = 274;
				this.match(LambdaParser.ID);
				this.state = 275;
				this.match(LambdaParser.COLON);
				this.state = 276;
				this.type_(0);
				this.state = 277;
				this.match(LambdaParser.DOT);
				this.state = 278;
				this.type_(5);
				}
				break;
			case 41:
				{
				localctx = new TupleTypeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 280;
				this.match(LambdaParser.LT);
				this.state = 281;
				this.type_(0);
				this.state = 286;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===43) {
					{
					{
					this.state = 282;
					this.match(LambdaParser.MUL);
					this.state = 283;
					this.type_(0);
					}
					}
					this.state = 288;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 289;
				this.match(LambdaParser.MT);
				}
				break;
			case 47:
				{
				localctx = new VariantTypeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 291;
				this.match(LambdaParser.LBRACK);
				this.state = 292;
				this.match(LambdaParser.ID);
				this.state = 293;
				this.match(LambdaParser.COLON);
				this.state = 294;
				this.type_(0);
				this.state = 301;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===51) {
					{
					{
					this.state = 295;
					this.match(LambdaParser.COMMA);
					this.state = 296;
					this.match(LambdaParser.ID);
					this.state = 297;
					this.match(LambdaParser.COLON);
					this.state = 298;
					this.type_(0);
					}
					}
					this.state = 303;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 304;
				this.match(LambdaParser.RBRACK);
				}
				break;
			case 49:
				{
				localctx = new ParenTypeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 306;
				this.match(LambdaParser.LPAREN);
				this.state = 307;
				this.type_(0);
				this.state = 308;
				this.match(LambdaParser.RPAREN);
				}
				break;
			case 1:
			case 2:
			case 3:
			case 57:
			case 60:
				{
				localctx = new TypeIdentifierContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 310;
				_la = this._input.LA(1);
				if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || _la===57 || _la===60)) {
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
			this.state = 328;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 16, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 326;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 15, this._ctx) ) {
					case 1:
						{
						localctx = new TypeConstructorApplicationContext(this, new TypeContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_type);
						this.state = 313;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 314;
						this.type_(13);
						}
						break;
					case 2:
						{
						localctx = new SumTypeContext(this, new TypeContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_type);
						this.state = 315;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 316;
						this.match(LambdaParser.PLUS);
						this.state = 317;
						this.type_(10);
						}
						break;
					case 3:
						{
						localctx = new FunctionTypeContext(this, new TypeContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_type);
						this.state = 318;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 319;
						this.match(LambdaParser.ARROW);
						this.state = 320;
						this.type_(8);
						}
						break;
					case 4:
						{
						localctx = new TypeIndexApplicationContext(this, new TypeContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_type);
						this.state = 321;
						if (!(this.precpred(this._ctx, 11))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 11)");
						}
						this.state = 322;
						this.match(LambdaParser.LBRACK);
						this.state = 323;
						this.term(0);
						this.state = 324;
						this.match(LambdaParser.RBRACK);
						}
						break;
					}
					}
				}
				this.state = 330;
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
			this.state = 331;
			_la = this._input.LA(1);
			if(!(_la===57 || _la===60)) {
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
			this.state = 333;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 504) !== 0) || _la===58 || _la===59)) {
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
			this.state = 345;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 17, this._ctx) ) {
			case 1:
				{
				localctx = new StarKindContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 336;
				this.match(LambdaParser.KIND_STAR);
				}
				break;
			case 2:
				{
				localctx = new DependentKindArrowContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 337;
				this.type_(0);
				this.state = 338;
				this.match(LambdaParser.ARROW);
				this.state = 339;
				this.kind(2);
				}
				break;
			case 3:
				{
				localctx = new ParenKindContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 341;
				this.match(LambdaParser.LPAREN);
				this.state = 342;
				this.kind(0);
				this.state = 343;
				this.match(LambdaParser.RPAREN);
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 352;
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
					this.state = 347;
					if (!(this.precpred(this._ctx, 3))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
					}
					this.state = 348;
					this.match(LambdaParser.ARROW);
					this.state = 349;
					this.kind(3);
					}
					}
				}
				this.state = 354;
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
			return this.precpred(this._ctx, 27);
		case 1:
			return this.precpred(this._ctx, 25);
		case 2:
			return this.precpred(this._ctx, 23);
		case 3:
			return this.precpred(this._ctx, 29);
		case 4:
			return this.precpred(this._ctx, 28);
		case 5:
			return this.precpred(this._ctx, 26);
		case 6:
			return this.precpred(this._ctx, 24);
		}
		return true;
	}
	private type_sempred(localctx: TypeContext, predIndex: number): boolean {
		switch (predIndex) {
		case 7:
			return this.precpred(this._ctx, 12);
		case 8:
			return this.precpred(this._ctx, 9);
		case 9:
			return this.precpred(this._ctx, 8);
		case 10:
			return this.precpred(this._ctx, 11);
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

	public static readonly _serializedATN: number[] = [4,1,62,356,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,1,0,5,0,16,8,0,10,0,12,0,
	19,9,0,1,0,1,0,1,0,3,0,24,8,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,52,8,
	1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
	2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
	2,1,2,1,2,1,2,1,2,5,2,94,8,2,10,2,12,2,97,9,2,1,2,1,2,3,2,101,8,2,1,2,1,
	2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
	2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,5,2,134,8,2,10,2,12,2,137,
	9,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,
	1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,
	1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,5,2,189,8,2,
	10,2,12,2,192,9,2,1,2,1,2,1,2,1,2,1,2,1,2,5,2,200,8,2,10,2,12,2,203,9,2,
	1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,5,2,215,8,2,10,2,12,2,218,9,2,1,
	2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,230,8,2,1,2,1,2,1,2,1,2,1,2,1,
	2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,5,2,254,
	8,2,10,2,12,2,257,9,2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,
	3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,5,3,285,8,3,10,3,
	12,3,288,9,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,5,3,300,8,3,10,3,12,
	3,303,9,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,312,8,3,1,3,1,3,1,3,1,3,1,3,1,
	3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,5,3,327,8,3,10,3,12,3,330,9,3,1,4,1,4,1,5,
	1,5,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,3,6,346,8,6,1,6,1,6,1,6,5,6,
	351,8,6,10,6,12,6,354,9,6,1,6,0,3,4,6,12,7,0,2,4,6,8,10,12,0,4,2,0,36,39,
	41,46,3,0,1,3,57,57,60,60,2,0,57,57,60,60,2,0,3,8,58,59,403,0,17,1,0,0,
	0,2,51,1,0,0,0,4,229,1,0,0,0,6,311,1,0,0,0,8,331,1,0,0,0,10,333,1,0,0,0,
	12,345,1,0,0,0,14,16,3,2,1,0,15,14,1,0,0,0,16,19,1,0,0,0,17,15,1,0,0,0,
	17,18,1,0,0,0,18,23,1,0,0,0,19,17,1,0,0,0,20,21,3,4,2,0,21,22,5,56,0,0,
	22,24,1,0,0,0,23,20,1,0,0,0,23,24,1,0,0,0,24,25,1,0,0,0,25,26,5,0,0,1,26,
	1,1,0,0,0,27,28,5,60,0,0,28,29,5,54,0,0,29,30,3,6,3,0,30,31,5,56,0,0,31,
	52,1,0,0,0,32,33,5,60,0,0,33,34,5,40,0,0,34,35,3,4,2,0,35,36,5,54,0,0,36,
	37,3,6,3,0,37,38,5,56,0,0,38,52,1,0,0,0,39,40,5,14,0,0,40,41,5,60,0,0,41,
	42,5,40,0,0,42,43,3,6,3,0,43,44,5,56,0,0,44,52,1,0,0,0,45,46,5,14,0,0,46,
	47,5,60,0,0,47,48,5,54,0,0,48,49,3,12,6,0,49,50,5,56,0,0,50,52,1,0,0,0,
	51,27,1,0,0,0,51,32,1,0,0,0,51,39,1,0,0,0,51,45,1,0,0,0,52,3,1,0,0,0,53,
	54,6,2,-1,0,54,55,5,9,0,0,55,56,5,35,0,0,56,57,5,54,0,0,57,58,3,6,3,0,58,
	59,5,55,0,0,59,60,3,4,2,22,60,230,1,0,0,0,61,62,5,9,0,0,62,63,5,60,0,0,
	63,64,5,54,0,0,64,65,3,6,3,0,65,66,5,55,0,0,66,67,3,4,2,21,67,230,1,0,0,
	0,68,69,5,9,0,0,69,70,5,60,0,0,70,71,5,55,0,0,71,230,3,4,2,20,72,73,5,10,
	0,0,73,74,3,8,4,0,74,75,5,55,0,0,75,76,3,4,2,19,76,230,1,0,0,0,77,78,5,
	11,0,0,78,79,5,60,0,0,79,80,5,40,0,0,80,81,3,4,2,0,81,82,5,12,0,0,82,83,
	3,4,2,18,83,230,1,0,0,0,84,85,5,31,0,0,85,86,3,4,2,0,86,87,5,32,0,0,87,
	95,3,4,2,0,88,89,5,33,0,0,89,90,3,4,2,0,90,91,5,32,0,0,91,92,3,4,2,0,92,
	94,1,0,0,0,93,88,1,0,0,0,94,97,1,0,0,0,95,93,1,0,0,0,95,96,1,0,0,0,96,100,
	1,0,0,0,97,95,1,0,0,0,98,99,5,34,0,0,99,101,3,4,2,0,100,98,1,0,0,0,100,
	101,1,0,0,0,101,230,1,0,0,0,102,103,5,25,0,0,103,104,3,4,2,0,104,105,5,
	29,0,0,105,106,5,27,0,0,106,107,5,60,0,0,107,108,5,53,0,0,108,109,3,4,2,
	0,109,110,5,29,0,0,110,111,5,28,0,0,111,112,5,60,0,0,112,113,5,53,0,0,113,
	114,3,4,2,16,114,230,1,0,0,0,115,116,5,25,0,0,116,117,3,4,2,0,117,118,5,
	26,0,0,118,119,5,47,0,0,119,120,5,60,0,0,120,121,5,40,0,0,121,122,5,60,
	0,0,122,123,5,48,0,0,123,124,5,53,0,0,124,135,3,4,2,0,125,126,5,29,0,0,
	126,127,5,47,0,0,127,128,5,60,0,0,128,129,5,40,0,0,129,130,5,60,0,0,130,
	131,5,48,0,0,131,132,5,53,0,0,132,134,3,4,2,0,133,125,1,0,0,0,134,137,1,
	0,0,0,135,133,1,0,0,0,135,136,1,0,0,0,136,230,1,0,0,0,137,135,1,0,0,0,138,
	139,5,27,0,0,139,140,3,4,2,0,140,141,5,30,0,0,141,142,3,6,3,0,142,230,1,
	0,0,0,143,144,5,28,0,0,144,145,3,4,2,0,145,146,5,30,0,0,146,147,3,6,3,0,
	147,230,1,0,0,0,148,149,5,13,0,0,149,230,3,4,2,12,150,151,5,15,0,0,151,
	152,5,47,0,0,152,153,3,6,3,0,153,154,5,48,0,0,154,230,1,0,0,0,155,156,5,
	16,0,0,156,157,5,47,0,0,157,158,3,6,3,0,158,159,5,48,0,0,159,160,3,4,2,
	0,160,161,3,4,2,10,161,230,1,0,0,0,162,163,5,17,0,0,163,164,5,47,0,0,164,
	165,3,6,3,0,165,166,5,48,0,0,166,167,3,4,2,9,167,230,1,0,0,0,168,169,5,
	18,0,0,169,170,5,47,0,0,170,171,3,6,3,0,171,172,5,48,0,0,172,173,3,4,2,
	8,173,230,1,0,0,0,174,175,5,19,0,0,175,176,5,47,0,0,176,177,3,6,3,0,177,
	178,5,48,0,0,178,179,3,4,2,7,179,230,1,0,0,0,180,181,5,41,0,0,181,182,5,
	60,0,0,182,183,5,40,0,0,183,190,3,4,2,0,184,185,5,51,0,0,185,186,5,60,0,
	0,186,187,5,40,0,0,187,189,3,4,2,0,188,184,1,0,0,0,189,192,1,0,0,0,190,
	188,1,0,0,0,190,191,1,0,0,0,191,193,1,0,0,0,192,190,1,0,0,0,193,194,5,42,
	0,0,194,230,1,0,0,0,195,196,5,41,0,0,196,201,3,4,2,0,197,198,5,51,0,0,198,
	200,3,4,2,0,199,197,1,0,0,0,200,203,1,0,0,0,201,199,1,0,0,0,201,202,1,0,
	0,0,202,204,1,0,0,0,203,201,1,0,0,0,204,205,5,42,0,0,205,230,1,0,0,0,206,
	207,5,47,0,0,207,208,5,60,0,0,208,209,5,40,0,0,209,216,3,4,2,0,210,211,
	5,51,0,0,211,212,5,60,0,0,212,213,5,40,0,0,213,215,3,4,2,0,214,210,1,0,
	0,0,215,218,1,0,0,0,216,214,1,0,0,0,216,217,1,0,0,0,217,219,1,0,0,0,218,
	216,1,0,0,0,219,220,5,48,0,0,220,221,5,30,0,0,221,222,3,6,3,0,222,230,1,
	0,0,0,223,230,5,60,0,0,224,225,5,49,0,0,225,226,3,4,2,0,226,227,5,50,0,
	0,227,230,1,0,0,0,228,230,3,10,5,0,229,53,1,0,0,0,229,61,1,0,0,0,229,68,
	1,0,0,0,229,72,1,0,0,0,229,77,1,0,0,0,229,84,1,0,0,0,229,102,1,0,0,0,229,
	115,1,0,0,0,229,138,1,0,0,0,229,143,1,0,0,0,229,148,1,0,0,0,229,150,1,0,
	0,0,229,155,1,0,0,0,229,162,1,0,0,0,229,168,1,0,0,0,229,174,1,0,0,0,229,
	180,1,0,0,0,229,195,1,0,0,0,229,206,1,0,0,0,229,223,1,0,0,0,229,224,1,0,
	0,0,229,228,1,0,0,0,230,255,1,0,0,0,231,232,10,27,0,0,232,254,3,4,2,28,
	233,234,10,25,0,0,234,235,7,0,0,0,235,254,3,4,2,26,236,237,10,23,0,0,237,
	238,5,56,0,0,238,254,3,4,2,23,239,240,10,29,0,0,240,241,5,55,0,0,241,254,
	5,58,0,0,242,243,10,28,0,0,243,244,5,55,0,0,244,254,5,60,0,0,245,246,10,
	26,0,0,246,247,5,47,0,0,247,248,3,6,3,0,248,249,5,48,0,0,249,254,1,0,0,
	0,250,251,10,24,0,0,251,252,5,30,0,0,252,254,3,6,3,0,253,231,1,0,0,0,253,
	233,1,0,0,0,253,236,1,0,0,0,253,239,1,0,0,0,253,242,1,0,0,0,253,245,1,0,
	0,0,253,250,1,0,0,0,254,257,1,0,0,0,255,253,1,0,0,0,255,256,1,0,0,0,256,
	5,1,0,0,0,257,255,1,0,0,0,258,259,6,3,-1,0,259,260,5,20,0,0,260,312,3,6,
	3,10,261,262,5,23,0,0,262,263,3,8,4,0,263,264,5,55,0,0,264,265,3,6,3,7,
	265,312,1,0,0,0,266,267,5,9,0,0,267,268,3,8,4,0,268,269,5,54,0,0,269,270,
	3,12,6,0,270,271,5,55,0,0,271,272,3,6,3,6,272,312,1,0,0,0,273,274,5,24,
	0,0,274,275,5,60,0,0,275,276,5,54,0,0,276,277,3,6,3,0,277,278,5,55,0,0,
	278,279,3,6,3,5,279,312,1,0,0,0,280,281,5,41,0,0,281,286,3,6,3,0,282,283,
	5,43,0,0,283,285,3,6,3,0,284,282,1,0,0,0,285,288,1,0,0,0,286,284,1,0,0,
	0,286,287,1,0,0,0,287,289,1,0,0,0,288,286,1,0,0,0,289,290,5,42,0,0,290,
	312,1,0,0,0,291,292,5,47,0,0,292,293,5,60,0,0,293,294,5,54,0,0,294,301,
	3,6,3,0,295,296,5,51,0,0,296,297,5,60,0,0,297,298,5,54,0,0,298,300,3,6,
	3,0,299,295,1,0,0,0,300,303,1,0,0,0,301,299,1,0,0,0,301,302,1,0,0,0,302,
	304,1,0,0,0,303,301,1,0,0,0,304,305,5,48,0,0,305,312,1,0,0,0,306,307,5,
	49,0,0,307,308,3,6,3,0,308,309,5,50,0,0,309,312,1,0,0,0,310,312,7,1,0,0,
	311,258,1,0,0,0,311,261,1,0,0,0,311,266,1,0,0,0,311,273,1,0,0,0,311,280,
	1,0,0,0,311,291,1,0,0,0,311,306,1,0,0,0,311,310,1,0,0,0,312,328,1,0,0,0,
	313,314,10,12,0,0,314,327,3,6,3,13,315,316,10,9,0,0,316,317,5,44,0,0,317,
	327,3,6,3,10,318,319,10,8,0,0,319,320,5,52,0,0,320,327,3,6,3,8,321,322,
	10,11,0,0,322,323,5,47,0,0,323,324,3,4,2,0,324,325,5,48,0,0,325,327,1,0,
	0,0,326,313,1,0,0,0,326,315,1,0,0,0,326,318,1,0,0,0,326,321,1,0,0,0,327,
	330,1,0,0,0,328,326,1,0,0,0,328,329,1,0,0,0,329,7,1,0,0,0,330,328,1,0,0,
	0,331,332,7,2,0,0,332,9,1,0,0,0,333,334,7,3,0,0,334,11,1,0,0,0,335,336,
	6,6,-1,0,336,346,5,21,0,0,337,338,3,6,3,0,338,339,5,52,0,0,339,340,3,12,
	6,2,340,346,1,0,0,0,341,342,5,49,0,0,342,343,3,12,6,0,343,344,5,50,0,0,
	344,346,1,0,0,0,345,335,1,0,0,0,345,337,1,0,0,0,345,341,1,0,0,0,346,352,
	1,0,0,0,347,348,10,3,0,0,348,349,5,52,0,0,349,351,3,12,6,3,350,347,1,0,
	0,0,351,354,1,0,0,0,352,350,1,0,0,0,352,353,1,0,0,0,353,13,1,0,0,0,354,
	352,1,0,0,0,19,17,23,51,95,100,135,190,201,216,229,253,255,286,301,311,
	326,328,345,352];

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
export class TailContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public TAIL(): TerminalNode {
		return this.getToken(LambdaParser.TAIL, 0);
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
	public term(): TermContext {
		return this.getTypedRuleContext(TermContext, 0) as TermContext;
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterTail) {
	 		listener.enterTail(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitTail) {
	 		listener.exitTail(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitTail) {
			return visitor.visitTail(this);
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
export class IsNilContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public ISNIL(): TerminalNode {
		return this.getToken(LambdaParser.ISNIL, 0);
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
	public term(): TermContext {
		return this.getTypedRuleContext(TermContext, 0) as TermContext;
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterIsNil) {
	 		listener.enterIsNil(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitIsNil) {
	 		listener.exitIsNil(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitIsNil) {
			return visitor.visitIsNil(this);
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
export class HeadContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public HEAD(): TerminalNode {
		return this.getToken(LambdaParser.HEAD, 0);
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
	public term(): TermContext {
		return this.getTypedRuleContext(TermContext, 0) as TermContext;
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterHead) {
	 		listener.enterHead(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitHead) {
	 		listener.exitHead(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitHead) {
			return visitor.visitHead(this);
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
export class NilContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public NIL(): TerminalNode {
		return this.getToken(LambdaParser.NIL, 0);
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
	    if(listener.enterNil) {
	 		listener.enterNil(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitNil) {
	 		listener.exitNil(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitNil) {
			return visitor.visitNil(this);
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
export class ConsContext extends TermContext {
	constructor(parser: LambdaParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public CONS(): TerminalNode {
		return this.getToken(LambdaParser.CONS, 0);
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
	public term_list(): TermContext[] {
		return this.getTypedRuleContexts(TermContext) as TermContext[];
	}
	public term(i: number): TermContext {
		return this.getTypedRuleContext(TermContext, i) as TermContext;
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterCons) {
	 		listener.enterCons(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitCons) {
	 		listener.exitCons(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitCons) {
			return visitor.visitCons(this);
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
export class ListTypeContext extends TypeContext {
	constructor(parser: LambdaParser, ctx: TypeContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LIST(): TerminalNode {
		return this.getToken(LambdaParser.LIST, 0);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public enterRule(listener: LambdaListener): void {
	    if(listener.enterListType) {
	 		listener.enterListType(this);
		}
	}
	public exitRule(listener: LambdaListener): void {
	    if(listener.exitListType) {
	 		listener.exitListType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: LambdaVisitor<Result>): Result {
		if (visitor.visitListType) {
			return visitor.visitListType(this);
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
