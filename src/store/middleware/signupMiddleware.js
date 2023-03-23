import { signup } from '../slices/';

const signupMiddleware = (store) => (next) => async (action) => {
  if (action.type === signup.type) {
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
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        store.dispatch(signup({ user: data.user, token: data.token }));
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
