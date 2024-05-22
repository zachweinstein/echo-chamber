// File: __tests__/team.test.jsx
import  TeamPage from '~/pages';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'


jest.mock('next/router', () => ({
	useRouter() {
		return { pathname: '/' };
	},
}));
 
it('renders homepage unchanged', () => {
	const { container } = render(<TeamPage />)
	expect(container).toMatchSnapshot()
  })


  describe('team member list', () => {
	it('renders a heading', () => {
	  render(<TeamPage />)   
	})
	
  })
