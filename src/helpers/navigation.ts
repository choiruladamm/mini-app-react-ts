export const AppRoutes = {
  home: '/',

  tasks: '/tasks',

  stores: '/stores',

  // exampple
  detail: (slug: string) => `/detail/${slug}`,

  notfound: '*',
};
