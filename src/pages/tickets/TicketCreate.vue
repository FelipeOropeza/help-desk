<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import Button from '../../components/common/Button.vue'

const router = useRouter()
const isLoading = ref(false)

const form = ref({
  title: '',
  priority: 'medium',
  description: ''
})

const priorities = [
  { value: 'low', label: 'BAIXA' },
  { value: 'medium', label: 'MÉDIA' },
  { value: 'high', label: 'ALTA' }
]

async function handleSubmit() {
  if (!form.value.title || !form.value.description) return
  
  isLoading.value = true
  try {
    const response = await fetch('http://localhost:3001/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    
    if (response.ok) {
      router.push('/tickets')
    }
  } catch (error) {
    console.error('Erro ao criar ticket:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto py-12 px-6 animate-in fade-in duration-1000">
    <!-- Voltar -->
    <button 
      @click="$router.back()" 
      class="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-3 mb-12"
    >
      <ArrowLeft class="w-3 h-3" /> Voltar à lista
    </button>

    <!-- Cabeçalho -->
    <div class="mb-12">
      <h1 class="text-3xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">Novo Registro</h1>
      <p class="text-gray-400 text-base">Preencha os dados abaixo para relatar um novo problema.</p>
    </div>

    <!-- Formulário Limpo -->
    <form @submit.prevent="handleSubmit" class="space-y-12">
      
      <!-- Título -->
      <div class="space-y-4">
        <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest">O que está acontecendo?</label>
        <input 
          v-model="form.title"
          type="text" 
          required
          class="w-full border-b border-gray-100 dark:border-white/10 bg-transparent py-3 text-xl font-bold focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder:text-gray-200 dark:placeholder:text-gray-900 tracking-tight"
          placeholder="Título do problema..."
        >
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <!-- Prioridade -->
          <div class="space-y-4">
            <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Urgência</label>
            <div class="flex flex-col gap-2">
              <button 
                v-for="p in priorities" 
                :key="p.value"
                type="button"
                @click="form.priority = p.value"
                class="px-4 py-2 rounded-xl text-[10px] font-black border transition-all tracking-widest text-left"
                :class="[
                  form.priority === p.value 
                    ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black' 
                    : 'border-transparent bg-gray-50 dark:bg-white/5 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10'
                ]"
              >
                {{ p.label }}
              </button>
            </div>
          </div>

          <!-- Descrição -->
          <div class="md:col-span-2 space-y-4">
            <label class="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Detalhes</label>
            <textarea 
              v-model="form.description"
              rows="6"
              required
              class="w-full p-6 bg-gray-50 dark:bg-white/5 border-none rounded-2xl focus:outline-none focus:ring-1 focus:ring-gray-200 dark:focus:ring-white/10 transition-all resize-none text-sm leading-relaxed dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-800"
              placeholder="Descreva o ocorrido..."
            ></textarea>
          </div>
      </div>

      <!-- Ação -->
      <div class="pt-8 border-t border-gray-100 dark:border-white/5 flex justify-end">
        <Button 
          type="submit" 
          class="rounded-xl px-12 py-3 bg-black dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all"
          :is-loading="isLoading"
        >
          {{ isLoading ? 'Enviando...' : 'Registrar Chamado' }}
        </Button>
      </div>
    </form>
  </div>
</template>




