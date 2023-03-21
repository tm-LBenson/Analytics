// fetchSitesMiddleware.js

const fetchSitesMiddleware = (store) => (next) => async (action) => {
  if (action.type === 'sites/getAllSites') {
    try {
      const response = await fetch(
        'https://astro-server-z1u9.onrender.com/traffic-data',
      );
      const data = await response.json();
      action.payload = data;
    } catch (error) {
      console.error('Error fetching site data:', error);
    }
  }
  next(action);
};

export default fetchSitesMiddleware;
