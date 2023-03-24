import Cookies from 'universal-cookie';

const cookies = new Cookies();

const checkSessionCookieMiddleware = (store) => (next) => async (action) => {
  if (action.type === 'auth/setUser') {
    const sessionToken = cookies.get('session_token');
    const sessionUsername = cookies.get('session_username');

    if (sessionToken && sessionUsername) {
      action.payload = { username: sessionUsername, token: sessionToken };
    }
  }

  return next(action);
};

export default checkSessionCookieMiddleware;
