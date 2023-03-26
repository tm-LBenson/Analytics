import React, { useState } from 'react';
import TrafficChart from './TrafficChart';
import SiteDetails from './SiteDetails';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { resetDateIndex } from '../store/slices/dateIndex';

import SiteInformation from './SiteInformation';
import LoginForm from './LoginForm';
import SignUpForm from './Signup';
import UserProfile from './UserProfile';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [selectedSite, setSelectedSite] = useState(null);
  const [currentComponent, setCurrentComponent] = useState('SiteInformation');
  const [showUserProfile, setShowUserProfile] = useState(false);
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

  const handleUserProfileClick = () => {
    setShowUserProfile(!showUserProfile);
  };
  const handleSiteClick = (siteName) => {
    setSelectedSite(groupedSites[siteName]);
    dispatch(resetDateIndex());
  };

  const handleOverviewClick = () => {
    setShowUserProfile(false);
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
      {loggedIn && showUserProfile && (
        <>
          <UserProfile />
          <SiteInformation />
        </>
      )}
      {!selectedSite && !showUserProfile && <TrafficChart />}
      {!loggedIn &&
        currentComponent === 'SiteInformation' &&
        !showUserProfile && <SiteInformation />}
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
            onUserProfileClick={handleUserProfileClick}
          />

          {selectedSite?.name ||
            (showUserProfile ? (
              <button onClick={handleOverviewClick}>Site Overview</button>
            ) : null)}
          {selectedSite && !showUserProfile && (
            <>
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
