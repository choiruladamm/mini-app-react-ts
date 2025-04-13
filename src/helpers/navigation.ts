export const AppRoutes = {
  home: '/',

  todos: '/todos',

  stores: '/stores',

  // exampple
  detail: (slug: string) => `/detail/${slug}`,

  notfound: '*',
};
