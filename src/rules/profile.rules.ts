import { helpers, required, email, minLength } from '@vuelidate/validators';
import { computed } from 'vue';

const profileRules = computed(() => ({
  name: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
  email: {
    required: helpers.withMessage('Campo obrigatório', required),
    validEmail: helpers.withMessage('Email inválido', email),
  },
  CPF: {
    required: helpers.withMessage('Campo obrigatório', required),
    minLength: helpers.withMessage('Dado incompleto', minLength(14)),
  },
  gender: {
    required: helpers.withMessage('Campo obrigatório', required),
  },
  birthday: {
    required: helpers.withMessage('Campo obrigatório', required),
    minLength: helpers.withMessage('Dado incompleto', minLength(10)),
  },
  phone: {
    minLength: helpers.withMessage('Dado incompleto', minLength(15)),
  },
}));

export default profileRules;
