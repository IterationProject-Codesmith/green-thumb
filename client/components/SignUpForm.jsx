import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle backend logic here
    fetch('api/signup', {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
    .then(data => {
      console.log(data);
      navigate('/');
    })
    .catch((error) => {
      console.log('error', error);
    })
  };

  return (
    <div id='signUp-form-container'>
      <form
        id='signUp-form'
        className='auth-form'
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor='username'>Username:</label>
        <br></br>
        <input 
          type='text' 
          id='username' 
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          ></input>
        <br></br>
        <label htmlFor='password'>Password:</label>
        <br></br>
        <input 
          type='password' 
          id='password' 
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br></br>
        <input type='submit' value='Sign up' id='signUp-button' />
      </form>
    </div>
  );
};

export default SignUpForm;
