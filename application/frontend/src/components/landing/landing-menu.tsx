import Link from 'next/link';
import { ModeMenu } from '../ui/mode-menu';
import { buttonVariants } from '../ui/button';
import { useRouter } from 'next/router';
import { Icons } from '../icons';
import { useSession } from 'next-auth/react';
import AuthButton from '../auth/AuthButton';

type NavLinkProps = {
	children: React.ReactNode;
	href: string;
};

function MenuLink({ children, href, ...props }: NavLinkProps) {
	const router = useRouter();

	const isActive = (url: string, pathname: string) =>
		pathname === url ? 'text-foreground/90' : 'text-foreground/60';
	const active = isActive(href, router.pathname);

	return (
		<Link
			className={active + ' transition-colors hover:text-foreground/80'}
			href={href}
			{...props}
		>
			{children}
		</Link>
	);
}

export default function LandingMenu() {
	const { data: sessionData } = useSession();

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/65 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-14 max-w-screen-2xl items-center">
				<div className="mr-4 flex">
					<Link href="/" className="p-2">
						<Icons.echochamber className="size-5" />
					</Link>
					<Link className="mr-6 flex items-center space-x-2" href="/">
						<span className="inline-block font-bold">Echo Chamber</span>
					</Link>
					<nav className="flex items-center gap-6 text-sm">
						{/* Insert new navigation endpoints here */}
						<MenuLink href="/team">Team 2</MenuLink>
					</nav>
				</div>
				<div className="flex flex-1 items-center justify-end space-x-2">
					<nav className="flex items-center gap-2">
						<Link
							className={buttonVariants({ variant: 'ghost', size: 'icon' })}
							href="https://github.com/CSC-648-SFSU/csc648-01-sp24-team02"
							target="_blank"
						>
							<Icons.github className="h-5 w-5" />
						</Link>
						<ModeMenu />
					</nav>
				</div>
			</div>
		</header>
	);
}
