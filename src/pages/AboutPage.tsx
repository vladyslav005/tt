import {motion} from "framer-motion";
import {
  CheckCircle2,
  FileCode,
  Layers,
  Network,
  Play,
  Sparkles,
  Terminal,
  GitBranch,
  Workflow,
  Braces,
} from "lucide-react";
import {Button} from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

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

export function AboutPage() {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-background to-muted/40">
      {/* Hero Section */}
      <motion.section
        className="container mx-auto px-4 py-16 md:py-24 max-w-4xl text-center"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          About This Project
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
          An interactive environment for experimenting with typed lambda calculus.
          It supports parsing, AST inspection/editing, type checking and inference,
          and proof tree visualization.
        </p>
        <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Built as a Master Thesis project, the goal is to make the underlying
          theory explorable: you can see the syntax tree, derived types, and the
          proof steps that justify them.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <Button size="lg" className="rounded-2xl shadow-lg" disabled>
            <FileCode className="mr-2 h-5 w-5" />
            Documentation (soon)
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="rounded-2xl shadow-lg"
            onClick={() => window.open("https://tt-woad.vercel.app/", "_blank")}
          >
            <Workflow className="mr-2 h-5 w-5" />
            Live demo
          </Button>
        </div>
      </motion.section>

      {/* Project Overview Section */}
      <motion.section
        className="container mx-auto px-4 py-8 max-w-6xl"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 0.2, duration: 0.5}}
      >
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-3xl">What This Project Does</CardTitle>
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
                    "Reduces lambda terms and helps you study operational behavior alongside typing.",
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

      {/* Architecture Section */}
      <motion.section
        className="container mx-auto px-4 py-12 max-w-6xl"
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 0.4, duration: 0.5}}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Architecture</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-xl">Processing Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {step: "Parser", desc: "ANTLR-based lexer & parser"},
                  {step: "AST", desc: "Abstract syntax tree construction"},
                  {
                    step: "Type Checker",
                    desc: "STLC rules & inference engine",
                  },
                  {step: "Proof Tree", desc: "Derivation tree generation"},
                  {step: "UI", desc: "Interactive visualization layer"},
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 group cursor-default"
                  >
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{item.step}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-muted/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Terminal className="h-5 w-5"/>
                Code Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-background/60 backdrop-blur rounded-xl p-4 border font-mono text-sm space-y-2">
                <div className="text-muted-foreground">
                  <span className="text-primary">λx</span>.{" "}
                  <span className="text-primary">λy</span>.{" "}
                  <span className="text-foreground">x y</span>
                </div>
                <div className="text-xs text-muted-foreground pt-2 border-t">
                  → Type: (α → β) → α → β
                </div>
                <div className="text-xs text-muted-foreground pt-2 mt-3 border-t space-y-1">
                  <div>✓ Parse successful</div>
                  <div>✓ Type check passed</div>
                  <div>✓ Proof tree generated</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Technology Stack Section */}
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
              title: "Math & zoom tooling",
              description:
                "Math rendering and pan/zoom utilities for proof tree exploration.",
            },
            {
              icon: "🧱",
              title: "ESLint",
              description:
                "Static analysis and consistency checks during development.",
            },
            {
              icon: "{}",
              title: "Domain-driven core",
              description:
                "A shared core layer for AST/domain types, visitors, and presentation mappers.",
            },
            {
              icon: "🧬",
              title: "Typed trees",
              description:
                "Visitors and mappers for AST → Flow nodes, proof trees, and pretty-printing.",
            },
            {
              icon: "🔣",
              title: "LaTeX-like proof rendering",
              description:
                "Proof trees can be rendered as structured layouts suitable for academic output.",
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
                    {tech.title === "Domain-driven core" && (
                      <Braces className="h-4 w-4 text-muted-foreground" />
                    )}
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
    </div>
  );
}

