
import Home from '../views/Home.vue'
import Profile from '@/components/Profile'
import Login from '@/components/Login'

export default {
  routes: [
    {
    path: '/home',
    name: 'Home',
    component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/success',
      name: 'Success',
      component: () => import(/* webpackChunkName: "votermap" */ '../components/HelloWorld.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
}