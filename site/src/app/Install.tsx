import { installConfig, installNPMConfig, installYarnConfig, } from '../components/menuConfig';
import CodeBlock from '../components/ui/codeBlock';
import Content from '../components/ui/content';

import HeaderLink from '../components/ui/headerLink';
import SubHeaderLink from '../components/ui/subHeaderLink';

export default function Install() {
	return <>
		<HeaderLink {...installConfig} />
		<Content>
			<CodeBlock lang="bash">react-hook-use-cta</CodeBlock>

			<SubHeaderLink {...installNPMConfig} />
			<CodeBlock lang="bash">npm i react-hook-use-cta</CodeBlock>

			<SubHeaderLink {...installYarnConfig} />
			<CodeBlock lang="bash">yarn add react-hook-use-cta</CodeBlock>
		</Content>
	</>;
}
