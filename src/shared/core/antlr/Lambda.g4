grammar Lambda;

expression
    : ( globalDecl )* (term SEMI)? EOF              # Expr
    ;


globalDecl
    : ID COLON type SEMI                      # GlobalVariableDeclaration
    | ID EQ term COLON type SEMI           # GlobalFunctionDeclaration
    ;

term
    // 1. Postfix operations: highest priority
    : term DOT NATURAL_NUMBER                                                        # TupleProjection
    | term DOT ID                                                                    # RecordProjection

    // 2. Application: high priority, left-associative
    | term term                                                                      # Application

    // 3. Type ascription: lower than application
    | term AS type                                                                   # Ascribe

    // 4. Sequencing: lowest priority
    | <assoc=right> term SEMI term                                                   # Sequencing

    // 5. Prefix / complex terms
    | LAMBDA UNDERSCORE COLON type DOT term                                          # DummyAbstraction
    | LAMBDA ID COLON type DOT term                                                  # LambdaAbstraction
    | IF term THEN term (ELSEIF term THEN term)* (ELSE term)?                        # IfCondition
    | CASE term OR INL ID DOUBLEARROW term OR INR ID DOUBLEARROW term                # Case
    | CASE term OF LBRACK ID EQ ID RBRACK DOUBLEARROW term (OR LBRACK ID EQ ID RBRACK DOUBLEARROW term)*     # VariantCase
    | INL term AS type                                                               # Inl
    | INR term AS type                                                               # Inr

    // 6. Atomic / grouped terms
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

    // 2. Arrow type is lowest and right-associative
    | <assoc=right> type ARROW type                              # FunctionType

    // 3. Atomic / grouped types
    | LT type (MUL type)* MT                                     # TupleType
    | LBRACK ID COLON type (COMMA ID COLON type)* RBRACK         # VariantType
    | LPAREN type RPAREN                                         # ParenType
    | (GREEK | ID | 'Nat' | 'Bool' | 'Unit')                     # TypeIdentifier
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



LAMBDA         : 'λ' | '\\' ;

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

EQ             : '=';
LT             : '<';
MT             : '>';
MUL            : '*' | '×';
PLUS           : '+';

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