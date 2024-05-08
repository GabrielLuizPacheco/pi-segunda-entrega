<template>
  <q-page>
    <header
      class="bg-white q-pt-md q-px-md"
      style="border-bottom: 1px solid rgba(0, 0, 0, 0.1)"
    >
      <Input label="Pesquise uma especialidade" icon="mdi-magnify" />
    </header>
    <q-scroll-area style="height: 75vh">
      <q-list>
        <q-item
          v-for="specialty in specialties"
          :key="specialty.id"
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
            <span class="text-grey-9">{{ specialty.location }}</span>
          </div>
          <div class="row items-center">
            <q-icon
              name="mdi-medical-bag"
              class="q-mr-sm"
              size="18px"
              color="grey-9"
            />
            <span class="text-grey-9">{{ specialty.specialty }}</span>
          </div>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script setup lang="ts">
import Input from 'src/components/Input.vue';
import specialties from 'src/constants/specialty.json';
</script>

<style scoped>
.item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.q-item__section--main + .q-item__section--main {
  margin-left: 0px;
}
</style>
