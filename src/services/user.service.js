import axios from 'axios';
import { getUserFromStorage } from '../utils/GetUserFromStorage';

const API_URL = 'http://localhost:3001/api/v1/user/';

const getProfile = async () => {
  const user = getUserFromStorage();
  if (user && user.token) {
    const response = await axios.post(
      API_URL + 'profile',
      {},
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  }
  throw new Error('No token found');
};

const updateProfil = async (profileData) => {
  const user = getUserFromStorage();
  if (user && user.token) {
    try {
      const response = await axios.put(API_URL + 'profile', profileData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to update profile', error);
      throw error;
    }
  } else {
    throw new Error('No token foud');
  }
};

const userService = {
  getProfile,
  updateProfil,
};

export default userService;
