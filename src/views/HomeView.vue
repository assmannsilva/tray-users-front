<script setup lang="ts">
import GoogleLoginButton from '../components/GoogleLoginButton.vue';
</script>

<template>
  <div class="layout">
    <header class="header">
      <h1>Welcome to the Home Page</h1>
    </header>

    <div class="main-content">
      <GoogleLoginButton />
    </div>

    <footer class="footer">
      <p>&copy; 2025 Your Company</p>
    </footer>
  </div>
</template>
