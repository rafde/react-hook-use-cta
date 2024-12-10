import { GithubPermalinkRsc, } from 'react-github-permalink/dist/GithubPermalink/GithubPermalinkRsc';
import {
	useCTAParameterActionsCustomConfig, useCTAParameterActionsCustomReturnConfig,
	useCTAParameterActionsParameterCustomCTAHistoryConfig, useCTAParameterActionsParameterCustomParametersArgsConfig,
} from '../components/menuConfig';
import Code from '../components/ui/code';
import Content from '../components/ui/content';
import SubHeaderLink from '../components/ui/subHeaderLink';

export default function UseCTAParameterActionsCustom() {
	return <>
		<SubHeaderLink {...useCTAParameterActionsCustomConfig} />
		<GithubPermalinkRsc
			permalink="https://github.com/rafde/react-hook-use-cta/blob/e33341bcbb870c2ff18af8e2a4177a41381eab04/src/types/UseCTAParameterActionsRecordProp.ts#L6-L11"
		/>
		<Content>
			<p>
				Custom actions are a powerful way to extend the functionality of your state management system.
				This gives you the flexibility to:
			</p>
			<ul className="list-inside list-[square]">
				<li>Create domain-specific actions</li>
				<li>Encapsulate complex state updates</li>
				<li>Build reusable action patterns</li>
				<li>Handle specialized business logic</li>
			</ul>
			<p>
				They are defined as a record of functions, where the key is the action name and the value is the
				function that accepts any number of parameters.
			</p>
			<p>
				Parameters are <i>optional</i>.
			</p>
		</Content>

		<SubHeaderLink {...useCTAParameterActionsParameterCustomCTAHistoryConfig} />
		<GithubPermalinkRsc
			permalink="https://github.com/rafde/react-hook-use-cta/blob/e33341bcbb870c2ff18af8e2a4177a41381eab04/src/types/CustomCTAHistory.ts#L1-L21"
		/>
		<Content>
			<p>
				The first parameter of the function is read-only <Code>CustomCTAHistory</Code>
				{' '}
				which extends from <Code>CTAHistory</Code>
			</p>
			<p>
				and gives you access to all the built-in action behaviors.
			</p>
			<p>
				By default, custom actions behave as an <Code>update</Code>,
				but you can customize them to behave like any other
			</p>
			<p>
				built-in action through <Code>CustomCTAHistory</Code>.
			</p>
		</Content>

		<SubHeaderLink {...useCTAParameterActionsParameterCustomParametersArgsConfig} />
		<Content>
			<p>
				Custom actions can have any number of <Code>args</Code> after the <Code>CustomCTAHistory</Code> parameter.
			</p>
			<p>
				These <Code>args</Code> can be of any type you can specify to ensure type safety,
			</p>
			<p>
				and they will be passed to the action function when it is called.
			</p>
		</Content>

		<SubHeaderLink {...useCTAParameterActionsCustomReturnConfig} />

		{/*<iframe*/}
		{/*	src="https://codesandbox.io/embed/n8648p?view=editor+%2B+preview&module=%2Fsrc%2FApp.tsx"*/}
		{/*	className="h-[500px] grow overflow-hidden rounded-s border-0"*/}
		{/*	title="react-hook-use-cta onInit example"*/}
		{/*	allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"*/}
		{/*	sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"*/}
		{/*/>*/}
	</>;
}
