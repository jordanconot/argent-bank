import { faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';
import userService from '../services/user.service';
import {
  profileError,
  receiveProfile,
  requestProfile,
} from '../slice/sliceProfile';
import { logout } from '../slice/sliceUser';

const Navbar = ({ isPageCustomer }) => {
  const profile = useSelector((state) => state.profile.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      dispatch(requestProfile());
      try {
        const response = await userService.getProfile();
        dispatch(receiveProfile(response.body));
      } catch (error) {
        dispatch(profileError(error.toString()));
      }
    };
    if (!profile) {
      loadProfile();
    }
  }, [dispatch, profile]);


  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="../../assets/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="flex">
        {profile ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <FontAwesomeIcon icon={faUserCircle} />
              {profile.firstName}
            </Link>
            {isPageCustomer && (
              <button
                className="main-nav-item button-border"
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Sign Out
              </button>
            )}
          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            <FontAwesomeIcon icon={faUserCircle} />
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isPageCustomer: PropTypes.bool,
};

export default Navbar;
