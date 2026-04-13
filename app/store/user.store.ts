import { defineStore } from "pinia";

type User = {
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
    setAuth(user: User) {
      this.userInfo = user;
      this.isRegistered = true;
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
  },
});
