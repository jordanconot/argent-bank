import axios from 'axios';
import { clearProfile } from '../slice/sliceProfile';
import { loginFailure, loginSuccess, logout as logoutAction } from '../slice/sliceUser';
import { store } from '../store/configureStore';

const API_URL = 'http://localhost:3001/api/v1/user/';

const login = async (email, password, rememberMe = false) => {
  try {
    const response = await axios.post(API_URL + 'login', {
      email,
      password,
    });
    if (response.data && response.data.body && response.data.body.token) {
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(response.data.body));
      } else {
        sessionStorage.setItem('user', JSON.stringify(response.data.body));
      }
      store.dispatch(loginSuccess(response.data.body));
    }
  } catch (error) {
    store.dispatch(loginFailure('Incorrect email or password'));
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('user');
  sessionStorage.removeItem('user');
  store.dispatch(logoutAction());
  store.dispatch(clearProfile());
};

const authService = {
  login,
  logout,
};

export default authService;
