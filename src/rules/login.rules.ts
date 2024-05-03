import { helpers, required, email } from '@vuelidate/validators';
import { computed } from 'vue';

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

function passwordValidation(val: string) {
  return passwordRegex.test(val);
}

const loginRules = computed(() => ({
  identification: {
    required: helpers.withMessage('Campo obrigatório', required),
    validEmail: helpers.withMessage('Email inválido', email),
  },
  password: {
    required: helpers.withMessage('Campo obrigatório', required),
    validPassword: helpers.withMessage('Senha inválida', passwordValidation),
  },
}));

export default loginRules;
