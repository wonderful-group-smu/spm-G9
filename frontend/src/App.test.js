import { render, screen } from '@testing-library/react';

import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const elementArray = screen.getAllByText(/Wonderful Group/i);
  elementArray.map((target) => {
    expect(target).toBeInTheDocument();
  })
});
