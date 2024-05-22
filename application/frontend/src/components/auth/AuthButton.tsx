import { type Session } from 'next-auth';
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

type authButtonProps = {
	sessionData: Session | null;
	children: React.ReactNode;
};

export default function AuthButton({ sessionData, children }: authButtonProps) {
	const router = useRouter();
	return (
		<Button
			onClick={sessionData ? () => void signOut() : () => router.push('/login')}
		>
			{children}
		</Button>
	);
}
