import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Login from './Login';
import { AuthContext } from '../../../src/context/AuthContext';

global.fetch = jest.fn();

describe('Login', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders login form and allows user to log in', async () => {
    fetch.mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ username: 'testuser' }),
    }));

    const login = jest.fn();
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ login }}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /login/i }));
    });

    expect(fetch).toHaveBeenCalledWith('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'testuser', password: 'password', email: '' }),
    });

    expect(login).toHaveBeenCalledWith({ username: 'testuser' });
  });
});