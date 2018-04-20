import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/User'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/my',
      name: 'User',
      component: User
    },
    {
      path: '/',
      redirect: {
        path: '/login'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
