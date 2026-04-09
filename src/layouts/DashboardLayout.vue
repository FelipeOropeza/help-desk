<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  LayoutDashboard, 
  Ticket, 
  LogOut, 
  Menu,
  Plus
} from 'lucide-vue-next'

const router = useRouter()
const isSidebarOpen = ref(false)

const navigation = [
  { name: 'Início', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Chamados', href: '/tickets', icon: Ticket }
]

function handleLogout() {
  router.push('/auth/login')
}
</script>

<template>
  <div class="h-screen overflow-hidden bg-white dark:bg-[#0A0A0A] flex text-gray-900 dark:text-gray-100 font-sans selection:bg-blue-100">
    <!-- Mobile Menu Overlay -->
    <div v-if="isSidebarOpen" class="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 lg:hidden" @click="isSidebarOpen = false"></div>

    <!-- Sidebar Minimalista -->
    <aside 
      class="fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-50/50 dark:bg-[#111] border-r border-gray-100 dark:border-white/5 transition-transform duration-300 flex flex-col"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
    >
      <div class="flex-1 flex flex-col p-8 overflow-hidden">
        <!-- Logo Simples -->
        <div class="flex items-center gap-3 mb-12 shrink-0">
          <div class="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black">
            <Ticket class="w-4 h-4" />
          </div>
          <span class="font-bold text-lg tracking-tight">Suporte</span>
        </div>

        <!-- Links de Navegação -->
        <nav class="flex-1 space-y-1 overflow-y-auto no-scrollbar">
          <router-link 
            v-for="item in navigation" 
            :key="item.name" 
            :to="item.href"
            class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors"
            @click="isSidebarOpen = false"
            :class="[
              $route.path === item.href 
                ? 'text-gray-900 bg-gray-100 dark:text-white dark:bg-white/10' 
                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
            ]"
          >
            <component :is="item.icon" class="w-4 h-4" />
            {{ item.name }}
          </router-link>
        </nav>

        <!-- Ações do Rodapé -->
        <div class="mt-auto shrink-0 space-y-8 pt-8">
            <!-- Botão Novo Chamado -->
            <div class="border-t border-gray-100 dark:border-white/5 pt-8">
                <button 
                    @click="$router.push('/tickets/new'); isSidebarOpen = false"
                    class="w-full flex items-center justify-center gap-2 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold hover:opacity-90 transition-opacity"
                >
                    <Plus class="w-3 h-3" />
                    Novo Registro
                </button>
            </div>

            <!-- Perfil/Sair -->
            <div>
              <button 
                @click="handleLogout"
                class="flex items-center gap-3 text-xs font-medium text-gray-400 hover:text-red-500 transition-colors"
              >
                <LogOut class="w-4 h-4" />
                Sair da conta
              </button>
            </div>
        </div>
      </div>
    </aside>

    <!-- Conteúdo Principal -->
    <div class="flex-1 flex flex-col min-w-0 h-screen">
      <!-- Header Super Limpo -->
      <header class="h-16 shrink-0 flex items-center justify-between px-8 border-b border-gray-100 dark:border-white/5 bg-white/50 dark:bg-black/50 backdrop-blur-xl z-30">
        <button class="lg:hidden p-2 text-gray-500" @click="isSidebarOpen = true">
          <Menu class="w-5 h-5" />
        </button>
        
        <div class="hidden md:block">
            <span class="text-xs font-medium text-gray-400">Suporte técnico • Central de Ajuda</span>
        </div>

        <div class="flex items-center gap-4">
             <div class="flex flex-col items-end mr-2">
                 <p class="text-[11px] font-bold">Felipe Oropeza</p>
                 <p class="text-[9px] text-gray-400">Admin</p>
             </div>
             <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                 <img src="https://ui-avatars.com/api/?name=Felipe+Oropeza&background=random" alt="Avatar">
             </div>
        </div>
      </header>

      <!-- Main Section -->
      <main class="flex-1 overflow-y-auto overflow-x-hidden p-8 lg:p-12 relative flex flex-col">
        <router-view v-slot="{ Component }">
          <transition 
            enter-active-class="transition duration-300 ease-out" 
            enter-from-class="opacity-0 absolute w-full" 
            enter-to-class="opacity-100 relative"
            mode="out-in"
          >
            <component :is="Component" :key="$route.path" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Oculta o scrollbar mas mantém a funcionalidade caso precisem rolar no futuro */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>