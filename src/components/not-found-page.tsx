/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { ArrowLeft, Ghost, Home } from 'lucide-react';
import { Button } from '@chakra-ui/react';

const breakpoints = {
  sm: '@media (min-width: 640px)',
  md: '@media (min-width: 768px)',
};

const bounceAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #f9fafb, #f3f4f6);
  padding: 1rem;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 32rem;
  text-align: center;
  padding: 0 1rem;

  ${breakpoints.md} {
    max-width: 42rem;
    padding: 0 2rem;
  }
`;

const AnimationContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;

  ${breakpoints.md} {
    margin-bottom: 3rem;
  }
`;

const AnimatedGhost = styled(Ghost)`
  margin: 0 auto;
  height: 4rem;
  width: 4rem;
  animation: ${bounceAnimation} 1s infinite;

  ${breakpoints.md} {
    height: 6rem;
    width: 6rem;
  }
`;

const DecorativeCircle = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  opacity: 0.2;
  filter: blur(12px);
`;

const IndigoCircle = styled(DecorativeCircle)`
  width: 12rem;
  height: 12rem;
  background-color: #a5b4fc;

  ${breakpoints.md} {
    width: 16rem;
    height: 16rem;
  }
`;

const PurpleCircle = styled(DecorativeCircle)`
  width: 8rem;
  height: 8rem;
  background-color: #d8b4fe;

  ${breakpoints.md} {
    width: 12rem;
    height: 12rem;
  }
`;

const titleStyles = css`
  margin-bottom: 0.5rem;
  font-size: 2.25rem;
  font-weight: bold;
  color: #111827;

  ${breakpoints.md} {
    margin-bottom: 1rem;
    font-size: 3.75rem;
  }
`;

const subtitleStyles = css`
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;

  ${breakpoints.md} {
    margin-bottom: 1rem;
    font-size: 1.875rem;
  }
`;

const descriptionStyles = css`
  margin: 0 auto 1.5rem;
  max-width: 24rem;
  font-size: 0.875rem;
  color: #4b5563;

  ${breakpoints.md} {
    margin-bottom: 2rem;
    font-size: 1rem;
  }
`;

const buttonContainerStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;

  ${breakpoints.sm} {
    flex-direction: row;
  }
`;

interface NotFoundPageProps {}

export const NotFoundPage: React.FC<NotFoundPageProps> = () => {
  return (
    <PageContainer>
      <ContentWrapper>
        <AnimationContainer>
          <AnimatedGhost />
          <IndigoCircle />
          <PurpleCircle />
        </AnimationContainer>

        <h1 css={titleStyles}>404</h1>
        <h2 css={subtitleStyles}>Page Not Found</h2>
        <p css={descriptionStyles}>
          Oops! The page you're looking for seems to have vanished into thin
          air. Don't worry, you can find your way back home.
        </p>

        <div css={buttonContainerStyles}>
          <Button onClick={() => window.location.href = '/'}>
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
          <Button variant="outline" onClick={() => {
            window.history.back();
          }}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </ContentWrapper>
    </PageContainer>
  );
};

export default NotFoundPage;