export const AppRoutes = {
  home: '/',

  tasks: '/tasks',

  shop: '/shop',
  shopDetail: (id: string | number) => `/shop/${id}`,

  cart: '/cart',

  login: '/login',
  register: '/register',

  notfound: '*',
};
