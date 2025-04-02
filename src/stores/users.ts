import { defineStore } from 'pinia';
import axios from 'axios';
import { userService } from '@/services/user.service';

interface User {
  id: string;
  name: string;
  cpf: string;
  birthday: string;
}

interface UserStoreState {
  users: User[];
  currentPage: number;
  lastPage: number;
  filterName: string;
  filterCPF: string;
}

export const useUserStore = defineStore('userStore', {
  state: (): UserStoreState => ({
    users: [],
    currentPage: 1,
    lastPage: 1,
    filterName: '',
    filterCPF: ''
  }),
  actions: {
    async fetchUsers(page = 1): Promise<void> {
      try {
        const response = await userService.getUsers(page, this.filterName, this.filterCPF);
        if(response.success === false) {
            this.users = [];
            this.currentPage = 1;
            return
        }
        this.users = response.data?.data || [];
        this.currentPage = response.data?.current_page || 1;
        this.lastPage = response.data?.last_page || 1;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    nextPage(): void {
      if (this.currentPage < this.lastPage) {
        this.fetchUsers(this.currentPage + 1);
      }
    },
    prevPage(): void {
      if (this.currentPage > 1) {
        this.fetchUsers(this.currentPage - 1);
      }
    },
    setFilterName(name: string): void {
      this.filterName = name;
      this.fetchUsers(1);
    },
    setFilterCPF(cpf: string): void {
      this.filterCPF = cpf;
      this.fetchUsers(1);
    }
  }
});