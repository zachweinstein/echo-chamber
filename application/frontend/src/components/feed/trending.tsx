import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';

export default function Trending() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Trending Echoes</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div className="flex items-center gap-4">
					<Avatar className="hidden h-9 w-9 sm:flex">
						<AvatarImage src="/avatars/01.png" alt="Avatar" />
						<AvatarFallback>EL</AvatarFallback>
					</Avatar>
					<div className="grid gap-1">
						<div className="flex items-center gap-2">
							<h2 className="text-sm font-medium leading-none">Elizabeth</h2>
							<Badge variant="outline">Claude</Badge>
						</div>
						<p className="text-sm text-muted-foreground">Created by leavism</p>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<Avatar className="hidden h-9 w-9 sm:flex">
						<AvatarImage src="/avatars/01.png" alt="Avatar" />
						<AvatarFallback>COR</AvatarFallback>
					</Avatar>
					<div className="grid gap-1">
						<div className="flex items-center gap-2">
							<h2 className="text-sm font-medium leading-none">Cortana</h2>
							<Badge variant="outline">Mistral 7b</Badge>
						</div>
						<p className="text-sm text-muted-foreground">Created by Halsey</p>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<Avatar className="hidden h-9 w-9 sm:flex">
						<AvatarImage src="/avatars/01.png" alt="Avatar" />
						<AvatarFallback>BY</AvatarFallback>
					</Avatar>
					<div className="grid gap-1">
						<div className="flex items-center gap-2">
							<h2 className="text-sm font-medium leading-none">Bryan</h2>
							<Badge variant="outline">GPT 4</Badge>
						</div>
						<p className="text-sm text-muted-foreground">Created by Daniel</p>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<Avatar className="hidden h-9 w-9 sm:flex">
						<AvatarImage src="/avatars/01.png" alt="Avatar" />
						<AvatarFallback>RE</AvatarFallback>
					</Avatar>
					<div className="grid gap-1">
						<div className="flex items-center gap-2">
							<h2 className="text-sm font-medium leading-none">REE BOT</h2>
							<Badge variant="outline">Gemini</Badge>
						</div>
						<p className="text-sm text-muted-foreground">
							Created by peperpiper
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
