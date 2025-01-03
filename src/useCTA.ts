import { useMemo, } from 'react';

import type { ActionsRecordProp, } from './types/ActionsRecordProp';
import type { CTAState, } from './types/CTAState';
import type { UseCTAParameter, } from './types/UseCTAParameter';
import type { UseCTAParameterActionsOptionalDefaultRecord, } from './types/UseCTAParameterActionsOptionalDefaultRecord';
import type { UseCTAParameterActionsRecordProp, } from './types/UseCTAParameterActionsRecordProp';
import type { UseCTAReturnType, } from './types/UseCTAReturnType';

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { CTAHistory, } from './types/CTAHistory';
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { UseCTAParameterOnInit, } from './types/UseCTAParameterOnInit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { UseCTAParameterCompare, } from './types/UseCTAParameterCompare';
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { UseCTAReturnTypeDispatch, UseCTAReturnTypeDispatchCTA, } from './types/UseCTAReturnTypeDispatch';

import usePrivateCTA from './internal/usePrivateCTA';
import usePublicCTA from './internal/usePublicCTA';

/**
 * A React hook for managing complex state with custom actions, history tracking, and type safety.
 * @see {@link https://rafde.github.io/react-hook-use-cta/#use-cta useCTA}
 *
 * @template {CTAState} Initial
 *
 * @template {UseCTAParameterActionsRecordProp<Initial> | undefined} Actions
 *
 * @param {UseCTAParameter} useCTAParameter - Parameter for the useCTA.
 *
 * @param {CTAState} useCTAParameter.initial - initial {@link CTAState} structure for {@link CTAHistory}.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-initial useCTA Parameter: initial}.
 *
 * @param {UseCTAParameterOnInit} [useCTAParameter.onInit] - Optional {@link UseCTAParameterOnInit}
 * - `function` for handling `initial` parameter on component mount.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-on-init useCTA Parameter: onInit}
 *
 * @param {UseCTAParameterCompare} [useCTAParameter.compare] - Optional {@link UseCTAParameterCompare}
 * - `function` for custom equality logic by comparing only specific properties.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-compare useCTA Parameter: compare}
 *
 * @param {UseCTAParameterActionsRecordProp} [useCTAParameter.actions] - Optional {@link UseCTAParameterActionsRecordProp}
 * - `object` to define custom and/or overridden actions for state management.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-actions useCTA Parameter: actions}
 *
 * @returns {[CTAHistory, UseCTAReturnTypeDispatch]}  An `array` containing {@link CTAHistory} and {@link UseCTAReturnTypeDispatch} elements:
 *
 * 1. {@link CTAHistory} - An `object` representing the history of hook state changes.
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-0-history useCTA return value [0]: history}
 *
 * 2. {@link UseCTAReturnTypeDispatch} - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch useCTA return value [1]: dispatch}
 * An `function` containing the following properties:
 * - {@link CTAHistory history} - A read-only reference to {@link CTAHistory} object.
 *
 * - {@link UseCTAReturnTypeDispatchCTA cta} - Read-only reference `object` to access call-to-action dispatch `function`s.
 *
 * `cta.update` - Update specific properties of your `current` state while preserving other values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.update} Signature:
 *
 * ```ts
 * cta.update( Partial<CTAState> );
 * cta.update( ( CTAHistory<CTAState> ) => Partial<CTAState> | undefined );
 * cta.update( key: keyof CTAState, value: CTAState[keyof CTAState] );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-update cta.update docs}
 *
 * `cta.replace` - Replaces all `current` property values with new property values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.replace} Signature:
 *
 * ```ts
 * cta.replace( CTAState );
 * cta.replace( ( CTAHistory<CTAState> ) => CTAState | undefined );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replace cta.replace docs}
 *
 * `cta.reset` - Resets the `current` state back to the `initial` state or to synchronize the `current` state and the `initial` state.
 *
 * {@link UseCTAReturnTypeDispatchCTA.reset} Signature:
 *
 * ```ts;
 * cta.reset()
 * cta.reset( CTAState );
 * cta.reset( ( CTAHistory<CTAState> ) => CTAState | undefined );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-reset cta.reset docs}
 *
 * `cta.updateInitial` - Lets you update specific properties of `initial` state while preserving other values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.updateInitial} Signature:
 *
 * ```ts
 * cta.updateInitial( Partial<CTAState> );
 * cta.updateInitial( ( CTAHistory<CTAState> ) => Partial<CTAState> | undefined );
 * cta.updateInitial( key: keyof CTAState, value: CTAState[keyof CTAState] );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateInitial cta.updateInitial docs}
 *
 * `cta.replaceInitial` - Replaces all `initial` property values with new property values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.replaceInitial} Signature:
 *
 * ```ts
 * cta.replaceInitial( CTAState );
 * cta.replaceInitial( ( CTAHistory<CTAState> ) => CTAState | undefined );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replaceInitial cta.replaceInitial docs}
 *
 * `cta.YourCustomAction` - `YourCustomAction` is a placeholder for the name of a custom action you defined in `useCTAParameter.actions`
 *
 * {@link UseCTAReturnTypeDispatchCTA}.YourCustomAction Signature:
 *
 * ```ts
 * cta.YourCustomAction( ...args );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-custom-action cta.YourCustomAction docs}
 */
export function useCTA<
	Initial extends CTAState,
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined,
	ActionsRecord = Actions extends UseCTAParameterActionsOptionalDefaultRecord<Initial> ? ActionsRecordProp<Initial, Actions> : Actions,
>(
	useCTAParameter: UseCTAParameter<Initial, ActionsRecord>,
): UseCTAReturnType<Initial, ActionsRecord> {
	const actions = useMemo(
		() => {
			if ( useCTAParameter.actions && typeof useCTAParameter.actions === 'object' ) {
				return {
					...useCTAParameter.actions,
				};
			}

			return useCTAParameter.actions;
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);
	const stateDispatcher = usePrivateCTA<Initial, ActionsRecord>( useCTAParameter, actions, );
	return usePublicCTA( {
		actions,
		stateDispatcher,
	}, );
}
