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
    <q-scroll-area style="height: 75vh">
      <q-list v-if="loading">
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
      <q-list v-else>
        <q-item
          v-for="address in adresses"
          :key="address.id"
          clickable
          class="item column q-mx-md q-py-md"
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

const loading = ref(false);
const adresses = ref<IAddress[]>([]);
const noAddresses = ref(false);

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
