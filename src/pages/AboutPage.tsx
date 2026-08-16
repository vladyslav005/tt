import {motion} from "framer-motion";
import {
  CheckCircle2,
  ClipboardCheck,
  FileCode,
  FileDown,
  Layers,
  Network,
  Play,
  Scale,
  Shapes,
  Sparkles,
  GitBranch,
} from "lucide-react";
import {Button} from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {FloatingLambdaSymbols} from "@/shared/components/FloatingLambdaSymbols.tsx";

const fadeInUp = {
  initial: {opacity: 0, y: 20},
  animate: {opacity: 1, y: 0},
  transition: {duration: 0.5},
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Flip to true to bring the Technology Stack section back.
const SHOW_TECH_STACK = false;

export function AboutPage() {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-background to-muted/40">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <FloatingLambdaSymbols />

        <motion.section
          className="container mx-auto px-4 py-16 md:py-24 max-w-4xl text-center"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            About This Project
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            An interactive environment for experimenting with typed lambda calculus.
            It supports parsing, AST inspection/editing, type checking and inference,
            proof tree visualization, and building your own derivations by hand.
          </p>
          <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Built as a Master Thesis project, the goal is to make the underlying
            theory explorable: you can see the syntax tree, derived types, and the
            proof steps that justify them.
          </p>
          <div className="flex items-center justify-center">
            <Button size="lg" className="rounded-2xl shadow-lg" disabled>
              <FileCode className="mr-2 h-5 w-5" />
              Read the Thesis (coming soon)
            </Button>
          </div>
        </motion.section>
      </div>

      {/* Project Overview Section */}
      <motion.section
        className="container mx-auto px-4 py-8 pb-20 max-w-6xl"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 0.2, duration: 0.5}}
      >
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl">What This Project Does</CardTitle>
            <CardDescription className="text-base">
              A type theory playground for learning, debugging, and research
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              className="grid gap-6 md:grid-cols-2"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                {
                  icon: CheckCircle2,
                  title: "Type checking (STLC)",
                  description:
                    "Checks expressions using Simply Typed Lambda Calculus rules and produces structured errors.",
                },
                {
                  icon: Sparkles,
                  title: "Type inference (HM)",
                  description:
                    "Infers principal types where possible, so you can experiment without annotations.",
                },
                {
                  icon: Play,
                  title: "Evaluation",
                  description:
                    "Reduces lambda terms under normal-order, call-by-value, or call-by-name strategies, with a step-by-step viewer and Γ bindings panel.",
                },
                {
                  icon: Network,
                  title: "Proof tree visualization",
                  description:
                    "Shows derivation trees step-by-step, making typing rules and contexts explicit.",
                },
                {
                  icon: Layers,
                  title: "AST views & editing",
                  description:
                    "Inspect and (optionally) edit the AST in a structured form to avoid syntax errors.",
                },
                {
                  icon: GitBranch,
                  title: "Multiple synchronized representations",
                  description:
                    "Text/AST/proof views are designed to represent the same underlying term.",
                },
                {
                  icon: ClipboardCheck,
                  title: "Build & Check exercises",
                  description:
                    "Construct a typing derivation yourself, rule by rule, and check it against the real answer with mistake highlighting.",
                },
                {
                  icon: Shapes,
                  title: "Extended type theories",
                  description:
                    "Toggle let-polymorphism, iso-recursive types, System F, System Fω, and dependent types (λP) on top of base STLC.",
                },
                {
                  icon: Scale,
                  title: "Curry–Howard / logic view",
                  description:
                    "Re-renders an STLC typing derivation as a natural-deduction proof, with implication, conjunction, and disjunction rules.",
                },
                {
                  icon: FileDown,
                  title: "LaTeX / ebproof export",
                  description:
                    "Preview, copy, or download any proof tree as a ready-to-compile ebproof LaTeX document, matching what's on screen.",
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="flex gap-4 p-6 rounded-2xl hover:bg-muted/50 transition-all duration-300 group"
                  variants={fadeInUp}
                >
                  <div className="flex-shrink-0">
                    <div className="p-3 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors duration-300">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Technology Stack Section */}
      {SHOW_TECH_STACK && (
      <motion.section
        className="container mx-auto px-4 py-12 pb-20 max-w-6xl"
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.6, duration: 0.5}}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Technology Stack</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "⚛️",
              title: "React 19",
              description:
                "Modern UI with hooks, concurrent rendering, and component-driven architecture.",
            },
            {
              icon: "⚡",
              title: "Vite",
              description:
                "Fast dev server and optimized production builds.",
            },
            {
              icon: "📘",
              title: "TypeScript",
              description:
                "Type-safe codebase with strong editor tooling and refactoring support.",
            },
            {
              icon: "🧠",
              title: "Redux Toolkit",
              description:
                "Predictable state management for editor, AST, and proof-related UI state.",
            },
            {
              icon: "🧩",
              title: "shadcn/ui + Radix UI",
              description:
                "Accessible UI primitives and consistent design system components.",
            },
            {
              icon: "🎨",
              title: "Tailwind CSS",
              description:
                "Utility-first styling with theming support and small bundle footprint.",
            },
            {
              icon: "🗺️",
              title: "React Flow (@xyflow/react)",
              description:
                "Graph-based visualization used for interactive AST layout and editing.",
            },
            {
              icon: "📝",
              title: "Monaco Editor",
              description:
                "Code editor experience for textual lambda calculus input.",
            },
            {
              icon: "🔧",
              title: "ANTLR4",
              description:
                "Lexer/parser generation for the term language and AST construction.",
            },
            {
              icon: "🧪",
              title: "Zod",
              description:
                "Schema validation for safer runtime boundaries and structured data.",
            },
            {
              icon: "✨",
              title: "Framer Motion",
              description:
                "Animations and transitions for a smoother exploratory experience.",
            },
            {
              icon: "📐",
              title: "Dagre",
              description:
                "Automatic graph layout for cleaner AST and derivation visualizations.",
            },
            {
              icon: "🔍",
              title: "MathJax",
              description:
                "Renders judgements and typing rules as real math in the browser.",
            },
            {
              icon: "🖐️",
              title: "react-zoom-pan-pinch",
              description:
                "Pan/zoom for exploring large proof trees and AST graphs.",
            },
            {
              icon: "🧱",
              title: "ESLint",
              description:
                "Static analysis and consistency checks during development.",
            },
          ].map((tech, idx) => (
            <motion.div
              key={idx}
              initial={{opacity: 0, scale: 0.9}}
              animate={{opacity: 1, scale: 1}}
              transition={{delay: 0.7 + idx * 0.05, duration: 0.25}}
            >
              <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-default">
                <CardHeader>
                  <div className="text-4xl mb-2">{tech.icon}</div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {tech.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tech.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
      )}
    </div>
  );
}

