import React, { useEffect, useState } from 'react';
import TrafficChart from './TrafficChart';
import SiteDetails from './SiteDetails';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { resetDateIndex } from '../store/slices/dateIndex';

import SiteInformation from './SiteInformation';
import LoginForm from './LoginForm';
import SignUpForm from './Signup';
import UserProfile from './UserProfile';
import LargeSidebar from './DesktopSidebar';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [selectedSite, setSelectedSite] = useState(null);
  const [currentComponent, setCurrentComponent] = useState('SiteInformation');
  const [showUserProfile, setShowUserProfile] = useState(false);
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const sites = useSelector((state) => state.sites.sites);
  const { signedUp } = useSelector((state) => state.auth);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//
  // Group sites by their name
  const groupedSites = sites.reduce((acc, site) => {
    if (!acc[site.name]) {
      acc[site.name] = [];
    }
    acc[site.name].push(site);
    return acc;
  }, {});
  useEffect(() => {
    if (signedUp) {
      setShowUserProfile(true);
    }
  }, [signedUp]);

  useEffect(() => {
    if (!loggedIn) {
      setShowUserProfile(false);
    }
  }, [loggedIn]);
  useEffect(() => {
    if (sites.length === 0 && loggedIn) {
      setShowUserProfile(true);
    } else {
      setShowUserProfile(false);
    }
  }, [sites]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleUserProfileClick = () => {
    setShowUserProfile(!showUserProfile);
  };
  const handleSiteClick = (siteName) => {
    setShowUserProfile(false);
    setSelectedSite(groupedSites[siteName]);
    dispatch(resetDateIndex());
  };

  const handleOverviewClick = () => {
    setShowUserProfile(false);
    setSelectedSite(null);
  };

  const handleLoginClick = () => {
    setShowUserProfile(false);
    setCurrentComponent('LoginForm');
  };

  const handleSignupClick = () => {
    setShowUserProfile(false);
    setCurrentComponent('SignupForm');
  };

  const handleBackClick = () => {
    setShowUserProfile(false);
    setCurrentComponent('LoginForm');
  };

  return (
    <div className="content">
      {loggedIn && showUserProfile && (
        <>
          <UserProfile />
          <SiteInformation
            onSignupClick={handleSignupClick}
            onLoginClick={handleLoginClick}
          />
        </>
      )}
      {!selectedSite && !showUserProfile && <TrafficChart />}
      {!loggedIn &&
        currentComponent === 'SiteInformation' &&
        !showUserProfile && (
          <SiteInformation
            onSignupClick={handleSignupClick}
            onLoginClick={handleLoginClick}
          />
        )}
      {!loggedIn && currentComponent === 'LoginForm' && (
        <LoginForm onSignupClick={handleSignupClick} />
      )}
      {!loggedIn && currentComponent === 'SignupForm' && (
        <SignUpForm onBackClick={handleBackClick} />
      )}

      {
        <>
          {isMobile ? (
            <Sidebar
              items={Object.keys(groupedSites)}
              onItemClick={handleSiteClick}
              onLoginClick={handleLoginClick}
              onUserProfileClick={handleUserProfileClick}
            />
          ) : (
            <LargeSidebar
              items={Object.keys(groupedSites)}
              onItemClick={handleSiteClick}
              onLoginClick={handleLoginClick}
              onUserProfileClick={handleUserProfileClick}
            />
          )}

          {selectedSite || showUserProfile ? (
            <button onClick={handleOverviewClick}>Site Overview</button>
          ) : null}

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
