import { defineStore } from 'pinia';
import { IScheduling } from 'src/interface/scheduling';

export const useSchedulingStore = defineStore('scheduling', {
  state: () => ({
    lastAppointment: {} as IScheduling,
    schedules: [] as IScheduling[],
  }),
  actions: {
    setLastAppointment(scheduling: IScheduling) {
      this.lastAppointment = scheduling;
    },
    setScheduling(scheduling: IScheduling) {
      this.schedules.push(scheduling);
    },
    clearSchedules() {
      this.lastAppointment = {} as IScheduling;
      this.schedules = [] as IScheduling[];
    },
  },
  persist: true,
});
