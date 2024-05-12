<template>
  <q-item @click="emit('onClick')" clickable class="row items-center item">
    <div class="col-10">
      <div class="row items-center q-mb-md">
        <q-icon
          name="mdi-medical-bag"
          class="col-1 q-mr-sm"
          size="18px"
          :color="disabled ? 'grey-8' : 'primary'"
        />
        <span class="col-10 dark">{{ scheduling.specialty }}</span>
      </div>
      <div class="row items-center">
        <q-icon
          name="mdi-map-marker"
          class="col-1 q-mr-sm"
          size="18px"
          :color="disabled ? 'grey-8' : 'dark'"
        />
        <span class="col-10 text-grey-8">{{ scheduling.location }}</span>
      </div>
    </div>
    <div class="row items-center justify-center col-2">
      <div>
        <p id="day" :class="disabled ? 'text-grey-7' : 'text-primary'">
          {{ scheduling.date?.slice(0, 2) }}
        </p>
        <p id="month" class="text-dark">
          {{ month(Number(scheduling.date?.slice(3, 5))) }}
        </p>
        <p id="year" class="text-grey-7">{{ scheduling.date?.slice(6, 10) }}</p>
      </div>
    </div>
  </q-item>
</template>

<script setup lang="ts">
import { IScheduling } from 'src/interface/scheduling';
import { months } from 'src/constants/months';

interface ItemProps {
  scheduling: IScheduling;
  disabled?: boolean;
}

const month = (val: number) => {
  return months[val];
};

const emit = defineEmits(['onClick']);
defineProps<ItemProps>();
</script>

<style scoped>
.item {
  box-shadow: 0px 1px 3px rgb(0, 0, 0, 0.4);
  border-radius: 5px;
  height: 6.5rem;
}

#day {
  font-size: 32px;
  margin-bottom: -9px;
}

#month {
  font-size: 16px;
  margin-bottom: -3px;
}

#year {
  font-size: 14px;
}

p {
  margin: 0;
  text-align: center;
  font-weight: 600;
}

span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
