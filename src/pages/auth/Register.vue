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
      <q-step :name="1" title="Informativo" icon="settings" :done="step > 1">
        Este formulário representa apenas o cadastro inicial para o acesso ao
        nosso app. Entre em nossos canais de comunicação internos após o login
        para completar seu cadastro e participar de nossos planos.
      </q-step>

      <q-step
        :name="2"
        title="Dados cadastrais"
        icon="create_new_folder"
        :done="step > 2"
      >
        <Input required label="Nome" v-model="userInfos.name" />
        <Input required label="Email" v-model="userInfos.email" />
        <Input
          required
          label="CPF"
          v-model="userInfos.CPF"
          mask="###.###.###-##"
        />
        <div class="row">
          <Select
            required
            class="col"
            v-model="userInfos.gender"
            :options="genders"
            label="Gênero"
          />
          <q-space class="col q-ma-sm" />
          <DatePicker
            required
            class="col"
            label="Nascimento"
            v-model="userInfos.birthday"
          />
        </div>
        <Input
          label="Telefone celular"
          v-model="userInfos.phone"
          mask="(##) #####-####"
        />
      </q-step>

      <q-step :name="3" title="Criação de senha" icon="add_comment">
        <Input
          label="Senha"
          v-model="userInfos.password"
          :type="showPassword ? 'text' : 'password'"
          :icon="showPassword ? 'mdi-lock-open' : 'mdi-lock'"
          @icon-clicked="showPassword = !showPassword"
        />
        <Input
          label="Confirmação de senha"
          v-model="userInfos.rePassword"
          :type="showPassword ? 'text' : 'password'"
          :icon="showPassword ? 'mdi-lock-open' : 'mdi-lock'"
          @icon-clicked="showPassword = !showPassword"
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
            @click="$refs.stepper.next()"
            color="primary"
            :label="step === 3 ? 'Finalizar' : 'Continuar'"
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
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import Input from 'src/components/Input.vue';
import { IRegisterUser } from 'src/interface/user';
import Select from 'src/components/Select.vue';
import genders from 'src/constants/genders.json';
import DatePicker from 'src/components/DatePicker.vue';

const router = useRouter();
const step = ref(1);
const showPassword = ref(false);
const userInfos = reactive(<IRegisterUser>{});
</script>

<style scoped>
.button {
  height: 3.5rem;
  border-radius: 5px;
}
</style>
