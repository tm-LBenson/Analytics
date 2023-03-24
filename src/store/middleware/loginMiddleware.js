import { login } from '../slices/auth';

const loginMiddleware = (store) => (next) => async (action) => {
  if (action.type === 'auth/login') {
    const { username, password } = action.payload;

    try {
      const response = await fetch(
        'https://astro-server-z1u9.onrender.com/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        },
      );

      if (response.ok) {
        const data = await response.json();

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
