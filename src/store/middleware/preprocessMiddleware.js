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

    siteMap[site.name].traffic = [
      ...siteMap[site.name].traffic,
      ...site.traffic,
    ];
  });

  return Object.values(siteMap);
};

const preprocessMiddleware = (store) => (next) => async (action) => {
  if (action.type === 'sites/getAllSites') {
    try {
      const processedData = preprocessData(action.payload.sites);
      action.payload.sites = processedData;
    } catch (error) {
      console.error('Error preprocessing site data:', error);
    }
  }
  next(action);
};

export default preprocessMiddleware;
