<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Upload, X } from 'lucide-vue-next'
import Button from '../../components/common/Button.vue'

const router = useRouter()
const isLoading = ref(false)

const form = ref({
  subject: '',
  category: '',
  priority: 'medium',
  description: '',
  files: [] as File[]
})

const categories = ['Billing', 'Technical Support', 'Feature Request', 'Access/Login', 'Other']
const priorities = ['low', 'medium', 'high', 'critical']

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) {
    form.value.files = [...form.value.files, ...Array.from(target.files)]
  }
}

function removeFile(index: number) {
  form.value.files.splice(index, 1)
}

async function handleSubmit() {
  isLoading.value = true
  // Mock API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  router.push('/tickets')
}
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Create New Order</h1>
      <p class="text-sm text-gray-500">Submit a new request and we'll get back to you asap.</p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Subject -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
          <input 
            v-model="form.subject"
            type="text" 
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Brief summary of your issue"
          >
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <!-- Category -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <select 
              v-model="form.category"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="" disabled selected>Select a category</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>

          <!-- Priority -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
            <select 
              v-model="form.priority"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white capitalize"
            >
              <option v-for="p in priorities" :key="p" :value="p">{{ p }}</option>
            </select>
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea 
            v-model="form.description"
            rows="6"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-y"
            placeholder="Please describe your issue in detail..."
          ></textarea>
        </div>

        <!-- File Upload -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Attachments</label>
          <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer relative">
            <input type="file" multiple class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" @change="handleFileChange" />
            <div class="space-y-1 text-center">
              <Upload class="mx-auto h-12 w-12 text-gray-400" />
              <div class="flex text-sm text-gray-600 dark:text-gray-400">
                <span class="font-medium text-blue-600 hover:text-blue-500">Upload a file</span>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
            </div>
          </div>
          
          <!-- File List -->
          <div v-if="form.files.length > 0" class="mt-4 space-y-2">
            <div v-for="(file, index) in form.files" :key="index" class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span class="text-sm text-gray-700 dark:text-gray-300 truncate">{{ file.name }}</span>
              <button type="button" @click="removeFile(index)" class="text-gray-400 hover:text-red-500">
                <X class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          <Button variant="ghost" @click="$router.back()">Cancel</Button>
          <Button type="submit" variant="primary" :is-loading="isLoading">Submit Order</Button>
        </div>
      </form>
    </div>
  </div>
</template>
