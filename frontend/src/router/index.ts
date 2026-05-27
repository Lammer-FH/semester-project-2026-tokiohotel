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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
