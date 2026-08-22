import {useEffect} from "react";
import {useLocation} from "react-router-dom";

export const SITE_URL = "https://type-theory.dev";

export const DEFAULT_META_DESCRIPTION =
  "Write lambda calculus terms and interactively explore parsing, type checking, evaluation, and the " +
  "Curry–Howard correspondence — with AST, proof tree, and evaluation visualizations, plus guided " +
  "lectures on type theory.";

const STRUCTURED_DATA_ID = "page-structured-data";

// This is a single-page-app with one index.html, so without this every route would share
// the same <title>/description/canonical — set them per page here instead. `structuredData`
// is optional JSON-LD (e.g. a TechArticle for a lecture) rendered into its own <script> tag,
// separate from the site-wide WebSite/SoftwareApplication block that's static in index.html.
export function usePageMeta(
  title: string,
  description: string = DEFAULT_META_DESCRIPTION,
  structuredData?: Record<string, unknown>,
) {
  const {pathname} = useLocation();

  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${SITE_URL}${pathname}`;

    let script = document.getElementById(STRUCTURED_DATA_ID) as HTMLScriptElement | null;
    if (structuredData) {
      if (!script) {
        script = document.createElement("script");
        script.id = STRUCTURED_DATA_ID;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    } else {
      script?.remove();
    }
  }, [title, description, pathname, structuredData]);
}
