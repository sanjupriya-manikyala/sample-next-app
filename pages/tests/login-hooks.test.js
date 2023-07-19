import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../login';

describe('LoginPage - Hooks', () => {
  test('updates username state on input change', () => {
    render(<LoginPage />);

    const usernameInput = screen.getByPlaceholderText('Username');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });

    expect(usernameInput.value).toBe('testuser');
  });

  test('updates password state on input change', () => {
    render(<LoginPage />);

    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(passwordInput.value).toBe('testpassword');
  }); 
});
