<template>
    <div class="container">
      <h1>User List</h1>
      <div class="filters">
        <input v-model="userStore.filterName" @input="userStore.setFilterName(($event.target as HTMLInputElement).value)" placeholder="Filter by Name" class="input" />
        <input v-model="userStore.filterCPF" @input="userStore.setFilterCPF(($event.target as HTMLInputElement).value)" placeholder="Filter by CPF" class="input" />
      </div>
      <table class="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>CPF</th>
            <th>Birthday</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userStore.users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.cpf }}</td>
            <td>{{ user.birthday }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="userStore.prevPage" :disabled="userStore.currentPage === 1">Previous</button>
        <span>Page {{ userStore.currentPage }} of {{ userStore.lastPage }}</span>
        <button @click="userStore.nextPage" :disabled="userStore.currentPage === userStore.lastPage">Next</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue';
  import { useUserStore } from '../stores/users';
  
  const userStore = useUserStore();
  
  onMounted(() => {
    userStore.fetchUsers();
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    text-align: center;
  }
  
  .filters {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .input {
    padding: 10px;
    width: 48%;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .user-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid black;
    padding: 10px;
    text-align: left;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
  
  button {
    padding: 8px 12px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 5px;
  }
  
  button:disabled {
    background-color: #ccc;
  }
  </style>