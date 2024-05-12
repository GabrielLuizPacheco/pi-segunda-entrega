<template>
  <q-page>
    <Header hide-icon title="Perfil" />
    <div class="q-pa-md">
      <div class="row">
        <p class="q-mr-sm">Paciente:</p>
        <p>{{ user.name }}</p>
      </div>
      <div class="row">
        <p class="q-mr-sm">Email:</p>
        <p class="text-grey-7">{{ user.email }}</p>
      </div>
      <div class="row items-center">
        <p class="text-primary q-mr-sm">Registro:</p>
        <p>- - - - - - -</p>
      </div>
    </div>
    <q-list>
      <q-item
        v-for="option in profileOptions"
        :key="option.id"
        clickable
        class="item row items-center q-mx-md q-py-md"
        :disable="option.disabled"
        @click="option.url ? router.push({ path: option.url }) : onLogout()"
      >
        <q-icon
          :name="option.icon"
          class="q-mr-md"
          size="18px"
          color="grey-9"
        />
        <span class="text-grey-9">{{ option.title }}</span>
      </q-item>
    </q-list>
    <p class="copyright text-grey-6">Powered by Grupo 37</p>
  </q-page>
</template>

<script setup lang="ts">
import Header from 'src/components/Header.vue';
import profileOptions from 'src/constants/profileOptions.json';
import { useAuthStore } from 'src/stores/auth-store';
import { useRouter } from 'vue-router';
import { useSchedulingStore } from 'src/stores/scheduling-store';

const router = useRouter();
const { user, logout } = useAuthStore();
const { clearSchedules } = useSchedulingStore();

function onLogout() {
  clearSchedules();
  logout();
  router.push({ path: '/' });
}
</script>

<style scoped>
.item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.copyright {
  position: absolute;
  bottom: 0;
  right: 1rem;
}
</style>
