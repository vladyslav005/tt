import {createContext, useContext} from "react";
import type {Dependencies} from "./makeDependencies.ts";


const Ctx = createContext<Dependencies | null>(null);

export const DependencyProvider = Ctx.Provider;

// eslint-disable-next-line react-refresh/only-export-components
export function useDependencies() {
  const v = useContext(Ctx);
  if (!v) throw new Error("Repositories not provided");
  return v;
}