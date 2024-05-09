import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    meta: {
      hideForAuth: true,
    },
    children: [
      { path: '/', component: () => import('pages/auth/Beginning.vue') },
      { path: 'login', component: () => import('pages/auth/Login.vue') },
      { path: 'register', component: () => import('pages/auth/Register.vue') },
    ],
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiredAuth: true,
    },
    children: [
      { path: '/home', component: () => import('pages/Home.vue') },
      {
        path: '/profile',
        component: () => import('pages/profile/Profile.vue'),
      },
    ],
  },
  {
    path: '/home',
    component: () => import('layouts/CleanLayout.vue'),
    meta: {
      requiredAuth: true,
    },
    children: [
      {
        path: '/profile/editprofile',
        component: () => import('pages/profile/EditProfile.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
