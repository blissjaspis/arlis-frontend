import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ServiceView from '../views/ServiceView.vue'
import DashboardView from '../views/DashboardView.vue'
import UserView from '../views/UserView.vue'
import RegisterView from '@/views/RegisterView.vue'
import InformationView from '@/views/InformationView.vue'
import OrderView from '@/views/OrderView.vue'
import MemberView from '@/views/MemberView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/user',
      name: 'user',
      component: UserView
    },
    {
      path: '/service',
      name: 'service',
      component: ServiceView
    },
    {
      path: '/information',
      name: 'information',
      component: InformationView
    },
    {
      path: '/order',
      name: 'order',
      component: OrderView
    },
    {
      path: '/member',
      name: 'member',
      component: MemberView
    }
  ]
})

export default router
