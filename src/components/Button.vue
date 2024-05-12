<template>
  <q-btn
    unelevated
    class="button full-width q-mt-md"
    :color="secondary ? 'white' : 'primary'"
    :text-color="secondary ? 'primary' : 'white'"
    :label="label"
    :disable="disable"
    :loading="loading"
  />
</template>

<script setup lang="ts">
interface ButtonProps {
  label: string;
  secondary?: boolean;
  disable?: boolean;
  loading?: boolean;
}

defineProps<ButtonProps>();
</script>
