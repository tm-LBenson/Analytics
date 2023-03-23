import React, { useState } from 'react';
import TrafficChart from './TrafficChart';
import SiteDetails from './SiteDetails';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { resetDateIndex } from '../store/slices/dateIndex';

import SiteInformation from './SiteInformation';
import LoginForm from './LoginForm';
import SignUpForm from './Signup';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [selectedSite, setSelectedSite] = useState(null);
  const [currentComponent, setCurrentComponent] = useState('SiteInformation');

  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
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
    dispatch(resetDateIndex());
  };

  const handleOverviewClick = () => {
    setSelectedSite(null);
  };

  const handleLoginClick = () => {
    setCurrentComponent('LoginForm');
  };

  const handleSignupClick = () => {
    setCurrentComponent('SignupForm');
  };

  const handleBackClick = () => {
    setCurrentComponent('LoginForm');
  };

  return (
    <div className="content">
      {!selectedSite && <TrafficChart />}
      {!loggedIn && currentComponent === 'SiteInformation' && (
        <SiteInformation />
      )}
      {!loggedIn && currentComponent === 'LoginForm' && (
        <LoginForm onSignupClick={handleSignupClick} />
      )}
      {!loggedIn && currentComponent === 'SignupForm' && (
        <SignUpForm onBackClick={handleBackClick} />
      )}

      {
        <>
          <Sidebar
            items={Object.keys(groupedSites)}
            onItemClick={handleSiteClick}
            onLoginClick={handleLoginClick}
          />
          {selectedSite && (
            <>
              <button onClick={handleOverviewClick}>Overview</button>
              {loggedIn && (
                <SiteDetails
                  siteName={selectedSite[0].name}
                  data={selectedSite}
                />
              )}
            </>
          )}
        </>
      }
    </div>
  );
}
