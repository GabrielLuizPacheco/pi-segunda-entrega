<template>
  <q-page>
    <Header title="Agendar" class="q-mb-lg" />
    <q-form @submit.prevent.stop="onSubmit()" class="q-px-lg">
      <div class="row items-center q-mb-sm">
        <q-icon
          name="mdi-medical-bag"
          class="q-mr-sm"
          size="18px"
          color="primary"
        />
        <span class="dark">{{ lastAppointment.specialty }}</span>
      </div>
      <div class="row items-center">
        <q-icon
          name="mdi-map-marker"
          class="q-mr-sm"
          size="18px"
          color="dark"
        />
        <span>{{ lastAppointment.location }}</span>
      </div>
      <div class="row items-center justify-center q-my-lg">
        <q-date
          class="full-width"
          v-model="date"
          :options="optionsFn"
          mask="DD/MM/YYYY"
        />
      </div>
      <div class="row items-center">
        <div class="row items-center q-mr-lg col-6">
          <q-icon
            name="mdi-calendar-check"
            class="q-mr-sm"
            size="18px"
            color="dark"
          />
          <span>{{ date ? date : '- - - - - - - -' }}</span>
        </div>
        <q-btn
          class="row items-center text-dark"
          unelevated
          outline
          :disable="!!!date"
        >
          <q-icon name="mdi-clock" class="q-mr-sm" size="18px" />
          <span>{{ time ? time : '- - : - -' }}</span>
          <q-popup-proxy
            cover
            transition-show="scale"
            transition-hide="scale"
            @before-show="updateProxy"
          >
            <q-time
              v-model="proxyTime"
              :hour-options="hourOptionsTime"
              :minute-options="minuteOptionsTime"
            >
              <div class="row items-center justify-end q-gutter-sm">
                <q-btn label="Cancelar" color="primary" flat v-close-popup />
                <q-btn
                  label="OK"
                  color="primary"
                  flat
                  v-close-popup
                  @click="save"
                />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-btn>
      </div>
      <div class="q-mt-sm">
        <q-icon name="mdi-doctor" class="q-mr-sm" size="18px" color="primary" />
        <span class="dark">{{
          time ? lastAppointment.doctor : '- - - - - - - - - -'
        }}</span>
      </div>

      <Button
        label="Confirmar"
        type="submit"
        class="q-mt-lg"
        :disable="!!!time"
        :loading="loading"
      />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import Header from 'src/components/Header.vue';
import Button from 'src/components/Button.vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useSchedulingStore } from 'src/stores/scheduling-store';
import { ref } from 'vue';
import { IScheduling } from 'src/interface/scheduling';
import { uuid } from 'vue-uuid';

const router = useRouter();
const $q = useQuasar();
const { lastAppointment, schedules } = useSchedulingStore();
const date = ref('');
const time = ref('');
const proxyTime = ref('');
const loading = ref(false);

const hourOptionsTime = [8, 9, 10, 12, 13, 14, 15, 16];
const minuteOptionsTime = [5, 15, 30, 45];

function dialog(title: string, message: string, onclick: () => void) {
  $q.dialog({
    title: title,
    message: message,
    persistent: true,
    ok: {
      onclick: onclick(),
    },
  });
}

const optionsFn = (date) => {
  return date >= '2024/05/25';
};

function updateProxy() {
  proxyTime.value = time.value;
}

function save() {
  time.value = proxyTime.value;
}

async function onSubmit() {
  loading.value = true;
  const newSchedule: IScheduling = {
    id: uuid.v1(),
    date: date,
    doctor: lastAppointment.doctor,
    location: lastAppointment.location,
    specialty: lastAppointment.specialty,
    time: time,
  };

  const hasAppointment = schedules.find(
    (x) => !x.completed && !x.canceled && !x.absent
  );

  if (!!hasAppointment) {
    dialog('Alerta!', 'Há uma consulta pendente', () => undefined);
    loading.value = false;
    return;
  }

  schedules.push(newSchedule);

  loading.value = false;

  dialog('Sucesso!', 'Agendamento feito com sucesso', () => router.go(-1));
}
</script>

<style scoped></style>
