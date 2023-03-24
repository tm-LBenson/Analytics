import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/auth';
import SignUpForm from './Signup';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    setShowSignUpForm(true);
  };

  const handleSignUpSubmit = (userData) => {
    console.log('sign up form submitted:', userData);
    setShowSignUpForm(false);
  };

  return (
    <div>
      {!showSignUpForm ? (
        <form onSubmit={handleLoginSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Log In</button>
          <p>
            Don't have an account?{' '}
            <a
              href="/"
              onClick={handleSignUpClick}
            >
              Sign Up
            </a>
          </p>
        </form>
      ) : (
        <SignUpForm onSubmit={handleSignUpSubmit} />
      )}
    </div>
  );
};

export default LoginForm;
