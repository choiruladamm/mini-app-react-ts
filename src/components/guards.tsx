import { AppRoutes } from '@/helpers/navigation';
import { useAppSelector } from '@/hooks/use-app-selector';
import { Navigate, useLocation } from 'react-router-dom';

interface GuardsProps {
  children: React.ReactNode;
}

export const Guards: React.FC<GuardsProps> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={AppRoutes.login} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
