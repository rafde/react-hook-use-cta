import { useCTAParameterActionsConfig, } from '../components/menuConfig';
import Code from '../components/ui/code';
import Content from '../components/ui/content';
import SubHeaderLink from '../components/ui/subHeaderLink';
import UseCTAParameterActionsCustom from "./UseCTAParameterActionsCustom";
import UseCTAParameterActionsOverridable from "./UseCTAParameterActionsOverridable";

export default function UseCTAParameterActions() {
	return <>
		<SubHeaderLink {...useCTAParameterActionsConfig} />
		<Content>
			<p>
				<i>Optional</i>
				{' '}
				<Code>Record</Code>
				{' '}
				with the following capabilities:
			</p>

			<ul className="list-inside list-[square]">
				<li>
					Gives you a clean, type-safe way to encapsulate your state logic while keeping your component code focused
					on presentation.
				</li>
				<li>Defines reusable state operations</li>
				<li>Maintains full TypeScript type safety</li>
				<li>
					Can be called via
					{' '}
					<Code>dispatch.cta</Code>
					{' '}
					or
					{' '}
					<Code>dispatch</Code>
				</li>
				<li>
					Can override the built-in
					{' '}
					<Code>actions</Code>
				</li>
				<li>Can accept multiple parameters</li>
				<li>
					Has access all built-in actions.
				</li>
			</ul>
		</Content>

		<UseCTAParameterActionsOverridable/>

		<UseCTAParameterActionsCustom/>
	</>;
}
