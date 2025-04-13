import { Provider as ChakraProvider } from '@/components/ui/provider';
import ReactQueryProvider from '@/providers/react-query-provider';
import React from 'react';
import { Outlet } from 'react-router-dom';

interface RootLayoutProps {}

const RootLayout: React.FC<RootLayoutProps> = ({}) => {
  return (
    <React.Fragment>
      <main>
        <ReactQueryProvider>
          <ChakraProvider defaultTheme="light">
            <Outlet />
          </ChakraProvider>
        </ReactQueryProvider>
      </main>
    </React.Fragment>
  );
};

export default RootLayout;
