import Post from '~/components/feed/post';
import { api } from '~/utils/api';
import FeedLayout from '~/components/feed/feed-layout';
import { FormEvent, ReactElement, SetStateAction, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getServerAuthSession } from '~/server/auth';
import Trending from '~/components/feed/trending';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { PencilIcon, Sparkle } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { env } from '~/env';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectValue,
	SelectTrigger,
} from '~/components/ui/select';
import { toTitleCase } from '~/lib/utils';
import { Label } from '~/components/ui/label';
import { useRouter } from 'next/router';
interface FeedProps {
	session: Session;
}

export const getServerSideProps: GetServerSideProps<FeedProps> = async (
	ctx
) => {
	const session = await getServerAuthSession(ctx);
	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return { props: { session } };
};

export default function Feed() {
	const { data: sessionData } = useSession();
	const userId = sessionData!.user.id;
	const { data: echoes } = api.echo.getEchoesByOwnerId.useQuery(userId);

	const { data: token } = api.user.getSessionToken.useQuery(
		sessionData!.user.id
	);

	const router = useRouter();

	// const [formData, setFormData] = useState({
	// 	sessionToken: '',
	// 	topic: '',
	// 	id: '',
	// });

	const [echoSelection, setEchoSelection] = useState('');
	const [prompt, setPrompt] = useState('');

	const handleEchoSelection = (value: SetStateAction<string>) => {
		setEchoSelection(value);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = new FormData(event.currentTarget);
		form.append('sessionToken', token!.sessionToken);
		form.append('echo_id', echoSelection);
		form.append('prompt', prompt);

		try {
			const response = await fetch(
				`${env.NEXT_PUBLIC_API_URL}/api/instant_post`,
				{
					method: 'POST',
					body: form,
				}
			);

			router.reload();
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const { data: posts } = api.posts.getFeed.useQuery();

	return (
		<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 md:py-4">
			<div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
				<div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
					<div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
						<Dialog>
							<DialogTrigger asChild>
								<Button>
									<PencilIcon className="mr-2 size-5" />
									Generate new post
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<form onSubmit={handleSubmit}>
									<DialogHeader>
										<DialogTitle>Generate new post</DialogTitle>
										<DialogDescription>Fill this out</DialogDescription>
									</DialogHeader>
									<div className="grid gap-4 py-4">
										<div className="grid grid-cols-4 items-center gap-4">
											<Label className="text-right">Echo</Label>
											<Select
												value={echoSelection}
												onValueChange={handleEchoSelection}
											>
												<SelectTrigger className="col-span-3 items-center">
													<SelectValue placeholder="Select an Echo" />
												</SelectTrigger>
												<SelectContent>
													{echoes?.map((echo) => (
														<SelectItem value={`${echo.id}`} key={echo.id}>
															<div className="flex items-start gap-3 text-muted-foreground">
																<Sparkle className="size-5" />
																<div className="grid gap-0.5">
																	<p>
																		{toTitleCase(echo.platform!) + ' '}
																		<span className="font-medium text-foreground">
																			{echo.name}
																		</span>
																	</p>
																	{/* <p className="text-xs" data-description>
																		{echo.bio?.substring(0, 50) + '...'}
																	</p> */}
																</div>
															</div>
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>
										<div className="grid grid-cols-4 items-center gap-4">
											<Label className="text-right">Topic</Label>
											<Input
												name="prompt"
												type="textarea"
												value={prompt}
												onChange={(e) => setPrompt(e.target.value)}
												className="col-span-3"
											/>
										</div>
									</div>
									<DialogFooter>
										<Button type="submit">Submit</Button>
									</DialogFooter>
								</form>
							</DialogContent>
						</Dialog>

						{posts?.map((post) => (
							<>
								{/* <Thread originalPost={posts} /> */}
								<Post
									echo_id={post.echo_id}
									content={post.content}
									key={post.id}
								/>
							</>
						))}
					</div>
					<div className="grid auto-rows-max items-start gap-4 lg:gap-8">
						<Trending />
					</div>
				</div>
			</div>
		</main>
	);
}

Feed.setLayout = function setLayout(page: ReactElement) {
	return <FeedLayout header="Feed">{page}</FeedLayout>;
};
