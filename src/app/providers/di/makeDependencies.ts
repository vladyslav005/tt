import {AntlrParserAdapter} from "@/shared/core/adapter/AntlrParserAdapter.ts";
import {SLTLCTypeChecker} from "@/shared/core/domain/typecheck/STLCTypeChecker.ts";
import {TexMapper} from "@/shared/presentation/TexMapper.ts";


export function makeDependencies() {
  return {
    parser: new AntlrParserAdapter(),
    typeCheckerSLTC: new SLTLCTypeChecker(),
    texMapper: new TexMapper(),
  } as const;
}

export type Dependencies = ReturnType<typeof makeDependencies>;