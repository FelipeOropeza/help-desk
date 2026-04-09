<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus, Search, Filter } from 'lucide-vue-next'
import Button from '../../components/common/Button.vue'
import BadgeStatus from '../../components/common/BadgeStatus.vue'

const tickets = ref([
  { id: 1, code: 'ORD-7829', title: 'License upgrade request', status: 'open', priority: 'high', category: 'Billing', date: '2023-10-25' },
  { id: 2, code: 'ORD-7828', title: 'System downtime report', status: 'pending', priority: 'critical', category: 'Technical', date: '2023-10-24' },
  { id: 3, code: 'ORD-7827', title: 'New user onboarding', status: 'closed', priority: 'low', category: 'Access', date: '2023-10-23' },
  { id: 4, code: 'ORD-7826', title: 'Billing question', status: 'open', priority: 'medium', category: 'Billing', date: '2023-10-22' },
  { id: 5, code: 'ORD-7825', title: 'Feature request: Dark mode', status: 'closed', priority: 'low', category: 'Product', date: '2023-10-20' },
])

const searchQuery = ref('')
const statusFilter = ref('all')

const filteredTickets = computed(() => {
  return tickets.value.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          ticket.code.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || ticket.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">My Orders</h1>
      <Button variant="primary" @click="$router.push('/tickets/new')">
        <Plus class="w-4 h-4 mr-2" />
        New Order
      </Button>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4 justify-between">
      <div class="relative flex-1 max-w-md">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search orders..." 
          class="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        >
      </div>
      <div class="flex items-center gap-2">
        <Filter class="w-4 h-4 text-gray-500" />
        <select 
          v-model="statusFilter"
          class="border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="closed">Closed</option>
        </select>
      </div>
    </div>

    <!-- Ticket List -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
            <tr v-for="ticket in filteredTickets" :key="ticket.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="font-medium text-gray-900 dark:text-white">{{ ticket.code }}</span>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm text-gray-900 dark:text-white font-medium">{{ ticket.title }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  {{ ticket.category }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <BadgeStatus :status="ticket.status" />
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ ticket.date }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <Button variant="ghost" size="sm" @click="$router.push(`/tickets/${ticket.id}`)">
                  View
                </Button>
              </td>
            </tr>
            <tr v-if="filteredTickets.length === 0">
              <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                No orders found matching your criteria.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination (Mock) -->
      <div class="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <p class="text-sm text-gray-500">Showing <span class="font-medium">1</span> to <span class="font-medium">{{ filteredTickets.length }}</span> of <span class="font-medium">{{ filteredTickets.length }}</span> results</p>
        <div class="flex gap-2">
          <Button variant="secondary" size="sm" disabled>Previous</Button>
          <Button variant="secondary" size="sm" disabled>Next</Button>
        </div>
      </div>
    </div>
  </div>
</template>
