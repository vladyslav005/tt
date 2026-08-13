import Editor, {type OnChange, type OnMount, useMonaco} from '@monaco-editor/react';
import {forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState} from "react";
import {useSetUpEditor} from "@/features/editor/hooks/setUpEditor.ts";
import {useTheme} from "next-themes";
import {cn} from "@/shared/lib/utils.ts";
import {TypeCheckButton} from "@/features/editor/components/TypeCheckButton.tsx";
import { motion } from "framer-motion";
import {fadeInUp} from "@/features/error-output/components/ErrorOutput.tsx";
import {Card, CardContent, CardHeader} from "@/shared/components/ui/card.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {Maximize2, Minimize2} from "lucide-react";
import {useAppDispatch, useAppSelector} from "@/shared/hooks/reduxHooks.ts";
import {setTermText} from "@/shared/ui-state/termSlice.ts";
import {EvaluateButton} from "@/features/editor/components/EvaluateButton.tsx";
import {useTermHooks} from "@/shared/hooks/processTermHooks.ts";

export interface TextEditorProps {
  defaultValue?: string;
  value?: string; // controlled mode
  language?: string; // default "lambda"
  height?: string | number; // default "90vh"
  onChange?: OnChange;
  onMount?: OnMount;
  readOnly?: boolean;
  className?: string;
  options?: Record<string, any>;
}

export interface TextEditorHandle {
  setValue: (text: string) => void;
  getValue: () => string;
}

export const TextEditor = forwardRef<TextEditorHandle, TextEditorProps>(function TextEditor(
  {
    defaultValue = "// Write your lambda expression here a : T; (λ x : T . (x) : T -> T) a;",
    value,
    language = "lambda",
    height = "90vh",
    onChange,
    onMount,
    readOnly = false,
    className,
    options = {},
  }: TextEditorProps,
  ref,
) {
  const monaco = useMonaco();
  const { setUpMonacoLanguage } = useSetUpEditor();
  const { theme: appTheme } = useTheme();
  const [isMonacoReady, setIsMonacoReady] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef<any>(null);
  const dispatch = useAppDispatch()
  const { parseAndTypeCheck } = useTermHooks();
  const errorMarkers = useAppSelector((state) => state.term.errorMarkers);

  const monacoTheme = useMemo(() => {
    if (!appTheme) return "lambda-theme";

    if (appTheme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return isDark ? "lambda-theme-dark" : "lambda-theme";
    }
    return appTheme === "dark" ? "lambda-theme-dark" : "lambda-theme";
  }, [appTheme]);

  useEffect(() => {
    if (monaco && !isMonacoReady) {
      console.log('Monaco instance loaded - setting up language and themes');
      setUpMonacoLanguage(monaco);
      setIsMonacoReady(true);
    }
  }, [monaco, setUpMonacoLanguage, isMonacoReady]);

  const handleBeforeMount = (monaco: any) => {
    if (!isMonacoReady) {
      console.log('Setting up Monaco language and themes before mount');
      setUpMonacoLanguage(monaco);
      setIsMonacoReady(true);
    }
  };

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    console.log('Editor mounted - setting initial theme:', monacoTheme);
    monaco.editor.setTheme(monacoTheme);

    dispatch(setTermText(defaultValue))

    editor.addAction({
      id: 'type-check',
      label: 'Type Check',
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter
      ],
      precondition: 'editorTextFocus',
      run: () => {
        parseAndTypeCheck();
      }
    });

    if (onMount) {
      onMount(editor, monaco);
    }
  };

  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isFullscreen]);

  useEffect(() => {
    if (!monaco || !editorRef.current) return;
    const model = editorRef.current.getModel();
    if (!model) return;

    monaco.editor.setModelMarkers(model, "lambda-errors", errorMarkers.map((e) => ({
      startLineNumber: e.line,
      startColumn: e.column + 1,
      endLineNumber: e.line,
      endColumn: e.column + 1 + e.length,
      message: e.message,
      severity: monaco.MarkerSeverity.Error,
    })));
  }, [monaco, errorMarkers]);

  const editorOptions = useMemo(() => ({
    fontSize: 14,
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
    lineNumbers: "on" as const,
    roundedSelection: true,
    scrollBeyondLastLine: false,
    readOnly,
    minimap: {
      enabled: true,
    },
    padding: {
      top: 16,
      bottom: 16,
    },
    automaticLayout: true,
    accessibilitySupport: "off" as const,
    ...options,
  }), [readOnly, options]);

  useImperativeHandle(ref, () => ({
    setValue: (text: string) => {
      const editor = editorRef.current;
      if (editor) {
        editor.setValue(text);
      }
      dispatch(setTermText(text));
    },
    getValue: () => {
      const editor = editorRef.current;
      return editor ? editor.getValue() : (value ?? defaultValue);
    },
  }), [defaultValue, dispatch, value]);

  return (
    <motion.div
      className={cn(className)}
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <Card
        className={cn(
          "relative shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col",
          isFullscreen && "fixed inset-0 z-50 m-0 rounded-none border-0 shadow-none max-h-none",
        )}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 flex-nowrap overflow-x-auto min-w-0 flex-1">
              <TypeCheckButton />
              <EvaluateButton />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen((v) => !v)}
              title={isFullscreen ? "Exit full screen" : "Full screen"}
              aria-label={isFullscreen ? "Exit full screen" : "Full screen"}
              className="shrink-0"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className={cn("p-0 flex-1 min-h-0")}>
          <div className={cn(
            "relative h-full  rounded-b-md overflow-hidden border",
            isFullscreen && "rounded-none border-0",
          )}>
            <Editor
              height={isFullscreen ? "100%" : height}
              theme={monacoTheme}
              defaultValue={defaultValue}
              value={value}
              defaultLanguage={language}
              language={language}
              onChange={onChange}
              beforeMount={handleBeforeMount}
              onMount={handleEditorMount}
              options={editorOptions}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});
