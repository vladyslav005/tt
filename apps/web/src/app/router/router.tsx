import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainPage} from "../../pages/MainPage.tsx";
import {AppLayout} from "../layout/AppLayout.tsx";
import {NotFoundPage} from "@/pages/NotFoundPage.tsx";
import {AboutPage} from "@/pages/AboutPage.tsx";
import {ErrorPage} from "@/pages/ErrorPage.tsx";
import {DocsLayout} from "@/pages/docs/DocsLayout.tsx";
import {DocsIndexPage} from "@/pages/docs/DocsIndexPage.tsx";
import {DocsLecturePage} from "@/pages/docs/DocsLecturePage.tsx";
import {DocsRulesPage} from "@/pages/docs/DocsRulesPage.tsx";
import {DocsGrammarPage} from "@/pages/docs/DocsGrammarPage.tsx";


export const router = createBrowserRouter([
  {
    path: "/", element: <AppLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <Navigate to="/main" replace/>},
      {path: "/main", element: <MainPage/>},
      {path: "/about", element: <AboutPage/>},
      {
        path: "/docs", element: <DocsLayout/>,
        children: [
          {index: true, element: <DocsIndexPage/>},
          {path: "rules", element: <DocsRulesPage/>},
          {path: "grammar", element: <DocsGrammarPage/>},
          {path: ":slug", element: <DocsLecturePage/>},
        ],
      },

      {path: "*", element: <NotFoundPage/>},

    ]
  },

])