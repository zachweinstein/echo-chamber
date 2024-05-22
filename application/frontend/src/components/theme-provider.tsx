/**
 * File: theme-provider.tsx
 *
 * Description: The provider for the theme of the website. Controls the color
 * scheme.
 */

import * as React from 'react';
import { ThemeProvider as NextThemesProviders } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

/**
 * Component that controls the color scheme of the website.
 *
 * @param children The child elements that will be inside the ThemeProvider component. These
 * are the elements that will have their color scheme be controled by ThemeProvider.
 * @param props The remaining properties that get passed into the ThemeProvider component.
 * @returns
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return <NextThemesProviders {...props}>{children}</NextThemesProviders>;
}
