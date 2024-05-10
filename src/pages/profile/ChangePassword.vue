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
      <q-step
        :name="1"
        title="Confirmação de senha"
        icon="password"
        :done="step > 1"
      >
        <Input
          label="Informe a senha atual"
          v-model="pass.currentPassword"
          :type="showPassword ? 'text' : 'password'"
          :icon="showPassword ? 'mdi-lock-open' : 'mdi-lock'"
          @icon-clicked="showPassword = !showPassword"
        />
      </q-step>

      <q-step :name="2" title="Nova senha" icon="password">
        <Input
          label="Nova senha"
          v-model="pass.password"
          :type="showPassword ? 'text' : 'password'"
          :icon="showPassword ? 'mdi-lock-open' : 'mdi-lock'"
          @icon-clicked="showPassword = !showPassword"
          :error-msg="v$_newPassword.password.$errors[0]?.$message"
        />
        <Input
          label="Confirmação de senha"
          v-model="pass.rePassword"
          :type="showPassword ? 'text' : 'password'"
          :icon="showPassword ? 'mdi-lock-open' : 'mdi-lock'"
          @icon-clicked="showPassword = !showPassword"
          :error-msg="v$_newPassword.rePassword.$errors[0]?.$message"
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
            :label="step === 2 ? 'Confirmar' : 'Continuar'"
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
import { IChangePassword } from 'src/interface/user';
import { required, helpers, sameAs } from '@vuelidate/validators';
import { passwordValidation } from 'src/utils/validations';
import { useVuelidate } from '@vuelidate/core';
import { useQuasar } from 'quasar';

const router = useRouter();
const step = ref<number>(1);
const $q = useQuasar();
const showPassword = ref(false);
const loading = ref(false);

const pass = reactive(<IChangePassword>{});

function dialog() {
  $q.dialog({
    title: 'Sucesso!',
    message: 'Senha alterada com sucesso!',
    persistent: true,
    ok: {
      onclick: () => router.go(-1),
    },
  });
}

const newPasswordRules = computed(() => ({
  password: {
    required: helpers.withMessage('Campo obrigatório', required),
    validPassword: helpers.withMessage('Senha inválida', passwordValidation),
  },
  rePassword: {
    validRePassword: helpers.withMessage(
      'Confirmação de senha diferente de senha',
      sameAs(pass.password)
    ),
  },
}));

const v$_newPassword = useVuelidate(newPasswordRules, pass);

async function nextStep(val: number) {
  switch (val) {
    case 1:
      showPassword.value = false;
      return (step.value = 2);
    case 2:
      const validPassword = await v$_newPassword.value.$validate();
      if (!validPassword) return;
      dialog();
  }
}
</script>

<style scoped>
.button {
  height: 3.5rem;
  border-radius: 5px;
}
</style>
