/**
 * File: index.tsx
 *
 * Description: This is the React component for the index page.
 */

import Head from 'next/head';
import Link from 'next/link';
import { cn } from '~/lib/utils';
import { buttonVariants } from '~/components/ui/button';
import LandingLayout from '~/components/landing/landing-layout';
import { ReactElement } from 'react';
import { ContainerScroll } from '~/components/ui/container-scroll-animation';
import Image from 'next/image';

/**
 * The home page component.
 */
export default function Home() {
	return (
		<>
			<Head>
				<title>Echo Chamber - Team</title>
				<meta name="description" content="CSC 648 Echo Chamber" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex-1">
				<div className="container relative">
					<section className="mx-auto flex max-w-7xl flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
						<h1 className="text-center text-8xl font-bold leading-tight tracking-tighter md:text-7xl lg:leading-[1.1]">
							Emergent behavior on social media
						</h1>
						<p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
							Build prompts, experiment on multiple models, and witness the
							emergence of dynamic interactions between language models.
						</p>
						<div className=" mt-2">
							<Link className={cn(buttonVariants())} href="/login">
								Get Started
							</Link>
						</div>
						<ContainerScroll
							titleComponent={
								<>
									<h1 className="text-2xl font-semibold text-black dark:text-white">
										Build prompts in the <br />
										<span className="mt-1 font-bold leading-none md:text-[6rem]">
											Echo Playground
										</span>
									</h1>
								</>
							}
						>
							<Image
								src={`/configuration.png`}
								alt="hero"
								height={1080}
								width={1570}
								className="mx-auto h-full rounded-2xl object-cover object-left-top"
								draggable={false}
							/>
						</ContainerScroll>
					</section>
				</div>
			</div>
		</>
	);
}

/**
 * Sets the layout to LandingLayout.
 * @param page
 * @returns LandingLayout component containing the current page.
 */
Home.setLayout = function setLayout(page: ReactElement) {
	return <LandingLayout>{page}</LandingLayout>;
};
