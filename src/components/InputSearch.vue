<template>
  <q-input
    hide-bottom-space
    outlined
    v-model="value"
    :label="label"
    class="q-mb-md"
    :mask="mask"
    :disable="disable"
    debounce="1000"
    @update:model-value="emit('request', value)"
  >
    <template v-slot:append>
      <q-avatar>
        <q-icon name="mdi-magnify" size="24px" color="primary" />
      </q-avatar>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface InputSearchProps {
  label?: string;
  mask?: string;
  disable?: boolean;
}

defineProps<InputSearchProps>();
const value = ref();
const emit = defineEmits(['request']);
</script>

<style scoped></style>
