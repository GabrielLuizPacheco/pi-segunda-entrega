<template>
  <q-tab-panels v-model="tab" animated>
    <q-tab-panel class="text-dark" name="details">
      <p :class="curretStatus.color">{{ curretStatus.description }}</p>
      <div class="row items-center q-mb-md">
        <div class="row items-center col">
          <q-icon
            name="mdi-medical-bag"
            class="q-mr-sm"
            size="18px"
            color="primary"
          />
          <span class="dark">{{ scheduling?.specialty }}</span>
        </div>
        <div class="row items-center col">
          <q-icon
            name="mdi-calendar"
            class="q-mr-sm"
            size="18px"
            color="dark"
          />
          <span class="dark"
            >{{ scheduling?.date }} - {{ scheduling?.time }}</span
          >
        </div>
      </div>

      <div class="row items-center q-mb-md">
        <q-icon
          name="mdi-map-marker"
          class="q-mr-sm"
          size="18px"
          color="dark"
        />
        <span>{{ scheduling?.location }}</span>
      </div>

      <div class="row items-center q-mb-md">
        <q-icon name="mdi-doctor" class="q-mr-sm" size="18px" color="primary" />
        <span>{{ scheduling?.doctor }}</span>
      </div>

      <div
        class="row items-center justify-end"
        v-if="curretStatus.description === 'PENDENTE'"
      >
        <q-btn
          unelevated
          label="Cancelar"
          class="button text-red"
          @click="tab = 'cancellation'"
        />
      </div>
    </q-tab-panel>

    <q-tab-panel name="cancellation">
      <span>Deseja realmente cancelar este agendamento?</span>
      <div
        class="row items-center justify-end q-mt-lg"
        v-if="curretStatus.description === 'PENDENTE'"
      >
        <q-btn
          unelevated
          label="Sim"
          class="button q-mr-lg"
          @click="removeSchedule()"
        />
        <q-btn
          unelevated
          label="Não"
          class="button text-red"
          @click="tab = 'details'"
        />
      </div>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup lang="ts">
import { IScheduling } from 'src/interface/scheduling';
import { onBeforeMount, ref } from 'vue';
import { useSchedulingStore } from 'src/stores/scheduling-store';

interface DetailsProps {
  scheduling?: IScheduling;
}

const { scheduling } = defineProps<DetailsProps>();
const { schedules } = useSchedulingStore();
const closeModal = defineModel<boolean>();

const curretStatus = ref({} as any);
const tab = ref('details');

function removeSchedule() {
  const index = schedules.findIndex((obj) => obj.id == scheduling?.id);
  schedules[index].canceled = true;
  closeModal.value = false;
}

const status = (scheduling: IScheduling) => {
  if (!scheduling.completed && !scheduling.canceled) {
    curretStatus.value = {
      color: 'bg-warning',
      description: 'PENDENTE',
    };
  }

  if (!scheduling.completed && scheduling.canceled) {
    curretStatus.value = {
      color: 'bg-red',
      description: 'CANCELADO',
    };
  }

  if (scheduling.completed && !scheduling.canceled) {
    curretStatus.value = {
      color: 'bg-green-14',
      description: 'COMPLETA',
    };
  }
};

onBeforeMount(() => {
  status(scheduling);
});
</script>

<style scoped>
p {
  color: white;
  padding: 8px;
  border-radius: 5px;
  text-align: center;
}

.q-tab-panel {
  padding: 0px;
}
</style>
