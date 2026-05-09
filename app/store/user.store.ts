import { defineStore } from "pinia";

export type User = {
  userId: string;
  userName: string;
  userEmail: string;
  userPhoneNumber: string;
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
        userId: "",
        userName: "",
        userEmail: "",
        userPhoneNumber: "",
      },
    };
  },
  actions: {
    setAuth(user: User, isActive?: boolean) {
      this.userInfo = user;
      this.isRegistered = true;
      this.isActive = isActive ? isActive : this.isActive;
    },
    updateUser(user: User) {
      this.userInfo = user;
    },
    updateUserName(userName: string) {
      this.userInfo.userName = userName;
    },
    setActive() {
      this.isActive = true;
    },
    resetAuth() {
      this.userInfo = {
        userName: "",
        userEmail: "",
        userPhoneNumber: "",
        userId: "",
      };
      ((this.isRegistered = false), (this.isActive = false));
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
