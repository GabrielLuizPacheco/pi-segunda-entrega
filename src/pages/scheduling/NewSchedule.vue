<template>
  <q-page>
    <Header title="Agendar" class="q-mb-lg" />
    <q-form @submit.prevent.stop="onSubmit()" class="q-px-lg">
      <div class="row items-center q-mb-sm">
        <q-icon
          name="mdi-medical-bag"
          class="q-mr-sm"
          size="18px"
          color="primary"
        />
        <span class="dark">{{ lastAppointment.specialty }}</span>
      </div>
      <div class="row items-center">
        <q-icon
          name="mdi-map-marker"
          class="q-mr-sm"
          size="18px"
          color="dark"
        />
        <span>{{ lastAppointment.location }}</span>
      </div>
      <Button label="Confirmar" type="submit" />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import Header from 'src/components/Header.vue';
import Button from 'src/components/Button.vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useSchedulingStore } from 'src/stores/scheduling-store';

const router = useRouter();
const { lastAppointment } = useSchedulingStore();

const $q = useQuasar();

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
  return true;
}
</script>

<style scoped></style>
