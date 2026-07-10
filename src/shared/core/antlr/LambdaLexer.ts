// @ts-nocheck
// Generated from ./src/shared/core/antlr/Lambda.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
	ATN,
	ATNDeserializer,
	CharStream,
	DecisionState, DFA,
	Lexer,
	LexerATNSimulator,
	RuleContext,
	PredictionContextCache,
	Token
} from "antlr4";
export default class LambdaLexer extends Lexer {
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
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
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
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "LAMBDA", 
		"CASE", "OF", "INL", "INR", "OR", "AS", "IF", "THEN", "ELSEIF", "ELSE", 
		"UNDERSCORE", "EQ", "LT", "MT", "MUL", "PLUS", "LBRACK", "RBRACK", "LPAREN", 
		"RPAREN", "COMMA", "ARROW", "DOUBLEARROW", "COLON", "DOT", "SEMI", "GREEK", 
		"NATURAL_NUMBER", "ZERO", "ID", "LINE_COMMENT", "WS",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, LambdaLexer._ATN, LambdaLexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "Lambda.g4"; }

	public get literalNames(): (string | null)[] { return LambdaLexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return LambdaLexer.symbolicNames; }
	public get ruleNames(): string[] { return LambdaLexer.ruleNames; }

	public get serializedATN(): number[] { return LambdaLexer._serializedATN; }

	public get channelNames(): string[] { return LambdaLexer.channelNames; }

	public get modeNames(): string[] { return LambdaLexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,41,242,6,-1,2,0,
	7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,
	7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,
	16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,
	2,24,7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,
	31,7,31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,
	7,38,2,39,7,39,2,40,7,40,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,2,1,2,1,
	2,1,2,1,2,1,3,1,3,1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,
	5,1,6,1,6,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,8,1,8,1,9,1,9,1,9,1,9,1,
	9,1,10,1,10,1,10,1,11,1,11,1,11,1,11,1,12,1,12,1,12,1,12,1,13,1,13,1,13,
	1,14,1,14,1,14,1,15,1,15,1,15,1,16,1,16,1,16,1,16,1,16,1,17,1,17,1,17,1,
	17,1,17,1,17,1,17,1,18,1,18,1,18,1,18,1,18,1,19,1,19,1,20,1,20,1,21,1,21,
	1,22,1,22,1,23,1,23,1,24,1,24,1,25,1,25,1,26,1,26,1,27,1,27,1,28,1,28,1,
	29,1,29,1,30,1,30,1,30,3,30,194,8,30,1,31,1,31,1,31,3,31,199,8,31,1,32,
	1,32,1,33,1,33,1,34,1,34,1,35,1,35,1,36,1,36,5,36,211,8,36,10,36,12,36,
	214,9,36,1,37,1,37,1,38,1,38,5,38,220,8,38,10,38,12,38,223,9,38,1,39,1,
	39,1,39,1,39,5,39,229,8,39,10,39,12,39,232,9,39,1,39,1,39,1,40,4,40,237,
	8,40,11,40,12,40,238,1,40,1,40,0,0,41,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,
	8,17,9,19,10,21,11,23,12,25,13,27,14,29,15,31,16,33,17,35,18,37,19,39,20,
	41,21,43,22,45,23,47,24,49,25,51,26,53,27,55,28,57,29,59,30,61,31,63,32,
	65,33,67,34,69,35,71,36,73,37,75,38,77,39,79,40,81,41,1,0,9,2,0,92,92,955,
	955,2,0,42,42,215,215,1,0,945,969,1,0,49,57,1,0,48,57,3,0,65,90,95,95,97,
	122,4,0,48,57,65,90,95,95,97,122,2,0,10,10,13,13,3,0,9,10,13,13,32,32,247,
	0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,
	0,0,13,1,0,0,0,0,15,1,0,0,0,0,17,1,0,0,0,0,19,1,0,0,0,0,21,1,0,0,0,0,23,
	1,0,0,0,0,25,1,0,0,0,0,27,1,0,0,0,0,29,1,0,0,0,0,31,1,0,0,0,0,33,1,0,0,
	0,0,35,1,0,0,0,0,37,1,0,0,0,0,39,1,0,0,0,0,41,1,0,0,0,0,43,1,0,0,0,0,45,
	1,0,0,0,0,47,1,0,0,0,0,49,1,0,0,0,0,51,1,0,0,0,0,53,1,0,0,0,0,55,1,0,0,
	0,0,57,1,0,0,0,0,59,1,0,0,0,0,61,1,0,0,0,0,63,1,0,0,0,0,65,1,0,0,0,0,67,
	1,0,0,0,0,69,1,0,0,0,0,71,1,0,0,0,0,73,1,0,0,0,0,75,1,0,0,0,0,77,1,0,0,
	0,0,79,1,0,0,0,0,81,1,0,0,0,1,83,1,0,0,0,3,87,1,0,0,0,5,92,1,0,0,0,7,97,
	1,0,0,0,9,102,1,0,0,0,11,107,1,0,0,0,13,113,1,0,0,0,15,119,1,0,0,0,17,124,
	1,0,0,0,19,126,1,0,0,0,21,131,1,0,0,0,23,134,1,0,0,0,25,138,1,0,0,0,27,
	142,1,0,0,0,29,145,1,0,0,0,31,148,1,0,0,0,33,151,1,0,0,0,35,156,1,0,0,0,
	37,163,1,0,0,0,39,168,1,0,0,0,41,170,1,0,0,0,43,172,1,0,0,0,45,174,1,0,
	0,0,47,176,1,0,0,0,49,178,1,0,0,0,51,180,1,0,0,0,53,182,1,0,0,0,55,184,
	1,0,0,0,57,186,1,0,0,0,59,188,1,0,0,0,61,193,1,0,0,0,63,198,1,0,0,0,65,
	200,1,0,0,0,67,202,1,0,0,0,69,204,1,0,0,0,71,206,1,0,0,0,73,208,1,0,0,0,
	75,215,1,0,0,0,77,217,1,0,0,0,79,224,1,0,0,0,81,236,1,0,0,0,83,84,5,78,
	0,0,84,85,5,97,0,0,85,86,5,116,0,0,86,2,1,0,0,0,87,88,5,66,0,0,88,89,5,
	111,0,0,89,90,5,111,0,0,90,91,5,108,0,0,91,4,1,0,0,0,92,93,5,85,0,0,93,
	94,5,110,0,0,94,95,5,105,0,0,95,96,5,116,0,0,96,6,1,0,0,0,97,98,5,116,0,
	0,98,99,5,114,0,0,99,100,5,117,0,0,100,101,5,101,0,0,101,8,1,0,0,0,102,
	103,5,84,0,0,103,104,5,114,0,0,104,105,5,117,0,0,105,106,5,101,0,0,106,
	10,1,0,0,0,107,108,5,102,0,0,108,109,5,97,0,0,109,110,5,108,0,0,110,111,
	5,115,0,0,111,112,5,101,0,0,112,12,1,0,0,0,113,114,5,70,0,0,114,115,5,97,
	0,0,115,116,5,108,0,0,116,117,5,115,0,0,117,118,5,101,0,0,118,14,1,0,0,
	0,119,120,5,117,0,0,120,121,5,110,0,0,121,122,5,105,0,0,122,123,5,116,0,
	0,123,16,1,0,0,0,124,125,7,0,0,0,125,18,1,0,0,0,126,127,5,99,0,0,127,128,
	5,97,0,0,128,129,5,115,0,0,129,130,5,101,0,0,130,20,1,0,0,0,131,132,5,111,
	0,0,132,133,5,102,0,0,133,22,1,0,0,0,134,135,5,105,0,0,135,136,5,110,0,
	0,136,137,5,108,0,0,137,24,1,0,0,0,138,139,5,105,0,0,139,140,5,110,0,0,
	140,141,5,114,0,0,141,26,1,0,0,0,142,143,5,124,0,0,143,144,5,124,0,0,144,
	28,1,0,0,0,145,146,5,97,0,0,146,147,5,115,0,0,147,30,1,0,0,0,148,149,5,
	105,0,0,149,150,5,102,0,0,150,32,1,0,0,0,151,152,5,116,0,0,152,153,5,104,
	0,0,153,154,5,101,0,0,154,155,5,110,0,0,155,34,1,0,0,0,156,157,5,101,0,
	0,157,158,5,108,0,0,158,159,5,115,0,0,159,160,5,101,0,0,160,161,5,105,0,
	0,161,162,5,102,0,0,162,36,1,0,0,0,163,164,5,101,0,0,164,165,5,108,0,0,
	165,166,5,115,0,0,166,167,5,101,0,0,167,38,1,0,0,0,168,169,5,95,0,0,169,
	40,1,0,0,0,170,171,5,61,0,0,171,42,1,0,0,0,172,173,5,60,0,0,173,44,1,0,
	0,0,174,175,5,62,0,0,175,46,1,0,0,0,176,177,7,1,0,0,177,48,1,0,0,0,178,
	179,5,43,0,0,179,50,1,0,0,0,180,181,5,91,0,0,181,52,1,0,0,0,182,183,5,93,
	0,0,183,54,1,0,0,0,184,185,5,40,0,0,185,56,1,0,0,0,186,187,5,41,0,0,187,
	58,1,0,0,0,188,189,5,44,0,0,189,60,1,0,0,0,190,191,5,45,0,0,191,194,5,62,
	0,0,192,194,5,8594,0,0,193,190,1,0,0,0,193,192,1,0,0,0,194,62,1,0,0,0,195,
	196,5,61,0,0,196,199,5,62,0,0,197,199,5,8658,0,0,198,195,1,0,0,0,198,197,
	1,0,0,0,199,64,1,0,0,0,200,201,5,58,0,0,201,66,1,0,0,0,202,203,5,46,0,0,
	203,68,1,0,0,0,204,205,5,59,0,0,205,70,1,0,0,0,206,207,7,2,0,0,207,72,1,
	0,0,0,208,212,7,3,0,0,209,211,7,4,0,0,210,209,1,0,0,0,211,214,1,0,0,0,212,
	210,1,0,0,0,212,213,1,0,0,0,213,74,1,0,0,0,214,212,1,0,0,0,215,216,5,48,
	0,0,216,76,1,0,0,0,217,221,7,5,0,0,218,220,7,6,0,0,219,218,1,0,0,0,220,
	223,1,0,0,0,221,219,1,0,0,0,221,222,1,0,0,0,222,78,1,0,0,0,223,221,1,0,
	0,0,224,225,5,47,0,0,225,226,5,47,0,0,226,230,1,0,0,0,227,229,8,7,0,0,228,
	227,1,0,0,0,229,232,1,0,0,0,230,228,1,0,0,0,230,231,1,0,0,0,231,233,1,0,
	0,0,232,230,1,0,0,0,233,234,6,39,0,0,234,80,1,0,0,0,235,237,7,8,0,0,236,
	235,1,0,0,0,237,238,1,0,0,0,238,236,1,0,0,0,238,239,1,0,0,0,239,240,1,0,
	0,0,240,241,6,40,0,0,241,82,1,0,0,0,7,0,193,198,212,221,230,238,1,6,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!LambdaLexer.__ATN) {
			LambdaLexer.__ATN = new ATNDeserializer().deserialize(LambdaLexer._serializedATN);
		}

		return LambdaLexer.__ATN;
	}


	static DecisionsToDFA = LambdaLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}