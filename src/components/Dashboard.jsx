import React, { useState } from 'react';
import TrafficChart from './TrafficChart';
import SiteDetails from './SiteDetails';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const [selectedSite, setSelectedSite] = useState(null);
  const sites = useSelector((state) => state.sites.sites);

  // Group sites by their name
  const groupedSites = sites.reduce((acc, site) => {
    if (!acc[site.name]) {
      acc[site.name] = [];
    }
    acc[site.name].push(site);
    return acc;
  }, {});

  const handleSiteClick = (siteName) => {
    setSelectedSite(groupedSites[siteName]);
  };

  const handleOverviewClick = () => {
    setSelectedSite(null);
  };

  return (
    <div className="content">
      {!selectedSite && <TrafficChart />}

      <Sidebar
        items={Object.keys(groupedSites)}
        onItemClick={handleSiteClick}
      />
      {selectedSite && (
        <>
          <button onClick={handleOverviewClick}>Overview</button>
          <SiteDetails
            siteName={selectedSite[0].name}
            data={selectedSite}
          />
        </>
      )}
    </div>
  );
}
