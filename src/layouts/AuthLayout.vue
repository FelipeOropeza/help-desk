<script setup lang="ts">
import { useTenantStore } from '../stores/tenant.store'

const tenantStore = useTenantStore()
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <!-- Logo Placeholder -->
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-600 text-white mb-4 shadow-lg shadow-blue-600/20">
             <span class="text-2xl font-bold">S</span>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ tenantStore.tenant.name }}
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Support Portal & Helpdesk
        </p>
      </div>
      
      <div class="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div class="p-8">
          <router-view />
        </div>
      </div>
      
      <div class="mt-8 text-center text-xs text-gray-400">
        &copy; {{ new Date().getFullYear() }} {{ tenantStore.tenant.name }}. All rights reserved.
      </div>
    </div>
  </div>
</template>
