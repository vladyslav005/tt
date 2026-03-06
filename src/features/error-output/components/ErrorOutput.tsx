import {cn} from "@/shared/lib/utils.ts";
import {useAppSelector} from "@/shared/hooks/reduxHooks.ts";

export interface ErrorOutputProps {
  className?: string;
}

export function ErrorOutput({
  className
} : ErrorOutputProps) {

  const errors = useAppSelector((state) => state.term.processingErrors);


  return (
    <div className={cn(className, "border rounded-lg shadow-md p-4 m-4")}>
      <h2 className="text-xl font-bold mb-4">Errors</h2>
      {errors && errors.length === 0 ? (
        <p className="text-green-500">No errors found.</p>
      ) : (
        <ul className="list-disc list-inside text-red-500">
          {errors && errors.map((error, index) => (
            <li key={index}>{error.message}</li>
          ))}
        </ul>
      )}
    </div>
  )
}