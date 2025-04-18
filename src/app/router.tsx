import { Guards, NotFoundPage } from '@/components';
import LoginPage from '@/features/auth/pages/login-page';
import RegisterPage from '@/features/auth/pages/register-page';
import CartPage from '@/features/carts/pages/cart-page';
import HomePage from '@/features/home/pages/home-page';
import ProductDetailPage from '@/features/shops/pages/product-detail-page';
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
              path: AppRoutes.shopDetail(':id'),
              element: (
                <Guards>
                  <ProductDetailPage />
                </Guards>
              ),
            },
            {
              path: AppRoutes.cart,
              element: (
                <Guards>
                  <CartPage />
                </Guards>
              ),
            },
          ],
        },
        {
          path: AppRoutes.register,
          element: <RegisterPage />,
        },
        {
          path: AppRoutes.login,
          element: <LoginPage />,
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
