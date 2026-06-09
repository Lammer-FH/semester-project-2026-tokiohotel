import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/LandingPage.vue'),
  },
  {
    path: '/rooms',
    component: () => import('@/views/RoomsPage.vue'),
  },
  {
    path: '/rooms/:id',
    component: () => import('@/views/RoomDetailPage.vue'),
  },
  {
    path: '/rooms/:id/book',
    component: () => import('@/views/BookingPage.vue'),
  },
  {
    path: '/bookings/:id/confirmation',
    component: () => import('@/views/BookingConfirmationPage.vue'),
  },
  {
    path: '/about',
    component: () => import('@/views/AboutPage.vue'),
  },
  {
    path: '/imprint',
    component: () => import('@/views/ImprintPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;