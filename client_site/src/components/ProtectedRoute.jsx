
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute(props) {
  if(localStorage.getItem("token")){
      return props.children;
  } else {
       return <Navigate to="/"/>;
  }
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProtectedRoute;
