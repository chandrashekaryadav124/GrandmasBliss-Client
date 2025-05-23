import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import CartLink from './CartLink';

const Header = ({ isAuthenticated, isAdmin, username, email, bio, onLogout, profileImage }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    onLogout();
  };

  const handleEditProfile = () => {
    navigate('/profile');
  };

  return (
    <header className="header">
      <div className="logo">
        <span role="img" aria-label="sweets" className="logo-icon">🍯</span>
        <span className="logo-text">Grandma’s Bliss</span>
      </div>
      <nav>
        <ul className="nav-links">
          {isAuthenticated && isAdmin ? (
            // Admin-specific navigation
            [
              { name: "Home", path: "/home" },
              { name: "About Us", path: "/about" },
              { name: "Dashboard", path: "/admin-dashboard" },
              { name: "Products", path: "/products" },
            ].map((item) => (
              <li key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className={isActive(item.path) ? "nav-link active" : "nav-link"}
                >
                  {item.name}
                </Link>
              </li>
            ))
          ) : (
            // Regular navigation
            [
              { name: "Home", path: "/home" },
              { name: "About", path: "/about" },
              { name: "Products", path: "/products" },
              { name: "BulkOrder", path: "/bulkorder" },
              { name: "Gallery", path: "/gallery" }
            ].map((item) => (
              <li key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className={isActive(item.path) ? "nav-link active" : "nav-link"}
                >
                  {item.name}
                </Link>
              </li>
            ))
          )}
        </ul>
      </nav>
      {/* CartLink is only visible for non-admin users */}
      {!isAdmin && <CartLink isAuthenticated={isAuthenticated} />}
      {isAuthenticated ? (
        <div className="profile-dropdown">
          <img
            src={profileImage || "/default-profile.png"} // Default profile image
            alt="Profile"
            className="profile-image"
          />
          <div className="dropdown-menu">
            <div className="dropdown-item">
              <p><strong>Username:</strong> {username}</p>
              <p><strong>Email:</strong> {email}</p>
              {bio && <p><strong>Bio:</strong> {bio}</p>}
            </div>
            <button onClick={handleEditProfile} className="dropdown-item-edit">Edit Profile</button>
            <button onClick={handleLogout} className="dropdown-item-logout">Logout</button>
          </div>
        </div>
      ) : (
        <div className="auth-links">
          <Link to="/login" className="auth-link">Login</Link>
          <Link to="/register" className="auth-link">Register</Link>
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool, // New prop for admin status
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  bio: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
  profileImage: PropTypes.string,
};

export default Header;
