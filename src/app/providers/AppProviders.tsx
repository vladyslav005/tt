import {type ReactNode, useMemo} from "react";
import {Provider as ReduxProvider} from "react-redux";
import {store} from "./store";
import {DependencyProvider} from "./di/DependencyProvider.tsx";
import {makeDependencies} from "./di/makeDependencies.ts";
import {Toaster} from "@/shared/components/ui/sonner.tsx";


export function AppProviders({children}: { children: ReactNode }) {


  const repos = useMemo(() => (makeDependencies()), []);

  return (
    <ReduxProvider store={store}>
      <DependencyProvider value={repos}>
          {children}
          <Toaster/>
          {/*<ReactQueryDevtools initialIsOpen={false}/>*/}
      </DependencyProvider>
    </ReduxProvider>
  );
}