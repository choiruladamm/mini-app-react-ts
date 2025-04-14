import { Guards, NotFoundPage } from '@/components';
import HomePage from '@/features/home/pages/home-page';
import ProductListPage from '@/features/shops/pages/product-list-page';
import TaskPage from '@/features/tasks/pages/task-page';
import { AppRoutes } from '@/helpers/navigation';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './root-layout';
import ShopLayout from './shop-layout';

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
          element: <ShopLayout />,
          children: [
            {
              path: AppRoutes.shop,
              element: <ProductListPage />,
            },
            {
              path: AppRoutes.shopProduct,
              element: <ProductListPage />,
            },
            {
              path: AppRoutes.shopDetail(':id'),
              element: (
                <Guards>
                  <div>ProductDetailPage</div>
                </Guards>
              ),
            },
            {
              path: AppRoutes.cart,
              element: (
                <Guards>
                  <div>CartPage</div>
                </Guards>
              ),
            },
          ],
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
