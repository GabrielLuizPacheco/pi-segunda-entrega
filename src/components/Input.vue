<template>
  <q-input
    hide-bottom-space
    outlined
    v-model="value"
    :label="label"
    class="q-mb-md"
    :type="type"
    :mask="mask"
    :error="!!errorMsg"
    :error-message="errorMsg"
    :disable="disable"
  >
    <template v-slot:label>
      {{ label }}
      <span v-if="required" class="text-red">*</span>
    </template>
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
  required?: boolean;
  mask?: string;
  disable?: boolean;
  debounce?: boolean;
}

defineProps<InputProps>();
const value = defineModel<string>();
const emit = defineEmits(['iconClicked']);
</script>

<style scoped></style>
