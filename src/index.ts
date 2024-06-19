import usePrivateCTA from './internal/usePrivateCTA';
import usePublicCTA from './internal/usePublicCTA';

import type { CTAInitial, } from './types/CTAInitial';
import type { UseCTAParameterActionsRecordProp, } from './types/UseCTAParameterActionsRecordProp';
import type { UseCTAParameter, } from './types/UseCTAParameter';
import type { UseCTAReturnType, } from './types/UseCTAReturnType';

export function useCTA<
	Initial extends CTAInitial,
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined,
>(
	useCTAParameter: UseCTAParameter<Initial, Actions>,
): UseCTAReturnType<Initial, Actions> {
	const stateDispatcher = usePrivateCTA( useCTAParameter, );
	return usePublicCTA( {
		actions: useCTAParameter.actions,
		stateDispatcher,
	}, );
}

export function returnActionsType<
	Initial extends CTAInitial,
	Actions extends UseCTAParameterActionsRecordProp<Initial>,
>( initial: Initial, actions: Actions, ) {
	return actions;
}

export { createCTAContext, } from './internal/createCTAContext';

export type { CTAInitial, } from './types/CTAInitial';

export type { UseCTAParameter, } from './types/UseCTAParameter';

export type { UseCTAReturnType, } from './types/UseCTAReturnType';

export type { UseCTAReturnTypeDispatch, } from './types/UseCTAReturnTypeDispatch';

export type { CustomCTAStateParam, } from './types/CustomCTAStateParam';

export type { CTAStateParam, } from './types/CTAStateParam';

export type { CustomCTAReturnType, } from './types/CustomCTAReturnType';
