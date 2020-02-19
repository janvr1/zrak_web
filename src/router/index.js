import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Home'
    }
  },

  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },

  {
    path: '/account',
    name: 'Account',
    component: () => import('@/views/AccountView')
  },

  {
    path: '/device/:id',
    name: 'DeviceSingle',
    component: () => import('@/views/DeviceView')
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView')
  },

  {
    path: '/register',
    name: 'Register',
    component: () => import ('@/views/RegistrationView')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    if (store.getters.authorized == "true") next('/home');
    else next();

  } else {
    if (store.getters.authorized == "true") next();
    else next('/login');
  }

})

export default router
