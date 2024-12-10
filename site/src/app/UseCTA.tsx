import { useCTAConfig, } from '../components/menuConfig';
import Content from '../components/ui/content';
import HeaderLink from '../components/ui/headerLink';
import UseCTAParameterActions from './UseCTAParameterActions';
import UseCTAParameterOnInit from './UseCTAParameterOnInit';
import UseCTAParameterInitial from './UseCTAParameterInitial';
import UseCTAParameterCompare from './UseCTAParameterCompare';
import UseCTAReturnValues from './UseCTAReturnValues';

export default function UseCTA() {
	return <>
		<HeaderLink {...useCTAConfig} />
		<Content>
			<b>Basic Example</b>
		</Content>
		<iframe
			src="https://codesandbox.io/embed/zr8wv8?view=editor+%2B+preview"
			className="h-[500px] grow overflow-hidden rounded-s border-0"
			title="react-hook-use-cta basic example"
			allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
			sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
		></iframe>
		<UseCTAParameterInitial />
		<UseCTAParameterOnInit />
		<UseCTAParameterCompare />
		<UseCTAParameterActions />
		<UseCTAReturnValues />
	</>;
}
