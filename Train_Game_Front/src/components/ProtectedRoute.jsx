import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from './useLocalStorage';

const ProtectedRoute = ({ children }) => {
  const history = useNavigate();
  const { isLogged } = useLocalStorage(); // Assuming you have a function to check if the user is logged in

  useEffect(() => {
    if (!isLogged()) {
      history('/login');
    }
  }, [history, isLogged]);

  return <>{children}</>;
};

export default ProtectedRoute;