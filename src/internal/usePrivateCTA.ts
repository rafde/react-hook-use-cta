import { useMemo, useReducer, } from 'react';
import { compareCallback, } from './compareCallback';

import ctaReducer, { CTAReducerState, } from './ctaReducer';

import type { CTAState, } from '../types/CTAState';
import type { UseCTAParameter, } from '../types/UseCTAParameter';

function _init<
	Initial extends CTAState,
	Actions,
>(
	privateCTAState: CTAReducerState<Initial>,
	init?: UseCTAParameter<Initial, Actions>['onInit'],
): CTAReducerState<Initial> {
	const changesMap = new Map() as CTAReducerState<Initial>['changesMap'];
	if ( typeof init !== 'function' ) {
		return {
			...privateCTAState,
			changesMap,
		};
	}

	const initial = init( privateCTAState.current, );
	return {
		...privateCTAState,
		changesMap,
		current: initial,
		initial,
	};
}

export default function usePrivateCTA<
	Initial extends CTAState,
	Actions,
>(
	params: UseCTAParameter<Initial, Actions>,
	actions?: UseCTAParameter<Initial, Actions>['actions'],
) {
	const compare = useMemo(
		() => compareCallback( params.compare, ),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
		],
	);
	return useReducer(
		function reducerCallback(
			ctaReducerState: CTAReducerState<Initial>,
			nextCTAProps: Parameters<typeof ctaReducer<Initial, Actions>>[0]['nextCTAProps'],
		) {
			return ctaReducer( {
				ctaReducerState,
				actions,
				nextCTAProps,
				compare,
			}, );
		},
		{
			changes: null,
			// Set changesMap in init to avoid re-instantiating a new Map everytime this is called
			changesMap: undefined as unknown as CTAReducerState<Initial>['changesMap'],
			current: params.initial,
			initial: params.initial,
			previous: null,
			previousInitial: null,
		},
		function _onInit( privateCTAState: CTAReducerState<Initial>, ) {
			return _init<Initial, Actions>( privateCTAState, params.onInit, );
		},
	);
}

export type UsePrivateCTAReturnType<
	Initial extends CTAState,
	Actions,
> = ReturnType<typeof usePrivateCTA<Initial, Actions>>;
