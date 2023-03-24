import { login } from '../slices/auth';

const loginMiddleware = (store) => (next) => async (action) => {
  if (action.type === 'auth/login') {
    const { username, password } = action.payload;

    try {
      const response = await fetch('http://localhost:3002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        action.payload.user = data.user;
        action.payload.token = data.token;
      } else {
        console.error('Login failed.');
      }
    } catch (error) {
      console.error('Server error occurred.', error);
    }
  }

  return next(action);
};

export default loginMiddleware;
