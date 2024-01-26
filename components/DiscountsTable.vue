<template>
  <BaseTable
    v-if="data?.length"
    :header="DISCOUNTS_HEADER"
    :data="data"
    :shadowed="true"
    :sortable="true"
  />
  <div v-else class="preloader-wrapper">
    <img
      class="w-16"
      src="~/assets/icons/oval.svg"
      alt="Preloader"
      loading="eager"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDiscountsStore } from "~/store/discounts";
import { usePaginationStore } from "~/store/pagination";
import { DISCOUNTS_HEADER } from "~/constants/discounts";

const store = useDiscountsStore();
const pagesStore = usePaginationStore();

const { currentPage } = storeToRefs(pagesStore);
const { discounts } = storeToRefs(store);

const { fetchDiscounts, subscribeToUpdates, unsubscribeFromUpdates } = store;

const start = computed(() => {
  return currentPage.value * 12;
});

const end = computed(() => {
  return (currentPage.value + 1) * 12;
});

const data = computed(() => {
  return discounts.value?.slice(start.value, end.value);
});

onMounted(() => {
  fetchDiscounts();
  subscribeToUpdates();
});

onUnmounted(() => {
  unsubscribeFromUpdates();
});
</script>

<style scoped></style>
