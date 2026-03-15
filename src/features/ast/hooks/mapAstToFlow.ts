import { useDependencies } from "@/app/providers/di/DependencyProvider";
import {useAppSelector} from "@/shared/hooks/reduxHooks.ts";
import type {AstFlowGraph} from "@/shared/presentation/flow/types.ts";
import type {Program} from "@/shared/core/domain/ast";

export function useMapAstToFlow() {
    const { flowMapper } = useDependencies();
    const ast = useAppSelector(state => state.term.ast);


    function mapAstToFlow(paramAst?: Program) {
      if (!paramAst) {
        paramAst = ast
      }

      if (!paramAst) return {} as AstFlowGraph;

      console.warn("Mapping AST to flow graph...", paramAst);

      const graph = flowMapper.map(paramAst)

      console.warn("Mapped graph:", graph);

      return graph;
    }

    return {
        mapAstToFlow
    };
}