import { GithubPermalinkRsc, } from 'react-github-permalink/dist/GithubPermalink/GithubPermalinkRsc';
import {
	useCTAParameterActionsDefaultConfig,
	useCTAParameterActionsDefaultParameterCTAHistoryConfig,
	useCTAParameterActionsDefaultParameterPayloadConfig,
	useCTAParameterActionsDefaultReturnConfig,
} from '../components/menuConfig';
import Code from '../components/ui/code';
import Content from '../components/ui/content';
import SubHeaderLink from '../components/ui/subHeaderLink';
import Link from 'next/link';

export default function UseCTAParameterActionsOverridable() {
	return <>
		<SubHeaderLink {...useCTAParameterActionsDefaultConfig} />
		<GithubPermalinkRsc
			permalink="https://github.com/rafde/react-hook-use-cta/blob/e33341bcbb870c2ff18af8e2a4177a41381eab04/src/types/DefaultActionsRecord.ts#L4-L12"
		/>
		<Content>
			<p>
				All built-in call-to-actions (CTA) can have their behaviors extended or modified.
			</p>
			<p>This pattern enables:</p>
			<ul className="list-inside list-[square]">
				<li>Adding custom validation</li>
				<li>Transforming data</li>
				<li>Adding side effects</li>
				<li>Adding logging</li>
			</ul>
		</Content>

		<iframe
			src="https://codesandbox.io/embed/n8648p?view=editor+%2B+preview&module=%2Fsrc%2FApp.tsx"
			className="h-[500px] grow overflow-hidden rounded-s border-0"
			title="react-hook-use-cta onInit example"
			allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
			sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
		/>

		<SubHeaderLink {...useCTAParameterActionsDefaultParameterCTAHistoryConfig}/>
		<GithubPermalinkRsc
			permalink="https://github.com/rafde/react-hook-use-cta/blob/e33341bcbb870c2ff18af8e2a4177a41381eab04/src/types/CTAHistory.ts#L3-L9"
		/>
		<Content>
			<p>Gives you access to the complete read-only state object containing:</p>
			<ul className="list-inside list-[square]">
				<li>
					<Code>current</Code>
					: The current hook state
				</li>

				<li>
					<Code>previous</Code>
					: The previous
					{' '}
					<Code>current</Code>
					{' '}
					state object before the last update.
					<p>
						Starts of as
						{' '}
						<Code>null</Code>
						{' '}
						until
						{' '}
						<Code>current</Code>
						{' '}
						state is updated.
					</p>
				</li>

				<li>
					<Code>changes</Code>
					: The changes between the
					{' '}
					<Code>initial</Code>
					{' '}
					state and the
					{' '}
					<Code>current</Code>
					{' '}
					state.
					<p>
						Is
						{' '}
						<Code>null</Code>
						{' '}
						if the there are no differences between the
						{' '}
						<Code>initial</Code>
						{' '}
						and
						{' '}
						<Code>current</Code>
						{' '}
						state.
					</p>
				</li>

				<li>
					<Code>initial</Code>
					: The initial state of the hook.
					Can be updated to reflect a point of synchronization.
				</li>

				<li>
					<Code>previousInitial</Code>
					: The previous
					{' '}
					<Code>initial</Code>
					{' '}
					state object before the last update.
					<p>
						Starts of as
						{' '}
						<Code>null</Code>
						{' '}
						until
						{' '}
						<Code>initial</Code>
						{' '}
						state is updated.
					</p>
				</li>


			</ul>
		</Content>

		<SubHeaderLink {...useCTAParameterActionsDefaultParameterPayloadConfig}/>
		<Content>
			<p>
				The second parameter is the expected signature of the overridden action
				(please refer to
				{' '}
				<Link href={`#${useCTAParameterActionsDefaultConfig.href}`} className={"underline"}><Code>DefaultActionsRecord</Code></Link>
				{' '}
				type).
			</p>

			<ul className="list-inside list-[square]">
				<li>replace: <Code>CTAState</Code></li>
				<li>replaceInitial: <Code>CTAState</Code></li>
				<li>reset: <Code>CTAState</Code> or <Code>undefined</Code></li>
				<li>update: <Code>{'Partial<CTAState>'}</Code></li>
				<li>updateInitial: <Code>{'Partial<CTAState>'}</Code></li>
			</ul>
		</Content>

		<SubHeaderLink {...useCTAParameterActionsDefaultReturnConfig}/>
		<Content>
			<p>
				The expected return signature of the overridden action
				(please refer to
				{' '}
				<Link href={`#${useCTAParameterActionsDefaultConfig.href}`}
				      className={"underline"}><Code>DefaultActionsRecord</Code></Link>
				{' '}
				type).
			</p>
			<p>
				If the action returns <Code>undefined</Code>, the action will not be triggered.
			</p>

			<ul className="list-inside list-[square]">
				<li>replace: <Code>CTAState</Code> or <Code>undefined</Code></li>
				<li>replaceInitial: <Code>CTAState</Code> or <Code>undefined</Code></li>
				<li>reset: <Code>CTAState</Code> or <Code>undefined</Code></li>
				<li>update: <Code>{'Partial<CTAState>'}</Code> or <Code>undefined</Code></li>
				<li>updateInitial: <Code>{'Partial<CTAState>'}</Code> or <Code>undefined</Code></li>
			</ul>
		</Content>
	</>;
}
