import { defineStore } from "pinia";

export const useFilterStore = defineStore("filter", () => {
  const searchValue = ref("");
  const sortOrder = ref(true);
  const sortValue = ref("default");

  const updateSort = (val: string) => {
    if (sortValue.value === val) {
      sortOrder.value = !sortOrder.value;
    }
    sortValue.value = val;
  };

  return {
    updateSort,
    searchValue,
    sortOrder,
    sortValue,
  };
});
