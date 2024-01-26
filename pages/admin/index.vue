<template>
  <AdminPanel
    title="Catalog"
    button="Add item"
    :fields="CATALOG_INPUT_FIELDS"
    current-page="catalog"
  />
  <div class="columns-1">
    <NuxtErrorBoundary>
      <CatalogTable />
      <template #error="{ error }">
        <div class="flex flex-col items-center w-full pt-[50px]">
          <p class="mb-3 text-xl">
            An error occured when loading selected admin page
            <code>{{ error }}</code>
          </p>
          <p class="py-3">
            <button
              class="transition duration-200 hover:bg-sky-500 text-lg px-7 mx-auto py-2 bg-sky-400 text-white border"
              @click="clearError(error)"
            >
              Back to catalog
            </button>
          </p>
        </div>
      </template>
    </NuxtErrorBoundary>
    <BasePagination :items="catalogItems" :target-ref="scrollEl" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCatalogStore } from "~/store/catalog";
import { CATALOG_INPUT_FIELDS } from "~/constants/form";

definePageMeta({
  middleware: ["auth"],
  layout: "admin",
});

const clearError = async (err) => {
  await navigateTo("/admin");
  err.value = null;
};

const store = useCatalogStore();
const { catalogItems } = storeToRefs(store);

const scrollEl = ref(null);
</script>

<style scoped></style>
