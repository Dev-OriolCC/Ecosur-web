import { createRouter, createWebHistory } from 'vue-router'
// Public Routes
import LoginView from '../views/Public/LoginView.vue';
// Private Routes
import EspeciesView from '../views/EspeciesView.vue';

// Metodo para verificar si el usuario ya inicio sesión
import { isLoggedIn } from '../utils/auth';

// En este archivo se definen todas las rutas asi como las que son protegidas

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
    //? Authentication routes [Needs to login first]
    {
      path: '/admin/especies',
      name: 'especies',
      component: EspeciesView
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
