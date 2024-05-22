/**
 * File: 500.tsx
 *
 * Description: This is the React component for the 500 page.
 */

import React from 'react';
import { BackgroundGradientAnimation } from '~/components/ui/background-gradient-animation';

/**
 * A 500 server error page.
 * @returns 500 page component
 */
export default function NotFound() {
	return (
		<BackgroundGradientAnimation>
			<div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center px-4 text-center text-3xl font-bold text-white md:text-4xl lg:text-7xl">
				<p className=" drop-shadow-2xl">
					500 - Our backend is down to save on costs
				</p>
			</div>
		</BackgroundGradientAnimation>
	);
}
