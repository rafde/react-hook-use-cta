import { SourceCodeRecordProps, } from '../../../../types/source-code-record-props';

import {
	useCTAReturnValues0HistoryConfig,
	useCTAReturnValuesConfig,

} from '../../../nav-sidebar/config/use-cta-config';
import {
	useCTAParameterActionsOverridableParameterCTAHistoryConfig,
} from '../../../nav-sidebar/config/use-cta-parameter-actions-override-built-in-config';
import {
	useCTAReturnValues1DispatchConfig,
	useCTAReturnValuesDispatchHistoryConfig,
} from '../../../nav-sidebar/config/use-cta-return-values-1-dispatch-config';
import PopoverCTAHistory from '../../../popover/ctaHistory';
import Anchor from '../../../ui/anchor';
import Code from '../../../ui/code';
import CodeBlock from '../../../ui/codeBlock';
import Content from '../../../ui/content';
import Sect from '../../../ui/sect';
import { UseCTAReturnValuesDispatchCTATopic, } from './values-dispatch-cta';

export default function UseCTAReturnValuesTopic( props: SourceCodeRecordProps, ) {
	return <>
		<Sect {...useCTAReturnValuesConfig}>
			<CodeBlock copyButton={false}>{props.sourceCodeRecord[ 'types/UseCTAReturnType.ts' ]}</CodeBlock>
			<Content>
				<p>
					<Code>useCTA</Code>
					{' '}
					returns a type-safe
					{' '}
					<Code>array</Code>
					{' '}
					with two elements for managing complex state operations
					while maintaining access to state history and change tracking.
				</p>
			</Content>
		</Sect>

		<Sect {...useCTAReturnValues0HistoryConfig}>
			<CodeBlock>{props.sourceCodeRecord[ 'types/CTAHistory.ts' ]}</CodeBlock>
			<Content>
				<p>
					The first value is a
					{' '}
					<Code>CTAHistory</Code>
					{' '}
					type that is the same as
					{' '}
					<a
						aria-label={`Link to ${useCTAParameterActionsOverridableParameterCTAHistoryConfig.title}`}
						href={`#${useCTAParameterActionsOverridableParameterCTAHistoryConfig.href}`}
						className="underline">
						{useCTAParameterActionsOverridableParameterCTAHistoryConfig.desc}
					</a>
				</p>
			</Content>
		</Sect>

		<Sect {...useCTAReturnValues1DispatchConfig}>
			<CodeBlock>{props.sourceCodeRecord[ 'types/UseCTAReturnTypeDispatch.ts' ]}</CodeBlock>
			<Content>
				<p>
					Gives you access to the
					{' '}
					<Code>dispatch</Code>
					{' '}
					function which allows you to trigger
					{' '}
					<Anchor href={useCTAReturnValues0HistoryConfig.href} aria-label={`Link to ${useCTAReturnValues0HistoryConfig.title}`}>
						state history
					</Anchor>
					{' '}
					<PopoverCTAHistory {...props} />
					{' '}
					changes through actions.
				</p>
				<p>
					Re-render will not occur if the state does not change or if the callback returns
					{' '}
					<Code>undefined</Code>
					.
				</p>
				<p>
					The following built-in actions are available:
				</p>
			</Content>
		</Sect>

		<UseCTAReturnValuesDispatchCTATopic {...props} />

		<Sect {...useCTAReturnValuesDispatchHistoryConfig}>
			<Content>
				<p>
					A read-only reference to the
					{' '}
					<a
						aria-label={`Link to ${useCTAReturnValues0HistoryConfig.title}`}
						href={`#${useCTAReturnValues0HistoryConfig.href}`}
						className="underline">
						{useCTAReturnValues0HistoryConfig.desc}
					</a>
					{' '}
					<PopoverCTAHistory sourceCodeRecord={props.sourceCodeRecord} />
					,
					in case you need to read it from somewhere that doesn't need as a dependency.
				</p>
			</Content>
		</Sect>
	</>;
}