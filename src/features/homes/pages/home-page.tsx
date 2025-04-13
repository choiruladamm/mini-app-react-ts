import { SiteHead } from '@/components';
import React from 'react';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  return (
    <SiteHead title="Home">
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          minHeight: '100dvh',
        }}
      >
        Home Page
      </div>
    </SiteHead>
  );
};

export default HomePage;
