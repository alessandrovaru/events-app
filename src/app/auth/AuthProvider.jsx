'use client';

import React from 'react';
import {AuthContext} from './AuthContext';


export const AuthProvider = ({
  user,
  children
}) => {
  return (
    <AuthContext.Provider
      value={{
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};