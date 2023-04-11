import Cookies from 'universal-cookie';

const cookies = new Cookies();
const signupMiddleware = (store) => (next) => async (action) => {
  if (action.type === 'auth/signup') {
    const { username, password } = action.payload;

    try {
      const response = await fetch(
        'https://astro-server-z1u9.onrender.com/signup',
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
        cookies.set('session_token', data.token, { path: '/' });
        cookies.set('session_username', username, { path: '/' });
        cookies.set('session_clientId', data.clientId, { path: '/' });

        action.payload.token = data.token;
        action.payload.clientId = data.clientId;
        console.log(action.clientId);
      } else {
        console.error('Signup failed.');
      }
    } catch (error) {
      console.error('Server error occurred.', error);
    }
  }

  return next(action);
};

export default signupMiddleware;
