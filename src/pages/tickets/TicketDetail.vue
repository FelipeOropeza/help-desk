<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Send, Paperclip } from 'lucide-vue-next'
import BadgeStatus from '../../components/common/BadgeStatus.vue'

const route = useRoute()
const ticketId = route.params.id // Keeping for future API call use

// Mock data
const ticket = ref({
  id: '#ORD-7829',
  title: 'License upgrade request',
  status: 'open',
  priority: 'high',
  category: 'Billing',
  created_at: 'Oct 25, 2023 at 10:30 AM',
  description: 'Hi, I would like to upgrade my current plan to the Professional tier. Can you help me with the pro-rated billing calculation?',
  user: {
      name: 'Demo User',
      avatar: 'U'
  }
})

interface TimelineItem {
    id: number;
    type: 'message' | 'system';
    user?: { name: string; role: string; avatar: string };
    content: string;
    date: string;
}

const timeline = ref<TimelineItem[]>([
  {
    id: 1,
    type: 'message',
    user: { name: 'Demo User', role: 'client', avatar: 'U' },
    content: 'Hi, I would like to upgrade my current plan to the Professional tier. Can you help me with the pro-rated billing calculation?',
    date: 'Oct 25, 10:30 AM'
  },
  {
    id: 2,
    type: 'message',
    user: { name: 'Support Agent', role: 'agent', avatar: 'S' },
    content: 'Hello! I can certainly help with that. Our billing system automatically calculates the pro-rated amount based on the remaining days in your cycle. Would you like me to process this now?',
    date: 'Oct 25, 10:45 AM'
  },
  {
    id: 3,
    type: 'system',
    content: 'Status changed from Pending to Open by Support Agent',
    date: 'Oct 25, 10:46 AM'
  }
])

const replyContent = ref('')

function handleReply() {
    if (!replyContent.value.trim()) return
    
    timeline.value.push({
        id: Date.now(),
        type: 'message',
        user: { name: 'Demo User', role: 'client', avatar: 'U' },
        content: replyContent.value,
        date: 'Just now'
    })
    
    replyContent.value = ''
    
    // Auto-scroll logic would go here
}
</script>

<template>
  <div class="h-[calc(100vh-8rem)] flex flex-col gap-6">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex-shrink-0">
      <div class="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">{{ ticket.title }}</h1>
            <BadgeStatus :status="ticket.status" />
          </div>
          <p class="text-sm text-gray-500 flex items-center gap-4">
             <span>{{ ticket.id }}</span>
             <span>Created {{ ticket.created_at }}</span>
             <span class="capitalize">Priority: <span class="font-medium text-gray-700 dark:text-gray-300">{{ ticket.priority }}</span></span>
          </p>
        </div>
        <div>
             <!-- Actions could go here (Close Ticket, etc) -->
        </div>
      </div>
    </div>

    <!-- Timeline & Chat -->
    <div class="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col overflow-hidden">
        
        <!-- Messages Area -->
        <div class="flex-1 overflow-y-auto p-6 space-y-6">
            <div v-for="item in timeline" :key="item.id">
                
                <!-- System Message -->
                <div v-if="item.type === 'system'" class="flex justify-center my-4">
                    <span class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-3 py-1 rounded-full">
                        {{ item.content }} • {{ item.date }}
                    </span>
                </div>

                <!-- User Message -->
                <div v-else-if="item.user" class="flex gap-4" :class="item.user.role === 'client' ? 'flex-row-reverse' : ''">
                    <!-- Avatar -->
                    <div 
                        class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm flex-shrink-0"
                        :class="item.user.role === 'client' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'"
                    >
                        {{ item.user.avatar }}
                    </div>

                    <!-- Bubble -->
                    <div 
                        class="max-w-2xl rounded-2xl p-4 shadow-sm"
                        :class="item.user.role === 'client' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-50 dark:bg-gray-700 rounded-tl-none'"
                    >
                        <div class="flex items-center justify-between gap-4 mb-1">
                            <span class="text-xs font-bold" :class="item.user.role === 'client' ? 'text-blue-100' : 'text-gray-900 dark:text-white'">
                                {{ item.user.name }}
                            </span>
                            <span class="text-xs" :class="item.user.role === 'client' ? 'text-blue-200' : 'text-gray-500'">
                                {{ item.date }}
                            </span>
                        </div>
                        <p class="text-sm whitespace-pre-wrap">{{ item.content }}</p>
                    </div>
                </div>

            </div>
        </div>

        <!-- Reply Box -->
        <div class="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
            <form @submit.prevent="handleReply" class="relative">
                <textarea 
                    v-model="replyContent"
                    rows="3" 
                    class="w-full pl-4 pr-12 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none shadow-sm"
                    placeholder="Type your reply here..."
                ></textarea>
                
                <div class="absolute bottom-3 right-3 flex items-center gap-2">
                     <button type="button" class="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                         <Paperclip class="w-5 h-5" />
                     </button>
                     <button 
                        type="submit" 
                        :disabled="!replyContent.trim()"
                        class="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                     >
                         <Send class="w-5 h-5" />
                     </button>
                </div>
            </form>
        </div>

    </div>
  </div>
</template>

