import { motion } from "framer-motion";
import {
  CheckCircle2,
  FileCode,
  Layers,
  Network,
  Play,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
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
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          A Master Thesis project exploring advanced type systems, Simply Typed
          Lambda Calculus, Hindley–Milner type inference, and interactive proof
          tree visualization for academic and research purposes.
        </p>
        <Button size="lg" className="rounded-2xl shadow-lg">
          <FileCode className="mr-2 h-5 w-5" />
          View Documentation
        </Button>
      </motion.section>

      {/* Project Overview Section */}
      <motion.section
        className="container mx-auto px-4 py-8 max-w-6xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-3xl">What This Project Does</CardTitle>
            <CardDescription className="text-base">
              A comprehensive type theory toolkit for learning and research
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
                  title: "Type Checking (STLC)",
                  description:
                    "Validates expressions using Simply Typed Lambda Calculus rules with full correctness guarantees.",
                },
                {
                  icon: Sparkles,
                  title: "Type Inference (Hindley–Milner)",
                  description:
                    "Automatically infers the most general type for lambda expressions without annotations.",
                },
                {
                  icon: Play,
                  title: "Expression Evaluation",
                  description:
                    "Executes lambda expressions and reduces them to normal form using standard reduction strategies.",
                },
                {
                  icon: Network,
                  title: "Proof Tree Generation",
                  description:
                    "Visualizes derivation trees showing each step of the type checking process.",
                },
                {
                  icon: Layers,
                  title: "AST Visualization",
                  description:
                    "Interactive abstract syntax tree representation for debugging and learning.",
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
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
                  { step: "Parser", desc: "ANTLR-based lexer & parser" },
                  { step: "AST", desc: "Abstract syntax tree construction" },
                  {
                    step: "Type Checker",
                    desc: "STLC rules & inference engine",
                  },
                  { step: "Proof Tree", desc: "Derivation tree generation" },
                  { step: "UI", desc: "Interactive visualization layer" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 group cursor-default"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
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
                <Terminal className="h-5 w-5" />
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">
          Technology Stack
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "⚛️",
              title: "React",
              description: "Modern UI library with hooks and concurrent features",
            },
            {
              icon: "📘",
              title: "TypeScript",
              description: "Type-safe JavaScript with advanced type inference",
            },
            {
              icon: "🎨",
              title: "Tailwind CSS",
              description: "Utility-first CSS framework for rapid UI development",
            },
            {
              icon: "🧩",
              title: "shadcn/ui",
              description: "Beautiful, accessible component library built on Radix",
            },
            {
              icon: "✨",
              title: "Framer Motion",
              description: "Production-ready animation library for React",
            },
            {
              icon: "🔧",
              title: "ANTLR",
              description: "Powerful parser generator for language processing",
            },
          ].map((tech, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + idx * 0.1, duration: 0.3 }}
            >
              <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-default">
                <CardHeader>
                  <div className="text-4xl mb-2">{tech.icon}</div>
                  <CardTitle className="text-lg">{tech.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {tech.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

    </div>
  );
}

