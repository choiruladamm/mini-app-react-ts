import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@/components/global-styled';

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 aspect ratio */
  overflow: hidden;
`;

const StyledImage = styled.img<{ isLoaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease, filter 0.5s ease, opacity 0.5s ease;
  filter: ${({ isLoaded }) => (isLoaded ? 'blur(0)' : 'blur(4px)')};
  opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0.7)};

  [data-card-hover]:hover & {
    transform: scale(1.06);
  }
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.gray[100]};
`;

interface ProductImageProps {
  src: string;
  alt: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <ImageWrapper>
      <Placeholder />
      <StyledImage
        src={src}
        alt={alt}
        isLoaded={isLoaded}
        onLoad={handleLoad}
        loading="lazy"
      />
    </ImageWrapper>
  );
};