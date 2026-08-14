import type {ComponentType} from "react";
import {StlcBasicsLecture} from "@/features/docs/lectures/stlc-basics/StlcBasicsLecture.tsx";

// Slugs with real content; everything else falls back to DocsLecturePage's "coming soon" state.
export const LECTURE_CONTENT: Record<string, ComponentType> = {
  "stlc-basics": StlcBasicsLecture,
};
