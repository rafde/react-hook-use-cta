import { GithubPermalinkRsc, } from 'react-github-permalink/dist/GithubPermalink/GithubPermalinkRsc';
import { useCTAParameterCompareConfig, } from '../components/menuConfig';
import Code from '../components/ui/code';
import Content from '../components/ui/content';
import SubHeaderLink from '../components/ui/subHeaderLink';

export default function UseCTAParameterCompare() {
	return <>
		<SubHeaderLink {...useCTAParameterCompareConfig} />
		<Content>
			<p>
				<i>Optional</i>
				{' '}
				callback:
			</p>
			<GithubPermalinkRsc
				permalink="https://github.com/rafde/react-hook-use-cta/blob/ef432720f3c5b248f7540c86f9b3ebe61adbcb20/src/types/UseCTAParameterCompare.ts#L1-L11"
			/>
			<p>
				<Code>previousValue</Code>
				{' '}
				and
				{' '}
				<Code>nextValue</Code>
				{' '}
				are the previous and next values a state property.
			</p>
			<p>
				<Code>extra.key</Code>
				{' '}
				is the key which is being compared.
			</p>
			<p>
				<Code>extra.cmp</Code>
				{' '}
				gives you access to
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
			</p>

			<p>
				It should return:
			</p>

			<ul className="list-inside list-[square]">
				<li>
					<Code>true</Code>
					{' '}
					if the values are considered equal
				</li>
				<li>
					<Code>false</Code>
					{' '}
					if the values are different
				</li>
			</ul>

			<p>This is particularly useful when:</p>
			<ul className="list-inside list-[square]">
				<li>You need custom equality logic.</li>
				<li>You want to optimize re-renders by comparing only specific properties.</li>
				<li>Working with complex nested objects that need special comparison handling.</li>
			</ul>

			<b>
				<Code>compare</Code>
				{' '}
				Example
			</b>
		</Content>

		<iframe
			src="https://codesandbox.io/embed/zyqnnj?view=editor+%2B+preview&module=%2Fsrc%2FDemo.tsx"
			className="h-[500px] grow overflow-hidden rounded-s border-0"
			title="useCTA parameter compare example"
			allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
			sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
		></iframe>

	</>;
}
