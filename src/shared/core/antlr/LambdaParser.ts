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
	public static readonly CASE = 10;
	public static readonly OF = 11;
	public static readonly INL = 12;
	public static readonly INR = 13;
	public static readonly OR = 14;
	public static readonly AS = 15;
	public static readonly IF = 16;
	public static readonly THEN = 17;
	public static readonly ELSEIF = 18;
	public static readonly ELSE = 19;
	public static readonly UNDERSCORE = 20;
	public static readonly EQ = 21;
	public static readonly LT = 22;
	public static readonly MT = 23;
	public static readonly MUL = 24;
	public static readonly PLUS = 25;
	public static readonly LBRACK = 26;
	public static readonly RBRACK = 27;
	public static readonly LPAREN = 28;
	public static readonly RPAREN = 29;
	public static readonly COMMA = 30;
	public static readonly ARROW = 31;
	public static readonly DOUBLEARROW = 32;
	public static readonly COLON = 33;
	public static readonly DOT = 34;
	public static readonly SEMI = 35;
	public static readonly GREEK = 36;
	public static readonly NATURAL_NUMBER = 37;
	public static readonly ZERO = 38;
	public static readonly ID = 39;
	public static readonly LINE_COMMENT = 40;
	public static readonly WS = 41;
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
                                                            "'case'", "'of'", 
                                                            "'inl'", "'inr'", 
                                                            "'||'", "'as'", 
                                                            "'if'", "'then'", 
                                                            "'elseif'", 
                                                            "'else'", "'_'", 
                                                            "'='", "'<'", 
                                                            "'>'", null, 
                                                            "'+'", "'['", 
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
                                                             "CASE", "OF", 
                                                             "INL", "INR", 
                                                             "OR", "AS", 
                                                             "IF", "THEN", 
                                                             "ELSEIF", "ELSE", 
                                                             "UNDERSCORE", 
                                                             "EQ", "LT", 
                                                             "MT", "MUL", 
                                                             "PLUS", "LBRACK", 
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
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 339818488) !== 0) || ((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 7) !== 0)) {
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
			this.state = 165;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				{
				localctx = new DummyAbstractionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 38;
				this.match(LambdaParser.LAMBDA);
				this.state = 39;
				this.match(LambdaParser.UNDERSCORE);
				this.state = 40;
				this.match(LambdaParser.COLON);
				this.state = 41;
				this.type_(0);
				this.state = 42;
				this.match(LambdaParser.DOT);
				this.state = 43;
				this.term(13);
				}
				break;
			case 2:
				{
				localctx = new LambdaAbstractionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 45;
				this.match(LambdaParser.LAMBDA);
				this.state = 46;
				this.match(LambdaParser.ID);
				this.state = 47;
				this.match(LambdaParser.COLON);
				this.state = 48;
				this.type_(0);
				this.state = 49;
				this.match(LambdaParser.DOT);
				this.state = 50;
				this.term(12);
				}
				break;
			case 3:
				{
				localctx = new IfConditionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 52;
				this.match(LambdaParser.IF);
				this.state = 53;
				this.term(0);
				this.state = 54;
				this.match(LambdaParser.THEN);
				this.state = 55;
				this.term(0);
				this.state = 63;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 56;
						this.match(LambdaParser.ELSEIF);
						this.state = 57;
						this.term(0);
						this.state = 58;
						this.match(LambdaParser.THEN);
						this.state = 59;
						this.term(0);
						}
						}
					}
					this.state = 65;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
				}
				this.state = 68;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 4, this._ctx) ) {
				case 1:
					{
					this.state = 66;
					this.match(LambdaParser.ELSE);
					this.state = 67;
					this.term(0);
					}
					break;
				}
				}
				break;
			case 4:
				{
				localctx = new CaseContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 70;
				this.match(LambdaParser.CASE);
				this.state = 71;
				this.term(0);
				this.state = 72;
				this.match(LambdaParser.OR);
				this.state = 73;
				this.match(LambdaParser.INL);
				this.state = 74;
				this.match(LambdaParser.ID);
				this.state = 75;
				this.match(LambdaParser.DOUBLEARROW);
				this.state = 76;
				this.term(0);
				this.state = 77;
				this.match(LambdaParser.OR);
				this.state = 78;
				this.match(LambdaParser.INR);
				this.state = 79;
				this.match(LambdaParser.ID);
				this.state = 80;
				this.match(LambdaParser.DOUBLEARROW);
				this.state = 81;
				this.term(10);
				}
				break;
			case 5:
				{
				localctx = new VariantCaseContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 83;
				this.match(LambdaParser.CASE);
				this.state = 84;
				this.term(0);
				this.state = 85;
				this.match(LambdaParser.OF);
				this.state = 86;
				this.match(LambdaParser.LBRACK);
				this.state = 87;
				this.match(LambdaParser.ID);
				this.state = 88;
				this.match(LambdaParser.EQ);
				this.state = 89;
				this.match(LambdaParser.ID);
				this.state = 90;
				this.match(LambdaParser.RBRACK);
				this.state = 91;
				this.match(LambdaParser.DOUBLEARROW);
				this.state = 92;
				this.term(0);
				this.state = 103;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 93;
						this.match(LambdaParser.OR);
						this.state = 94;
						this.match(LambdaParser.LBRACK);
						this.state = 95;
						this.match(LambdaParser.ID);
						this.state = 96;
						this.match(LambdaParser.EQ);
						this.state = 97;
						this.match(LambdaParser.ID);
						this.state = 98;
						this.match(LambdaParser.RBRACK);
						this.state = 99;
						this.match(LambdaParser.DOUBLEARROW);
						this.state = 100;
						this.term(0);
						}
						}
					}
					this.state = 105;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
				}
				}
				break;
			case 6:
				{
				localctx = new InlContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 106;
				this.match(LambdaParser.INL);
				this.state = 107;
				this.term(0);
				this.state = 108;
				this.match(LambdaParser.AS);
				this.state = 109;
				this.type_(0);
				}
				break;
			case 7:
				{
				localctx = new InrContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 111;
				this.match(LambdaParser.INR);
				this.state = 112;
				this.term(0);
				this.state = 113;
				this.match(LambdaParser.AS);
				this.state = 114;
				this.type_(0);
				}
				break;
			case 8:
				{
				localctx = new RecordContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 116;
				this.match(LambdaParser.LT);
				this.state = 117;
				this.match(LambdaParser.ID);
				this.state = 118;
				this.match(LambdaParser.EQ);
				this.state = 119;
				this.term(0);
				this.state = 126;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===30) {
					{
					{
					this.state = 120;
					this.match(LambdaParser.COMMA);
					this.state = 121;
					this.match(LambdaParser.ID);
					this.state = 122;
					this.match(LambdaParser.EQ);
					this.state = 123;
					this.term(0);
					}
					}
					this.state = 128;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 129;
				this.match(LambdaParser.MT);
				}
				break;
			case 9:
				{
				localctx = new TupleContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 131;
				this.match(LambdaParser.LT);
				this.state = 132;
				this.term(0);
				this.state = 137;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===30) {
					{
					{
					this.state = 133;
					this.match(LambdaParser.COMMA);
					this.state = 134;
					this.term(0);
					}
					}
					this.state = 139;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 140;
				this.match(LambdaParser.MT);
				}
				break;
			case 10:
				{
				localctx = new VariantContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 142;
				this.match(LambdaParser.LBRACK);
				this.state = 143;
				this.match(LambdaParser.ID);
				this.state = 144;
				this.match(LambdaParser.EQ);
				this.state = 145;
				this.term(0);
				this.state = 152;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===30) {
					{
					{
					this.state = 146;
					this.match(LambdaParser.COMMA);
					this.state = 147;
					this.match(LambdaParser.ID);
					this.state = 148;
					this.match(LambdaParser.EQ);
					this.state = 149;
					this.term(0);
					}
					}
					this.state = 154;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 155;
				this.match(LambdaParser.RBRACK);
				this.state = 156;
				this.match(LambdaParser.AS);
				this.state = 157;
				this.type_(0);
				}
				break;
			case 11:
				{
				localctx = new VariableContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 159;
				this.match(LambdaParser.ID);
				}
				break;
			case 12:
				{
				localctx = new ParenthesesContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 160;
				this.match(LambdaParser.LPAREN);
				this.state = 161;
				this.term(0);
				this.state = 162;
				this.match(LambdaParser.RPAREN);
				}
				break;
			case 13:
				{
				localctx = new LiteralContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 164;
				this.constant();
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 183;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 11, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 181;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 10, this._ctx) ) {
					case 1:
						{
						localctx = new ApplicationContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 167;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 168;
						this.term(17);
						}
						break;
					case 2:
						{
						localctx = new SequencingContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 169;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 170;
						this.match(LambdaParser.SEMI);
						this.state = 171;
						this.term(14);
						}
						break;
					case 3:
						{
						localctx = new TupleProjectionContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 172;
						if (!(this.precpred(this._ctx, 18))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 18)");
						}
						this.state = 173;
						this.match(LambdaParser.DOT);
						this.state = 174;
						this.match(LambdaParser.NATURAL_NUMBER);
						}
						break;
					case 4:
						{
						localctx = new RecordProjectionContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 175;
						if (!(this.precpred(this._ctx, 17))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 17)");
						}
						this.state = 176;
						this.match(LambdaParser.DOT);
						this.state = 177;
						this.match(LambdaParser.ID);
						}
						break;
					case 5:
						{
						localctx = new AscribeContext(this, new TermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_term);
						this.state = 178;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 179;
						this.match(LambdaParser.AS);
						this.state = 180;
						this.type_(0);
						}
						break;
					}
					}
				}
				this.state = 185;
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
			this.state = 218;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 22:
				{
				localctx = new TupleTypeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 187;
				this.match(LambdaParser.LT);
				this.state = 188;
				this.type_(0);
				this.state = 193;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===24) {
					{
					{
					this.state = 189;
					this.match(LambdaParser.MUL);
					this.state = 190;
					this.type_(0);
					}
					}
					this.state = 195;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 196;
				this.match(LambdaParser.MT);
				}
				break;
			case 26:
				{
				localctx = new VariantTypeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 198;
				this.match(LambdaParser.LBRACK);
				this.state = 199;
				this.match(LambdaParser.ID);
				this.state = 200;
				this.match(LambdaParser.COLON);
				this.state = 201;
				this.type_(0);
				this.state = 208;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===30) {
					{
					{
					this.state = 202;
					this.match(LambdaParser.COMMA);
					this.state = 203;
					this.match(LambdaParser.ID);
					this.state = 204;
					this.match(LambdaParser.COLON);
					this.state = 205;
					this.type_(0);
					}
					}
					this.state = 210;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 211;
				this.match(LambdaParser.RBRACK);
				}
				break;
			case 28:
				{
				localctx = new ParenTypeContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 213;
				this.match(LambdaParser.LPAREN);
				this.state = 214;
				this.type_(0);
				this.state = 215;
				this.match(LambdaParser.RPAREN);
				}
				break;
			case 1:
			case 2:
			case 3:
			case 36:
			case 39:
				{
				localctx = new TypeIdentifierContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 217;
				_la = this._input.LA(1);
				if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0) || _la===36 || _la===39)) {
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
			this.state = 228;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 16, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 226;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 15, this._ctx) ) {
					case 1:
						{
						localctx = new SumTypeContext(this, new TypeContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_type);
						this.state = 220;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 221;
						this.match(LambdaParser.PLUS);
						this.state = 222;
						this.type_(7);
						}
						break;
					case 2:
						{
						localctx = new FunctionTypeContext(this, new TypeContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, LambdaParser.RULE_type);
						this.state = 223;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 224;
						this.match(LambdaParser.ARROW);
						this.state = 225;
						this.type_(5);
						}
						break;
					}
					}
				}
				this.state = 230;
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
			this.state = 231;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 504) !== 0) || _la===37 || _la===38)) {
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
			return this.precpred(this._ctx, 16);
		case 1:
			return this.precpred(this._ctx, 14);
		case 2:
			return this.precpred(this._ctx, 18);
		case 3:
			return this.precpred(this._ctx, 17);
		case 4:
			return this.precpred(this._ctx, 15);
		}
		return true;
	}
	private type_sempred(localctx: TypeContext, predIndex: number): boolean {
		switch (predIndex) {
		case 5:
			return this.precpred(this._ctx, 6);
		case 6:
			return this.precpred(this._ctx, 5);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,41,234,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,1,0,5,0,12,8,0,10,0,12,0,15,9,0,1,0,1,0,1,
	0,3,0,20,8,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,
	1,36,8,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
	2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,5,2,62,8,2,10,2,12,2,65,9,2,1,2,1,2,3,
	2,69,8,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
	2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,5,2,102,8,
	2,10,2,12,2,105,9,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,
	1,2,1,2,1,2,1,2,1,2,5,2,125,8,2,10,2,12,2,128,9,2,1,2,1,2,1,2,1,2,1,2,1,
	2,5,2,136,8,2,10,2,12,2,139,9,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,
	5,2,151,8,2,10,2,12,2,154,9,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,
	2,166,8,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,5,2,182,
	8,2,10,2,12,2,185,9,2,1,3,1,3,1,3,1,3,1,3,5,3,192,8,3,10,3,12,3,195,9,3,
	1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,5,3,207,8,3,10,3,12,3,210,9,3,1,
	3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,219,8,3,1,3,1,3,1,3,1,3,1,3,1,3,5,3,227,8,
	3,10,3,12,3,230,9,3,1,4,1,4,1,4,0,2,4,6,5,0,2,4,6,8,0,2,3,0,1,3,36,36,39,
	39,2,0,3,8,37,38,261,0,13,1,0,0,0,2,35,1,0,0,0,4,165,1,0,0,0,6,218,1,0,
	0,0,8,231,1,0,0,0,10,12,3,2,1,0,11,10,1,0,0,0,12,15,1,0,0,0,13,11,1,0,0,
	0,13,14,1,0,0,0,14,19,1,0,0,0,15,13,1,0,0,0,16,17,3,4,2,0,17,18,5,35,0,
	0,18,20,1,0,0,0,19,16,1,0,0,0,19,20,1,0,0,0,20,21,1,0,0,0,21,22,5,0,0,1,
	22,1,1,0,0,0,23,24,5,39,0,0,24,25,5,33,0,0,25,26,3,6,3,0,26,27,5,35,0,0,
	27,36,1,0,0,0,28,29,5,39,0,0,29,30,5,21,0,0,30,31,3,4,2,0,31,32,5,33,0,
	0,32,33,3,6,3,0,33,34,5,35,0,0,34,36,1,0,0,0,35,23,1,0,0,0,35,28,1,0,0,
	0,36,3,1,0,0,0,37,38,6,2,-1,0,38,39,5,9,0,0,39,40,5,20,0,0,40,41,5,33,0,
	0,41,42,3,6,3,0,42,43,5,34,0,0,43,44,3,4,2,13,44,166,1,0,0,0,45,46,5,9,
	0,0,46,47,5,39,0,0,47,48,5,33,0,0,48,49,3,6,3,0,49,50,5,34,0,0,50,51,3,
	4,2,12,51,166,1,0,0,0,52,53,5,16,0,0,53,54,3,4,2,0,54,55,5,17,0,0,55,63,
	3,4,2,0,56,57,5,18,0,0,57,58,3,4,2,0,58,59,5,17,0,0,59,60,3,4,2,0,60,62,
	1,0,0,0,61,56,1,0,0,0,62,65,1,0,0,0,63,61,1,0,0,0,63,64,1,0,0,0,64,68,1,
	0,0,0,65,63,1,0,0,0,66,67,5,19,0,0,67,69,3,4,2,0,68,66,1,0,0,0,68,69,1,
	0,0,0,69,166,1,0,0,0,70,71,5,10,0,0,71,72,3,4,2,0,72,73,5,14,0,0,73,74,
	5,12,0,0,74,75,5,39,0,0,75,76,5,32,0,0,76,77,3,4,2,0,77,78,5,14,0,0,78,
	79,5,13,0,0,79,80,5,39,0,0,80,81,5,32,0,0,81,82,3,4,2,10,82,166,1,0,0,0,
	83,84,5,10,0,0,84,85,3,4,2,0,85,86,5,11,0,0,86,87,5,26,0,0,87,88,5,39,0,
	0,88,89,5,21,0,0,89,90,5,39,0,0,90,91,5,27,0,0,91,92,5,32,0,0,92,103,3,
	4,2,0,93,94,5,14,0,0,94,95,5,26,0,0,95,96,5,39,0,0,96,97,5,21,0,0,97,98,
	5,39,0,0,98,99,5,27,0,0,99,100,5,32,0,0,100,102,3,4,2,0,101,93,1,0,0,0,
	102,105,1,0,0,0,103,101,1,0,0,0,103,104,1,0,0,0,104,166,1,0,0,0,105,103,
	1,0,0,0,106,107,5,12,0,0,107,108,3,4,2,0,108,109,5,15,0,0,109,110,3,6,3,
	0,110,166,1,0,0,0,111,112,5,13,0,0,112,113,3,4,2,0,113,114,5,15,0,0,114,
	115,3,6,3,0,115,166,1,0,0,0,116,117,5,22,0,0,117,118,5,39,0,0,118,119,5,
	21,0,0,119,126,3,4,2,0,120,121,5,30,0,0,121,122,5,39,0,0,122,123,5,21,0,
	0,123,125,3,4,2,0,124,120,1,0,0,0,125,128,1,0,0,0,126,124,1,0,0,0,126,127,
	1,0,0,0,127,129,1,0,0,0,128,126,1,0,0,0,129,130,5,23,0,0,130,166,1,0,0,
	0,131,132,5,22,0,0,132,137,3,4,2,0,133,134,5,30,0,0,134,136,3,4,2,0,135,
	133,1,0,0,0,136,139,1,0,0,0,137,135,1,0,0,0,137,138,1,0,0,0,138,140,1,0,
	0,0,139,137,1,0,0,0,140,141,5,23,0,0,141,166,1,0,0,0,142,143,5,26,0,0,143,
	144,5,39,0,0,144,145,5,21,0,0,145,152,3,4,2,0,146,147,5,30,0,0,147,148,
	5,39,0,0,148,149,5,21,0,0,149,151,3,4,2,0,150,146,1,0,0,0,151,154,1,0,0,
	0,152,150,1,0,0,0,152,153,1,0,0,0,153,155,1,0,0,0,154,152,1,0,0,0,155,156,
	5,27,0,0,156,157,5,15,0,0,157,158,3,6,3,0,158,166,1,0,0,0,159,166,5,39,
	0,0,160,161,5,28,0,0,161,162,3,4,2,0,162,163,5,29,0,0,163,166,1,0,0,0,164,
	166,3,8,4,0,165,37,1,0,0,0,165,45,1,0,0,0,165,52,1,0,0,0,165,70,1,0,0,0,
	165,83,1,0,0,0,165,106,1,0,0,0,165,111,1,0,0,0,165,116,1,0,0,0,165,131,
	1,0,0,0,165,142,1,0,0,0,165,159,1,0,0,0,165,160,1,0,0,0,165,164,1,0,0,0,
	166,183,1,0,0,0,167,168,10,16,0,0,168,182,3,4,2,17,169,170,10,14,0,0,170,
	171,5,35,0,0,171,182,3,4,2,14,172,173,10,18,0,0,173,174,5,34,0,0,174,182,
	5,37,0,0,175,176,10,17,0,0,176,177,5,34,0,0,177,182,5,39,0,0,178,179,10,
	15,0,0,179,180,5,15,0,0,180,182,3,6,3,0,181,167,1,0,0,0,181,169,1,0,0,0,
	181,172,1,0,0,0,181,175,1,0,0,0,181,178,1,0,0,0,182,185,1,0,0,0,183,181,
	1,0,0,0,183,184,1,0,0,0,184,5,1,0,0,0,185,183,1,0,0,0,186,187,6,3,-1,0,
	187,188,5,22,0,0,188,193,3,6,3,0,189,190,5,24,0,0,190,192,3,6,3,0,191,189,
	1,0,0,0,192,195,1,0,0,0,193,191,1,0,0,0,193,194,1,0,0,0,194,196,1,0,0,0,
	195,193,1,0,0,0,196,197,5,23,0,0,197,219,1,0,0,0,198,199,5,26,0,0,199,200,
	5,39,0,0,200,201,5,33,0,0,201,208,3,6,3,0,202,203,5,30,0,0,203,204,5,39,
	0,0,204,205,5,33,0,0,205,207,3,6,3,0,206,202,1,0,0,0,207,210,1,0,0,0,208,
	206,1,0,0,0,208,209,1,0,0,0,209,211,1,0,0,0,210,208,1,0,0,0,211,212,5,27,
	0,0,212,219,1,0,0,0,213,214,5,28,0,0,214,215,3,6,3,0,215,216,5,29,0,0,216,
	219,1,0,0,0,217,219,7,0,0,0,218,186,1,0,0,0,218,198,1,0,0,0,218,213,1,0,
	0,0,218,217,1,0,0,0,219,228,1,0,0,0,220,221,10,6,0,0,221,222,5,25,0,0,222,
	227,3,6,3,7,223,224,10,5,0,0,224,225,5,31,0,0,225,227,3,6,3,5,226,220,1,
	0,0,0,226,223,1,0,0,0,227,230,1,0,0,0,228,226,1,0,0,0,228,229,1,0,0,0,229,
	7,1,0,0,0,230,228,1,0,0,0,231,232,7,1,0,0,232,9,1,0,0,0,17,13,19,35,63,
	68,103,126,137,152,165,181,183,193,208,218,226,228];

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
