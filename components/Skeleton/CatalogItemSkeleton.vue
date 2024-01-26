<template>
  <div class="catalog__item catalog-item">
    <div class="catalog-item__image">
      <div
        class="catalog-item__picture skeleton-bg w-[187px] mx-auto rounded-md"
      ></div>
    </div>
    <div class="py-5">
      <h2 class="catalog-item__title skeleton-bg h-[28px] mb-1 rounded-md"></h2>
      <p class="text-base mb-1 skeleton-bg h-[24px] rounded-md"></p>
      <p class="text-2xl mb-1 font-bold skeleton-bg h-[32px] rounded-md"></p>
      <p
        class="catalog-item__orders catalog-orders skeleton-bg h-[24px] rounded-md"
      ></p>
      <div class="button-skeleton skeleton-bg h-[46px] w-[150px] mx-auto"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.catalog__item {
  @apply p-5 border max-w-[300px] mx-auto bg-white border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg;
}

.catalog-item__image {
  @apply flex w-60 h-36;
}

.catalog-item__picture {
  @apply h-full mx-auto object-cover;
}

.catalog-item__title {
  @apply flex justify-between items-center text-xl font-normal;
}

.catalog-item__orders {
  @apply text-base mb-4 flex items-center text-zinc-400;
}

.catalog-orders__icon {
  @apply w-5 h-5 mr-1 text-zinc-400;
}

.catalog-orders__icon svg {
  @apply text-zinc-400;
}
</style>
