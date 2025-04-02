<script setup lang="ts">
import { useToast } from '@/composables/useToast';
import '@/styles/toast.scss'

const { toasts } = useToast();
</script>
<template>
  <div class="toast-container">
    <div v-for="toast in toasts" :key="toast.id" class="toast" :class="toast.type">
      {{ toast.message }}
    </div>
  </div>
</template>