import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
  Button,
  ErrorMessage,
  FormGroup,
  Input,
  Label,
  theme,
} from '@/components/global-styled';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { AppRoutes } from '../../../helpers/navigation';
import { loginUser } from '../store/auth-slice';

const FormContainer = styled.form`
  width: 100%;
  max-width: 400px;
`;

const FormTitle = styled.h2`
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

const FormFooter = styled.div`
  margin-top: 16px;
  text-align: center;
`;

const FormLink = styled.span`
  color: ${theme.colors.primary[500]};
  cursor: pointer;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const validateForm = (): boolean => {
    const errors = {
      email: '',
      password: '',
    };
    let isValid = true;

    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(loginUser({ email, password }));
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Sign in to your account</FormTitle>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
        />
        {formErrors.email && <ErrorMessage>{formErrors.email}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
        />
        {formErrors.password && (
          <ErrorMessage>{formErrors.password}</ErrorMessage>
        )}
      </FormGroup>

      <Button
        type="submit"
        disabled={isLoading}
        $variant="primary"
        style={{
          width: '100%',
        }}
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>

      <FormFooter>
        Don't have an account?{' '}
        <FormLink onClick={() => navigate(AppRoutes.register)}>
          Sign up
        </FormLink>
      </FormFooter>
    </FormContainer>
  );
};

export default LoginForm;
