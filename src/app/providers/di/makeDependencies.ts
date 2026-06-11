import {AntlrParserAdapter} from "@/shared/core/adapter/AntlrParserAdapter.ts";
import {SLTLCTypeChecker} from "@/shared/core/domain/typecheck/STLCTypeChecker.ts";
import {TexMapper} from "@/shared/presentation/tex/TexMapper.ts";
import {AstFlowMapper} from "@/shared/presentation/flow/FlowMapper.ts";
import {Evaluator} from "@/shared/core/domain/evaluation/Evaluator.ts";


export function makeDependencies() {
  return {
    parser: new AntlrParserAdapter(),
    typeCheckerSLTC: new SLTLCTypeChecker(),
    evaluator: new Evaluator(),
    texMapper: new TexMapper(),
    flowMapper: new AstFlowMapper()
  } as const;
}

export type Dependencies = ReturnType<typeof makeDependencies>;