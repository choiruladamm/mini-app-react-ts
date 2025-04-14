import {
  AuthCard,
  CenteredContainer,
  Container,
  PageContainer,
} from '@/components/global-styled';
import { useAppSelector } from '@/hooks/use-app-selector';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../../helpers/navigation';
import LoginForm from '../components/login-form';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(AppRoutes.shop);
    }
  }, [isAuthenticated, navigate]);

  return (
    <PageContainer>
      <Container>
        <CenteredContainer>
          <AuthCard>
            <LoginForm />
          </AuthCard>
        </CenteredContainer>
      </Container>
    </PageContainer>
  );
};

export default LoginPage;
