import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTicketStore = defineStore('ticket', () => {
    const tickets = ref([])
    const currentTicket = ref(null)
    const isLoading = ref(false)

    async function fetchTickets() {
        isLoading.value = true
        // Simulate API call
        setTimeout(() => {
            tickets.value = [] // Replace with API data
            isLoading.value = false
        }, 500)
    }

    function setCurrentTicket(ticket: any) {
        currentTicket.value = ticket
    }

    return {
        tickets,
        currentTicket,
        isLoading,
        fetchTickets,
        setCurrentTicket
    }
})
