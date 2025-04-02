import { ref } from 'vue';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning';
}

const toasts = ref<Toast[]>([]);

export function useToast() {
  const showToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    const id = Date.now();
    toasts.value.push({ id, message, type });

    // Remove o toast após 3 segundos
    setTimeout(() => {
      toasts.value = toasts.value.filter(toast => toast.id !== id);
    }, 3000);
  };

  return { toasts, showToast };
}