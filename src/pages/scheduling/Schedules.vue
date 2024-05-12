<template>
  <q-page>
    <Header hide-icon title="Agendamentos" class="q-mb-lg" />
    <div class="row items-center q-px-lg">
      <q-btn
        unelevated
        outline
        label="Agendamentos"
        class="button q-mr-lg col"
        :color="selectedList < 2 ? 'primary' : 'dark'"
        @click="onClickAppointments()"
      />
      <q-btn
        unelevated
        outline
        label="Histórico"
        class="button col"
        :color="selectedList > 1 ? 'primary' : 'dark'"
        @click="onClickHistory()"
      />
    </div>
    <q-scroll-area v-if="loading" style="height: 75vh" class="q-mt-md q-px-sm">
      <q-list class="q-pa-md">
        <q-skeleton
          v-for="skeleton in skeletonList"
          :key="skeleton"
          style="width: 100%; height: 6.5rem"
          class="q-mb-lg"
        />
      </q-list>
    </q-scroll-area>
    <div
      v-if="!loading && schedules.length < 1"
      style="height: 75vh"
      class="row items-center justify-center"
    >
      <div>
        <div class="row items-center justify-center">
          <q-icon name="mdi-medical-bag" size="64px" color="grey-4" />
        </div>
        <p class="text-grey-6">Não há agendamentos disponíveis</p>
      </div>
    </div>
    <q-scroll-area
      v-if="!loading && schedules.length > 0"
      style="height: 75vh"
      class="q-mt-md q-px-sm"
    >
      <q-list class="q-pa-md">
        <ScheduleItem
          v-for="scheduling in schedules"
          :key="scheduling.id"
          :scheduling="scheduling"
          :disabled="selectedList > 1"
          @on-click="moreDetails(scheduling)"
          class="q-mb-lg"
        />
      </q-list>
    </q-scroll-area>
    <Modal title="Detalhes" v-model="openModal">
      <SchedulingDetails v-model="openModal" :scheduling="currentSchedule" />
    </Modal>
  </q-page>
</template>

<script setup lang="ts">
import Header from 'src/components/Header.vue';
import { useSchedulingStore } from 'src/stores/scheduling-store';
import ScheduleItem from 'src/components/ScheduleItem.vue';
import { ref, onBeforeMount, watch } from 'vue';
import { IScheduling } from 'src/interface/scheduling';
import Modal from 'src/components/Modal.vue';
import SchedulingDetails from './SchedulingDetails.vue';

const schedulingStore = useSchedulingStore();
const selectedList = ref(1);
const schedules = ref<IScheduling[]>([]);
const loading = ref(false);
const openModal = ref(false);
const currentSchedule = ref(<IScheduling>{});

const skeletonList = [1, 2, 3];

function moreDetails(scheduling: IScheduling) {
  currentSchedule.value = scheduling;
  openModal.value = true;
}

function onClickAppointments() {
  loading.value = true;
  schedules.value = [];
  selectedList.value = 1;
  schedules.value = schedulingStore.schedules.filter(
    (x) => !x.completed && !x.canceled && !x.absent
  );
  loading.value = false;
}
function onClickHistory() {
  loading.value = true;
  schedules.value = [];
  selectedList.value = 2;
  schedules.value = schedulingStore.schedules.filter(
    (x) => x.completed || x.canceled || x.absent
  );
  loading.value = false;
}

watch(openModal, () => {
  if (!openModal.value && selectedList.value < 2) {
    onClickAppointments();
  }
});

onBeforeMount(() => {
  onClickAppointments();
});
</script>
