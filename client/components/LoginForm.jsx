import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setLoggedIn, setUser } from '../reducers/userSlice';
import { useDispatch } from 'react-redux';
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCorrect, setPasswordCorrect] = useState(true);
  const [fieldsFilled, setFieldsFilled] = useState(true)
  const [errorMessage, setErrorMessage] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {username, password};

    // handle backend logic here
    fetch('api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        dispatch(setLoggedIn())
        dispatch(setUser(username))
        navigate('/dashboard/search')
        // console.log(state.users.isLoggedIn)
      }
      else if (data.message === 'Username or Password was incorrect') setPasswordCorrect(false)
      else if (data.message === 'both username and password fields are required') setFieldsFilled(false)
      else setErrorMessage(true);
    })
    .catch((error) => {
      // console.log('error', error);
      // console.log("falleds into catch in front end API")
      setErrorMessage('An unexpected Error occured');
    })
  };
  return (
    <div id='login-form-container'>
      <form
        id='login-form'
        className='auth-form'
        onSubmit={(e) => handleSubmit(e)}
      >
        <p>
        <label className='loginLabel' htmlFor='username'>Username:</label>
        <input
          type='text'
          id='username'
          name='username'
          className='loginInput'
          value = {username}
          onChange = {(e) => setUsername(e.target.value)}
        ></input>
        </p>
        <br></br>
        <p>
        <label className='loginLabel' htmlFor='password'>Password:</label>

        <input
          type='password'
          id='password'
          name='password'
          className='loginInput'
          value = {password}
          onChange = {(e) => setPassword(e.target.value)}
        ></input>
        </p>
        <input
        type='submit'
        id='login-button'
        value='Login'
        />
      </form>
      {!passwordCorrect && <p className="error">Username or password is incorrect</p>}
      {!fieldsFilled && <p className="error">Please fill all fields</p>}
      {errorMessage && <p className="error"> Username or password is incorrect</p>}
    </div>
  );
};


// const styles = {
//   loginContainer: {
//     backgroundImage: 'url("Wallaby-Zoom-Background (1).jpg")'
//   }
// }
export default LoginForm;

