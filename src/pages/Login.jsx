import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Auth.css";

const Login = ({ setIsAuthenticated, setUsername, setIsAdmin }) => {
  const [username, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdminCheckbox] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isAdmin
        ? `https://grandmasbliss-server.onrender.com/admins?username=${username}&password=${password}`
        : `https://grandmasbliss-server.onrender.com/users?username=${username}&password=${password}`;
      const response = await axios.get(endpoint);

      if (response.data.length > 0) {
        toast.success("Login successful!");
        localStorage.setItem('authToken', 'your-auth-token');
        localStorage.setItem('username', username);
        localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false'); // Store isAdmin as a string
        setIsAuthenticated(true);
        setUsername(username);
        setIsAdmin(isAdmin); // Update isAdmin state in App.jsx

        if (isAdmin) {
          navigate("/admin-dashboard");
        } else {
          navigate("/home");
        }
      } else {
        toast.error("Invalid credentials!");
      }
    } catch (error) {
      toast.error("Login failed!");
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsernameInput(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="isAdmin">
            <input
              type="checkbox"
              id="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdminCheckbox(e.target.checked)}
            />
            Login as Admin
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setIsAdmin: PropTypes.func.isRequired, // New prop for updating isAdmin
};

export default Login;
