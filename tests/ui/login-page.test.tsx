import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../../components/LoginPage';

describe('LoginPage', () => {
  it('renders sign in heading', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
  });
});
