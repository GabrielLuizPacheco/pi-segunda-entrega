<template>
  <q-page>
    <Header />
    <div class="q-ma-lg text-dark">
      <p>Olá,</p>
      <p>Faça seu Login</p>
    </div>
    <q-form @submit.prevent.stop="onSubmit()" class="q-px-lg">
      <Input
        label="CPF / Registro / Email"
        v-model="credentials.identification"
        :error-msg="v$.identification.$errors[0]?.$message"
      />
      <Input
        label="Senha"
        v-model="credentials.password"
        :type="showPassword ? 'text' : 'password'"
        :icon="showPassword ? 'mdi-lock-open' : 'mdi-lock'"
        @icon-clicked="showPassword = !showPassword"
        :error-msg="v$.password.$errors[0]?.$message"
      />
      <div class="row items-center justify-center q-pa-sm">
        <RouterLink class="link" to="/">Esqueci minha senha</RouterLink>
      </div>
      <Button label="ACESSAR" type="submit" />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import Header from 'src/components/Header.vue';
import Input from 'src/components/Input.vue';
import Button from 'src/components/Button.vue';
import { reactive, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import rules from 'src/rules/login.rules';

interface ICredentials {
  identification: string;
  password: string;
}

const credentials = reactive(<ICredentials>{});

const v$ = useVuelidate(rules, credentials);
const showPassword = ref(false);

async function onSubmit() {
  const valid = await v$.value.$validate();
  if (!valid) return;

  return true;
}
</script>

<style scoped>
p {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 500;
}

.link {
  text-decoration: none;
  color: inherit;
}
</style>
