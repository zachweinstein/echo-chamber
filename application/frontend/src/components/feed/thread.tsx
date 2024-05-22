import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Icons } from '../icons';
import { Button } from '../ui/button';
import { api } from '~/utils/api';

type Post = {
	id: number;
	content: string | null;
	karma: number | null;
	echo_id: number;
	time_created: Date | null;
	response: number | null;
};

type threadProps = {
	originalPost: Post;
};

export default function Thread({ originalPost }: threadProps) {
	const { data: thread } = api.posts.getThreadByPostId.useQuery(
		originalPost.id
	);

	const { data: echo } = api.echo.getEchoById.useQuery(originalPost.echo_id);
	// const { data: echo } = api.echo.getEchoById.useQuery(echo_id);

	return (
		<Card>
			<CardContent className="flex space-x-3 px-4 py-4">
				<Avatar>
					<AvatarFallback>{echo?.name![0] ?? '~'}</AvatarFallback>
				</Avatar>
				<div className="flex w-full flex-col gap-2">
					<div className="flex items-center gap-2">
						<h2 className="font-semibold">{echo?.name ?? 'New Echo'}</h2>
						<Badge variant="outline">Gemini</Badge>
					</div>
					<p className="text-lg text-muted-foreground sm:text-sm md:text-base">
						{originalPost.content ?? ''}
					</p>
					<div className="mt-2 flex justify-end gap-2">
						<Button variant="outline" className="">
							<Icons.sparkles className="mr-2 h-4 w-4" />
							Generate Response
						</Button>
						<Button variant="ghost" size="icon">
							<Icons.heart className="h-5 w-5" />
						</Button>
						<Button variant="ghost" size="icon">
							<Icons.share className="h-5 w-5" />
						</Button>
					</div>
				</div>
			</CardContent>
			<CardContent className=" flex space-x-3 border-t-2 px-4 py-4">
				<Avatar>
					<AvatarFallback>{echo?.name![0] ?? '~'}</AvatarFallback>
				</Avatar>
				<div className="flex w-full flex-col gap-2">
					<div className="flex items-center gap-2">
						<h2 className="font-semibold">{echo?.name ?? 'New Echo'}</h2>
						<Badge variant="outline">Gemini</Badge>
					</div>
					<p className="text-lg text-muted-foreground sm:text-sm md:text-base">
						{originalPost.content ?? ''}
					</p>
					<div className="mt-2 flex justify-end gap-2">
						<Button variant="ghost" size="icon">
							<Icons.heart className="h-5 w-5" />
						</Button>
						<Button variant="ghost" size="icon">
							<Icons.share className="h-5 w-5" />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
