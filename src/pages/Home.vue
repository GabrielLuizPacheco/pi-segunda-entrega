<template>
  <q-page>
    <header
      class="bg-white q-pt-md q-px-md"
      style="border-bottom: 1px solid rgba(0, 0, 0, 0.1)"
    >
      <InputSearch
        label="Pesquise uma especialidade"
        @request="(e) => loadAdresses(e)"
      />
    </header>
    <q-scroll-area style="height: 75vh" v-if="loading">
      <q-list>
        <q-item
          v-for="especialidade in especialidades"
          :key="especialidade.id"
          clickable
          class="item column q-mx-md q-py-md"
        >
          <q-skeleton style="width: 80%" class="q-mb-sm" />
          <q-skeleton style="width: 45%" />
        </q-item>
      </q-list>
    </q-scroll-area>

    <div
      v-if="!loading && adresses.length < 1"
      style="height: 75vh"
      class="row items-center justify-center"
    >
      <div>
        <div class="row items-center justify-center">
          <q-icon name="mdi-medical-bag" size="64px" color="grey-4" />
        </div>
        <p class="text-grey-6">Especialidade não encontrada</p>
      </div>
    </div>

    <q-scroll-area style="height: 75vh" v-if="!loading && adresses.length > 0">
      <q-list>
        <q-item
          v-for="address in adresses"
          :key="address.id"
          clickable
          class="item column q-mx-md q-py-md"
          @click="() => onSelectAddress(address)"
        >
          <div class="row items-center q-mb-xs">
            <q-icon
              name="mdi-map-marker"
              class="q-mr-sm"
              size="18px"
              color="grey-9"
            />
            <span class="text-grey-9">{{ address.endereco }}</span>
          </div>
          <div class="row items-center">
            <q-icon
              name="mdi-medical-bag"
              class="q-mr-sm"
              size="18px"
              color="grey-9"
            />
            <span class="text-grey-9">{{ address.especialidade }}</span>
          </div>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script setup lang="ts">
import { IAddress, getAdresses } from 'src/api/adresses';
import { ref, onBeforeMount } from 'vue';
import InputSearch from 'src/components/InputSearch.vue';
import especialidades from 'src/constants/specialty.json';
import { useSchedulingStore } from 'src/stores/scheduling-store';
import { useRouter } from 'vue-router';

const loading = ref(true);
const adresses = ref<IAddress[]>([]);
const { setLastAppointment } = useSchedulingStore();
const router = useRouter();

function onSelectAddress(address: IAddress) {
  setLastAppointment({
    location: address.endereco,
    doctor: address.medico,
    specialty: address.especialidade,
  });
  router.push({ path: '/newschedule' });
}

function loadAdresses(search: string) {
  loading.value = true;
  getAdresses(search)
    .then((resp) => {
      adresses.value = resp;
    })
    .finally(() => {
      loading.value = false;
    });
}

onBeforeMount(() => {
  loadAdresses('');
});
</script>

<style scoped>
.item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.q-item__section--main + .q-item__section--main {
  margin-left: 0px;
}
</style>
