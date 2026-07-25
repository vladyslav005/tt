grammar Lambda;

expression
    : ( globalDecl )* (term SEMI)? EOF              # Expr
    ;


globalDecl
    : ID COLON type SEMI                      # GlobalVariableDeclaration
    | ID EQ term COLON type SEMI           # GlobalFunctionDeclaration
    | TYPEDEF ID EQ type SEMI                 # TypeAliasDeclaration
    ;

term
    // 1. Postfix operations: highest priority
    : term DOT NATURAL_NUMBER                                                        # TupleProjection
    | term DOT ID                                                                    # RecordProjection

    // 2. Application: term application and type application (System F)
    // share this precedence tier, left-associative, so "t u [T] v" parses
    // as "((t u) [T]) v".
    | term term                                                                      # Application
    | term LBRACK type RBRACK                                                        # TypeApplication

    // 3. Arithmetic and comparison: all in one rule/alternative, same
    // precedence, left-associative (e.g. "1 + 2 * 3" parses as "(1+2)*3").
    | term op=(PLUS|MINUS|MUL|DIV|LT|MT|LEQ|GEQ|EQEQ|NEQ) term                       # BinaryOp

    // 4. Type ascription: lower than application
    | term AS type                                                                   # Ascribe

    // 5. Sequencing: lowest priority
    | <assoc=right> term SEMI term                                                   # Sequencing

    // 6. Prefix / complex terms: keyword-led forms whose body extends
    // maximally to the right, so relative order among them doesn't matter.
    | LAMBDA UNDERSCORE COLON type DOT term                                          # DummyAbstraction
    | LAMBDA ID COLON type DOT term                                                  # LambdaAbstraction
    | LAMBDA ID DOT term                                                             # LambdaAbstractionUntyped
    | LAMBDA_CAPITALIZED typeVariable DOT term                                       # TypeAbstraction
    | LET ID EQ term IN term                                                         # LetExpression
    | IF term THEN term (ELSEIF term THEN term)* (ELSE term)?                        # IfCondition
    | CASE term OR INL ID DOUBLEARROW term OR INR ID DOUBLEARROW term                # Case
    | CASE term OF LBRACK ID EQ ID RBRACK DOUBLEARROW term (OR LBRACK ID EQ ID RBRACK DOUBLEARROW term)*     # VariantCase
    | INL term AS type                                                               # Inl
    | INR term AS type                                                               # Inr
    | FIX term                                                                       # Fix

    // 7. Atomic / grouped terms
    | LT ID EQ term (COMMA ID EQ term)* MT                                           # Record
    | LT term (COMMA term)* MT                                                       # Tuple
    | LBRACK ID EQ term (COMMA ID EQ term)* RBRACK AS type                           # Variant
    | ID                                                                             # Variable
    | LPAREN term RPAREN                                                             # Parentheses
    | constant                                                                       # Literal
    ;

type
    // 1. Sum type has higher priority than arrow
    : type PLUS type                                             # SumType

    // 2. Arrow type is lowest operator precedence, right-associative
    | <assoc=right> type ARROW type                              # FunctionType

    // 3. Prefix / binder types: body extends maximally to the right, so
    // "forall X. X -> X" is "forall X. (X -> X)".
    | FORALL typeVariable DOT type                               # ForallType

    // 4. Atomic / grouped types
    | LT type (MUL type)* MT                                     # TupleType
    | LBRACK ID COLON type (COMMA ID COLON type)* RBRACK         # VariantType
    | LPAREN type RPAREN                                         # ParenType
    | (GREEK | ID | 'Nat' | 'Bool' | 'Unit')                     # TypeIdentifier
    ;

typeVariable
    :  GREEK | ID
    ;

constant
    : NATURAL_NUMBER | '0'
    | 'true'
    | 'True'
    | 'false'
    | 'False'
    | 'Unit'
    | 'unit'
    ;

kind
    : KIND_STAR                                 # StarKind
    | <assoc=right> kind ARROW kind             # KindArrow
    | LPAREN kind RPAREN                        # ParenKind
    ;


LAMBDA         : 'λ' | '\\' ;

LAMBDA_CAPITALIZED     : 'Λ';
LET            : 'let';
IN             : 'in';
FIX            : 'fix';
TYPEDEF        : 'typedef';

KIND_STAR      : '@'; // to avoid ambiguity with, '@' is used instead of '*' for the kind of types

APOSTROPHE     : '\'';

FORALL         : '∀';

CASE           : 'case';
OF             : 'of';

INL            : 'inl';
INR            : 'inr';
OR             : '||';
AS             : 'as';

IF             : 'if';
THEN           : 'then';
ELSEIF         : 'elseif';
ELSE           : 'else';

UNDERSCORE     : '_';

EQEQ           : '==';
NEQ            : '!=';
LEQ            : '<=';
GEQ            : '>=';
EQ             : '=';
LT             : '<';
MT             : '>';
MUL            : '*' | '×';
PLUS           : '+';
MINUS          : '-';
DIV            : '/';

LBRACK         : '[';
RBRACK         : ']';
LPAREN         : '(';
RPAREN         : ')';

COMMA          : ',';
ARROW          : '->' | '→';
DOUBLEARROW    : '=>' | '⇒';
COLON          : ':';
DOT            : '.';
SEMI           : ';';

GREEK          : [\u03B1-\u03C9];
NATURAL_NUMBER : [1-9] [0-9]*;
ZERO           : '0';

ID             : [a-zA-Z_][a-zA-Z0-9_]*;

LINE_COMMENT
    : '//' ~[\r\n]* -> skip
    ;

WS
    : [ \t\r\n]+ -> skip
    ;