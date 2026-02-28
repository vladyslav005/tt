import {useAppSelector} from "@/shared/hooks/reduxHooks.ts";
import {cn} from "@/shared/lib/utils.ts";

export interface AstVisualisationProps {
  className?: string;
}

export function AstVisualisation({
  className
}: AstVisualisationProps ) {

  const ast = useAppSelector( (state) => state.term.ast);

  // const [proof, setProof] = useState<ProofTree>()
  // const  { parseTerm, typecheckTerm } = useTermHooks()

  // useEffect(() => {
  //   // setProof(typecheckTerm(parseTerm(termText ?? "")))
  // })

  return (
    <div className={cn(className, "border rounded-lg shadow-md p-4 m-4")}>
      <pre>
        {JSON.stringify(ast, null, 2)}
      </pre>
    </div>
  )

}