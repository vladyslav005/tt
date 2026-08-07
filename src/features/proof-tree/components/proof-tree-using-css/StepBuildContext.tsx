import {createContext, useContext, type ReactNode} from "react";
import type {TexTree} from "@/shared/presentation/tex/texTree.ts";

interface StepBuildValue {
  enabled: boolean;
  isRevealed: (node: TexTree) => boolean;
}

const StepBuildContext = createContext<StepBuildValue | null>(null);

const DISABLED: StepBuildValue = {enabled: false, isRevealed: () => true};

export function StepBuildProvider({value, children}: {value: StepBuildValue; children: ReactNode}) {
  return (
    <StepBuildContext.Provider value={value}>
      {children}
    </StepBuildContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStepBuild(): StepBuildValue {
  return useContext(StepBuildContext) ?? DISABLED;
}
