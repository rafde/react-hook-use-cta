import GithubIcon from '../ui/githubIcon';
import NavHiddenCheck from '../ui/navHiddenCheck';
import NavList from '../ui/navList';
import NavOverlayCloseButton from '../ui/navOverlayCloseButton';

import pkg from '../../../../package.json';
import NavOverlyHiddenCheck from '../ui/navOverlayHiddenCheck';

export default function NavSidebar() {
	return <>
		<NavOverlyHiddenCheck />
		<NavHiddenCheck />
		<aside
			className={'absolute inset-0 z-0 flex flex-col overflow-hidden opacity-0 transition-[opacity,z-index] duration-300'
			+ ' peer-checked/overlay:z-20 peer-checked/overlay:opacity-100 peer-checked/overlay:bg-slate-500/50'
			+ ' peer-checked/overlay:*:translate-x-0'
			+ ' sm:sticky sm:w-0 sm:max-w-[--navbar-max-width] sm:transition-[width] sm:z-20 sm:opacity-100 sm:bg-transparent'
			+ ' sm:peer-checked/side:*:translate-x-0 sm:peer-checked/side:w-full'}
		>
			<nav
				className="flex w-full max-w-[--navbar-max-width] grow -translate-x-full flex-col space-y-2 overflow-hidden bg-black pb-2 transition-transform duration-300"
			>
				<header className="flex p-1">
					<h1 className="grow text-wrap text-2xl font-bold">react-hook-use-cta</h1>
					<NavOverlayCloseButton />
				</header>
				<NavList />
				<footer className="flex justify-between p-2">
					<p>
						Version
						{' '}
						{pkg.version}
					</p>
					<a
						href="https://github.com/rafde/react-hook-use-cta"
						target="_blank"
						className="size-6 overflow-hidden"
						aria-label="Link to open new window react-hook-use-cta GitHub repository"
					>
						<GithubIcon />
					</a>
				</footer>
			</nav>
		</aside>
	</>;
}
