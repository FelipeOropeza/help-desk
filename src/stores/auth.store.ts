import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const token = ref(localStorage.getItem('token') || null)
    
    const isAuthenticated = computed(() => !!token.value)

    function login(userData: any, authToken: string) {
        user.value = userData
        token.value = authToken
        localStorage.setItem('token', authToken)
    }

    function logout() {
        user.value = null
        token.value = null
        localStorage.removeItem('token')
    }

    return {
        user,
        token,
        isAuthenticated,
        login,
        logout
    }
})
