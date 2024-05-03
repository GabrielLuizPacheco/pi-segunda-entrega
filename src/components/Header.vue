<template>
  <header class="bg-white">
    <q-toolbar>
      <q-icon
        name="mdi-chevron-left"
        class="cursor-pointer"
        size="32px"
        color="dark"
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
