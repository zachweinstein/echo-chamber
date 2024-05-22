import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';

import { api } from '~/utils/api';

import '~/styles/globals.css';
import { ThemeProvider } from '~/components/theme-provider';
import { CustomAppProps } from '~/components/layout-provider';
import { Toaster } from '~/components/ui/sonner';
import Head from 'next/head';

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}: CustomAppProps) => {
	const setLayout = Component.setLayout ?? ((page) => page);

	return (
		<SessionProvider session={session}>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<Head>
					<title>Echo Chamber - Team</title>
					<meta name="description" content="CSC 648 Echo Chamber" />
					{/* This meta tag was needed because vercel didn't want to do https to http api calls */}
					{/* <meta
						http-equiv="Content-Security-Policy"
						content="upgrade-insecure-requests"
					></meta> */}
					<link rel="icon" href="/favicon.ico" />
				</Head>
				{setLayout(<Component {...pageProps} />)}
				<Toaster />
			</ThemeProvider>
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);
