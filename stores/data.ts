import { defineStore } from "pinia";

export const useStore = defineStore("data", {
  state: () => {
    return { tab: null };
  },
});
