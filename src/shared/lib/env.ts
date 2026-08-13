import {z} from "zod";

const EnvSchema = z.object({
  // Shows the "View Raw ... Data (DEBUG)" panels (Proof Tree, Logic Tree, AST, Evaluation steps).
  // Off by default — set VITE_SHOW_DEBUG_DATA=true in .env.local to turn them on.
  VITE_SHOW_DEBUG_DATA: z.string().optional().transform((v) => v === "true"),
});


const raw = {
  VITE_SHOW_DEBUG_DATA: import.meta.env.VITE_SHOW_DEBUG_DATA,
};

export const env = EnvSchema.parse(raw);
