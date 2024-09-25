import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [fieldsFilled, setFieldsFilled] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle backend logic here
    fetch('api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) navigate('/');
      else if (data.message === 'User already exists')  setIsUsernameTaken(true);
      else if (data.message === 'Both username and password fields are required') setFieldsFilled(false)
    })
    .catch((error) => {
      console.log('error', error);
      setErrorMessage('An unexpected Error occured')
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

      {isUsernameTaken && <p>Username is already taken</p>}
      {!fieldsFilled && <p>Please fill all fields</p>}


    </div>
  );
};

export default SignUpForm;
