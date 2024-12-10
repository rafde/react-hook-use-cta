import Link from 'next/link';
import { GithubPermalinkRsc, } from 'react-github-permalink/dist/GithubPermalink/GithubPermalinkRsc';
import { useCTAParameterInitialConfig, useCTAParameterOnInitConfig, } from '../components/menuConfig';
import Code from '../components/ui/code';
import Content from '../components/ui/content';
import SubHeaderLink from '../components/ui/subHeaderLink';

export default function UseCTAParameterOnInit() {
	return <>
		<SubHeaderLink {...useCTAParameterOnInitConfig} />
		<Content>
			<p>
				<i>Optional</i>
				{' '}
				callback:
			</p>
			<GithubPermalinkRsc
				permalink="https://github.com/rafde/react-hook-use-cta/blob/ef432720f3c5b248f7540c86f9b3ebe61adbcb20/src/types/UseCTAParameterOnInit.ts#L1-L3"
			/>
			<p>
				where
				{' '}
				<Code>Initial</Code>
				{' '}
				is the
				{' '}
				<Link href={`#${useCTAParameterInitialConfig.href}`} className="underline">
					<Code>initial</Code>
				</Link>
				{' '}
				state structure.
			</p>
			<p>Has the following key features:</p>
			<ul className="list-inside list-[square]">
				<li>Runs once on component mount</li>
				<li>
					Receives the
					{' '}
					<Code>initial</Code>
					{' '}
					state as a parameter
				</li>
				<li>
					Can return a new state object to override
					{' '}
					<Code>initial</Code>
					{' '}
					values
				</li>
				<li>
					Perfect for setting up derived state or
					{' '}
					<Code>initial</Code>
					{' '}
					data from props
				</li>
				<li>
					This makes
					{' '}
					<Code>onInit</Code>
					{' '}
					particularly useful when you need to perform calculations or transformations on your
					{' '}
					<Code>initial</Code>
					{' '}
					state before your component starts using it.
				</li>
			</ul>

			<b>
				<Code>onInit</Code>
				{' '}
				Example
			</b>
		</Content>

		<iframe
			src="https://codesandbox.io/embed/92872r?view=editor+%2B+preview"
			className="h-[500px] grow overflow-hidden rounded-s border-0"
			title="react-hook-use-cta onInit example"
			allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
			sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
		></iframe>

	</>;
}
