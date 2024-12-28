import type { ActionsRecordProp, } from './types/ActionsRecordProp';
import type { CTAState, } from './types/CTAState';
import type { UseCTAParameter, } from './types/UseCTAParameter';
import type { UseCTAParameterActionsOptionalDefaultRecord, } from './types/UseCTAParameterActionsOptionalDefaultRecord';
import type { UseCTAParameterActionsOptionalRecordProp, } from './types/UseCTAParameterActionsOptionalRecordProp';

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { UseCTAParameterCompare, } from './types/UseCTAParameterCompare';
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Used in the JSDoc comment.
import type { UseCTAParameterOnInit, } from './types/UseCTAParameterOnInit';

/**
 * A `function` that returns a type safe {@link UseCTAParameter} `object`.
 *
 * Useful if you want to create the parameter outside  {@link useCTA}, {@link createCTA}, or {@link createCTAContext} for type safety.
 *
 * @template {CTAState} Initial - The initial state type.
 * @template {UseCTAParameterActionsOptionalRecordProp} Actions - The actions type.
 *
 * @param {UseCTAParameter} params - {@link UseCTAParameter} parameter.
 *
 * @param {CTAState} params.initial - initial {@link CTAState}.
 *
 * @param {UseCTAParameterOnInit<Initial>} [params.onInit]
 * - {@link UseCTAParameterOnInit} `function` that runs once on component mount.
 *
 * @param {UseCTAParameterCompare<Initial>} [params.compare]
 * - {@link UseCTAParameterCompare} `function` that compares the previous and current state.
 *
 * @param {UseCTAParameterActionsOptionalRecordProp<Initial> | undefined} [params.actions]
 * - {@link UseCTAParameterActionsOptionalRecordProp} `object` type to define custom and/or overridden actions for state management.
 *
 * @returns {UseCTAParameter} A type safe {@link UseCTAParameter} `object`.
 */
export function returnCTAParameter<
	Initial extends CTAState,
	Actions extends UseCTAParameterActionsOptionalRecordProp<Initial>,
	ActionsRecord = Actions extends UseCTAParameterActionsOptionalDefaultRecord<Initial> ? ActionsRecordProp<Initial, Actions> : Actions,
>( params: UseCTAParameter<Initial, ActionsRecord>, ): UseCTAParameter<Initial, ActionsRecord> {
	return params;
}
