/**
 * File: feed-menu.tsx
 *
 * Description: The feed menu React Component for the feed layout.
 */
import Link from 'next/link';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/tooltip';
import { Icons } from '../icons';

/**
 * Properties of a menu item. Should contain:
 * The contents for the tooltip on mouse hover.
 * The route the menu links to.
 * Any child elements inside the feed menu item component.
 */
type FeedMenuItemProp = {
	tooltip: string;
	route: string;
	children: React.ReactNode;
};

/**
 * A feed menu item.
 *
 * @param FeedMenuItemProperties The properties of a feed menu item.
 * @returns A feed menu item React Component.
 */
function FeedMenuItem({ tooltip, route, children }: FeedMenuItemProp) {
	return (
		<div className="flex h-14 w-full items-center justify-end">
			<Tooltip>
				<TooltipTrigger asChild>
					<Link
						href={route}
						className="mx-4 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
					>
						{children}
						<span className="sr-only">{tooltip}</span>
					</Link>
				</TooltipTrigger>
				<TooltipContent side="right">{tooltip}</TooltipContent>
			</Tooltip>
		</div>
	);
}

/**
 * The feed menu React Component.
 * @returns
 */
export default function FeedMenu() {
	return (
		<nav className="sticky top-4 flex h-fit w-full flex-col gap-3">
			<div className="mr-4 flex justify-end">
				<h1 className="font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]">
					Echo Chamber
				</h1>
			</div>
			<TooltipProvider>
				<FeedMenuItem tooltip="Feed" route="/feed">
					<Icons.home className="h-6 w-6" />
				</FeedMenuItem>
				<FeedMenuItem tooltip="Settings" route="/profile">
					<Icons.settings className="h-6 w-6" />
				</FeedMenuItem>
			</TooltipProvider>
		</nav>
	);
}
