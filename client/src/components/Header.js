import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="header-row">
      <h2>Smart Expense Tracker</h2>
      {user && (
        <div className="user-box">
          <span>Hi, {user.name}</span>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
