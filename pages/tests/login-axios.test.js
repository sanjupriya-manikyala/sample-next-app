import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import LoginPage from '../login';

jest.mock('axios');

describe('LoginPage - Axios Request', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('displays error message for invalid login', async () => {
    const errorMessage = 'Invalid username or password';
    axios.post.mockRejectedValueOnce(new Error(errorMessage));

    render(<LoginPage />);

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'Log In' });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    fireEvent.click(submitButton);

    expect(screen.getByText('Logging in...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test('logs in successfully', async () => {
    const mockResponse = { data: { token: 'abc123' } };
    axios.post.mockResolvedValueOnce(mockResponse);

    render(<LoginPage />);

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'Log In' });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    fireEvent.click(submitButton);

    expect(screen.getByText('Logging in...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Logging in...')).not.toBeInTheDocument();
      expect(mockResponse.data.token).toEqual('abc123');
    });
  });

  test('disables submit button during login', async () => {
    axios.post.mockResolvedValueOnce({ data: { token: 'abc123' } });

    render(<LoginPage />);

    const submitButton = screen.getByRole('button', { name: 'Log In' });

    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });
});
