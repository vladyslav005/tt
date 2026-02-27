import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainPage} from "../../pages/MainPage.tsx";
import {AppLayout} from "../layout/AppLayout.tsx";
import {NotFoundPage} from "@/pages/NotFoundPage.tsx";



export const router = createBrowserRouter([
  {
    path: "/", element: <AppLayout/>,
    children: [
      // default index: redirect to analytics
      { index: true, element: <Navigate to="/main" replace /> },
      { path: "/main", element: <MainPage/> },

      { path: "*", element: <NotFoundPage /> },

    ]
  },

])