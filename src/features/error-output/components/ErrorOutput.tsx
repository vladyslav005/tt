import {cn} from "@/shared/lib/utils.ts";
import {useAppSelector} from "@/shared/hooks/reduxHooks.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/components/ui/card.tsx";
import {motion} from "framer-motion";
import {AlertCircle, CheckCircle2} from "lucide-react";

export interface ErrorOutputProps {
  className?: string;
}

export const fadeInUp = {
  initial: {opacity: 0, y: 10},
  animate: {opacity: 1, y: 0},
  transition: {duration: 0.3},
};

export function ErrorOutput({
  className
} : ErrorOutputProps) {

  const errors = useAppSelector((state) => state.term.processingErrors);
  const hasErrors = errors && errors.length > 0;

  return (
    <motion.div
      className={cn(className)}
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-xl",
              hasErrors
                ? "bg-destructive/10 text-destructive"
                : "bg-green-500/10 text-green-600 dark:text-green-500"
            )}>
              {hasErrors ? (
                <AlertCircle className="h-5 w-5" />
              ) : (
                <CheckCircle2 className="h-5 w-5" />
              )}
            </div>
            <div>
              <CardTitle className="text-2xl">
                {hasErrors ? "Errors" : "Status"}
              </CardTitle>
              <CardDescription>
                {hasErrors
                  ? `Found ${errors.length} error${errors.length !== 1 ? 's' : ''}`
                  : "No errors detected"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {hasErrors ? (
            <div className="space-y-3">
              {errors.map((error, index) => (
                <motion.div
                  key={index}
                  initial={{opacity: 0, x: -10}}
                  animate={{opacity: 1, x: 0}}
                  transition={{delay: index * 0.05, duration: 0.3}}
                  className="flex gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/20 hover:bg-destructive/10 transition-colors duration-200"
                >
                  <div className="shrink-0 mt-0.5">
                    <div className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center text-destructive text-xs font-semibold">
                      {index + 1}
                    </div>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed flex-1">
                    {error.message}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center rounded-xl bg-green-500/5 border border-green-500/20">
              <p className="text-sm text-muted-foreground">
                All expressions are valid. No errors to display.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}