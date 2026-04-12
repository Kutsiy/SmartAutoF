import { defineStore } from "pinia";

export const userStore = defineStore("userStoreID", {
  state: () => {
    return {
      isRegistered: false,
      isActive: false,
      userInfo: {
        userName: "",
        userEmail: "",
      },
    };
  },
});
