import { SiteHead } from '@/components';
import { AppRoutes } from '@/helpers/navigation';
import { ListTodo, ShoppingCart } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';
import { HomeCard } from '../components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;

  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(to right, #333, #666);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem auto;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  max-width: 1000px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  return (
    <SiteHead title="Home">
      <HomeContainer>
        <Title>Welcome to Your Mini App</Title>
        <Subtitle>
          Choose where you'd like to go next. Manage your tasks or explore our
          shop with beautiful products.
        </Subtitle>

        <CardsGrid>
          <HomeCard
            title="Shopping Experience"
            description="Browse our collection of curated products. Find everything you need for your home, office, or personal use."
            to={AppRoutes.shop}
            icon={ShoppingCart}
            gradient="linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)"
          />

          <HomeCard
            title="Task Management"
            description="Organize your day with our powerful task management system. Add, edit, and complete tasks to boost your productivity."
            to={AppRoutes.tasks}
            icon={ListTodo}
            gradient="linear-gradient(90deg, hsla(339, 100%, 76%, 1) 0%, hsla(316, 73%, 52%, 1) 100%)"
          />
        </CardsGrid>
      </HomeContainer>
    </SiteHead>
  );
};

export default HomePage;
