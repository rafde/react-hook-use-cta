'use client';
import useSourceCode from '../../hooks/useSourceCode';
import PopoverTypes from './index';

export default function PopoverCustomCTAHistory() {
	const sourceCode = useSourceCode( ( { current, }, ) => current.sourceCodeRecord[ 'types/CustomCTAHistory.ts' ], );
	return <PopoverTypes className="max-w-[570px]" aria-label="Custom CTA History">
		{sourceCode}
	</PopoverTypes>;
}
