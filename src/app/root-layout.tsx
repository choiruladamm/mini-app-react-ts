import { GlobalStyle } from '@/components/global-styled';
import { ReduxProvider } from '@/providers/redux-provider';
import { persistor } from '@/stores';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

interface RootLayoutProps {}

const RootLayout: React.FC<RootLayoutProps> = ({}) => {
  return (
    <React.Fragment>
      <main>
        <ReduxProvider>
          <PersistGate loading={null} persistor={persistor}>
            <GlobalStyle />
            <Outlet />
          </PersistGate>
        </ReduxProvider>
      </main>
    </React.Fragment>
  );
};

export default RootLayout;
