<template>
  <q-page class="container row items-center justify-center">
    <div class="q-px-lg content">
      <h5 class="text-primary">LOGO_EMPRESA</h5>
      <p class="text-dark">Seu aplicativo de agendamentos clínicos</p>
      <div class="row items-center">
        <Button
          secondary
          label="Conveniar-se"
          type="button"
          class="col"
          @click="router.push({ path: '/register' })"
        />
        <q-space class="col q-ma-md" />
        <Button
          label="Login"
          type="button"
          class="col"
          @click="router.push({ path: '/login' })"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import Button from 'src/components/Button.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped>
.container {
  background-image: url('src/assets/images/doutora.jpg');
  background-size: cover;
}
.content {
  width: 30rem;
}

p,
h5 {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
