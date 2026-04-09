<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'
import { useTenantStore } from '../stores/tenant.store'
import { 
  LayoutDashboard, 
  Ticket, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const tenantStore = useTenantStore()
const isSidebarOpen = ref(false)

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Tickets', href: '/tickets', icon: Ticket },
  { name: 'Settings', href: '/settings', icon: Settings },
]

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function handleLogout() {
  authStore.logout()
  router.push('/auth/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
    <!-- Mobile Sidebar Backdrop -->
    <div v-if="isSidebarOpen" class="fixed inset-0 bg-gray-900/50 z-40 lg:hidden" @click="isSidebarOpen = false"></div>

    <!-- Sidebar -->
    <aside 
      class="fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out lg:transform-none"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="h-full flex flex-col">
        <!-- Logo -->
        <div class="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">S</div>
            <span>{{ tenantStore.tenant.name }}</span>
          </div>
          <button class="ml-auto lg:hidden text-gray-500" @click="isSidebarOpen = false">
            <X class="w-6 h-6" />
          </button>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-6 space-y-1">
          <router-link 
            v-for="item in navigation" 
            :key="item.name" 
            :to="item.href"
            class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors"
            :class="[
              $route.path.startsWith(item.href) 
                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            ]"
          >
            <component :is="item.icon" class="w-5 h-5" />
            {{ item.name }}
          </router-link>
        </nav>

        <!-- User Profile / Logout -->
        <div class="p-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center gap-3 mb-4 px-2">
            <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold">
              U
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 dark:text-white truncate">User Name</p>
              <p class="text-xs text-gray-500 truncate">user@example.com</p>
            </div>
          </div>
          <button 
            @click="handleLogout"
            class="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors"
          >
            <LogOut class="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Top Header -->
      <header class="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 lg:px-8">
        <button class="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" @click="toggleSidebar">
          <Menu class="w-6 h-6" />
        </button>
        
        <div class="flex items-center gap-4 ml-auto">
             <button class="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg relative">
                 <Bell class="w-5 h-5" />
                 <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
             </button>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-auto p-4 lg:p-8">
        <router-view />
      </main>
    </div>
  </div>
</template>
