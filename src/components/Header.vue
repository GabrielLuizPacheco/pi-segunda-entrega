<template>
  <header class="bg-white text-dark">
    <q-toolbar>
      <q-icon
        v-if="!hideIcon"
        name="mdi-chevron-left"
        class="cursor-pointer"
        size="32px"
        color="dark"
        @click="router.go(-1)"
      />

      <q-toolbar-title style="font-weight: 600" class="q-ml-xs">{{
        title
      }}</q-toolbar-title>
    </q-toolbar>
  </header>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

interface HeaderProps {
  title?: string;
  hideIcon?: boolean;
}

const router = useRouter();

defineProps<HeaderProps>();
</script>
