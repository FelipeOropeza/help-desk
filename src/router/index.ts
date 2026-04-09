import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: () => import('../layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../pages/auth/Login.vue')
        },
        // Register route would go here
      ]
    },
    {
      path: '/',
      component: () => import('../layouts/DashboardLayout.vue'),
      children: [
          {
            path: '',
            redirect: '/dashboard'
          },
          {
            path: 'dashboard',
            name: 'dashboard',
            component: () => import('../pages/dashboard/Dashboard.vue')
          },
          {
            path: 'tickets',
            name: 'tickets-list',
            component: () => import('../pages/tickets/TicketList.vue')
          },
          {
            path: 'tickets/new',
            name: 'tickets-create',
            component: () => import('../pages/tickets/TicketCreate.vue')
          },
          {
            path: 'tickets/:id',
            name: 'tickets-detail',
            component: () => import('../pages/tickets/TicketDetail.vue')
          }
      ]
    }
  ]

})

export default router
