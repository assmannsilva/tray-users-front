<template>
  <div class="toast-container">
    <div v-for="toast in toasts" :key="toast.id" class="toast" :class="toast.type">
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/useToast';

const { toasts } = useToast();
</script>

<style lang="scss" scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  padding: 12px 20px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.success {
  background-color: #28a745;
}

.error {
  background-color: #dc3545;
}

.warning {
  background-color: #ffc107;
  color: #333;
}
</style>
