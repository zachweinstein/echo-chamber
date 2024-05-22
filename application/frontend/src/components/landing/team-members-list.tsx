import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '~/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import Link from 'next/link';
import { Icons } from '~/components/icons';

type teamMemberProp = {
	name: string;
	handle: string;
	role: string;
};

function TeamMember({ name, handle, role }: teamMemberProp) {
	return (
		<Link href={`/users/${handle}`}>
			<div className="group flex items-center justify-between rounded-sm p-2 hover:bg-accent hover:text-accent-foreground">
				<div className="flex items-center space-x-4">
					<Avatar>
						<AvatarImage src={`/avatars/${handle}.png`} />
						<AvatarFallback>T2</AvatarFallback>
					</Avatar>
					<div>
						<p className="text-sm font-medium leading-none">{name}</p>
						<p className="text-sm text-muted-foreground">{role}</p>
					</div>
				</div>
				<Icons.menuLink className="mr-2 hidden h-4 w-4 group-hover:block" />
			</div>
		</Link>
	);
}

export function TeamMembersList() {
	return (
		<Card className="w-96">
			<CardHeader>
				<CardTitle>Team 2</CardTitle>
				<CardDescription>
					Meet the members of team 2! We&apos;re excited to show you what we
					have in store.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-2">
				<TeamMember name="Huy Dang" handle="leavism" role="Team Lead" />
				<TeamMember
					name="Zachary Weinstein"
					handle="zachweinstein"
					role="Git Master"
				/>
				<TeamMember
					name="Chris Camaño"
					handle="chriscamano"
					role="Scrum Master"
				/>
				<TeamMember
					name="Daniel Chang"
					handle="danieljchang"
					role="Backend Lead"
				/>
				<TeamMember
					name="Marcos Garcia"
					handle="merxgrc"
					role="Frontend lead"
				/>
				<TeamMember name="Min Oo" handle="mmy014" role="Database Lead" />
			</CardContent>
		</Card>
	);
}
