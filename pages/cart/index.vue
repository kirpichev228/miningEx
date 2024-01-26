<template>
  <div class="container mx-auto py-10 flex min-h-[calc(100vh-160px)]">
    <section class="w-full">
      <div class="columns-1 min-h-full">
        <NuxtErrorBoundary>
          <Cart />
          <template #error="{ error }">
            <div class="flex flex-col items-center w-full pt-[50px]">
              <p class="mb-3 text-xl">
                An error occured when loading cart
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
    </section>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();

const clearError = async (err) => {
  await navigateTo("/catalog");
  err.value = null;
};

onBeforeMount(() => {
  if (!user.value) {
    navigateTo("/catalog");
  }
});
</script>

<style scoped></style>
