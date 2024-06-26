import { useMemo, } from 'react';

import type { CTAInitial, } from '../types/CTAInitial';
import { OptionsParams, } from '../types/OptionsParams';
import { UseCTAParameterActionsRecordProp, } from '../types/UseCTAParameterActionsRecordProp';
import type { UseCTAReturnType, } from '../types/UseCTAReturnType';
import type { DispatchDefaultCTARecord, DispatchCTA, } from '../types/UseCTAReturnTypeDispatch';
import type { UsePrivateCTADispatcher, UsePrivateCTAReturnType, } from './usePrivateCTA';

function mergeCustomCTAWithDefaultCTA<
	Initial extends CTAInitial,
	Actions,
>(
	dispatch: DispatchCTA<Initial, Actions>,
	defaultCTARecord: DispatchDefaultCTARecord<Initial>,
	ctaRecord?: Actions,
) {
	type ActionsRecord = Exclude<Actions, undefined>;
	type CustomActionKeys = Exclude<keyof ActionsRecord, keyof DispatchDefaultCTARecord<Initial>>;
	let hasCustomAction = false;
	const customActions = {} as Record<
		CustomActionKeys,
		( payload?: unknown, options?: OptionsParams, ) => void
	>;
	for ( const type in ctaRecord ) {
		if ( type in defaultCTARecord || typeof ctaRecord[ type ] !== 'function' ) {
			continue;
		}

		customActions[ type as unknown as keyof typeof customActions ] = ( payload?: unknown, options?: OptionsParams, ) => {
			dispatch( {
				type,
				payload,
				options,
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
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined = undefined,
>(
	dispatcher: UsePrivateCTADispatcher<Initial, Actions>,
	actions?: Actions,
) {
	const publicDispatcher: DispatchCTA<Initial, Actions> = ( cta, ) => {
		dispatcher( cta, );
	};

	const cta: DispatchDefaultCTARecord<Initial> = {
		replace( payload, options?: OptionsParams, ) {
			publicDispatcher( {
				type: 'replace',
				payload,
				options,
			} as Parameters<DispatchCTA<Initial, Actions>>[0], );
		},
		replaceInitial( payload, options?: OptionsParams, ) {
			publicDispatcher( {
				type: 'replaceInitial',
				payload,
				options,
			} as Parameters<DispatchCTA<Initial, Actions>>[0], );
		},
		reset( payload, options?: OptionsParams, ) {
			publicDispatcher( {
				type: 'reset',
				payload,
				options,
			} as Parameters<DispatchCTA<Initial, Actions>>[0], );
		},
		update( payload, value, options?: OptionsParams, ) {
			switch ( typeof payload ) {
				case 'number':
				case 'string':
					publicDispatcher( {
						type: 'update',
						payload: {
							[ payload ]: value,
						},
						options,
					} as Parameters<DispatchCTA<Initial, Actions>>[0], );
					break;
				default:
					publicDispatcher( {
						type: 'update',
						payload,
						value,
					} as Parameters<DispatchCTA<Initial, Actions>>[0], );
					break;
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
			cta: mergeCustomCTAWithDefaultCTA( publicDispatcher, cta, actions, ),
		},
	);
}

export default function usePublicCTA<
	Initial extends CTAInitial,
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined = undefined,
>( params: {
	actions?: Actions
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
