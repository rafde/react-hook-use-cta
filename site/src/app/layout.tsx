import './globals.css';
import 'react-github-permalink/dist/github-permalink.css';

import type { Metadata, } from 'next';
import { Inter, } from 'next/font/google';
import { PropsWithChildren, } from 'react';
import NavHiddenCheck from '../components/ui/navHiddenCheck';
import NavOverlyHiddenCheck from '../components/ui/navOverlayHiddenCheck';
import NavSideBar from '../components/NavSideBar';
import NavOverlayOpenButton from '../components/ui/navOverlayOpenButton';
import NavToggleButton from '../components/ui/navToggleButton';

const inter = Inter( { subsets: ['latin',], }, );

export const metadata: Metadata = {
	title: 'react-hook-use-cta Documentation',
	description: 'Documentation for react-hook-use-cta',
};

export default function RootLayout( props: PropsWithChildren, ) {
	return <html lang="en" className="flex size-full flex-col bg-black">
		<body className={`${inter.className} relative flex grow overflow-hidden bg-black text-white`}>
			<NavHiddenCheck />
			<NavOverlyHiddenCheck />
			<aside className="navBarContainer bg-slate-500/50">
				<NavSideBar />
			</aside>
			<main className="z-10 flex grow flex-col overflow-hidden">
				<NavToggleButton />
				<NavOverlayOpenButton />
				<div className="flex grow flex-col overflow-auto">
					{props.children}
				</div>
			</main>
		</body>
	</html>;
}
