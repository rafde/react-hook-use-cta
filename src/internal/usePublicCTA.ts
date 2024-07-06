import { useMemo, } from 'react';

import type { CTAInitial, } from '../types/CTAInitial';
import { DefaultActionsRecord, } from '../types/DefaultActionsRecord';
import type { UseCTAParameter, } from '../types/UseCTAParameter';
import type { UseCTAReturnType, } from '../types/UseCTAReturnType';
import type { DispatchDefaultCTARecord, DispatchCTA, } from '../types/UseCTAReturnTypeDispatch';
import type { UsePrivateCTADispatcher, UsePrivateCTAReturnType, } from './usePrivateCTA';

function mergeCustomCTAWithDefaultCTA<
	Initial extends CTAInitial,
	Actions,
	Dispatch,
>(
	dispatch: Dispatch,
	defaultCTARecord: DispatchDefaultCTARecord<Initial, Actions>,
	ctaRecord?: UseCTAParameter<Initial, Actions>['actions'],
) {
	let hasCustomAction = false;
	const customActions = {} as Record<
		Exclude<keyof Exclude<Actions, undefined>, keyof DefaultActionsRecord<Initial>>,
		( payload?: unknown, ...args: unknown[] ) => void
	>;
	const dispatcher = dispatch as DispatchCTA<Initial, Actions>;
	for ( const type in ctaRecord ) {
		if ( type in defaultCTARecord || typeof ctaRecord[ type ] !== 'function' ) {
			continue;
		}

		customActions[ type as unknown as keyof typeof customActions ] = ( payload?: unknown, ...args ) => {
			dispatcher( {
				type,
				payload,
				options: args[ 0 ],
				args,
			} as unknown as Parameters<DispatchCTA<Initial, Actions>>[0], );
		};

		hasCustomAction = true;
	}

	if ( !hasCustomAction ) {
		return defaultCTARecord;
	}

	return Object.assign(
		defaultCTARecord,
		customActions,
	);
}

function wrapPrivateDispatcher<
	Initial extends CTAInitial,
	Actions,
>(
	dispatcher: UsePrivateCTADispatcher<Initial, Actions>,
	actions?: UseCTAParameter<Initial, Actions>['actions'],
) {
	const publicDispatcher: DispatchCTA<Initial, Actions> = ( cta, ) => {
		dispatcher( cta, );
	};

	const cta: DispatchDefaultCTARecord<Initial, Actions> = {
		replace( payload, ...args ) {
			publicDispatcher( {
				options: args[ 0 ],
				payload,
				type: 'replace',
			} as Parameters<DispatchCTA<Initial, Actions>>[0], );
		},
		replaceInitial( payload, ...args ) {
			publicDispatcher( {
				options: args[ 0 ],
				payload,
				type: 'replaceInitial',
			} as Parameters<DispatchCTA<Initial, Actions>>[0], );
		},
		reset( payload, ...args ) {
			publicDispatcher( {
				options: args[ 0 ],
				payload,
				type: 'reset',
			} as Parameters<DispatchCTA<Initial, Actions>>[0], );
		},
		update( payload, ...args ) {
			switch ( typeof payload ) {
				case 'number':
				case 'string': {
					publicDispatcher( {
						type: 'update',
						payload: {
							[ payload ]: args[ 0 ],
						},
						options: args[ 1 ],
					} as unknown as Parameters<DispatchCTA<Initial, Actions>>[0], );
					break;
				}
				default: {
					publicDispatcher( {
						type: 'update',
						payload,
						options: args[ 0 ],
					} as unknown as Parameters<DispatchCTA<Initial, Actions>>[0], );
					break;
				}
			}
		},
	};

	if ( actions == null || typeof actions !== 'object' ) {
		return Object.assign(
			publicDispatcher,
			{
				cta,
			},
		);
	}

	return Object.assign(
		publicDispatcher,
		{
			cta: mergeCustomCTAWithDefaultCTA(
				publicDispatcher,
				cta,
				actions,
			),
		},
	);
}

export default function usePublicCTA<
	Initial extends CTAInitial,
	Actions,
>( params: {
	actions?: UseCTAParameter<Initial, Actions>['actions']
	stateDispatcher: UsePrivateCTAReturnType<Initial, Actions>
}, ): UseCTAReturnType<Initial, Actions> {
	const {
		actions,
	} = params;
	const [
		ctaState,
		ctaDispatch,
	] = params.stateDispatcher;

	const augmentedDispatcher = useMemo(
		() => wrapPrivateDispatcher<Initial, Actions>( ctaDispatch, actions, ),
		[
			ctaDispatch,
			actions,
		],
	);

	return useMemo(
		() => {
			const state: UseCTAReturnType<Initial, Actions>[1]['state'] = {
				changes: ctaState.changes,
				current: ctaState.current,
				initial: ctaState.initial,
				previous: ctaState.previous,
			};
			const dispatch = Object.assign(
				augmentedDispatcher,
				{
					state,
				},
			);
			return [
				ctaState.current,
				dispatch as unknown as UseCTAReturnType<Initial, Actions>[1],
			];
		},
		[
			ctaState,
			augmentedDispatcher,
		],
	);
}
