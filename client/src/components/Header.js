import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="header-nav-wrap">
      <div className="header-brand">
        <span className="header-logo-icon">F</span>
        <span className="header-logo-text">
          FinTrack<span className="header-logo-dot">.</span>
        </span>
        <span className="header-badge">DASHBOARD</span>
      </div>

      {user && (
        <div className="header-user-actions">
          <div className="user-profile-badge">
            <span className="user-avatar-circle">
              {user.name ? user.name[0].toUpperCase() : 'U'}
            </span>
            <div className="user-info-text">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>
          </div>

          <button className="logout-btn" onClick={logout} title="Sign out of account">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};
