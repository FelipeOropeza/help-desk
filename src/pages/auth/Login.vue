<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth.store'
import Button from '../../components/common/Button.vue'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const error = ref('')

async function handleLogin() {
  error.value = ''
  isLoading.value = true
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  if (email.value === 'demo@example.com' && password.value === 'password') {
    authStore.login({
        id: 1,
        name: 'Demo User',
        email: email.value,
        role: 'client'
    }, 'mock-jwt-token')
    router.push('/dashboard')
  } else {
    error.value = 'Invalid credentials. Try demo@example.com / password'
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">Sign in to your account</h3>
    
    <form @submit.prevent="handleLogin" class="space-y-5">
      <div v-if="error" class="p-3 text-sm text-red-600 bg-red-50 rounded-lg dark:bg-red-900/30 dark:text-red-400">
        {{ error }}
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
        <div class="mt-1">
          <input 
            id="email" 
            v-model="email" 
            type="email" 
            autocomplete="email" 
            required
            class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            placeholder="you@company.com"
          >
        </div>
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
        <div class="mt-1">
          <input 
            id="password" 
            v-model="password" 
            type="password" 
            autocomplete="current-password" 
            required
            class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
            placeholder="••••••••"
          >
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
          <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">Remember me</label>
        </div>

        <div class="text-sm">
          <a href="#" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">Forgot your password?</a>
        </div>
      </div>

      <Button type="submit" variant="primary" size="md" class="w-full" :is-loading="isLoading">
        Sign in
      </Button>
    </form>
    
    <div class="mt-6">
       <div class="relative">
         <div class="absolute inset-0 flex items-center">
           <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
         </div>
         <div class="relative flex justify-center text-sm">
           <span class="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
         </div>
       </div>

       <div class="mt-6 grid grid-cols-2 gap-3">
         <Button variant="secondary" size="md" class="w-full">
            Google
         </Button>
         <Button variant="secondary" size="md" class="w-full">
            Microsoft
         </Button>
       </div>
    </div>
  </div>
</template>
