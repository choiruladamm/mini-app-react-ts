import { Footer, Header } from '@/components';
import React from 'react';
import { Outlet } from 'react-router-dom';

interface ShopLayoutProps {}

const ShopLayout: React.FC<ShopLayoutProps> = ({}) => {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

export default ShopLayout;
