'use client';
import useSourceCode from '../../hooks/useSourceCode';
import PopoverTypes from './index';

export default function PopoverUseCTAParameterActionsPropReplace() {
	const sourceCode = useSourceCode( ( { current, }, ) => current.sourceCodeRecord.UseCTAParameterActionsRecordPropReplace, );
	return <PopoverTypes aria-label="useCTA parameter actions record prop replace" className="max-w-[390px]">
		{sourceCode}
	</PopoverTypes>;
}