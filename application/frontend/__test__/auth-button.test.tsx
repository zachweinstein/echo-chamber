import { render, screen, fireEvent } from '@testing-library/react';
import AuthButton from '~/components/auth/AuthButton';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

jest.mock('next-auth/react', () => ({
	signOut: jest.fn(),
}));

jest.mock('next/router', () => ({
	useRouter: jest.fn().mockReturnValue({
		push: jest.fn(),
	}),
}));

describe('AuthButton', () => {
	const mockSignOut = jest.fn();
	const mockPush = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		signOut.mockImplementation(mockSignOut);
		useRouter.mockImplementation(() => ({ push: mockPush }));
	});

	it('calls signOut when sessionData is present', () => {
		const sessionData = { user: { name: 'John Doe' }, expires: '2024-10-10' };

		render(<AuthButton sessionData={sessionData}>Sign Out</AuthButton>);

		fireEvent.click(screen.getByText(/sign out/i));
		expect(mockSignOut).toHaveBeenCalled();
	});

	it('redirects to login when sessionData is null', () => {
		render(<AuthButton sessionData={null}>Sign In</AuthButton>);

		fireEvent.click(screen.getByText(/sign in/i));
		expect(mockPush).toHaveBeenCalledWith('/login');
	});
});
