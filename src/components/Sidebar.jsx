import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/auth';
import { clearData } from '../store/slices/sites';
import { slide as Menu } from 'react-burger-menu';
const Sidebar = ({ items, onItemClick, onLoginClick, onUserProfileClick }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    if (isLoggedIn) {
      dispatch(clearData());
      dispatch(logout());
    } else {
      onLoginClick();
    }
  };

  useEffect(() => {
    const handleColorSchemeChange = (event) => {
      setIsDarkMode(event.matches);
      const htmlElement = document.querySelector('html');
      if (event.matches) {
        htmlElement.classList.add('dark-mode');
      } else {
        htmlElement.classList.remove('dark-mode');
      }
    };

    const colorSchemeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)',
    );
    setIsDarkMode(colorSchemeMediaQuery.matches);

    colorSchemeMediaQuery.addEventListener('change', handleColorSchemeChange);

    handleColorSchemeChange(colorSchemeMediaQuery);

    return () =>
      colorSchemeMediaQuery.removeEventListener(
        'change',
        handleColorSchemeChange,
      );
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    const htmlElement = document.querySelector('html');
    if (!isDarkMode) {
      htmlElement.classList.add('dark-mode');
    } else {
      htmlElement.classList.remove('dark-mode');
    }
  };

  return (
    <Menu className={`sidebar ${isDarkMode ? 'dark' : ''}`}>
      <div className="sidebar__content">
        <div>
          <h3 className="sidebar__logo">Sites</h3>
          <ul className="sidebar__list">
            {items.map((item, index) => (
              <li
                className="sidebar__list-item"
                key={index}
              >
                <button
                  className="sidebar__list-item-button"
                  onClick={() => onItemClick(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="sidebar__bottom-actions">
          <hr />
          <button
            className="sidebar__toggle-button"
            onClick={handleButtonClick}
          >
            <Icon icon="material-symbols:logout" />
            {isLoggedIn ? 'Log out' : 'Log in'}
          </button>
          {isLoggedIn && (
            <button
              className="sidebar__toggle-button"
              onClick={onUserProfileClick}
            >
              <Icon icon="mdi:account-circle-outline" />
              User Profile
            </button>
          )}

          <button
            className="sidebar__toggle-button"
            onClick={toggleDarkMode}
          >
            <Icon icon="mdi:theme-light-dark" />
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </Menu>
  );
};

export default Sidebar;
