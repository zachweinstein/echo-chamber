/**
 * File: landing-layout.tsx
 *
 * Description: Paired with layout provider. This is the layout for the landing pages.
 */

import { LayoutProps } from '../layout-provider';
import LandingMenu from './landing-menu';

/**
 * The landing page layout component.
 *
 * @param children Any children components of the LandingLayout component.
 * @returns LandingLayout Component.
 */
export default function LandingLayout({ children }: LayoutProps) {
	return (
		<>
			<LandingMenu />
			<main>{children}</main>
		</>
	);
}
