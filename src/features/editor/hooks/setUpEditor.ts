


export function useSetUpEditor() {

  function setUpMonacoLanguage(monaco: any) {
    monaco.languages.register({id: "lambda"});

    let keywords: string[] = [
      "as", "case", "of", "if", "then", "else", "inl", "inr", "nil",
      "isnil", "head", "tail", "cons", "typedef", "fix"
    ];
    monaco.languages.setMonarchTokensProvider("lambda", {
      keywords,
      tokenizer: {
        root: [
          [/Nat|Bool|Unit/, "builtInType"],
          [/iszero|succ|pred/, "builtInFunction"],
          [/true|false|True|False|Unit|unit/, "constant"],

          [/(\b)\w+(\b)/, {
            cases: {
              '@keywords': 'keyword',
              '@default': 'variable',
            }
          }],
          [/=>|⇒/, "doubleArrow"],
          [/→/, "arrow"],

          [/>=/, "geq"],
          [/<=/, "leq"],
          [/==/, "eq"],
          [/\^/, "pow"],
          [/\+/, "plus"],
          [/-/, "minus"],
          [/=/, "delimiter"],

          [/λ/, "lambda"],
          [/\*/, "times"],
          [/</, "langle"],
          [/>/, "rangle"],
          [/]/, "rb"],
          [/\[/, "lb"],
          [/\./, "dot"],
          [/:/, "semi"],
          {include: "@whitespace"},
        ],
        whitespace: [
          [/[ \t\r\n]+/, "white"],
          [/\/\/.*$/, "comment"],
        ],
      },
    });

    monaco.editor.defineTheme("lambda-theme", {
      base: 'vs',
      inherit: true,
      rules: [
        {token: 'keyword', foreground: '#7c3aed', fontStyle: 'bold'}, // purple-600
        {token: 'lambda', foreground: '#dc2626', fontStyle: 'bold'}, // red-600
        {token: 'constant', foreground: '#ea580c', fontStyle: 'regular'}, // orange-600
        {token: 'builtInFunction', foreground: '#0891b2', fontStyle: 'regular'}, // cyan-600
        {token: 'builtInType', foreground: '#d97706', fontStyle: 'regular'}, // amber-600
        {token: 'arrow', foreground: '#16a34a', fontStyle: 'bold'}, // green-600

        {token: 'geq', foreground: '#dc2626', fontStyle: 'bold'},
        {token: 'leq', foreground: '#dc2626', fontStyle: 'bold'},
        {token: 'eq', foreground: '#dc2626', fontStyle: 'bold'},
        {token: 'plus', foreground: '#dc2626', fontStyle: 'bold'},
        {token: 'minus', foreground: '#dc2626', fontStyle: 'bold'},
        {token: 'pow', foreground: '#dc2626', fontStyle: 'bold'},
        {token: 'times', foreground: '#dc2626', fontStyle: 'bold'},

        {token: 'lb', foreground: '#64748b', fontStyle: 'bold'}, // slate-500
        {token: 'rb', foreground: '#64748b', fontStyle: 'bold'},
        {token: 'langle', foreground: '#dc2626', fontStyle: 'bold'},
        {token: 'rangle', foreground: '#dc2626', fontStyle: 'bold'},
        {token: 'dot', foreground: '#64748b', fontStyle: 'bold'},
        {token: 'doubleArrow', foreground: '#16a34a', fontStyle: 'bold'}, // green-600
        {token: 'semi', foreground: '#7c3aed', fontStyle: 'bold'},
        {token: 'variable', foreground: '#334155', fontStyle: 'regular'}, // slate-700
        {token: 'number', foreground: '#ea580c'},
        {token: 'string', foreground: '#16a34a'},
        {token: 'comment', foreground: '#94a3b8', fontStyle: 'italic'}, // slate-400
        {token: 'delimiter', foreground: '#dc2626'},
        {token: 'type', foreground: '#2563eb', fontStyle: 'bold'}, // blue-600
        {token: 'function', foreground: '#9333ea', fontStyle: 'bold'}, // purple-600
        {token: 'class', foreground: '#d97706', fontStyle: 'bold'},
        {token: 'property', foreground: '#0891b2', fontStyle: 'bold'},
      ],
      colors: {
        "editor.foreground": "#0F172BFF", // slate-900
        "editor.background": "#ffffff", // white (matches shadcn card bg)
        "editorCursor.foreground": "#0f172a",
        "editor.lineHighlightBackground": "#f8fafc", // slate-50
        "editorLineNumber.foreground": "#94a3b8", // slate-400
        "editorLineNumber.activeForeground": "#475569", // slate-600
        "editor.selectionBackground": "#e0e7ff", // indigo-100
        "editor.selectionHighlightBackground": "#e0e7ff80",
        "editor.wordHighlightBackground": "#f1f5f9", // slate-100
        "editor.wordHighlightStrongBackground": "#e2e8f0", // slate-200
        "editorWidget.background": "#ffffff",
        "editorWidget.border": "#e2e8f0",
        "editorSuggestWidget.background": "#ffffff",
        "editorSuggestWidget.border": "#e2e8f0",
        "editorSuggestWidget.selectedBackground": "#f1f5f9",
      },
    });

    monaco.editor.defineTheme("lambda-theme-dark", {
      base: 'vs-dark',
      inherit: true,
      rules: [
        {token: 'keyword', foreground: '#a78bfa', fontStyle: 'bold'}, // purple-400
        {token: 'lambda', foreground: '#f87171', fontStyle: 'bold'}, // red-400
        {token: 'constant', foreground: '#fb923c', fontStyle: 'regular'}, // orange-400
        {token: 'builtInFunction', foreground: '#22d3ee', fontStyle: 'regular'}, // cyan-400
        {token: 'builtInType', foreground: '#fbbf24', fontStyle: 'regular'}, // amber-400
        {token: 'arrow', foreground: '#4ade80', fontStyle: 'bold'}, // green-400

        {token: 'geq', foreground: '#f87171', fontStyle: 'bold'},
        {token: 'leq', foreground: '#f87171', fontStyle: 'bold'},
        {token: 'eq', foreground: '#f87171', fontStyle: 'bold'},
        {token: 'plus', foreground: '#f87171', fontStyle: 'bold'},
        {token: 'minus', foreground: '#f87171', fontStyle: 'bold'},
        {token: 'pow', foreground: '#f87171', fontStyle: 'bold'},
        {token: 'times', foreground: '#f87171', fontStyle: 'bold'},

        {token: 'lb', foreground: '#94a3b8', fontStyle: 'bold'}, // slate-400
        {token: 'rb', foreground: '#94a3b8', fontStyle: 'bold'},
        {token: 'langle', foreground: '#f87171', fontStyle: 'bold'},
        {token: 'rangle', foreground: '#f87171', fontStyle: 'bold'},
        {token: 'dot', foreground: '#94a3b8', fontStyle: 'bold'},
        {token: 'doubleArrow', foreground: '#4ade80', fontStyle: 'bold'}, // green-400
        {token: 'semi', foreground: '#a78bfa', fontStyle: 'bold'},
        {token: 'variable', foreground: '#e2e8f0', fontStyle: 'regular'}, // slate-200
        {token: 'number', foreground: '#fb923c'},
        {token: 'string', foreground: '#4ade80'},
        {token: 'comment', foreground: '#64748b', fontStyle: 'italic'}, // slate-500
        {token: 'delimiter', foreground: '#f87171'},
        {token: 'type', foreground: '#60a5fa', fontStyle: 'bold'}, // blue-400
        {token: 'function', foreground: '#c084fc', fontStyle: 'bold'}, // purple-400
        {token: 'class', foreground: '#fbbf24', fontStyle: 'bold'},
        {token: 'property', foreground: '#22d3ee', fontStyle: 'bold'},
      ],
      colors: {
        "editor.foreground": "#e2e8f0", // slate-200
        "editor.background": "#020817", // slate-950 (matches shadcn dark bg)
        "editorCursor.foreground": "#e2e8f0",
        "editor.lineHighlightBackground": "#1e293b", // slate-800
        "editorLineNumber.foreground": "#64748b", // slate-500
        "editorLineNumber.activeForeground": "#94a3b8", // slate-400
        "editor.selectionBackground": "#312e81", // indigo-900
        "editor.selectionHighlightBackground": "#312e8180",
        "editor.wordHighlightBackground": "#1e293b", // slate-800
        "editor.wordHighlightStrongBackground": "#334155", // slate-700
        "editorWidget.background": "#0f172a", // slate-900
        "editorWidget.border": "#334155",
        "editorSuggestWidget.background": "#0f172a",
        "editorSuggestWidget.border": "#334155",
        "editorSuggestWidget.selectedBackground": "#1e293b",
      },
    });

    monaco.languages.setLanguageConfiguration("lambda", {
      comments: {
        lineComment: "//",
      },
      brackets: [["(", ")"]],
      autoClosingPairs: [
        {open: "(", close: ")"},
        {open: "[", close: "]"},
      ],
    });

    // Register the completion provider for vars, based on regex
    monaco.languages.registerCompletionItemProvider("lambda", {
      provideCompletionItems: (model: any, position: any) => {
        try {
          const textUntilPosition = model.getValueInRange({
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          });

          const variableRegex = /\b([a-zA-Z_]\w*)\b/g;
          const matches = new Set();
          let match;

          while ((match = variableRegex.exec(textUntilPosition)) !== null) {
            matches.add(match[1]);
          }

          const suggestions = Array.from(matches).map(variable => ({
            label: variable,
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: variable,
            detail: "Variable auto-completion",
          }));

          return {suggestions};
        } catch (error) {
          console.error("Error in provideCompletionItems:", error);
          return {suggestions: []};
        }
      },
    });


    monaco.languages.registerCompletionItemProvider("lambda", {
      provideCompletionItems: (model: any, position: any) => {
        const word = model.getWordUntilPosition(position);
        const wordRange = new monaco.Range(
          position.lineNumber,
          word.startColumn,
          position.lineNumber,
          word.endColumn
        );

        const slashRange = new monaco.Range(
          position.lineNumber,
          word.startColumn - 1,
          position.lineNumber,
          word.endColumn
        );

        const suggestions = [
          {
            label: 'typedef',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'typedef ',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'typedef',
            range: wordRange,
          },
          {
            label: 'true',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'true',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'true',
            range: wordRange,
          },
          {
            label: 'false',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'false',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'false',
            range: wordRange,
          },
          {
            label: 'unit',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'unit',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'unit',
            range: wordRange,
          },
          {
            label: 'Unit',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Unit',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'Unit type',
            range: wordRange,
          },
          {
            label: 'nil',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'nil[$1]',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'nil',
            range: wordRange,
          },
          {
            label: 'head',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'head[$1]',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'head',
            range: wordRange,
          },
          {
            label: 'cons',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'cons[$1]',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'cons',
            range: wordRange,
          },
          {
            label: 'tail',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'tail[$1]',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'tail',
            range: wordRange,
          },
          {
            label: 'isnil',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'isnil[$1]',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'isnil',
            range: wordRange,
          },
          {
            label: '\\abstraction',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'λ x : T . (x) : T -> T',
            detail: 'Abstraction',
            range: slashRange,
          },
          {
            label: '\\to',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '->',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: 'Arrow',
            range: slashRange
          },
          {
            label: '\\Rightarrow',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '=>',
            detail: 'DoubleArrow',
            range: slashRange
          },

        ];
        return {suggestions};
      }
    });

    monaco.languages.registerCompletionItemProvider("lambda", {
      provideCompletionItems: (model: any, position: any) => {
        const word = model.getWordUntilPosition(position);

        const slashRange = new monaco.Range(
          position.lineNumber,
          word.startColumn - 1,
          position.lineNumber,
          word.endColumn
        );

        const suggestions = [
          {
            label: '\\alpha',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'α',
            detail: 'Alpha',
            range: slashRange
          },
          {
            label: '\\beta',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'β',
            detail: 'Beta',
            range: slashRange
          },
          {
            label: '\\gamma',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'γ',
            detail: 'Gamma',
            range: slashRange
          },
          {
            label: '\\delta',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'δ',
            detail: 'Delta',
            range: slashRange
          },
          {
            label: '\\epsilon',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'ε',
            detail: 'Epsilon',
            range: slashRange
          },
          {
            label: '\\zeta',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'ζ',
            detail: 'Zeta',
            range: slashRange
          },
          {
            label: '\\eta',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'η',
            detail: 'Eta',
            range: slashRange
          },
          {
            label: '\\theta',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'θ',
            detail: 'Theta',
            range: slashRange
          },
          {
            label: '\\iota',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'ι',
            detail: 'Iota',
            range: slashRange
          },
          {
            label: '\\kappa',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'κ',
            detail: 'Kappa',
            range: slashRange
          },
          {
            label: '\\lambda',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'λ',
            detail: 'Lambda',
            range: slashRange
          },
          {
            label: '\\mu',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'μ',
            detail: 'Mu',
            range: slashRange
          },
          {
            label: '\\nu',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'ν',
            detail: 'Nu',
            range: slashRange
          },
          {
            label: '\\xi',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'ξ',
            detail: 'Xi',
            range: slashRange
          },
          {
            label: '\\omicron',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'ο',
            detail: 'Omicron',
            range: slashRange
          },
          {
            label: '\\pi',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'π',
            detail: 'Pi',
            range: slashRange
          },
          {
            label: '\\rho',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'ρ',
            detail: 'Rho',
            range: slashRange
          },
          {
            label: '\\sigma',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'σ',
            detail: 'Sigma',
            range: slashRange
          },
          {
            label: '\\tau',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'τ',
            detail: 'Tau',
            range: slashRange
          },
          {
            label: '\\upsilon',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'υ',
            detail: 'Upsilon',
            range: slashRange
          },
          {
            label: '\\phi',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'φ',
            detail: 'Phi',
            range: slashRange
          },
          {
            label: '\\chi',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'χ',
            detail: 'Chi',
            range: slashRange
          },
          {
            label: '\\psi',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'ψ',
            detail: 'Psi',
            range: slashRange
          },
          {
            label: '\\omega',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'ω',
            detail: 'Omega',
            range: slashRange
          },
          {
            label: '\\Alpha',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Α',
            detail: 'Capital Alpha',
            range: slashRange
          },
          {
            label: '\\Beta',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Β',
            detail: 'Capital Beta',
            range: slashRange
          },
          {
            label: '\\Gamma',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Γ',
            detail: 'Capital Gamma',
            range: slashRange
          },
          {
            label: '\\Delta',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Δ',
            detail: 'Capital Delta',
            range: slashRange
          },
          {
            label: '\\Epsilon',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Ε',
            detail: 'Capital Epsilon',
            range: slashRange
          },
          {
            label: '\\Zeta',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Ζ',
            detail: 'Capital Zeta',
            range: slashRange
          },
          {
            label: '\\Eta',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Η',
            detail: 'Capital Eta',
            range: slashRange
          },
          {
            label: '\\Theta',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Θ',
            detail: 'Capital Theta',
            range: slashRange
          },
          {
            label: '\\Iota',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Ι',
            detail: 'Capital Iota',
            range: slashRange
          },
          {
            label: '\\Kappa',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Κ',
            detail: 'Capital Kappa',
            range: slashRange
          },
          {
            label: '\\Lambda',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Λ',
            detail: 'Capital Lambda',
            range: slashRange
          },
          {
            label: '\\Mu',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Μ',
            detail: 'Capital Mu',
            range: slashRange
          },
          {
            label: '\\Nu',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Ν',
            detail: 'Capital Nu',
            range: slashRange
          },
          {
            label: '\\Xi',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Ξ',
            detail: 'Capital Xi',
            range: slashRange
          },
          {
            label: '\\Omicron',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Ο',
            detail: 'Capital Omicron',
            range: slashRange
          },
          {
            label: '\\Pi',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Π',
            detail: 'Capital Pi',
            range: slashRange
          },
          {
            label: '\\Rho',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Ρ',
            detail: 'Capital Rho',
            range: slashRange
          },
          {
            label: '\\Sigma',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Σ',
            detail: 'Capital Sigma',
            range: slashRange
          },
          {
            label: '\\Tau',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Τ',
            detail: 'Capital Tau',
            range: slashRange
          },
          {
            label: '\\Upsilon',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Υ',
            detail: 'Capital Upsilon',
            range: slashRange
          },
          {
            label: '\\Phi',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Φ',
            detail: 'Capital Phi',
            range: slashRange
          },
          {
            label: '\\Chi',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Χ',
            detail: 'Capital Chi',
            range: slashRange
          },
          {
            label: '\\Psi',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Ψ',
            detail: 'Capital Psi',
            range: slashRange
          },
          {
            label: '\\Omega',
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: 'Ω',
            detail: 'Capital Omega',
            range: slashRange
          }


        ];

        return {suggestions};
      }
    });
  }

  return {setUpMonacoLanguage};
}