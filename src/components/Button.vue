<template>
  <q-btn
    unelevated
    class="button full-width q-mt-md"
    :color="secondary ? 'white' : 'primary'"
    :text-color="secondary ? 'primary' : 'white'"
    :label="label"
    :disable="disable"
  />
</template>

<script setup lang="ts">
interface ButtonProps {
  label: string;
  secondary?: boolean;
  disable?: boolean;
}

defineProps<ButtonProps>();
</script>

<style scoped>
.button {
  height: 3.5rem;
  border-radius: 5px;
}
</style>
