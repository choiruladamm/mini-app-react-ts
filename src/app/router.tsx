import { NotFoundPage } from '@/components';
import HomePage from '@/features/homes/pages/home-page';
import { AppRoutes } from '@/helpers/navigation';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './root-layout';
import TaskPage from '@/features/tasks/pages/task-page';

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
          path: AppRoutes.tasks,
          element: <TaskPage />,
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
