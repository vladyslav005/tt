grammar Lambda;

expression
    : ( globalDecl )* (term SEMI)? EOF              # Expr
    ;


globalDecl
    : ID COLON type SEMI                      # GlobalVariableDeclaration
    | ID EQ term COLON type SEMI           # GlobalFunctionDeclaration
    ;

term
    : term term                                                                      # Application
    | LAMBDA ID COLON type DOT term COLON type                                       # LambdaAbstraction
    | ID                                                                             # Variable
    | LPAREN term RPAREN                                                             # Parentheses
    | constant                                                                       # Literal
    ;

type
    : (GREEK | ID | 'Nat' | 'Bool' | 'Unit')                     # TypeIdentifier
    | <assoc=right> type ARROW type                              # FunctionType
    | LPAREN type RPAREN                                         # ParenType
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



LAMBDA         : 'λ' | '\\y' ;
EQ             : '=';

LBRACK : '[';
RBRACK : ']';
ID             : [a-zA-Z_][a-zA-Z0-9_]* ;
GREEK     : [\u03B1-\u03C9] ;
NATURAL_NUMBER : [1-9] [0-9]*;
COMMA          : ',';
ARROW          : '->' | '→';
DOUBLEARROW    : '=>' | '⇒';
COLON          : ':' ;
DOT            : '.' ;
SEMI           : ';' ;
LPAREN         : '(' ;
RPAREN         : ')' ;
LINE_COMMENT
    : '//' ~[\r\n]* -> skip
    ;
WS             : [ \t\r\n]+ -> skip ;