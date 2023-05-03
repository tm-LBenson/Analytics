import React, { useState } from 'react';
import SiteCarousel from './SiteCarousel';
import LocationMap from './LocationMap';

const SiteDetails = ({ siteName, data }) => {
  const [chartType, setChartType] = useState('deviceTypes');

  const handleChange = (event) => {
    setChartType(event.target.value);
  };

  const locations = data
    .flatMap((site) => site.traffic)
    .flatMap((traffic) => traffic.locations);

  return (
    <div>
      <h2>{siteName}</h2>
      <label htmlFor="chartType">Chart type:</label>
      <select
        id="chartType"
        value={chartType}
        onChange={handleChange}
      >
        <option value="deviceTypes">Device Types</option>
        <option value="screenSizes">Screen Sizes</option>
        <option value="locationMap">Location Map</option>
      </select>
      {chartType !== 'locationMap' && (
        <SiteCarousel
          data={data}
          chartType={chartType}
        />
      )}
      {chartType === 'locationMap' && <LocationMap locations={locations} />}
    </div>
  );
};

export default SiteDetails;
