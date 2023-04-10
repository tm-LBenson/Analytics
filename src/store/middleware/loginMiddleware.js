import Cookies from 'universal-cookie';

const cookies = new Cookies();

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
        action.payload.clientId = data.clientId;
        // Set a session cookie with the token and username
        cookies.set('session_token', data.token, { path: '/' });
        cookies.set('session_username', username, { path: '/' });
        cookies.set('session_clientId', data.clientId, { path: '/' });
      } else {
        action.error = 'Login failed.';
        console.error('Login failed.');
      }
    } catch (error) {
      action.error = 'Login failed.';
      console.error('Server error occurred.', error);
    }
  }

  return next(action);
};

export default loginMiddleware;
