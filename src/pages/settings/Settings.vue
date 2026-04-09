<script setup lang="ts">
import { ref } from 'vue'
import { 
  User, 
  Bell, 
  Lock, 
  Moon, 
  Globe,
  Save,
  ShieldCheck
} from 'lucide-vue-next'
import Button from '../../components/common/Button.vue'

const isDarkMode = ref(false)
const notifications = ref(true)

const profile = ref({
  name: 'Felipe Oropeza',
  email: 'felipe@etec.sp.gov.br',
  role: 'Administrador'
})
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-10 py-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div>
      <h1 class="text-3xl font-black text-gray-900 dark:text-white tracking-tight">Configurações</h1>
      <p class="text-gray-500 mt-2">Gerencie sua conta e as preferências do sistema.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Sidebar de Configurações -->
      <div class="space-y-2">
        <button class="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20">
          <User class="w-5 h-5" />
          Perfil
        </button>
        <button class="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl font-bold transition-all">
          <Bell class="w-5 h-5" />
          Notificações
        </button>
        <button class="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl font-bold transition-all">
          <ShieldCheck class="w-5 h-5" />
          Segurança
        </button>
      </div>

      <!-- Conteúdo de Configurações -->
      <div class="md:col-span-2 space-y-6">
        <!-- Perfil -->
        <div class="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-8">
          <div class="flex items-center gap-6">
            <div class="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-xl">
              FO
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ profile.name }}</h3>
              <p class="text-gray-500 text-sm">{{ profile.role }}</p>
              <button class="mt-2 text-blue-600 text-xs font-bold hover:underline">Alterar Foto</button>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6">
            <div class="space-y-2">
              <label class="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Nome Completo</label>
              <input v-model="profile.name" type="text" class="w-full px-5 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 transition-all dark:text-white" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">E-mail</label>
              <input v-model="profile.email" type="email" class="w-full px-5 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 transition-all dark:text-white" />
            </div>
          </div>
        </div>

        <!-- Preferências -->
        <div class="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white">Preferências do Sistema</h3>
          
          <div class="flex items-center justify-between py-2">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                <Moon class="w-5 h-5" />
              </div>
              <div>
                <p class="font-bold text-gray-900 dark:text-white">Modo Escuro</p>
                <p class="text-xs text-gray-500">Ajusta o visual para ambientes escuros.</p>
              </div>
            </div>
            <input type="checkbox" v-model="isDarkMode" class="w-10 h-5 bg-gray-200 rounded-full appearance-none checked:bg-blue-600 transition-all cursor-pointer relative after:absolute after:w-4 after:h-4 after:bg-white after:rounded-full after:top-0.5 after:left-0.5 checked:after:left-5 after:transition-all" />
          </div>

          <div class="flex items-center justify-between py-2">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                <Globe class="w-5 h-5" />
              </div>
              <div>
                <p class="font-bold text-gray-900 dark:text-white">Idioma</p>
                <p class="text-xs text-gray-500">Selecione o idioma preferido.</p>
              </div>
            </div>
            <select class="bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-xs font-bold px-4 py-2 dark:text-white">
              <option>Português (BR)</option>
              <option>English (US)</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end pt-4">
          <Button variant="primary" size="lg" class="px-10 rounded-2xl shadow-lg shadow-blue-500/20">
            <Save class="w-5 h-5 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
