import NavOverlayCloseButton from './ui/navOverlayCloseButton';

export default function NavSideBar() {
	return <nav className="navBar bg-black">
		<header className="flex p-2">
			<h1 className="grow p-2">react-hook-use-cta</h1>
			<NavOverlayCloseButton />
		</header>
		<ul>

		</ul>
	</nav>;
}
