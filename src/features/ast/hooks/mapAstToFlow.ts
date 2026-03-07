import { useDependencies } from "@/app/providers/di/DependencyProvider";
import {useAppSelector} from "@/shared/hooks/reduxHooks.ts";
import type {AstFlowGraph} from "@/shared/presentation/flow/types.ts";

export function useMapAstToFlow() {
    const { flowMapper } = useDependencies();
    const ast = useAppSelector(state => state.term.ast);


    function mapAstToFlow() {
      if (!ast) return {} as AstFlowGraph;


      console.warn("Mapping AST to flow graph...", ast);
      return flowMapper.map(ast);
    }

    return {
        mapAstToFlow
    };
}