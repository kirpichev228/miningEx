<template>
  <div class="container w-full mx-auto py-10 flex min-h-[calc(100vh-160px)]">
    <NuxtErrorBoundary>
      <Cabinet />
      <template #error="{ error }">
        <div class="flex flex-col items-center w-full pt-[50px]">
          <p class="mb-3 text-xl">
            An error occured when loading selected personal account
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
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const clearError = async (err) => {
  await navigateTo("/catalog");
  err.value = null;
};
</script>

<style scoped></style>
