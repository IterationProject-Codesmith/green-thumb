import SignUpForm from './SignUpForm';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore([]);
describe('SignupForm', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      user: {
        username: null,
        isLoggedIn: false,
        favoritePlants: {},
        favoriteSearch: '',
      }
    })
  });
  it('renders signup form', () =>{
    render(
      <Provider store={store}>
       <BrowserRouter>
       <SignUpForm/>
       </BrowserRouter>
      </Provider>
    );
   expect(screen.getByLabelText('Username:')).toBeInTheDocument();
   expect(screen.getByLabelText('Password:')).toBeInTheDocument();
   expect(screen.getByRole('button', { name: /sign up/i})).toBeInTheDocument();
  });
  it('submits form with correct credentials', async () => {
    const mockFetch = jest.fn(() => 
      Promise.resolve({
        json: () => Promise.resolve({ success: true })
      })
    );
    global.fetch = mockFetch;
    render(
      <Provider store={store}>
       <BrowserRouter>
       <SignUpForm/>
       </BrowserRouter>
      </Provider>
    );
    await userEvent.type(screen.getByLabelText('Username:'), 'testName');
    await userEvent.type(screen.getByLabelText('Password:'), 'testPassword');
    await userEvent.click(screen.getByRole('button', {name: /sign up/i}));
    expect(mockFetch).toHaveBeenCalledWith(
      'api/signup', {
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