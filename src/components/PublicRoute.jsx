
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element, isAuthenticated }) => {
  return !isAuthenticated ? element : <Navigate to="/home" />;
};

PublicRoute.propTypes = {
  element: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default PublicRoute;