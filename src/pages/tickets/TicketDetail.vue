<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, MessageSquare, History } from 'lucide-vue-next'
import BadgeStatus from '../../components/common/BadgeStatus.vue'
import Button from '../../components/common/Button.vue'

const route = useRoute()
const ticketId = route.params.id
const ticket = ref<any>(null)
const isLoading = ref(true)
const replyContent = ref('')

const fetchTicket = async () => {
  isLoading.value = true
  try {
    const response = await fetch(`http://localhost:3001/api/tickets/${ticketId}`)
    const data = await response.json()
    ticket.value = data
  } catch (error) {
    console.error('Erro ao buscar ticket:', error)
  } finally {
    isLoading.value = false
  }
}

const updateStatus = async (newStatus: string) => {
  try {
    const response = await fetch(`http://localhost:3001/api/tickets/${ticketId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
    if (response.ok) {
        await fetchTicket()
    }
  } catch (error) {
    console.error('Erro ao atualizar status:', error)
  }
}

onMounted(fetchTicket)
</script>

<template>
  <div v-if="isLoading" class="flex items-center justify-center h-64">
    <div class="animate-spin w-5 h-5 border-2 border-black dark:border-white border-b-transparent rounded-full"></div>
  </div>
  
  <div v-else-if="ticket && ticket.id" class="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-1000">
    <!-- Navegação de Volta -->
    <button @click="$router.back()" class="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2">
      <ArrowLeft class="w-3 h-3" /> Voltar à lista
    </button>

    <!-- Cabeçalho de Título -->
    <header class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-100 dark:border-white/5 pb-12">
      <div class="space-y-4">
        <h1 class="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">{{ ticket.title }}</h1>
        <div class="flex items-center gap-3">
          <BadgeStatus :status="ticket.status" class="scale-90" />
          <span class="text-[10px] font-mono font-bold text-gray-300">#{{ ticket.id.toString().padStart(4, '0') }}</span>
        </div>
      </div>
      <div class="text-right flex flex-col items-start md:items-end">
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Prioridade</p>
          <BadgeStatus :status="ticket.priority" />
      </div>
    </header>

    <!-- Conteúdo do Chamado -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-16">
      <div class="lg:col-span-3 space-y-12">
        <div class="prose dark:prose-invert max-w-none">
          <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ ticket.description || 'Sem descrição.' }}
          </p>
        </div>

        <!-- Thread Simples -->
        <div class="pt-12 border-t border-gray-100 dark:border-white/5 space-y-8">
            <h3 class="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">Histórico do Atendimento</h3>
            <div class="flex items-center gap-4 py-10 justify-center border border-dashed border-gray-100 dark:border-white/5 rounded-2xl">
                <MessageSquare class="w-4 h-4 text-gray-300" />
                <p class="text-xs text-gray-400">Aguardando interação inicial com o suporte...</p>
            </div>
        </div>

        <!-- Input de Resposta -->
        <div class="space-y-4">
            <textarea 
                v-model="replyContent"
                placeholder="Escreva sua mensagem aqui..."
                class="w-full bg-gray-50 dark:bg-white/5 border-none rounded-2xl p-6 text-sm focus:ring-1 focus:ring-black dark:focus:ring-white transition-all resize-none dark:text-white"
                rows="4"
            ></textarea>
            <div class="flex justify-end">
                <Button variant="primary" class="rounded-xl px-10 bg-black dark:bg-white text-white dark:text-black">Enviar</Button>
            </div>
        </div>
      </div>

      <!-- Ações na Direita -->
      <aside class="space-y-8 text-xs">
          <div class="space-y-6">
              <h4 class="font-bold uppercase tracking-widest text-gray-400">Ações</h4>
              <div class="flex flex-col gap-2">
                <button 
                  v-if="ticket.status !== 'closed'"
                  @click="updateStatus('closed')" 
                  class="w-full text-left py-2 px-3 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors font-bold"
                >
                  Fechar Chamado
                </button>
                <button 
                  v-if="ticket.status === 'open'"
                  @click="updateStatus('in_progress')" 
                  class="w-full text-left py-2 px-3 hover:bg-blue-50 hover:text-blue-500 rounded-lg transition-colors font-bold"
                >
                  Em Atendimento
                </button>
                <button 
                  v-if="ticket.status === 'closed' || ticket.status === 'in_progress'"
                  @click="updateStatus('open')" 
                  class="w-full text-left py-2 px-3 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors font-bold"
                >
                  Reabrir Ticket
                </button>
              </div>
          </div>

          <div class="space-y-2 pt-8 border-t border-gray-100 dark:border-white/5">
              <h4 class="font-bold uppercase tracking-widest text-gray-400">Log de Data</h4>
              <p class="text-gray-500">{{ new Date(ticket.created_at).toLocaleString('pt-BR') }}</p>
          </div>
      </aside>
    </div>
  </div>

  <div v-else class="max-w-4xl mx-auto py-20 text-center">
    <h3 class="text-xl font-bold text-red-500">Chamado não encontrado.</h3>
    <Button variant="ghost" class="mt-4" @click="$router.push('/tickets')">Voltar para a lista</Button>
  </div>
</template>