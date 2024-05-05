<template>
  <q-input
    hide-bottom-space
    outlined
    v-model="date"
    :label="label"
    class="q-mb-md full-width"
  >
    <template v-slot:label>
      {{ label }}
      <span v-if="required" class="text-red">*</span>
    </template>
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="date">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup lang="ts">
interface DatePickerProps {
  label: string;
  required?: boolean;
}

const date = defineModel<string>();

defineProps<DatePickerProps>();
</script>

<style scoped>
.button {
  height: 3.5rem;
  border-radius: 5px;
}
</style>
