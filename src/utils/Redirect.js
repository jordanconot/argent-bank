import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFromStorage } from './GetUserFromStorage';

export const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getUserFromStorage();
    if (!token) {
      navigate('/');
    }
  });
};
