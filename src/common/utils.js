import React from 'react';

export const getInitUserContext = () => {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user') || '');
  } catch (_) {
    user = undefined;
  }
  return user;
};

const UserContext = React.createContext();

export default UserContext;
