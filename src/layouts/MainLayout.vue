<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer
      class="row q-py-md bg-white"
      style="border-top: 1px solid rgba(0, 0, 0, 0.1)"
    >
      <div class="col row justify-center">
        <q-icon
          name="mdi-calendar"
          class="cursor-pointer"
          size="32px"
          :color="route.path === '/schedules' ? 'primary' : 'grey-6'"
          @click="router.push({ path: '/schedules' })"
        />
      </div>
      <div class="col row justify-center">
        <q-icon
          name="mdi-magnify"
          class="cursor-pointer"
          size="32px"
          :color="route.path === '/home' ? 'primary' : 'grey-6'"
          @click="router.push({ path: '/home' })"
        />
      </div>
      <div class="col row justify-center">
        <q-icon
          name="mdi-account"
          class="cursor-pointer"
          size="32px"
          :color="route.path === '/profile' ? 'primary' : 'grey-6'"
          @click="router.push({ path: '/profile' })"
        />
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: none;
}
</style>
