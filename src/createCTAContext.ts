import {
	createContext,
	useContext,
	createElement,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
	type Context,
} from 'react';
import type { ActionsRecordProp, } from './types/ActionsRecordProp';
import type { CreateCTAContextReturn, } from './types/CreateCTAContextReturn';
import type { CTAState, } from './types/CTAState';
import type { UseCTAParameter, } from './types/UseCTAParameter';
import type { UseCTAParameterActionsOptionalDefaultRecord, } from './types/UseCTAParameterActionsOptionalDefaultRecord';
import type { UseCTAParameterActionsRecordProp, } from './types/UseCTAParameterActionsRecordProp';
import type { UseCTAReturnType, } from './types/UseCTAReturnType';

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { CTAHistory, } from './types/CTAHistory';
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { UseCTAReturnTypeDispatch, } from './types/UseCTAReturnTypeDispatch';
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { UseCTAParameterCompare, } from './types/UseCTAParameterCompare';
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { UseCTAParameterOnInit, } from './types/UseCTAParameterOnInit';

import { useCTA, } from './useCTA';

/**
 * A `function` that returns a React Context to use with {@link useCTA}
 * for managing {@link CTAHistory state history} and {@link UseCTAReturnTypeDispatch dispatch} in a React {@link Context.Provider}.
 *
 * This handles the boilerplate of creating a React Context and Provider.
 * @see {@link https://react.dev/learn/scaling-up-with-reducer-and-context#moving-all-wiring-into-a-single-file}
 *
 * @template {CTAState} Initial - The initial state type.
 * @template {UseCTAParameterActionsRecordProp} Actions - The actions type.
 *
 * @param {UseCTAParameter} contextParams - {@link UseCTAParameter}.
 *
 * @param {UseCTAParameterOnInit} [contextParams.onInit] - Optional {@link UseCTAParameterOnInit}
 * - `function` for handling `initial` parameter on component mount.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-on-init useCTA Parameter: onInit}
 *
 * @param {UseCTAParameterCompare} [contextParams.compare] - Optional {@link UseCTAParameterCompare}
 * - `function` for custom equality logic by comparing only specific properties.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-compare useCTA Parameter: compare}
 *
 * @param {UseCTAParameterActionsRecordProp} [contextParams.actions] - Optional {@link UseCTAParameterActionsRecordProp}
 * - `object` to define custom and/or overridden actions for state management.
 * - See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-parameter-actions useCTA Parameter: actions}
 *
 * @returns {CreateCTAContextReturn} A {@link CreateCTAContextReturn} object. See {@link https://rafde.github.io/react-hook-use-cta/#create-cta-context-return createCTAContext return value}.
 * Has the following properties:
 * - {@link CreateCTAContextReturn.CTAProvider} - component that requires `children` prop.
 * Also accepts optional `initial`, `onInit`, and `compare` props.
 * - {@link CreateCTAContextReturn.useCTAHistoryContext} - A hook for returning {@link CTAHistory} from context.
 * - {@link CreateCTAContextReturn.useCTADispatchContext} - A hook for returning {@link UseCTAReturnTypeDispatch} from context to make call-to-actions.
 * Returns `null` if called outside the `CTAProvider`.
 *
 * `useCTADispatchContext()?.update` - Update specific properties of your `current` state while preserving other values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.update} Signature:
 *
 * ```ts
 * useCTADispatchContext()?.update( Partial<CTAState> );
 * useCTADispatchContext()?.update( ( CTAHistory<CTAState> ) => Partial<CTAState> | undefined );
 * useCTADispatchContext()?.update( key: keyof CTAState, value: CTAState[keyof CTAState] );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-update cta.update docs}
 *
 * `useCTADispatchContext()?.replace` - Replaces all `current` property values with new property values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.replace} Signature:
 *
 * ```ts
 * useCTADispatchContext()?.replace( Partial<CTAState> )
 * useCTADispatchContext()?.replace( ( CTAHistory<CTAState> ) => Partial<CTAState> | undefined )
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replace cta.replace docs}
 *
 * `useCTADispatchContext()?.reset` - Resets the `current` state back to the `initial` state or to synchronize the `current` state and the `initial` state.
 * Resets the `current` state back to the `initial` state or to synchronize the `current` state and the `initial` state.
 *
 * {@link UseCTAReturnTypeDispatchCTA.reset} Signature:
 *
 * ```ts
 * useCTADispatchContext()?.reset();
 * useCTADispatchContext()?.reset( CTAState );
 * useCTADispatchContext()?.reset( ( CTAHistory<CTAState> ) => CTAState | undefined );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-reset cta.reset docs}
 *
 * `useCTADispatchContext()?.updateInitial` - Lets you update specific properties of `initial` state while preserving other values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.updateInitial} Signature:
 *
 * ```ts
 * useCTADispatchContext()?.updateInitial( Partial<CTAState> );
 * useCTADispatchContext()?.updateInitial( ( CTAHistory<CTAState> ) => Partial<CTAState> | undefined );
 * useCTADispatchContext()?.updateInitial( key: keyof CTAState, value: CTAState[keyof CTAState] );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-updateInitial cta.updateInitial docs}
 *
 * `useCTADispatchContext()?.replaceInitial` - Replaces all `initial` property values with new property values.
 *
 * {@link UseCTAReturnTypeDispatchCTA.replaceInitial} Signature:
 *
 * ```ts
 * useCTADispatchContext()?.replaceInitial( CTAState );
 * useCTADispatchContext()?.replaceInitial( ( CTAHistory<CTAState> ) => CTAState | undefined );
 * ```
 *
 * See {@link https://rafde.github.io/react-hook-use-cta/#use-cta-return-value-1-dispatch-cta-replaceInitial cta.replaceInitial docs}
 *
 * `useCTADispatchContext()?.YourCustomAction` - `YourCustomAction` is a placeholder for the name of a custom action you defined in `useCTAParameter.actions`
 *
 * {@link UseCTAReturnTypeDispatchCTA}.YourCustomAction Signature:
 *
 * ```ts
 * useCTADispatchContext()?.YourCustomAction( ...args );
 * ```
 *
 * See {@link https://rafde.github.io/#use-cta-return-value-1-dispatch-cta-custom-action cta.YourCustomAction docs}
 */
