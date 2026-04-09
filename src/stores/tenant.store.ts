import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTenantStore = defineStore('tenant', () => {
    const tenant = ref({
        name: 'Demo Company',
        logo: '',
        primaryColor: '#3b82f6' // Blue-500
    })

    function setTenant(data: any) {
        tenant.value = data
    }

    return {
        tenant,
        setTenant
    }
})
