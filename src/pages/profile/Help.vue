<template>
  <q-page>
    <Header title="Ajuda" class="q-mb-lg" />
    <label style="font-size: 22px" class="text-grey-6 q-ml-md"
      >Perguntas frequentes</label
    >
    <q-list class="q-mt-md">
      <q-item
        v-for="question in questions"
        :key="question.id"
        clickable
        class="item row items-center q-mx-md q-py-md"
      >
        <span class="text-grey-9">{{ question.description }}</span>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import Header from 'src/components/Header.vue';
import { useRouter } from 'vue-router';
import questions from 'src/constants/questions.json';

const router = useRouter();
</script>

<style scoped>
.item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
