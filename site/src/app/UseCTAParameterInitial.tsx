import { GithubPermalinkRsc, } from 'react-github-permalink/dist/GithubPermalink/GithubPermalinkRsc';
import { useCTAParameterInitialConfig, } from '../components/menuConfig';
import Code from '../components/ui/code';
import Content from '../components/ui/content';
import SubHeaderLink from '../components/ui/subHeaderLink';

export default function UseCTAParameterInitial() {
	return <>
		<SubHeaderLink {...useCTAParameterInitialConfig} />
		<Content>
			<b>Required</b>
			<p>
				Representing the
				{' '}
				<Code>initial</Code>
				{' '}
				state structure. This serves as the base state and can be reset to later.
			</p>
			<GithubPermalinkRsc
				permalink="https://github.com/rafde/react-hook-use-cta/blob/dbf0900927f0bda80bb0c3a3a621b3a792ed3dc5/src/types/CTAState.ts#L1"
			/>
			<p>
				Property values can be anything that
				{' '}
				<a
					href="https://github.com/planttheidea/fast-equals/tree/v5.0.1?tab=readme-ov-file#strictdeepequal"
					target="_blank"
					className="underline">
					strictDeepEqual
				</a>
				{' '}
				from
				{' '}
				<a
					href="https://github.com/planttheidea/fast-equals/tree/v5.0.1?tab=readme-ov-file#fast-equals"
					target="_blank"
					className="underline">
					fast-equals
				</a>
				{' '}
				supports.
			</p>
		</Content>
	</>;
}
