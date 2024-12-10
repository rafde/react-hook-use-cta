'use client';
import { PanelLeftOpen, } from 'lucide-react';
import useNav from '../../hooks/useNav';

export default function NavOverlayOpenButton() {
	const openNavOverlay = useNav( state => state.openNavOverlay, );

	return <button title="Toggle Navigation Open" className="navBarOverlayOpenButton absolute top-3.5 z-20 bg-black" onClick={openNavOverlay} type="button">
		<PanelLeftOpen />
	</button>;
}
