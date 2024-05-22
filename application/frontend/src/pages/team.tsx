/**
 * File: team.tsx
 *
 * Description: A page containing all the team members of our CSC648 group.
 */

import Head from 'next/head';
import { ReactElement } from 'react';
import LandingLayout from '~/components/landing/landing-layout';
import { TeamMembersList } from '~/components/landing/team-members-list';

/**
 * A page to display the team members of our CSC648 group.
 * @returns The TeamPage page component.
 */
export default function TeamPage() {
	return (
		<>
			<Head>
				<title>Echo Chamber</title>
				<meta name="description" content="CSC 648 Echo Chamber" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="p-24">
				<section className="container flex max-w-5xl flex-col items-center gap-4 text-center">
					<h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
						Nice to meet you
					</h1>
					<p className="text-xl text-muted-foreground">
						We are the team behind Echo Chamber. Don&apos;t we look just swell?
					</p>
				</section>
				<div className="mt-5 flex items-center justify-center">
					<TeamMembersList />
				</div>
			</main>
		</>
	);
}

/**
 * Sets the layout to LandingLayout.
 * @param page
 * @returns LandingLayout component containing the current page.
 */
TeamPage.setLayout = function setLayout(page: ReactElement) {
	return <LandingLayout>{page}</LandingLayout>;
};
