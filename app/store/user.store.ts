import { defineStore } from "pinia";

export type User = {
  userName: string;
  userEmail: string;
};

type Store = {
  isRegistered: boolean;
  isActive: boolean;
  userInfo: User;
};

export const useUserStore = defineStore("userStoreID", {
  state: (): Store => {
    return {
      isRegistered: false,
      isActive: false,
      userInfo: {
        userName: "",
        userEmail: "",
      },
    };
  },
  actions: {
    setAuth(user: User, isActive?: boolean) {
      this.userInfo = user;
      this.isRegistered = true;
      this.isActive = isActive ? isActive : this.isActive;
    },
    setActive() {
      this.isActive = true;
    },
  },
  getters: {
    getRegistered(): boolean {
      return this.isRegistered;
    },
    getUser(): User {
      return this.userInfo;
    },
    getActive(): boolean {
      return this.isActive;
    },
  },
});
