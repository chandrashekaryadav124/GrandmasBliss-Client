import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isAuthenticated, adminOnly = false }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!isAuthenticated || (adminOnly && !isAdmin)) {
    return <Navigate to="/login" />;
  }

  return element;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  adminOnly: PropTypes.bool,
};

export default PrivateRoute;