<template>
  <section class="w-full h-[calc(100vh-80px)] flex justify-center items-center">
    <div class="w-[500px] h-[300px] flex flex-col items-center text-center">
      <Icon
        name="heroicons:face-frown"
        color="#444444"
        size="24px"
        class="w-36 h-36 mb-2"
      />
      <h1 class="text-4xl text-slate-400 mb-2">Error!</h1>
      <p class="text-slate-400 text-xl mb-5">Unexpected error occured</p>
      <NuxtLink to="/catalog">
        <button
          class="transition duration-200 hover:bg-sky-500 text-lg px-7 mx-auto py-2 bg-sky-400 text-white"
        >
          Go to catalog
        </button>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped></style>
