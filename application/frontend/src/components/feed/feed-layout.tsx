/**
 * File: feed-layout.tsx
 *
 * Description: Paired with layout provider. This is the layout for the pages
 * that steam from the feed.
 */

import { LogOut, SquareUser } from 'lucide-react';
import Link from 'next/link';
import { Icons } from '~/components/icons';
import { Button, buttonVariants } from '~/components/ui/button';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '~/components/ui/tooltip';
import { LayoutProps } from '../layout-provider';
import { signOut, useSession } from 'next-auth/react';
import AuthButton from '../auth/AuthButton';
import { ModeMenu } from '../ui/mode-menu';
import { useRouter } from 'next/router';

/**
 * Feed Layout type definition that extends LayoutProps.
 * Adds one additional field, header.
 */
type FeedLayoutProps = {
	header: string;
} & LayoutProps;

/**
 * Feed layout menu links
 */
type NavLinkProps = {
	children: React.ReactNode;
	href: string;
	tooltipContent: string;
};

/**
 * Navigation link with tool tip
 *
 * @param {NavLinkProps} nagivationLink Object contains the properties for a navigation link
 * @returns Navigation link with tooltip
 */
function FeedMenuLink({
	children,
	href,
	tooltipContent,
	...props
}: NavLinkProps) {
	const router = useRouter();

	const isActive = (url: string, pathname: string) =>
		pathname === url ? 'rounded-lg bg-muted' : 'rounded-lg';
	const active = isActive(href, router.pathname);

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Link
					className={
						buttonVariants({ variant: 'ghost', size: 'icon' }) + active
					}
					href={href}
					{...props}
				>
					{children}
				</Link>
			</TooltipTrigger>
			<TooltipContent side="right" sideOffset={5}>
				{tooltipContent}
			</TooltipContent>
		</Tooltip>
	);
}

/**
 * The feed page layout component.
 *
 * @param {string} header The title for the page.
 * @param {React.Element} children Any children components of the FeedLayout component.
 * @returns FeedLayout Component.
 */
export default function FeedLayout({ header, children }: FeedLayoutProps) {
	const { data: sessionData } = useSession();

	return (
		<div className="grid h-screen w-full pl-[56px]">
			<aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
				<div className="h-14 border-b p-2">
					<Link
						className={buttonVariants({ variant: 'outline', size: 'icon' })}
						href="/"
					>
						<Icons.echochamber className="size-5" />
					</Link>
				</div>
				<nav className="grid gap-2 p-2">
					<TooltipProvider>
						<FeedMenuLink href="/feed" tooltipContent="Feed">
							<Icons.home />
						</FeedMenuLink>
						<FeedMenuLink
							href="/feed/configuration"
							tooltipContent="Echo Configuration"
						>
							<Icons.bot />
						</FeedMenuLink>
						{/* <Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="rounded-lg"
									aria-label="search"
								>
									<Icons.search />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="right" sideOffset={5}>
								Search
							</TooltipContent>
						</Tooltip> */}
					</TooltipProvider>
				</nav>
				<nav className="mt-auto grid gap-1 p-2">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="mt-auto rounded-lg"
									aria-label="Account"
									onClick={() => void signOut()}
								>
									<LogOut />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="right" sideOffset={5}>
								Sign out
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</nav>
			</aside>
			<div className="flex flex-col">
				<header className="sticky top-0 z-10 flex h-14 items-center gap-1 border-b bg-background px-4">
					<h1 className="font-semibold sm:text-lg md:text-xl">{header}</h1>
					<nav className="ml-auto flex gap-2">
						<Link
							className={buttonVariants({ variant: 'ghost', size: 'icon' })}
							href="https://github.com/CSC-648-SFSU/csc648-01-sp24-team02"
							target="_blank"
						>
							<Icons.github className="h-5 w-5" />
						</Link>
						<ModeMenu />
					</nav>
				</header>
				{children}
			</div>
		</div>
	);
}
