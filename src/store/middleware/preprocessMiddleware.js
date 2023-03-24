const preprocessData = (sites) => {
  const siteMap = {};

  sites.forEach((site) => {
    if (!siteMap[site.name]) {
      siteMap[site.name] = {
        _id: site._id,
        name: site.name,
        traffic: [],
        __v: site.__v,
      };
    }

    const formattedTraffic = site.traffic.map((trafficItem) => {
      const dateString = trafficItem.date.$date || trafficItem.date;
      const date = new Date(dateString);
      const timestamp = date.getTime();

      const formattedDate = new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(timestamp);

      return { ...trafficItem, date: formattedDate };
    });

    siteMap[site.name].traffic = [
      ...siteMap[site.name].traffic,
      ...formattedTraffic,
    ];
  });

  return Object.values(siteMap);
};

const preprocessMiddleware = (store) => (next) => async (action) => {
  if (action.type === 'sites/getAllSites') {
    try {
      // Check if the user is logged in
      const loggedIn = store.getState().auth.isLoggedIn;
      if (loggedIn) {
        const processedData = preprocessData(action.payload);
        action.payload = processedData;
      }
    } catch (error) {
      console.error('Error preprocessing site data:', error);
      // Dispatch an error action to handle the error in the store
      store.dispatch({
        type: 'sites/preprocessingError',
        payload: error.message,
      });
    }
  }
  return next(action);
};

export default preprocessMiddleware;
