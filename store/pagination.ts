import { defineStore } from "pinia";

export const usePaginationStore = defineStore("pagination", () => {
  const currentPage = ref(0);
  return {
    currentPage,
  };
});
