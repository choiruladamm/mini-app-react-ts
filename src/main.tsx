import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RootRouter from './app/router.tsx';
import './globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootRouter />
  </StrictMode>
);
