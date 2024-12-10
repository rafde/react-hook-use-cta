'use client';
import { PanelLeftClose, } from 'lucide-react';
import useNav from '../../hooks/useNav';

export default function NavOverlayCloseButton() {
	const closeNavOverlay = useNav( state => state.closeNavOverlay, );

	return <button title="Toggle Navigation Close" className="navBarOverlayCloseButton" onClick={closeNavOverlay} type="button">
		<PanelLeftClose />
	</button>;
}
