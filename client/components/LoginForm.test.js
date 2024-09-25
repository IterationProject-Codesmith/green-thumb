import LoginForm from './LoginForm';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('LoginForm', () => {
  it('renders login form', () =>{
    render(
      <BrowserRouter>
       <LoginForm/>
      </BrowserRouter>
    );
   expect(screen.getByLabelText('Username:')).toBeInTheDocument();
   expect(screen.getByLabelText('Password:')).toBeInTheDocument();
   expect(screen.getByRole('button', { name: /login/i})).toBeInTheDocument();
  });
  it('submits form with correct credentials', async () => {
    const mockFetch = jest.fn(() => 
      Promise.resolve({
        json: () => Promise.resolve({ success: true })
      })
    );
    global.fetch = mockFetch;
    render(
      <BrowserRouter>
       <LoginForm/>
      </BrowserRouter>
    );
    await userEvent.type(screen.getByLabelText('Username:'), 'testName');
    await userEvent.type(screen.getByLabelText('Password:'), 'testPassword');
    await userEvent.click(screen.getByRole('button', {name: /login/i}));
    expect(mockFetch).toHaveBeenCalledWith(
      'api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: 'testName',
          password: 'testPassword'
        })
      }
    );
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
})