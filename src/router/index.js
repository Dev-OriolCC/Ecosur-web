import { createRouter, createWebHistory } from 'vue-router'
// Public Routes
import LoginView from '../views/Public/LoginView.vue';
// Private Routes
import HomeView from '../views/HomeView.vue'
import EspeciesView from '../views/EspeciesView.vue';
import { isLoggedIn } from '../utils/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //? Public routes
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: {
        allowAnonymous: true
      }
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

// Guard for the login redirect
router.beforeEach((to, from, next) => {
  if(to.name == 'login' && isLoggedIn()) {
    next({ path: '/admin/especies'}) // If logged in can't reach login page = redirect to home
  }
  else if (!to.meta.allowAnonymous && !isLoggedIn()) {
    next({
      path: '/', // Este es vuestro login
      // query: { redirect: to.fullPath }
    })
  }
  else {
    next()
  }
})


export default router
