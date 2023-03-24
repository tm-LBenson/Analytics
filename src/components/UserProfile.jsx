import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';

const UserProfile = () => {
  const user = useSelector((state) => state.auth);
  const [showClientId, setShowClientId] = useState(false);
  const [copied, setCopied] = useState(false);
  const toggleClientIdVisibility = () => {
    setShowClientId(!showClientId);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true);
        console.log('Client ID copied to clipboard');
      },
      (err) => {
        console.error('Could not copy Client ID: ', err);
      },
    );
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p>Username: {user.user}</p>
      {showClientId && (
        <p>
          Client ID: {user.clientId}{' '}
          {!copied ? (
            <Icon
              icon="mdi:clipboard-multiple-outline"
              onClick={() => copyToClipboard(user.clientId)}
              className="clipboard-icon"
            />
          ) : (
            <Icon
              icon="mdi:clipboard-check-multiple"
              color="green"
              onClick={() => copyToClipboard(user.clientId)}
              className="clipboard-icon"
            />
          )}
        </p>
      )}
      <button onClick={toggleClientIdVisibility}>
        {showClientId ? 'Hide Client ID' : 'Show Client ID'}
      </button>
    </div>
  );
};

export default UserProfile;
