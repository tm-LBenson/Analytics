import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

const Sidebar = ({ items, onItemClick }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleLogin = (loggedInState) => {
    setLoggedIn(loggedInState);
    setShowLoginForm(false);
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
    <div className={`sidebar ${isDarkMode ? 'dark' : ''}`}>
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
          onClick={toggleLoginForm}
        >
          {loggedIn ? 'Log out' : 'Log in'}
        </button>
        <button
          className="sidebar__toggle-button"
          onClick={toggleDarkMode}
        >
          <Icon icon="mdi:theme-light-dark" />
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
