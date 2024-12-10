import Link from 'next/link';
import {GithubPermalinkRsc} from "react-github-permalink/dist/GithubPermalink/GithubPermalinkRsc";
import {
	useCTAParameterActionsCustomConfig,
	useCTAParameterActionsDefaultParameterCTAHistoryConfig,
	useCTAReturnValues0HistoryConfig,
	useCTAReturnValues1DispatchConfig,
	useCTAReturnValuesConfig, useCTAReturnValuesDispatchCTACustomActionConfig,
	useCTAReturnValuesDispatchCTAReplaceConfig,
	useCTAReturnValuesDispatchCTAReplaceInitialConfig,
	useCTAReturnValuesDispatchCTAResetConfig,
	useCTAReturnValuesDispatchCTAUpdateConfig,
	useCTAReturnValuesDispatchCTAUpdateInitialConfig,
	useCTAReturnValuesDispatchHistoryConfig,
} from '../components/menuConfig';
import Code from '../components/ui/code';
import CodeBlock from "../components/ui/codeBlock";
import Content from '../components/ui/content';
import SubHeaderLink from '../components/ui/subHeaderLink';

export default function UseCTAReturnValues() {
	return <>
		<SubHeaderLink {...useCTAReturnValuesConfig} />
		<GithubPermalinkRsc
			permalink="https://github.com/rafde/react-hook-use-cta/blob/ef432720f3c5b248f7540c86f9b3ebe61adbcb20/src/types/UseCTAReturnType.ts#L1-L12"/>
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

		<SubHeaderLink {...useCTAReturnValues0HistoryConfig} />
		<GithubPermalinkRsc
			permalink="https://github.com/rafde/react-hook-use-cta/blob/ef432720f3c5b248f7540c86f9b3ebe61adbcb20/src/types/CTAHistory.ts#L1-L9"
		/>
		<Content>
			<p>
				The first value is a <Code>CTAHistory</Code> type is the same as <Link
				href={`#${useCTAParameterActionsDefaultParameterCTAHistoryConfig.href}`}
				className="underline">{useCTAParameterActionsDefaultParameterCTAHistoryConfig.desc}</Link>
			</p>
		</Content>


		<SubHeaderLink {...useCTAReturnValues1DispatchConfig} />
		<GithubPermalinkRsc
			permalink="https://github.com/rafde/react-hook-use-cta/blob/ef432720f3c5b248f7540c86f9b3ebe61adbcb20/src/types/UseCTAReturnTypeDispatch.ts#L226-L235"/>
		<Content>
			<p>
				Gives you access to the dispatch function which allows you to trigger
				{' '}
				<Link href={`#${useCTAReturnValues0HistoryConfig.href}`} className="underline">state history</Link>
				{' '}
				changes through actions.
			</p>
			<p>
				Re-render will not occur if the state does not change or if the callback returns <Code>undefined</Code>.
			</p>
			<p>
				The following built-in actions are available:
			</p>
		</Content>

		<SubHeaderLink {...useCTAReturnValuesDispatchCTAUpdateConfig} />
		<CodeBlock lang={'ts'}>{`
	dispatch.cta.update( keyof CTAState, CTAState[keyof CTAState] );
	
	dispatch.cta.update( Partial<CTAState> );
	
	dispatch.cta.update( ( ctaHistory: CTAHistory<CTAState> ) => Partial<CTAState> | undefined );
		`}</CodeBlock>
		<Content>
			<details>
				<summary>Alternate dispatch.cta.update</summary>

				<CodeBlock lang={'ts'}>{`
	dispatch( {
		type: 'update',
		payload: Partial<CTAState>
	} );
	
	dispatch( {
		type: 'update',
		payload: ( ctaHistory: CTAHistory<CTAState> ) => Partial<CTAState> | undefined
	} );
				`}</CodeBlock>
			</details>

			<p>Lets you modify specific properties of your <Code>current</Code> state while preserving other values.</p>
		</Content>

		<SubHeaderLink {...useCTAReturnValuesDispatchCTAReplaceConfig} />
		<CodeBlock lang={'ts'}>{`
	dispatch.cta.replace( CTAState );
	
	dispatch.cta.replace( ( ctaHistory: CTAHistory<CTAState> ) => CTAState | undefined );
		`}</CodeBlock>
		<Content>
			<details>
				<summary>Alternate dispatch.cta.replace</summary>

				<CodeBlock lang={'ts'}>{`
	dispatch( {
		type: 'replace',
		payload: CTAState
	} );
	
	dispatch( {
		type: 'replace',
		payload: ( ctaHistory: CTAHistory<CTAState> ) => CTAState | undefined
	} );
				`}</CodeBlock>
			</details>

			<p>Replaces all <Code>current</Code> property values with new property values.</p>
		</Content>

		<SubHeaderLink {...useCTAReturnValuesDispatchCTAResetConfig} />
		<CodeBlock lang={'ts'}>{`
	// Reset the state to the initial state
	dispatch.cta.reset();
	
	// sets the current state and initial state to payload
	dispatch.cta.reset( CTAState );
	
	// sets the current state and initial state to what is returned from the callback
	// if the callback returns undefined, the state will not change
	dispatch.cta.reset( ( ctaHistory: CTAHistory<CTAState> ) => CTAState | undefined );
		`}</CodeBlock>

		<Content>
			<details>
				<summary>Alternate dispatch.cta.reset</summary>

				<CodeBlock lang={'ts'}>{`
	// Reset the state to the initial state
	dispatch( {
		type: 'reset',
	} );
	
	// sets the current state and initial state to payload
	dispatch( {
		type: 'reset',
		payload: CTAState
	} );
	
	// sets the current state and initial state to what is returned from the callback
	// if the callback returns undefined, the state will not change
	dispatch( {
		type: 'reset',
		payload: ( ctaHistory: CTAHistory<CTAState> ) => CTAState | undefined
	} );
				`}</CodeBlock>
			</details>

			<p>Resets the <Code>current</Code> state back to the <Code>initial</Code> state or to synchronize
				the <Code>current</Code> state and the <Code>initial</Code> state.</p>
		</Content>

		<SubHeaderLink {...useCTAReturnValuesDispatchCTAUpdateInitialConfig} />
		<CodeBlock lang={'ts'}>{`
	dispatch.cta.updateInitial( Partial<CTAState> );
	
	dispatch.cta.updateInitial( ( ctaHistory: CTAHistory<CTAState> ) => Partial<CTAState> | undefined );
		`}</CodeBlock>
		<Content>

			<details>
				<summary>Alternate dispatch.cta.updateInitial</summary>

				<CodeBlock lang={'ts'}>{`
	dispatch( {
		type: 'updateInitial',
		payload: Partial<CTAState>
	} );
	
	dispatch( {
		type: 'updateInitial',
		payload: ( ctaHistory: CTAHistory<CTAState> ) => Partial<CTAState> | undefined
	} );
				`}</CodeBlock>
			</details>

			<p>Lets you modify specific properties of your <Code>initial</Code> state while preserving other values.</p>
		</Content>

		<SubHeaderLink {...useCTAReturnValuesDispatchCTAReplaceInitialConfig} />
		<CodeBlock lang={'ts'}>{`
	dispatch.cta.replaceInitial( CTAState );

	dispatch.cta.replaceInitial( ( ctaHistory: CTAHistory<CTAState> ) => CTAState | undefined );
					`}</CodeBlock>
		<Content>

			<details>
				<summary>Alternate dispatch.cta.replaceInitial</summary>

				<CodeBlock lang={'ts'}>{`
	dispatch( {
		type: 'replaceInitial',
		payload: CTAState
	} );
	
	dispatch( {
		type: 'replaceInitial',
		payload: ( ctaHistory: CTAHistory<CTAState> ) => CTAState | undefined
	} );
				`}</CodeBlock>
			</details>

			<p>Used to replace all <Code>initial</Code> state property values with new property values.</p>
		</Content>

		<SubHeaderLink {...useCTAReturnValuesDispatchCTACustomActionConfig} />
		<CodeBlock lang={'ts'}>{`
	
	dispatch.cta.YourCustomActionWithoutArgs();
	
	dispatch.cta.YourCustomActionWithArgs( Payload, ...any[] | undefined);
	
	dispatch.cta.YourCustomActionWithArgs( ( ( ctaHistory: CTAHistory<CTAState> ) => Payload | undefined ), ...any[] | undefined );
		`}</CodeBlock>


		<Content>
			<details>
				<summary>Alternate dispatch.cta.YourCustomAction</summary>

				<CodeBlock lang={'ts'}>{`
	dispatch( {
		type: 'YourCustomActionWithoutArgs',
	} );
	
	dispatch( {
		type: 'YourCustomActionWithArgs',
		payload: Payload,
		args: any[] | undefined,
	} );
	
	dispatch( {
		type: 'YourCustomActionWithArgs',
		payload: ( ctaHistory: CTAHistory<CTAState> ) => Payload | undefined
		args: any[] | undefined,
	} );
				`}</CodeBlock>
			</details>

			<p>
				<Code>YourCustomAction</Code> is a placeholder for the name of a custom action you defined in
				{' '}
				<Link href={`#${useCTAParameterActionsCustomConfig.href}`}
				      className="underline">
					{useCTAParameterActionsCustomConfig.desc}
				</Link>
			</p>
		</Content>


		<SubHeaderLink {...useCTAReturnValuesDispatchHistoryConfig} />
		<Content>
			<p>A read-only reference to the <Link href={`#${useCTAReturnValues0HistoryConfig.href}`}
			                                      className="underline">{useCTAReturnValues0HistoryConfig.desc}</Link>,
				in case you need to read it from somewhere that doesn't need as a dependency.</p>
		</Content>


	</>;
}
