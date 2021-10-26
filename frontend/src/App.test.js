import { render, screen } from '@testing-library/react';

import App from './App';

describe(App, () => {

  test('Login Form', () => {
    render(<App />);
    const elementArray = screen.getAllByText(/Wonderful Group/i);
    elementArray.push(screen.getByText(/Username/));
    elementArray.push(screen.getByRole('textbox', {
      name: 'name'
    }));
    elementArray.push(screen.getByText(/Password/));
    elementArray.push(screen.getByRole('textbox', {
      name: 'password'
    }));
    elementArray.push(screen.getByText(/Submit/));
    elementArray.push(screen.getByRole('button', {
      name: 'submit'
    }));

    elementArray.map((target) => {
      expect(target).toBeInTheDocument();
    })
  });

  
})

