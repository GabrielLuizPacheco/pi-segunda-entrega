<template>
  <q-dialog v-model="val">
    <q-card style="width: 100ch">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ title }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <slot />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
interface ModalProps {
  title: string;
}
const val = defineModel<boolean | undefined>();

defineProps<ModalProps>();
</script>
