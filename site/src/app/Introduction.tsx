import Link from 'next/link';
import { introductionConfig, useCTAReturnValues0HistoryConfig, } from '../components/menuConfig';
import Code from '../components/ui/code';
import Content from '../components/ui/content';

export default function Introduction() {
	return <>
		<h2
			className="sticky top-0 z-0 grow border-b border-b-white bg-black p-2 pl-7 text-3xl"
			title={introductionConfig.title}
		>
			{introductionConfig.desc}
		</h2>
		<Content>
			<p>
				A React hook for managing complex state with custom actions, history tracking, and type safety.
			</p>

			<b>Features</b>

			<ul className="list-inside list-[square]">
				<li>Type-safe state management</li>
				<li>Initial state management</li>
				<li>
					Built-in
					{' '}
					<Link href={`#${useCTAReturnValues0HistoryConfig.href}`} className="underline">state history</Link>
					{' '}
					tracking
				</li>
				<li>
					Default action types
					<ul className="list-inside list-[circle] pl-4">
						<li>
							<Code>update</Code>
							: Update current state
						</li>
						<li>
							<Code>replace</Code>
							: Replace entire current state
						</li>
						<li>
							<Code>updateInitial</Code>
							: Update initial state
						</li>
						<li>
							<Code>replaceInitial</Code>
							: Replace initial state
						</li>
						<li>
							<Code>reset</Code>
							: Reset current state to initial state, or replace initial state and current state
						</li>
					</ul>
				</li>
				<li>
					Flexible and customizable actions for state management
				</li>
			</ul>
		</Content>
	</>;
}
