import { createRouter, createWebHistory } from 'vue-router'
// Public Routes
import LoginView from '../views/Public/LoginView.vue';
// Private Routes
import HomeView from '../views/HomeView.vue'
import EspeciesView from '../views/EspeciesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //? Public routes
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    //? Authentication routes
    {
      path: '/admin/especies',
      name: 'especies',
      component: EspeciesView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
