
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import RegisterForm from '../components/register-form';
import { AppRoutes } from '../../../helpers/navigation';
import { useAppSelector } from '@/hooks/use-app-selector';
import { AuthCard, CenteredContainer, Container, PageContainer } from '@/components/global-styled';

const RegisterPage: React.FC = () => {
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
            <RegisterForm />
          </AuthCard>
        </CenteredContainer>
      </Container>
    </PageContainer>
  );
};

export default RegisterPage;
