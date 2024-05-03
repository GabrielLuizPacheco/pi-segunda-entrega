<template>
  <header class="bg-white">
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="mdi-chevron-left"
        aria-label="Menu"
        color="black"
      />
      <q-toolbar-title>{{ title }}</q-toolbar-title>
    </q-toolbar>
  </header>
</template>
<script setup lang="ts">
defineProps({
  title: String,
});
</script>