export function createCTAContext<
	Initial extends CTAState,
	Actions extends UseCTAParameterActionsRecordProp<Initial> | undefined,
	ActionsRecord = Actions extends UseCTAParameterActionsOptionalDefaultRecord<Initial> ? ActionsRecordProp<Initial, Actions> : Actions,
>( contextParams: UseCTAParameter<Initial, Actions>, ): CreateCTAContextReturn<Initial, ActionsRecord> {
	const CTAContextHistory = createContext<UseCTAReturnType<Initial, Actions>[0]>( {
		changes: null,
		current: contextParams.initial,
		initial: contextParams.initial,
		previous: null,
		previousInitial: null,
	}, );
	const CTAContextDispatch = createContext<UseCTAReturnType<Initial, ActionsRecord>[1] | null>( null, );

	return {
		CTAProvider( { initial = contextParams.initial, onInit = contextParams.onInit, compare = contextParams.compare, children, }, ) {
			const [
				value,
				dispatch,
			] = useCTA( {
				initial,
				onInit,
				actions: contextParams.actions,
				compare,
			}, );

			return createElement(
				CTAContextHistory.Provider,
				{ value, },
				createElement(
					CTAContextDispatch.Provider,
					{
						value: dispatch as unknown as UseCTAReturnType<Initial, ActionsRecord>[1],
					},
					children,
				),
			);
		},
		useCTAHistoryContext() {
			return useContext( CTAContextHistory, );
		},
		useCTADispatchContext() {
			const ctaDispatchContext = useContext( CTAContextDispatch, );
			if ( ctaDispatchContext == null ) {
				console.error( 'useCTADispatchContext was called outside it\'s Provider', );
				return ctaDispatchContext satisfies null;
			}

			return ctaDispatchContext satisfies UseCTAReturnType<Initial, ActionsRecord>[1];
		},
	};
}
