import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { AuthContext } from '../../../src/context/AuthContext';

describe('Header', () => {
  test('renders login and register links when not authenticated', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuthenticated: false }}>
          <Header />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Contract Analyzer')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('renders dashboard and logout links when authenticated', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuthenticated: true, logout: () => {} }}>
          <Header />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Contract Analyzer')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});
