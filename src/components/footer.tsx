import React from 'react';
import styled from 'styled-components';
import { Container, theme } from './global-styled';

const FooterContainer = styled.footer`
  background-color: ${theme.colors.gray[50]};
  padding: 16px 0;
  margin-top: 40px;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.gray[600]};
  font-size: 14px;
`;

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterContent>© 2025 My Shop</FooterContent>
      </Container>
    </FooterContainer>
  );
};
