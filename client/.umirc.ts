import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/mainLayout',
      routes: [
        { path: '/', component: '@/pages/home/index', exact: true },
        {
          path: '/home',
          component: '@/pages/home/index',
        },
        {
          path: '/stats',
          component: '@/pages/stats/index',
        },
        {
          path: '/sessions/:sessionId',
          component: '@/pages/sessions/[sessionId]/index',
        },
      ],
    },
  ],
});
