import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LucideIcon } from 'lucide-react';

interface HomeCardProps {
  title: string;
  description: string;
  to: string;
  icon: LucideIcon;
  gradient: string;
}

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;
  height: 100%;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  }

  &:hover .icon-container {
    transform: scale(1.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    opacity: 0.9;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
  color: white;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  text-align: center;
`;

const Description = styled.p`
  text-align: center;
  color: #6b7280;
  font-size: 1rem;
  line-height: 1.5;
`;

export const HomeCard: React.FC<HomeCardProps> = ({
  title,
  description,
  to,
  icon: Icon,
  gradient,
}) => {
  return (
    <Card
      to={to}
      style={{
        background: 'white',
      }}
    >
      <IconContainer
        className="icon-container"
        style={{
          background: gradient,
        }}
      >
        <Icon size={24} />
      </IconContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  );
};
