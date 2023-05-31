import React, { useEffect } from 'react';
import axios from 'axios';
import userStore from './userStore';
import { Link, useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('jwtToken');
    // Update the userStore to reflect logout
    userStore.logOutUser();
    // Perform any additional logout logic, e.g., inform the server to delete the JWT token -- not sure if we HAVE to do that though
    // Redirect the user to the login page
    //navigate('/login');
  };

  const jwtToken = localStorage.getItem('jwtToken');

  return (
    <div>
      {jwtToken ? (
        <p>You have been logged out. Click <Link to="/login">here</Link> for the login page.</p>
      ) : (
        <p>You are already logged out.</p>
      )}
    </div>
  );
};

export default Logout;
