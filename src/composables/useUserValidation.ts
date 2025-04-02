import { reactive } from 'vue';

export function useValidation() {
  const errors = reactive({
    cpf: '',
    name: '',
    birthday: ''
  });

  const validateUserName = (userName: string): boolean => {
    if (userName.length < 3 || userName.length > 255) {
      errors.name = 'O nome deve ter entre 3 e 255 caracteres.';
      return false;
    }

    if (!/^[\p{L}\s-]+$/u.test(userName)) {
      errors.name = 'O nome deve conter apenas letras, espaços e hífens.';
      return false;
    }

    errors.name = '';
    return true;
  };

  const validateBirthDate = (birthDate: string): boolean => {
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    if (birthDateObj >= today) {
      errors.birthday = 'A data de nascimento deve ser anterior a hoje.';
      return false;
    }

    errors.birthday = ''; 
    return true;
  };

  const validateCpf = (cpf: string): boolean => {
    const cleanedCpf = cpf.replace(/\D/g, "");
    if (cleanedCpf.length !== 11 || !/^\d+$/.test(cleanedCpf)) {
      errors.cpf = 'CPF deve conter 11 dígitos numéricos.';
      return false;
    }

    if(/^(\d)\1{10}$/.test(cleanedCpf) || !validateVerifierCode(cleanedCpf)) {
      errors.cpf = 'CPF inválido.';
      return false;
    }

    errors.cpf = '';
    return true;
  };
  
  const validateVerifierCode = (cpf: string): boolean => {
    const numberQuantityToLoop = [9, 10];

    for (const item of numberQuantityToLoop) {
        let sum = 0;
        let numberToMultiplicate = item + 1;

        for (let index = 0; index < item; index++) {
        sum += parseInt(cpf[index]) * numberToMultiplicate--;
        }

        const result = (sum * 10) % 11;
        if (parseInt(cpf[item]) !== (result === 10 ? 0 : result)) {
        return false;
        }
    }
    return true;
 }

  const validateField = (field: keyof typeof errors, value: string) => {
    if (field === 'cpf') validateCpf(value);
    if (field === 'name') validateUserName(value);
    if (field === 'birthday') validateBirthDate(value);
  };

  const validateAll = (form: Record<string, string>) => {
    return validateCpf(form.cpf) &&
    validateUserName(form.name) &&
    validateBirthDate(form.birthday);
  };

  return { errors, validateField, validateAll };
}
