import {useRef} from "react";
import {
  DockviewDefaultTab,
  DockviewReact,
  themeDark,
  themeLight,
  type DockviewReadyEvent,
  type IDockviewPanelHeaderProps,
} from "dockview-react";
import {useTheme} from "next-themes";
import type {TextEditorHandle} from "@/features/editor/components/TextEditor.tsx";
import {
  AstPanel,
  EditorPanel,
  type EditorPanelParams,
  ErrorOutputPanel,
  EvaluationPanel,
  ProofTreePanel,
} from "@/features/workspace/components/panels.tsx";

const components = {
  editor: EditorPanel,
  errorOutput: ErrorOutputPanel,
  evaluation: EvaluationPanel,
  proofTree: ProofTreePanel,
  ast: AstPanel,
};

// No panel-add UI exists yet, so a closed panel would be unrecoverable — hide the close button until one does.
function WorkspaceTab(props: IDockviewPanelHeaderProps) {
  return <DockviewDefaultTab {...props} hideClose/>;
}

export interface WorkspaceLayoutProps {
  className?: string;
}

export function WorkspaceLayout({className}: WorkspaceLayoutProps) {
  const editorRef = useRef<TextEditorHandle>(null);
  const {resolvedTheme} = useTheme();

  const handleReady = (event: DockviewReadyEvent) => {
    const api = event.api;
    const editorParams: EditorPanelParams = {editorRef};

    api.addPanel({id: "editor", component: "editor", title: "Editor", params: editorParams});
    api.addPanel({
      id: "errorOutput",
      component: "errorOutput",
      title: "Errors",
      position: {referencePanel: "editor", direction: "right"},
    });
    // Tabs, not stacked splits — each result panel gets the full pane height when selected
    // instead of a quarter-height sliver, and the right side only shows one header bar.
    api.addPanel({
      id: "evaluation",
      component: "evaluation",
      title: "Evaluation",
      position: {referencePanel: "errorOutput", direction: "within"},
    });
    api.addPanel({
      id: "proofTree",
      component: "proofTree",
      title: "Proof Tree",
      position: {referencePanel: "errorOutput", direction: "within"},
    });
    api.addPanel({
      id: "ast",
      component: "ast",
      title: "AST",
      params: editorParams,
      position: {referencePanel: "errorOutput", direction: "within"},
    });

    api.getPanel("errorOutput")?.api.setActive();
  };

  return (
    <div className={className}>
      <DockviewReact
        components={components}
        defaultTabComponent={WorkspaceTab}
        onReady={handleReady}
        theme={resolvedTheme === "dark" ? themeDark : themeLight}
      />
    </div>
  );
}
