<template>
  <q-page>
    <q-stepper
      flat
      v-model="step"
      ref="stepper"
      alternative-labels
      color="primary"
      animated
    >
      <q-step :name="1" title="Descrição" icon="mdi-details" :done="step > 1">
        Este formulário representa apenas o cadastro inicial para o acesso ao
        nosso app. Entre em nossos canais de comunicação internos após o login
        para completar seu cadastro e participar de nossos planos.
      </q-step>

      <q-step
        :name="2"
        title="Dados cadastrais"
        icon="mdi-account-details"
        :done="step > 2"
      >
        <Input
          required
          label="Nome"
          v-model="userInfos.name"
          :error-msg="v$_user.name.$errors[0]?.$message"
        />
        <Input
          required
          label="Email"
          v-model="userInfos.email"
          :error-msg="v$_user.email.$errors[0]?.$message"
        />
        <Input
          required
          label="CPF"
          v-model="userInfos.CPF"
          mask="###.###.###-##"
          :error-msg="v$_user.CPF.$errors[0]?.$message"
        />
        <div class="row">
          <Select
            required
            class="col"
            v-model="userInfos.gender"
            :options="genders"
            label="Gênero"
            :error-msg="v$_user.gender.$errors[0]?.$message"
          />
          <q-space class="col q-ma-sm" />
          <DatePicker
            required
            class="col"
            label="Nascimento"
            v-model="userInfos.birthday"
            :error-msg="v$_user.birthday.$errors[0]?.$message"
          />
        </div>
        <Input
          label="Telefone celular"
          v-model="userInfos.phone"
          mask="(##) #####-####"
          :error-msg="v$_user.phone.$errors[0]?.$message"
        />
      </q-step>

      <q-step :name="3" title="Criação de senha" icon="password">
        <Input
          label="Senha"
          v-model="userInfos.password"
          :type="showPassword ? 'text' : 'password'"
          :icon="showPassword ? 'mdi-lock-open' : 'mdi-lock'"
          @icon-clicked="showPassword = !showPassword"
          :error-msg="v$_password.password.$errors[0]?.$message"
        />
        <Input
          label="Confirmação de senha"
          v-model="userInfos.rePassword"
          :type="showPassword ? 'text' : 'password'"
          :icon="showPassword ? 'mdi-lock-open' : 'mdi-lock'"
          @icon-clicked="showPassword = !showPassword"
          :error-msg="v$_password.rePassword.$errors[0]?.$message"
        />
        <p class="text-grey-6">
          A senha deve conter minimamente 8 caracteres entre eles simbolos,
          letras maiúsculas, letras minúsculas e números.
        </p>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            unelevated
            class="button"
            @click="nextStep(step)"
            color="primary"
            :label="step === 3 ? 'Finalizar' : 'Continuar'"
            :loading="loading"
          />
          <q-btn
            flat
            color="primary"
            @click="step < 2 ? router.go(-1) : $refs.stepper.previous()"
            label="Voltar"
            class="q-ml-sm button"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-page>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Input from 'src/components/Input.vue';
import { IRegisterUser } from 'src/interface/user';
import Select from 'src/components/Select.vue';
import genders from 'src/constants/genders.json';
import DatePicker from 'src/components/DatePicker.vue';
import useVuelidate from '@vuelidate/core';
import profileRules from 'src/rules/profile.rules';
import { required, helpers, sameAs } from '@vuelidate/validators';
import { passwordValidation } from 'src/utils/validations';
import { useAuthStore } from 'src/stores/auth-store';

const router = useRouter();
const step = ref<number>(1);

const showPassword = ref(false);
const loading = ref(false);

const userInfos = reactive(<IRegisterUser>{});
const v$_user = useVuelidate(profileRules, userInfos);
const { login } = useAuthStore();

const passwordRules = computed(() => ({
  password: {
    required: helpers.withMessage('Campo obrigatório', required),
    validPassword: helpers.withMessage('Senha inválida', passwordValidation),
  },
  rePassword: {
    validRePassword: helpers.withMessage(
      'Confirmação de senha diferente de senha',
      sameAs(userInfos.password)
    ),
  },
}));

const v$_password = useVuelidate(passwordRules, userInfos);

async function nextStep(val: number) {
  switch (val) {
    case 1:
      return (step.value = 2);
    case 2:
      const validUser = await v$_user.value.$validate();
      if (!validUser) return;
      return (step.value = 3);
    case 3:
      const validPassword = await v$_password.value.$validate();
      if (!validPassword) return;
      login(userInfos);
      router.push({ path: '/home' });
  }
}
</script>
