<template>
  <div class="container">
    <h1>Lista de Usuários</h1>
    <form @submit.prevent="search">
      <div class="filters">
        <input v-model="userStore.filterName"  placeholder="Pesquise por nome ou sobrenome" class="input" />
        <input v-model="userStore.filterCPF" placeholder="Pesquise por nome ou CPF" class="input" />
      </div>
      <div class="filters">
        <button> Pesquisar</button>
      </div>
    </form>
    <table class="user-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>Data de Nascimento</th>
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
import '@/styles/list.scss';
const userStore = useUserStore();

onMounted(() => {
  userStore.fetchUsers();
});

const search = () => {
  if(userStore.filterCPF != "") return userStore.setFilterCPF(userStore.filterCPF);
  if(userStore.filterName != "") return userStore.setFilterName(userStore.filterName);
  
  return userStore.fetchUsers();
};

</script>