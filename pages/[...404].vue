<template>
  <section class="section-404">
    <div class="section-404__content">
      <Icon
        name="heroicons:face-frown"
        color="#444444"
        size="24px"
        class="w-36 h-36 mb-2"
      />
      <h1 class="section-404__title">Page not found</h1>
      <p class="section-404__subtitle">
        The page you are looking for does not exist.
      </p>
      <NuxtLink to="/catalog">
        <button class="button_regular section-404__button">
          Go to catalog
        </button>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.section-404 {
  @apply w-full h-[calc(100vh-80px)] flex justify-center items-center;
}

.section-404__content {
  @apply w-[500px] h-[300px] flex flex-col items-center text-center;
}

.section-404__title {
  @apply text-4xl text-slate-400 mb-2;
}

.section-404__subtitle {
  @apply text-slate-400 text-xl mb-5;
}
</style>
