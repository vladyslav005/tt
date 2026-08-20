import {motion} from "framer-motion";

// Faint lambda-calculus symbols drifting in the background — a small nod to
// what this app is actually about, instead of a generic decorative pattern.
// Render inside a `relative overflow-hidden` container.
const FLOATING_SYMBOLS = [
  {char: "λ", top: "15%", left: "10%", size: "text-7xl", duration: 7, delay: 0},
  {char: "∀", top: "70%", left: "8%", size: "text-6xl", duration: 8, delay: 0.5},
  {char: "→", top: "20%", left: "85%", size: "text-8xl", duration: 6.5, delay: 1},
  {char: "Γ", top: "75%", left: "88%", size: "text-6xl", duration: 9, delay: 1.5},
  {char: "⊢", top: "45%", left: "5%", size: "text-5xl", duration: 7.5, delay: 0.8},
  {char: "∃", top: "85%", left: "72%", size: "text-5xl", duration: 8.5, delay: 0.3},
] as const;

export function FloatingLambdaSymbols() {
  return (
    <>
      {FLOATING_SYMBOLS.map((s, i) => (
        <motion.span
          key={i}
          className={`absolute font-serif italic text-foreground/[0.06] select-none pointer-events-none ${s.size}`}
          style={{top: s.top, left: s.left}}
          animate={{y: [0, -18, 0]}}
          transition={{duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut"}}
        >
          {s.char}
        </motion.span>
      ))}
    </>
  );
}
