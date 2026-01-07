import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../services/authService';

const ProtectedRoute = ({ requiredRole = null, redirectPath = '/login' }) => {
  if (!isAuthenticated()) {
    return <Navigate to={redirectPath} replace />;
  }

  const user = JSON.parse(localStorage.getItem('user'));
  
  if (requiredRole && user?.userType !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
