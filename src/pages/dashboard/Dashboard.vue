<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  ArrowRight,
  Plus
} from 'lucide-vue-next'
import Button from '../../components/common/Button.vue'
import BadgeStatus from '../../components/common/BadgeStatus.vue'

const stats = ref({
  total: 0,
  open: 0,
  inProgress: 0,
  closed: 0
})

const recentTickets = ref<any[]>([])
const isLoading = ref(true)

const fetchData = async () => {
  isLoading.value = true
  try {
    const [statsRes, ticketsRes] = await Promise.all([
      fetch('http://localhost:3001/api/stats'),
      fetch('http://localhost:3001/api/tickets')
    ])
    
    if (statsRes.ok) stats.value = await statsRes.json()
    if (ticketsRes.ok) {
        const allTickets = await ticketsRes.json()
        recentTickets.value = Array.isArray(allTickets) ? allTickets.slice(0, 5) : []
    }
  } catch (error) {
    console.error('Erro ao buscar dados:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchData)
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-16 animate-in fade-in duration-1000">
    <!-- Saudação Minimalista -->
    <section class="space-y-2">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Olá, Felipe.</h1>
      <p class="text-gray-400 text-lg">Aqui está o que precisa de sua atenção hoje.</p>
    </section>

    <!-- Estatísticas de Linha Única -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-12 border-y border-gray-100 dark:border-white/5 py-10">
      <div v-for="(val, label) in { 'Tickets Totais': stats.total, 'Aguardando': stats.open, 'Em Curso': stats.inProgress, 'Finalizados': stats.closed }" 
           :key="label" 
           class="space-y-1"
      >
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{{ label }}</p>
        <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ val }}</p>
      </div>
    </section>

    <!-- Atividade Principal -->
    <section class="grid grid-cols-1 lg:grid-cols-3 gap-20">
      <div class="lg:col-span-2 space-y-8">
        <div class="flex items-center justify-between">
          <h2 class="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">Atividade Recente</h2>
          <router-link to="/tickets" class="text-xs font-bold text-blue-600 hover:opacity-70 transition-opacity flex items-center gap-1">
            Ver Todos <ArrowRight class="w-3 h-3" />
          </router-link>
        </div>

        <div class="space-y-1">
          <div v-if="isLoading" class="space-y-4">
            <div v-for="i in 3" :key="i" class="h-10 bg-gray-50 dark:bg-white/5 animate-pulse rounded-lg"></div>
          </div>
          <div v-else-if="recentTickets.length > 0" class="divide-y divide-gray-50 dark:divide-white/5">
            <div v-for="ticket in recentTickets" :key="ticket.id" 
                 @click="$router.push(`/tickets/${ticket.id}`)"
                 class="group py-4 flex items-center justify-between cursor-pointer"
            >
              <div class="space-y-1">
                <h4 class="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{{ ticket.title }}</h4>
                <p class="text-[10px] text-gray-400 font-mono uppercase tracking-tighter">#{{ ticket.id.toString().padStart(4, '0') }} • {{ new Date(ticket.created_at).toLocaleDateString() }}</p>
              </div>
              <BadgeStatus :status="ticket.status" class="scale-75" />
            </div>
          </div>
          <div v-else class="py-10 text-gray-400 text-sm italic">
            Nenhum registro encontrado.
          </div>
        </div>
      </div>

      <!-- Links Rápidos -->
      <div class="space-y-8">
        <h2 class="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">Atalhos</h2>
        <div class="flex flex-col items-start gap-4">
            <button @click="$router.push('/tickets/new')" class="group flex items-center gap-3 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all">
                <span class="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                    <Plus class="w-4 h-4" />
                </span>
                Criar Novo Chamado
            </button>
            <button @click="$router.push('/settings')" class="group flex items-center gap-3 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all">
                <span class="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                    <ArrowRight class="w-4 h-4" />
                </span>
                Ajustar Perfil
            </button>
        </div>
      </div>
    </section>
  </div>
</template>

