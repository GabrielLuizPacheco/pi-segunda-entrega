<template>
  <header class="bg-white">
    <q-toolbar>
      <q-icon
        name="mdi-chevron-left"
        class="cursor-pointer"
        size="32px"
        color="dark"
        @click="router.go(-1)"
      />

      <q-toolbar-title>{{ title }}</q-toolbar-title>
    </q-toolbar>
  </header>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
  title: String,
});
</script>
