import { Prism as SyntaxHighlighter, } from 'react-syntax-highlighter';
import { vscDarkPlus, } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CodeBlockCopyButton from './codeBlockCopyButton';

type CodeBlockProp = {
	lang?: string
	children: string
	copyButton?: boolean
};

export default function /**
 * Renders a code block component with syntax highlighting and optional copy button.
 * @param props - The props for the code block component.
 * @param props.lang - The language of the code to be highlighted (default is 'text').
 * @param props.childrencode - The code to be displayed in the code block.
 * @param props.copyButton - Whether to display a copy button for the code block (default is true).
 * @returns The rendered code block component.
 */
CodeBlock( props: CodeBlockProp, ) {
	const {
		lang = 'text',
		children,
		copyButton = true,
	} = props;
	return <div className="group relative">
		{copyButton && <CodeBlockCopyButton code={children} />}
		<SyntaxHighlighter
			language={lang}
			style={vscDarkPlus}
		>
			{children}
		</SyntaxHighlighter>
	</div>;
}
