import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../store/slices/auth';

const SignUpForm = ({ onSwitchToLogin }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    dispatch(signup({ username, password }));
  };
  const handleSwitchToLoginClick = (e) => {
    e.preventDefault();
    onSwitchToLogin();
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Sign Up</button>
        <button className='mx-sm' onClick={handleSwitchToLoginClick}>Log In</button>
      </div>
    </form>
  );
};

export default SignUpForm;
