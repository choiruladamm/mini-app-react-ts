import { NotFoundPage } from '@/components';
import HomePage from '@/features/homes/pages/home-page';
import StorePage from '@/features/stores/pages/store-page';
import TodoPage from '@/features/todos/pages/todo-page';
import { AppRoutes } from '@/helpers/navigation';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './root-layout';

const RootRouter: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: AppRoutes.home,
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: AppRoutes.todos,
          element: <TodoPage />,
        },
        {
          path: AppRoutes.stores,
          element: <StorePage />,
        },
        {
          path: AppRoutes.notfound,
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RootRouter;
