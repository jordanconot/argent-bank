import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userService from '../services/user.service';
import {
  profileError,
  receiveProfile,
  requestProfile,
} from '../slice/sliceProfile';
import { Redirect } from '../utils/Redirect';

const Account = () => {
  const [editMode, setEditMode] = useState(false);
  const [editableProfile, setEditableProfile] = useState({
    firstName: '',
    lastName: '',
  });
  const {
    data: profile,
    isLoading,
    error,
  } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  Redirect();

  useEffect(() => {
    const fetchProfile = async () => {
      dispatch(requestProfile());
      try {
        const response = await userService.getProfile();
        dispatch(receiveProfile(response.body));
        setEditableProfile({
          firstName: response.body.firstName,
          lastName: response.body.lastName,
        });
      } catch (error) {
        dispatch(profileError(error.toString()));
      }
    };
    fetchProfile();
  }, [dispatch]);

  const handleEdit = () => {
    setEditableProfile({
      firstName: profile.firstName,
      lastName: profile.lastName,
    });
    setEditMode(true);
  };

  const handleChange = (e) => {
    setEditableProfile({ ...editableProfile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await userService.updateProfil(editableProfile);
      dispatch(receiveProfile(editableProfile));
      setEditMode(false);
    } catch (error) {
      dispatch(profileError(error.toString()));
    }
  };

  const handleCancel = () => {
    setEditableProfile({
      firstName: profile.firstName,
      lastName: profile.lastName,
    });
    setEditMode(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error... {error}</div>;
  }

  if (!profile) {
    return <div>No profile to display</div>;
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {!editMode && `${profile.firstName} ${profile.lastName}!`}
        </h1>
        {!editMode ? (
          <button className="edit-button" onClick={handleEdit}>
            Edit Name
          </button>
        ) : (
          <div className="container-edit-profile">
            <div className="edit-profile-data">
              <input
                className="edit-profile-input"
                type="text"
                name="firstName"
                placeholder={editableProfile.firstName}
                onChange={handleChange}
              />
              <input
                className="edit-profile-input"
                type="text"
                name="lastName"
                placeholder={editableProfile.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="container-edit-profile-btn">
              <button className="edit-profile-btn" onClick={handleSave}>
                Save
              </button>
              <button className="edit-profile-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default Account;
