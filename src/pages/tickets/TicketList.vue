<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Plus, Search, Filter, ArrowRight } from 'lucide-vue-next'
import BadgeStatus from '../../components/common/BadgeStatus.vue'
import Button from '../../components/common/Button.vue'

const tickets = ref<any[]>([])
const isLoading = ref(true)
const searchQuery = ref('')
const filterStatus = ref('all')

const fetchTickets = async () => {
  isLoading.value = true
  try {
    const response = await fetch('http://localhost:3001/api/tickets')
    const data = await response.json()
    tickets.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Erro ao buscar tickets:', error)
    tickets.value = []
  } finally {
    isLoading.value = false
  }
}

const filteredTickets = computed(() => {
  return tickets.value.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = filterStatus.value === 'all' || ticket.status === filterStatus.value
    return matchesSearch && matchesStatus
  })
})

onMounted(fetchTickets)
</script>

<template>
  <div class="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
    <!-- Header Simples -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-8 px-1">
      <div class="space-y-1">
        <h1 class="text-3xl font-black tracking-tighter text-gray-900 dark:text-white">Central de Chamados</h1>
        <p class="text-gray-400 text-sm">Gerenciamento e histórico de solicitações.</p>
      </div>
      <Button variant="primary" @click="$router.push('/tickets/new')" class="rounded-xl px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 text-[11px] font-black tracking-widest uppercase shadow-none">
        <Plus class="w-4 h-4 mr-2" />
        Novo Chamado
      </Button>
    </div>

    <!-- Filtros Minimalistas -->
    <div class="flex flex-col sm:flex-row gap-6 items-center border-b border-gray-100 dark:border-white/5 pb-6">
      <div class="relative flex-1 group w-full">
        <Search class="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Pesquisar por título..." 
          class="w-full bg-transparent border-none pl-8 py-2 text-base focus:ring-0 placeholder:text-gray-300 dark:text-white font-medium"
        />
      </div>
      <div class="flex items-center gap-3">
        <Filter class="w-4 h-4 text-gray-300" />
        <select v-model="filterStatus" class="bg-transparent border-none text-[9px] font-black text-gray-400 focus:ring-0 cursor-pointer uppercase tracking-[0.2em]">
          <option value="all">Filtro de Status</option>
          <option value="open">Abertos</option>
          <option value="in_progress">Em Curso</option>
          <option value="closed">Finalizados</option>
        </select>
      </div>
    </div>

    <!-- Lista -->
    <div class="space-y-0 relative overflow-hidden">
      <div v-if="isLoading" class="py-32 text-center">
        <div class="animate-spin w-6 h-6 border-2 border-black dark:border-white border-b-transparent rounded-full mx-auto"></div>
      </div>
      
      <div v-else-if="filteredTickets.length > 0" class="divide-y divide-gray-50 dark:divide-white/5">
        <div 
          v-for="ticket in filteredTickets" 
          :key="ticket.id" 
          @click="$router.push(`/tickets/${ticket.id}`)"
          class="group py-5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 dark:hover:bg-white/[0.02] px-4 -mx-4 rounded-xl transition-all"
        >
          <div class="flex items-center gap-10">
            <span class="text-[10px] font-mono font-bold text-gray-300 w-12 tracking-tighter">#{{ ticket.id.toString().padStart(4, '0') }}</span>
            <div class="space-y-0.5">
                <h3 class="text-base font-bold text-gray-800 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors tracking-tight">{{ ticket.title }}</h3>
                <div class="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest opacity-60">
                    <span>{{ ticket.user_name || 'Felipe' }}</span>
                    <span class="w-1 h-1 rounded-full bg-gray-200"></span>
                    <span>{{ new Date(ticket.created_at).toLocaleDateString('pt-BR') }}</span>
                </div>
            </div>
          </div>
          
          <div class="flex items-center gap-10">
            <BadgeStatus :status="ticket.status" class="scale-90" />
            <ArrowRight class="w-4 h-4 text-gray-200 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>

      <div v-else class="py-48 text-center space-y-4">
        <div class="text-gray-50 dark:text-white/[0.02] font-black text-8xl select-none">Vazio</div>
        <p class="text-gray-400 text-sm">Nenhum chamado encontrado.</p>
        <Button variant="ghost" size="sm" @click="searchQuery = ''; filterStatus = 'all'">Resetar filtros</Button>
      </div>
    </div>
  </div>
</template>


