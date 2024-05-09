<template>
  <header class="bg-white text-dark">
    <q-toolbar>
      <div v-if="!hideIcon" class="col">
        <q-icon
          style="z-index: 1"
          name="mdi-chevron-left"
          class="cursor-pointer"
          size="32px"
          color="dark"
          @click="router.go(-1)"
        />
      </div>

      <q-toolbar-title
        style="font-weight: 600"
        class="col q-ml-xs"
        :class="hasIconAndTitle && 'text-center'"
        >{{ title }}</q-toolbar-title
      >

      <div class="col"></div>
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

const { hideIcon, title } = defineProps<HeaderProps>();

const hasIconAndTitle = !hideIcon && title;
</script>
