<template>
  <q-btn
    class="button full-width q-mt-md"
    color="primary"
    text-color="white"
    :label="label"
  />
</template>

<script setup lang="ts">
defineProps({
  label: String,
});
</script>

<style scoped>
.button {
  height: 3.5rem;
  border-radius: 5px;
}
</style>
