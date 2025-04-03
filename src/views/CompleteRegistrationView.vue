<script setup lang="ts">
import '@/styles/forms.scss';
import { useToast } from '@/composables/useToast';
import { useValidation } from '@/composables/useUserValidation';
import { userService } from '@/services/user.service';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';

const { errors, validateField, validateAll } = useValidation();

const route = useRoute();

const form = reactive({
  cpf: '',
  name: '',
  birthday: ''
});

const submitForm = async () => {
  if (!validateAll(form)) return

  const response = await userService.completeRegistration({
    user: String(route.params.id),
    ...form
  })
  
  if(!response.success) {
    useToast().showToast("Erro ao completar o cadastro", "error");  
    return;
  }

  router.push({name:  'users.list'})
};
</script>
<template>
  <div class="form-wrapper">
    <div class="form-container">
      <h2>Complete seu cadastro</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="cpf">CPF</label>
          <input type="text" id="cpf" v-model="form.cpf" @input="validateField('cpf', form.cpf)" required v-maska data-maska="###.###.###-##" data-maska-tokens="X:\d"/>
          <span class="error" v-if="errors.cpf">{{ errors.cpf }}</span>
        </div>
        
        <div class="form-group">
          <label for="name">Nome</label>
          <input type="text" id="name" v-model="form.name" @input="validateField('name', form.name)" required />
          <span class="error" v-if="errors.name">{{ errors.name }}</span>
        </div>
        
        <div class="form-group">
          <label for="birthday">Data de Nascimento</label>
          <input type="date" id="birthday" v-model="form.birthday" @input="validateField('birthday', form.birthday)" required />
          <span class="error" v-if="errors.birthday">{{ errors.birthday }}</span>
        </div>
        
        <button type="submit">Registrar</button>
      </form>
    </div>
  </div>
</template>