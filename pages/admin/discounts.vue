<template>
  <AdminPanel
    title="Discount"
    button="Create discount"
    :fields="DISCOUNT_INPUT_FIELDS"
    current-page="discounts"
  />
  <div class="columns-1">
    <NuxtErrorBoundary>
      <DiscountsTable />
      <template #error="{ error }">
        <div class="flex flex-col items-center w-full pt-[50px]">
          <p class="mb-3 text-xl">
            An error occured when loading discounts
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
    <BasePagination :items="discounts" :target-ref="scrollEl" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { DISCOUNT_INPUT_FIELDS } from "~/constants/form";
import { useDiscountsStore } from "~/store/discounts";

definePageMeta({
  middleware: ["auth"],
  layout: "admin",
});

const clearError = async (err) => {
  await navigateTo("/admin");
  err.value = null;
};

const store = useDiscountsStore();

const { discounts } = storeToRefs(store);

const scrollEl = ref(null);
</script>

<style scoped></style>
