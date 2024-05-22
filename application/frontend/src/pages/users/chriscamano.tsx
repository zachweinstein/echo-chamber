import Image from 'next/image';

type profileProps = {
	name: string;
	handle: string;
	role: string;
	bio: string;
};

function Profile({ name, handle, role, bio }: profileProps) {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center py-2">
			<main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
				<Image
					className="mb-6 rounded-full"
					src={`/avatars/${handle}.png`}
					width={100}
					height={100}
					alt={name}
				/>
				<h1 className="mb-2 text-3xl font-bold">{name}</h1>
				<p className="mb-4 text-xl text-muted-foreground">{role}</p>
				<p className="w-96 text-lg text-primary">{bio}</p>
			</main>
		</div>
	);
}

export default function ProfilePage() {
	const myProp: profileProps = {
		name: 'Chris Camaño',
		handle: 'chriscamano',
		role: 'Scrum master',
		bio: "Hello there im interested to see where this project will lead to and learn from the rest of the class."
	};

	return (
		<>
			<Profile {...myProp} />
		</>
	);
}
