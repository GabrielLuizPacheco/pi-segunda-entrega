<template>
  <q-input
    hide-bottom-space
    outlined
    v-model="value"
    :label="label"
    class="q-mb-md"
    :type="type"
    :error="!!errorMsg"
    :error-message="errorMsg"
  >
    <template v-if="!!icon" v-slot:append>
      <q-avatar>
        <q-icon
          :name="icon"
          @click="emit('iconClicked')"
          class="cursor-pointer"
          size="24px"
          color="primary"
        />
      </q-avatar>
    </template>
  </q-input>
</template>

<script setup lang="ts">
interface InputProps {
  label?: string;
  type?: string;
  icon?: string;
  errorMsg?: string;
}

defineProps<InputProps>();
const value = defineModel<string>();
const emit = defineEmits(['iconClicked']);
</script>

<style scoped></style>
