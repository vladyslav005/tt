import Editor, { useMonaco, type OnMount, type OnChange } from '@monaco-editor/react';
import { useEffect, useMemo, useRef, useState } from "react";
import { useSetUpEditor } from "@/features/editor/hooks/setUpEditor.ts";
import {useTheme} from "next-themes";
import {cn} from "@/shared/lib/utils.ts";
import {TypeCheckButton} from "@/features/editor/components/TypeCheckButton.tsx";

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
  const { setUpMonacoLanguage } = useSetUpEditor();
  const { theme: appTheme } = useTheme();
  const [isMonacoReady, setIsMonacoReady] = useState(false);
  const editorRef = useRef<any>(null);

  // Determine the Monaco theme based on app theme
  const monacoTheme = useMemo(() => {
    if (!appTheme) return "lambda-theme"; // Default to light if theme not ready

    if (appTheme === "system") {
      // Check system preference
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return isDark ? "lambda-theme-dark" : "lambda-theme";
    }
    return appTheme === "dark" ? "lambda-theme-dark" : "lambda-theme";
  }, [appTheme]);

  // Set up Monaco language and themes
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
    <div className={cn(className, "relative dark:bg-slate-950 border rounded-lg shadow-md")}>
      <TypeCheckButton></TypeCheckButton>
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
  );
}
