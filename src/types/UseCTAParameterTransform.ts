import type { CTAState, } from './CTAState';
import type { DefaultActionsRecord, } from './DefaultActionsRecord';

import type { CTAHistory, } from './CTAHistory';

/**
 * A `function` that returns a transform {@link CTAState} object before a default action evaluates the result of a custom action or overridden default action.
 * This is useful for transforming the result of a custom action or overridden default action
 * and can server as an alternative to overriding default actions.
 * @template {CTAState} State - The {@link CTAState} hook state.
 * @param {State} nextState - Next {@link CTAState} object that is the result of the custom action or overridden default action.
 * @param {CTAHistory & {actionType: keyof DefaultActionsRecord<State>, customActionName?: string | number}} transformCTAHistory - An extended {@link CTAHistory} object.
 * @param {keyof DefaultActionsRecord<State>} transformCTAHistory.actionType - Key of {@link UseCTAParameterActionsRecordProp}.
 * @param {string | number} [transformCTAHistory.customActionName] - Custom action key if called by a custom action, otherwise `undefined`.
 * @returns {State | Partial<State>} - Transformed {@link CTAState} object.
 */
export type UseCTAParameterTransform<
	State extends CTAState,
	ActionType extends Record<
		keyof DefaultActionsRecord<State>,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		( ...args: any ) => any
	> = DefaultActionsRecord<State>,
	ActionTypeReturnValueRecord = {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[K in keyof ActionType]: ActionType[K] extends ( ...args: any ) => any
			? Parameters<ActionType[K]>[1]
			: never
	},
	nextState = ActionTypeReturnValueRecord[keyof ActionTypeReturnValueRecord],
> = (
	nextState: Exclude<nextState, undefined>,
	transformCTAHistory: {
		actionType: keyof ActionType
		customAction?: string | number
	} & CTAHistory<State>,
) => nextState;