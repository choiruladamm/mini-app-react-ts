export const AppRoutes = {
  home: '/',

  tasks: '/tasks',

  shop: '/shop',
  shopProduct: '/shop/products',
  shopDetail: (id: string | number) => `/shop/${id}`,

  cart: '/cart',

  login: '/login',
  register: '/register',

  notfound: '*',
};
