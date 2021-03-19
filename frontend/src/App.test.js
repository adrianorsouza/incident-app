import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app name', () => {
  render(<App />);
  const linkElement = screen.getByText(/Incidentes App/i);
  expect(linkElement).toBeInTheDocument();
});
