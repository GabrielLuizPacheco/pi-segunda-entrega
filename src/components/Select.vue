<template>
  <q-select
    class="full-width q-mb-md"
    outlined
    v-model="value"
    :options="options"
    :label="label"
  >
    <template v-slot:label>
      {{ label }}
      <span v-if="required" class="text-red">*</span>
    </template>
  </q-select>
</template>

<script setup lang="ts">
interface IOption {
  value: number;
  label: string;
}

interface SelectProps {
  label: string;
  required?: boolean;
  options: IOption[];
}

defineProps<SelectProps>();
const value = defineModel<number>();
</script>

<style scoped></style>
