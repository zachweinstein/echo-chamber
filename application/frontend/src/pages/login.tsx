/**
 * File: login.tsx
 *
 * Description: Login componenent page. Let's client authentication with a
 * user account.
 */

import type {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '~/server/auth';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import LandingLayout from '~/components/landing/landing-layout';
import { ReactElement } from 'react';
import { Icons } from '~/components/icons';
import { Label } from '~/components/ui/label';

/**
 * Several checks are made for the authentication process.
 *
 * - Checks whether an authentication session has already been made (user
 * is already logged in). Redirects to the feed page if the client is
 * already authenticated.
 * - Gets all the authentication providers the server currently has
 * enabled.
 *
 * @param context GetServerSidePropsContext
 * @returns A list of all the authentication providers the
 * server currently uses.
 */
export async function getServerSideProps(context: GetServerSidePropsContext) {
	const session = await getServerSession(context.req, context.res, authOptions);

	if (session) {
		return { redirect: { destination: '/feed' } };
	}

	return {
		props: { session },
	};
}

/**
 * The login page component.
 *
 * @param providers The authentication providers
 * @returns
 */
export default function SignIn() {
	return (
		<Card className="mx-auto mt-20 max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>Enter your credentials to login.</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label>Username</Label>
						<Input id="username" type="text" required />
					</div>
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
						</div>
						<Input id="password" type="password" required />
					</div>
					<Button type="submit" className="w-full">
						Login
					</Button>
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-card px-2 text-muted-foreground">
								Or continue with
							</span>
						</div>
					</div>
					<Button
						variant="outline"
						className="flex gap-2"
						onClick={() => signIn('discord', { callbackUrl: '/feed' })}
					>
						<Icons.discord />
						Login with Discord
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

/**
 * Sets the layout to LandingLayout.
 * @param page
 * @returns LandingLayout component containing the current page.
 */
SignIn.setLayout = function setLayout(page: ReactElement) {
	return <LandingLayout>{page}</LandingLayout>;
};
