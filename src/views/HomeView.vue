<script setup lang="ts">
import { ref } from 'vue';
import GoogleLoginButton from '../components/GoogleLoginButton.vue';

const authUrl = ref<string | null>(null);
</script>
<template>
  <div class="layout">
    <header class="header">
      <h1>Welcome to the Home Page</h1>
    </header>

    <div class="main-content">
      <GoogleLoginButton @auth-url-created="authUrl = $event" />
      <div v-if="authUrl" class="iframe-container">
        <iframe :src="authUrl" frameborder="0"></iframe>
      </div>
    </div>

    <footer class="footer">
      <p>&copy; 2025 Your Company</p>
    </footer>
  </div>
</template>

<style scoped>
.iframe-container {
  width: 500px;
  height: 600px;
  border: 1px solid #ccc;
  margin-top: 10px;
}

iframe {
  width: 100%;
  height: 100%;
}
</style>
