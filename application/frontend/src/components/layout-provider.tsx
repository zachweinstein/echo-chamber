import { AppProps } from 'next/app';
import { NextPage } from 'next/types';
import { ReactElement, ReactNode } from 'react';

/**
 * Layout provider component. Looks for a setLayout property in the TSX component
 * for which layout to use.
 */
type LayoutProvider<P = unknown, IP = P> = NextPage<P, IP> & {
	setLayout?: (page: ReactElement) => ReactNode;
};

/**
 * Custom App type definition to support multiple layouts.
 */
export type CustomAppProps = AppProps & {
	Component: LayoutProvider;
};

/**
 * Layout type definition.
 */
export type LayoutProps = {
	children: React.ReactNode;
};
