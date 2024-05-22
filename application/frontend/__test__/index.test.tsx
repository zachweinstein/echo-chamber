// File: __tests__/Home.test.jsx
import Home from '~/pages';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

jest.mock('next/router', () => ({
	useRouter() {
		return { pathname: '/' };
	},
}));

jest.mock('next-auth/react', () => ({
	useSession: () => ({
		data: null,
	}),
}));

describe('Home', () => {
	it('renders correctly', () => {
		/**
		 * On the first run, it will create a snapshot of the rendered Home page and save it to __snapshots__.
		 * On subsequent runs, it will compare the newly rendered Home page and compare it to the snapshot.
		 *
		 * With this, we can make sure only intentional changes get made to the page and that it renders correctly
		 * every time.
		 *
		 * If an intentional change gets made, run `npx jest --updateSnapshot` to regenerate all snapshots.
		 */
		const { asFragment } = render(<Home />);

		expect(asFragment()).toMatchSnapshot();
	});

	it('should wrap the provided page in a LandingLayout component', () => {
		const TestPage = () => <div>Test Content</div>;
		const WrappedComponent = Home.setLayout(<TestPage />);

		const { container } = render(WrappedComponent);

		// Check if the LandingLayout is wrapping the TestPage correctly
		expect(container.firstChild).toMatchSnapshot(`
	    <div>
	      <div>Test Content</div>
	    </div>
	  `); // Update snapshot as necessary

		// Ensure TestPage content is rendered
		expect(container.textContent).toContain('Test Content');
	});
});
