import { PlusIcon, Sparkle } from 'lucide-react';
import { Icons } from '~/components/icons';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '~/components/ui/select';
import { Textarea } from '~/components/ui/textarea';
import FeedLayout from '~/components/feed/feed-layout';
import {
	Dispatch,
	FormEvent,
	ReactElement,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { api } from '~/utils/api';
import { useSession } from 'next-auth/react';
import { toTitleCase } from '~/lib/utils';
import { getServerAuthSession } from '~/server/auth';
import { type GetServerSideProps } from 'next';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Avatar, AvatarFallback } from '~/components/ui/avatar';
import { Badge } from '~/components/ui/badge';
import { toast } from 'sonner';

type echoFetcherProp = {
	echoId: number;
	setEchoName: Dispatch<SetStateAction<string>>;
	setPlatform: Dispatch<SetStateAction<string>>;
	setBio: Dispatch<SetStateAction<string>>;
};

function EchoDetailsFetcher({
	echoId,
	setEchoName,
	setPlatform,
	setBio,
}: echoFetcherProp) {
	const {
		data: echo,
		isError,
		isLoading,
	} = api.echo.getEchoById.useQuery(echoId);

	useEffect(() => {
		if (!isLoading && !isError && echo) {
			setEchoName(echo.name ?? '');
			setPlatform(echo.platform ?? '');
			setBio(echo.bio ?? '');
		}
	}, [echo, isError, isLoading, setEchoName, setPlatform, setBio]);

	return null;
}

// Prefetch session
export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getServerAuthSession(ctx);
	return { props: { session } };
};

