import {type ReactNode, useMemo} from "react";
import {Provider as ReduxProvider} from "react-redux";
import {store} from "./store";
import {DependencyProvider} from "./di/DependencyProvider.tsx";
import {makeDependencies} from "./di/makeDependencies.ts";
import {Toaster} from "@/shared/components/ui/sonner.tsx";
import {ThemeProvider} from "next-themes";
import {MathJaxContext} from "better-react-mathjax";


export function AppProviders({children}: { children: ReactNode }) {


  const repos = useMemo(() => (makeDependencies()), []);

  return (
    <ReduxProvider store={store}>
      <DependencyProvider value={repos}>
        <ThemeProvider attribute="class" defaultTheme="system" storageKey="theme" enableSystem>
          <MathJaxContext>
            {children}
            <Toaster/>
          </MathJaxContext>
        </ThemeProvider>
      </DependencyProvider>
    </ReduxProvider>
  );
}