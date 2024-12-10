'use client';
import { PanelLeftClose, PanelLeftOpen, } from 'lucide-react';
import useNav from '../../hooks/useNav';

export default function NavToggleButton() {
	const isNavOpen = useNav( state => state.isNavOpen, );
	const toggleNav = useNav( state => state.toggleNav, );

	return <button title={`Toggle Navigation ${isNavOpen ? 'Close' : 'Open'}`} className="navBarToggleButton absolute top-3.5 z-20 bg-black" onClick={toggleNav} type="button">
		<PanelLeftClose className={`${isNavOpen ? '' : 'hidden'}`} />
		<PanelLeftOpen className={`${isNavOpen ? 'hidden' : ''}`} />
	</button>;
}
