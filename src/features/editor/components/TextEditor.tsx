import Editor, {type OnChange, type OnMount, useMonaco} from '@monaco-editor/react';
import {useEffect, useMemo, useRef, useState} from "react";
import {useSetUpEditor} from "@/features/editor/hooks/setUpEditor.ts";
import {useTheme} from "next-themes";
import {cn} from "@/shared/lib/utils.ts";
import {TypeCheckButton} from "@/features/editor/components/TypeCheckButton.tsx";
import {useTermHooks} from "@/shared/hooks/processTermHooks.ts";
import { motion } from "framer-motion";
import {fadeInUp} from "@/features/error-output/components/ErrorOutput.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/components/ui/card.tsx";
import {Terminal} from "lucide-react";

export interface TextEditorProps {
  /**
   * The default value of the editor
   */
  defaultValue?: string;
  /**
   * The value of the editor (controlled mode)
   */
  value?: string;
  /**
   * The language of the editor
   * @default "lambda"
   */
  language?: string;
  /**
   * The height of the editor
   * @default "90vh"
   */
  height?: string | number;
  /**
   * Callback when the editor value changes
   */
  onChange?: OnChange;
  /**
   * Callback when the editor is mounted
   */
  onMount?: OnMount;
  /**
   * Whether the editor is read-only
   * @default false
   */
  readOnly?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Additional editor options
   */
  options?: Record<string, any>;
}

export function TextEditor({
                             defaultValue = "// Write your lambda expression here",
                             value,
                             language = "lambda",
                             height = "90vh",
                             onChange,
                             onMount,
                             readOnly = false,
                             className,
                             options = {},
                           }: TextEditorProps) {
  const monaco = useMonaco();
  const { parseAndTypeCheck } = useTermHooks();
  const { setUpMonacoLanguage } = useSetUpEditor();
  const { theme: appTheme } = useTheme();
  const [isMonacoReady, setIsMonacoReady] = useState(false);
  const editorRef = useRef<any>(null);

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

  // Handle before editor mount - set up themes before first render
  const handleBeforeMount = (monaco: any) => {
    if (!isMonacoReady) {
      console.log('Setting up Monaco language and themes before mount');
      setUpMonacoLanguage(monaco);
      setIsMonacoReady(true);
    }
  };

  // Handle editor mount
  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Set the theme immediately after mount
    console.log('Editor mounted - setting initial theme:', monacoTheme);
    monaco.editor.setTheme(monacoTheme);

    editor.addAction({
      id: 'my-unique-id',
      label: 'My Custom Action',
      keybindings: [
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter
      ],
      precondition: 'editorTextFocus',
      run: () => {
        const currentValue = editor.getValue();
        parseAndTypeCheck(currentValue);
      }
    });

    // Call user's onMount callback if provided
    if (onMount) {
      onMount(editor, monaco);
    }
  };

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
    ...options,
  }), [readOnly, options]);

  return (
    <motion.div
      className={cn(className)}
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-500">
              <Terminal className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-2xl">Lambda Expression Editor</CardTitle>
              <CardDescription>
                Write and test your lambda calculus expressions
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative rounded-xl overflow-hidden border">
            <TypeCheckButton />
            <Editor
              height={height}
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
}
