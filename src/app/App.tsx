import {AppProviders} from "@/app/providers/AppProviders.tsx";
import {router} from "@/app/router/router.tsx";
import {RouterProvider} from "react-router-dom";

function App() {

  return (
    <AppProviders>
      <RouterProvider router={router}></RouterProvider>
    </AppProviders>
  )
}

export default App
