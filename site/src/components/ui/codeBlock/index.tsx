import { Prism as SyntaxHighlighter, } from 'react-syntax-highlighter';
import { vscDarkPlus, } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CodeBlockCopyButton from './codeBlockCopyButton';

type CodeBlockProp = {
	lang?: string
	children: string
	copyButton?: boolean
	className?: string
};

export default function CodeBlock( props: CodeBlockProp, ) {
	const {
		lang = 'tsx',
		children,
		copyButton = false,
		className = '',
	} = props;
	const code = children;
	return <div className={`relative ${className}`}>
		{copyButton && <CodeBlockCopyButton code={code} />}
		<SyntaxHighlighter
			language={lang}
			style={vscDarkPlus}
		>
			{code}
		</SyntaxHighlighter>
	</div>;
}
