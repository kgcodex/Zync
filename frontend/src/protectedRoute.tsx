import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from './store/hooks';

const ProtectedRoute = () => {
  const { name } = useAppSelector((state) => state.user);
  const location = useLocation();

  if (!name) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
