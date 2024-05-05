import { helpers, required, email } from '@vuelidate/validators';
import { computed } from 'vue';
import { passwordValidation } from 'src/utils/validations';

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
