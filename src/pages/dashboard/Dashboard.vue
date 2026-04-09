<script setup lang="ts">
import { ref } from 'vue'
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  ArrowRight
} from 'lucide-vue-next'
import Button from '../../components/common/Button.vue'
import BadgeStatus from '../../components/common/BadgeStatus.vue'

const stats = [
  { name: 'Open Orders', value: '12', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/20' },
  { name: 'In Progress', value: '4', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/20' },
  { name: 'Completed', value: '156', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20' },
  { name: 'Avg. Response', value: '2h', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/20' },
]

const recentTickets = ref([
  { id: '#ORD-7829', title: 'License upgrade request', status: 'open', date: '2 mins ago', priority: 'high' },
  { id: '#ORD-7828', title: 'System downtime report', status: 'pending', date: '1 hour ago', priority: 'critical' },
  { id: '#ORD-7827', title: 'New user onboarding', status: 'closed', date: 'Yesterday', priority: 'low' },
  { id: '#ORD-7826', title: 'Billing question', status: 'open', date: 'Yesterday', priority: 'medium' },
])
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
      </div>
      <div>
        <Button variant="primary" @click="$router.push('/tickets/new')">
          + New Order
        </Button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="stat in stats" :key="stat.name" class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div class="flex items-center">
          <div :class="['p-3 rounded-lg', stat.bg, stat.color]">
            <component :is="stat.icon" class="w-6 h-6" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ stat.name }}</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity & Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Recent Tickets -->
      <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div class="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">Recent Orders</h2>
          <router-link to="/tickets" class="text-sm text-blue-600 hover:text-blue-500 font-medium inline-flex items-center">
            View All <ArrowRight class="w-4 h-4 ml-1" />
          </router-link>
        </div>
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
          <div v-for="ticket in recentTickets" :key="ticket.id" class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="flex-shrink-0">
                  <span class="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                    {{ ticket.id.split('-')[1] }}
                  </span>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ ticket.title }}</h4>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-xs text-gray-500">{{ ticket.id }}</span>
                    <span class="text-gray-300 dark:text-gray-600">•</span>
                    <span class="text-xs text-gray-500">{{ ticket.date }}</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                 <BadgeStatus :status="ticket.status" />
                 <Button variant="ghost" size="sm" class="hidden sm:inline-flex">View</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Tips / SLA Status -->
      <div class="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
        <div class="flex items-start justify-between mb-4">
          <h3 class="font-bold text-lg">Priority Support</h3>
          <span class="bg-white/20 px-2 py-1 rounded text-xs font-medium">Pro Plan</span>
        </div>
        <p class="text-blue-100 mb-6 text-sm">
          Your current plan includes 24/7 priority support with 1 hour response time guarantee.
        </p>
        <div class="space-y-4">
          
          <div class="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div class="flex items-center gap-2 mb-1">
              <AlertCircle class="w-4 h-4 text-emerald-300" />
              <span class="font-medium text-sm">System Status</span>
            </div>
            <p class="text-xs text-blue-100">All systems operational</p>
          </div>
          
           <div class="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div class="flex items-center gap-2 mb-1">
              <Clock class="w-4 h-4 text-amber-300" />
              <span class="font-medium text-sm">Avg Response Time</span>
            </div>
            <p class="text-xs text-blue-100">~ 25 minutes</p>
          </div>
        </div>
        
        <Button variant="secondary" size="md" class="w-full mt-6 border-none bg-white text-blue-700 hover:bg-blue-50">
          Upgrade Plan
        </Button>
      </div>
    </div>
  </div>
</template>
