import { defineStore } from 'pinia';
import { IUser } from 'src/interface/user';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {} as IUser,
    token: {},
  }),
  getters: {
    isLoggedIn: (state) => !!Object.keys(state.user).length,
  },
  actions: {
    logout() {
      this.user = {} as IUser;
    },
    login(user: IUser) {
      this.user = user;
    },
  },
  persist: true,
});
