import React, { useState } from 'react';
import SiteCarousel from './SiteCarousel';

const SiteDetails = ({ siteName, data }) => {
  const [chartType, setChartType] = useState('deviceTypes');

  const handleChange = (event) => {
    setChartType(event.target.value);
  };

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
      </select>
      <SiteCarousel
        data={data}
        chartType={chartType}
      />
    </div>
  );
};

export default SiteDetails;
