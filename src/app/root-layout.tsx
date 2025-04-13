import { GlobalStyle } from '@/components/global-styled';
import ReactQueryProvider from '@/providers/react-query-provider';
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
        <ReactQueryProvider>
          <ReduxProvider>
            <PersistGate loading={null} persistor={persistor}>
              <GlobalStyle />
              <Outlet />
            </PersistGate>
          </ReduxProvider>
        </ReactQueryProvider>
      </main>
    </React.Fragment>
  );
};

export default RootLayout;
