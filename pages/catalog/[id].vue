<template>
  <div
    class="container mx-auto p-10 flex min-h-[calc(100vh-160px)] max-lg:flex-col"
  >
    <Sidebar />
    <NuxtErrorBoundary>
      <SelectedItem />
      <template #error="{ error }">
        <div class="flex flex-col items-center w-full pt-[50px] ml-[40px]">
          <p class="mb-3 text-xl">
            An error occured when loading selected item
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
const clearError = async (err: any) => {
  await navigateTo("/catalog");
  err.value = null;
};
</script>

<style scoped></style>
