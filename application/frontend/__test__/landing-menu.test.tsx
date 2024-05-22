import { render, screen } from '@testing-library/react';
import LandingMenu from '~/components/landing/landing-menu';
import '@testing-library/jest-dom';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));

jest.mock('next-auth/react');

describe('Landing menu component', () => {
	(useRouter as jest.Mock).mockReturnValue({
		pathname: '/',
	});
	it('shows Sign Out button when user is signed in', () => {
		// Mock useSession to return a session object
		(useSession as jest.Mock).mockReturnValue({
			data: { user: { name: 'Sam Pole' } },
		});

		render(<LandingMenu />);

		expect(screen.getByText('Sign Out')).toBeInTheDocument();
	});

	it('shows Sign In button when user is not signed in', () => {
		// Mock useSession to return null, simulating no user signed in
		(useSession as jest.Mock).mockReturnValue({
			data: null,
		});

		render(<LandingMenu />);
		expect(screen.getByText('Sign In')).toBeInTheDocument();
	});
});

describe('LandingMenu', () => {
	it('displays the active link with correct class when href matches pathname', () => {
		(useRouter as jest.Mock).mockReturnValue({
			pathname: '/team',
		});
		render(<LandingMenu />);
		const link = screen.getByText('Team 2');
		expect(link).toHaveClass('text-foreground/90');
		expect(link).not.toHaveClass('text-foreground/60');
	});

	it('displays the link without active class when href does not match pathname', () => {
		(useRouter as jest.Mock).mockReturnValue({
			pathname: '/',
		});
		render(<LandingMenu />);
		const link = screen.getByText('Team 2');
		expect(link).not.toHaveClass('text-foreground/90');
		expect(link).toHaveClass('text-foreground/60');
	});
});
