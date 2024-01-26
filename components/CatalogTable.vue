<template>
  <BaseTable
    v-if="data?.length"
    :header="CATALOG_HEADER"
    :data="data"
    :shadowed="true"
    :sortable="true"
    :original-items="originalItems"
    :emit-options="emitOptions"
    @delete-item="deleteItem"
    @toggle-visibility="toggleVisibility"
  >
  </BaseTable>
  <div v-else class="preloader-wrapper">
    <img
      class="w-16 h-16"
      src="~/assets/icons/oval.svg"
      alt="Preloader"
      loading="eager"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCatalogStore } from "~/store/catalog";
import { usePaginationStore } from "~/store/pagination";
import { CATALOG_HEADER } from "~/constants/catalog";

const store = useCatalogStore();
const pagesStore = usePaginationStore();

const { currentPage } = storeToRefs(pagesStore);
const { catalogItems } = storeToRefs(store);

const {
  fetchCatalogItems,
  subscribeToUpdates,
  unsubscribeFromUpdates,
  toggleVisibility,
  deleteItem,
} = store;

const emitOptions = ["deleteItem", "toggleVisibility"];

const start = computed(() => {
  return currentPage.value * 12;
});

const end = computed(() => {
  return (currentPage.value + 1) * 12;
});

const originalItems = computed(() => {
  return catalogItems.value?.slice(start.value, end.value);
});

const data = computed(() => {
  return catalogItems.value?.slice(start.value, end.value).map((item) => {
    return {
      id: item.id,
      name: item.name,
      photo: item.photo,
      item_code: item.item_code,
      date: item.date,
      in_stock: item.in_stock,
      is_visible: item.is_visible,
    };
  });
});

onMounted(() => {
  fetchCatalogItems();
  subscribeToUpdates();
});

onUnmounted(() => {
  unsubscribeFromUpdates();
});
</script>

<style scoped></style>
