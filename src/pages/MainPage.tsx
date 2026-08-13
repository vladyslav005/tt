import {useAppDispatch, useAppSelector} from "@/shared/hooks/reduxHooks.ts";
import {exitBuildMode} from "@/shared/ui-state/termSlice.ts";
import {Button} from "@/shared/components/ui/button.tsx";
import {WorkspaceLayout} from "@/features/workspace/components/WorkspaceLayout.tsx";

export function MainPage() {

  const dispatch = useAppDispatch();
  const buildModeActive = useAppSelector((state) => state.term.buildMode.active);
  const termText = useAppSelector((state) => state.term.termText);

  // TODO : FORWARD PARSE ERRORS
  return (
    <div className="mt-[4rem] flex flex-col h-[calc(100dvh-4rem)]">
      {/*<div className=" shrink-0"></div>*/}

      {buildModeActive && (
        <div className="mx-4 mb-4 p-3 rounded-xl border bg-amber-500/10 border-amber-500/30 flex items-center justify-between gap-3 shrink-0">
          <p className="text-sm">
            Building proof for: <code className="font-mono">{termText}</code>
          </p>
          <Button size="sm" variant="outline" onClick={() => dispatch(exitBuildMode())}>Edit term</Button>
        </div>
      )}

      <WorkspaceLayout className="flex-1 min-h-0 px-4 pb-4"/>
    </div>
  )
}