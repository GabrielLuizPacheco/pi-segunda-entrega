<template>
  <q-page>
    <Header title="Editar perfil" class="q-mb-lg" />
    <q-form @submit.prevent.stop="onSubmit()" class="q-px-lg">
      <Input
        required
        label="Email"
        v-model="newInfos.email"
        :error-msg="v$.email.$errors[0]?.$message"
      />

      <Select
        required
        class="col"
        v-model="newInfos.gender"
        :options="genders"
        label="Gênero"
        :error-msg="v$.gender.$errors[0]?.$message"
      />

      <Input
        label="Telefone celular"
        v-model="newInfos.phone"
        mask="(##) #####-####"
        :error-msg="v$.phone.$errors[0]?.$message"
      />
      <Button label="Salvar" type="submit" />
      <div class="row items-center justify-end q-mt-lg text-dark">
        Encerrar conta
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import Input from 'src/components/Input.vue';
import Select from 'src/components/Select.vue';
import Header from 'src/components/Header.vue';
import Button from 'src/components/Button.vue';
import { reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import rules from 'src/rules/profile.rules';
import { IUser } from 'src/interface/user';
import genders from 'src/constants/genders.json';
import { useAuthStore } from 'src/stores/auth-store';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const { user } = useAuthStore();
const $q = useQuasar();
const newInfos = reactive(<IUser>{ ...user });
const router = useRouter();

const v$ = useVuelidate(rules, newInfos);

function dialog() {
  $q.dialog({
    title: 'Sucesso!',
    message: 'Edição de perfil feita com sucesso!',
    persistent: true,
    ok: {
      onclick: () => router.go(-1),
    },
  });
}

async function onSubmit() {
  const valid = await v$.value.$validate();
  if (!valid) return;

  Object.assign(user, newInfos);

  dialog();
}
</script>

<style scoped></style>
