import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Import the new CSS file

const Profile = ({ username, email, bio, onLogout }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newUsername, setNewUsername] = useState(username);
  const [newAddress, setNewAddress] = useState('');

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Add logic to save new password, username, and address
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      <p><strong>Username:</strong> {username}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Bio:</strong> {bio || 'No bio available'}</p>
      {isEditing ? (
        <div className="profile-edit">
          <div className="profile-field">
            <label>New Username:</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>
          <div className="profile-field">
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="profile-field">
            <label>New Address:</label>
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />
          </div>
          <div className="profile-buttons">
            <button onClick={handleSave} className="btn-save">Save</button>
            <button onClick={handleCancel} className="btn-cancel">Cancel</button>
          </div>
        </div>
      ) : (
        <button onClick={handleEdit} className="btn-edit">Edit Profile</button>
      )}
      <button onClick={handleLogout} className="btn-logout">Logout</button>
    </div>
  );
};

Profile.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  bio: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
};

export default Profile;