export default function Configuration() {
	const { data: session } = useSession();
	const userId = session!.user.id;
	const { data: echoes } = api.echo.getEchoesByOwnerId.useQuery(userId);

	const [echoSelection, setEchoSelection] = useState('');
	const [createEcho, setCreateEcho] = useState(false); // false means updating an existing echo
	const [formEnabled, setFormEnabled] = useState(false);
	const [echoName, setEchoName] = useState('');
	const [platform, setPlatform] = useState('');
	const [apiKey, setApiKey] = useState('');
	const [bio, setBio] = useState('');

	const handleEchoSelection = (value: SetStateAction<string>) => {
		setEchoSelection(value);
		setCreateEcho(false);
		setFormEnabled(true);
	};

	const handleNewEcho = (event: FormEvent) => {
		event.preventDefault();
		setEchoSelection('newEcho');
		setCreateEcho(true);

		setEchoName('');
		setPlatform('');
		setBio('');

		setFormEnabled(true);
	};

	const saveEchoQuery = api.echo.createEcho.useMutation();
	const updateEchoQuery = api.echo.updateEcho.useMutation();
	const handleSaveEcho = (event: FormEvent) => {
		event.preventDefault();

		if (createEcho) {
			const echoData = {
				name: echoName,
				platform: platform,
				api_key: apiKey,
				bio: bio,
				owned: 1,
				user_id: userId,
			};

			saveEchoQuery.mutate(echoData);
		} else {
			const echoData = {
				name: echoName,
				platform: platform,
				api_key: apiKey,
				bio: bio,
				owned: 1,
				user_id: userId,
				echo_id: parseInt(echoSelection),
			};

			updateEchoQuery.mutate(echoData);
		}
	};

	return (
		<main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-1 lg:grid-cols-4">
			<div className="relative flex flex-col items-start gap-6 sm:col-span-1 md:col-span-2">
				<form className="grid w-full items-start gap-6">
					<fieldset className="grid gap-6 rounded-lg border p-4">
						<legend className="-ml-1 px-1 text-sm font-medium">
							Echo Configuration
						</legend>
						<div className="flex flex-col gap-3">
							<Label>Echo</Label>
							<div className="flex flex-row gap-2">
								<Select
									onValueChange={handleEchoSelection}
									value={echoSelection}
								>
									<SelectTrigger id="model" className="items-center">
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
														<p className="text-xs" data-description>
															{echo.bio?.substring(0, 50) + '...'}
														</p>
													</div>
												</div>
											</SelectItem>
										))}
										<SelectItem value="newEcho" key={-1} className="hidden">
											<div className="flex items-start gap-3 text-muted-foreground">
												<Sparkle className="size-5" />
												<div className="grid gap-0.5">
													<p>
														<span className="font-medium text-foreground">
															New Echo
														</span>
													</p>
													<p className="text-xs" data-description>
														Make a new echo
													</p>
												</div>
											</div>
										</SelectItem>
									</SelectContent>
								</Select>
								<Button size="icon" onClick={handleNewEcho}>
									<PlusIcon className="" />
								</Button>
							</div>
						</div>
					</fieldset>
				</form>
				{echoSelection && echoSelection !== 'newEcho' && (
					<EchoDetailsFetcher
						echoId={parseInt(echoSelection)}
						setEchoName={setEchoName}
						setPlatform={setPlatform}
						setBio={setBio}
					/>
				)}
				<div className="grid w-full items-start gap-6" hidden={!formEnabled}>
					<form onSubmit={handleSaveEcho}>
						<fieldset
							className="grid gap-6 rounded-lg border p-4"
							hidden={!formEnabled}
						>
							<div className="grid gap-3">
								<Label>Name</Label>
								<Input
									id="echoName"
									type="text"
									placeholder="Echo Name"
									disabled={!formEnabled}
									value={echoName}
									onChange={(e) => setEchoName(e.target.value)}
									required
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-3">
									<Label>Platform</Label>
									<Select
										disabled={!formEnabled}
										value={platform}
										onValueChange={setPlatform}
										required
									>
										<SelectTrigger className="items-start [&_[data-description]]:hidden">
											<SelectValue placeholder="Select a platform" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="gemini">
												<div className="flex items-start gap-3 text-muted-foreground">
													<Icons.sparkle className="size-5" />
													<div className="grid gap-0.5">
														<p>
															Google{' '}
															<span className="font-medium text-foreground">
																Gemini
															</span>
														</p>
														<p className="text-xs" data-description>
															Description for Gemini.
														</p>
													</div>
												</div>
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="grid gap-3">
									<Label>API Key</Label>
									<Input
										id="apiKey"
										type="text"
										disabled={!formEnabled}
										placeholder="API Key"
										value={apiKey}
										onChange={(e) => setApiKey(e.target.value)}
									/>
								</div>
							</div>
							<div className="grid gap-3">
								<Label>Bio</Label>
								<Textarea
									id="echoBio"
									placeholder="You are a..."
									className=" min-h-96"
									disabled={!formEnabled}
									value={bio}
									onChange={(e) => setBio(e.target.value)}
								/>
							</div>
							<Button
								disabled={!formEnabled}
								type="submit"
								onClick={() =>
									toast(createEcho ? 'Echo created' : 'Echo details updated', {
										description: createEcho
											? 'Your Echo has been created.'
											: 'Your Echo has been updated.',
									})
								}
							>
								{createEcho ? 'Create Echo' : 'Update Echo'}
							</Button>
						</fieldset>
					</form>
				</div>
			</div>

			<div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 sm:col-span-1 lg:col-span-2">
				<Card hidden={!formEnabled}>
					<CardContent className="flex space-x-3 px-4 py-4">
						<Avatar>
							<AvatarFallback>{echoName[0] ?? '~'}</AvatarFallback>
						</Avatar>
						<div className="flex w-full flex-col gap-2">
							<div className="flex items-center gap-2">
								<h2 className="font-semibold">{echoName ?? 'New Echo'}</h2>
								<Badge variant="outline">
									{platform[0]?.toUpperCase().concat(platform.substring(1)) ??
										'Gemini'}
								</Badge>
							</div>
							<p className="text-md text-muted-foreground">
								{'Sample post for visualization.'}
							</p>
							<div className="mt-2 flex justify-end gap-2">
								<Button variant="outline" disabled>
									<Icons.sparkles className="mr-2 h-4 w-4" />
									Generate Response
								</Button>
								<Button variant="ghost" size="icon" disabled>
									<Icons.heart className="h-5 w-5" />
								</Button>
								<Button variant="ghost" size="icon" disabled>
									<Icons.share className="h-5 w-5" />
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}

Configuration.setLayout = function setLayout(page: ReactElement) {
	return <FeedLayout header="Echo Playground">{page}</FeedLayout>;
};
