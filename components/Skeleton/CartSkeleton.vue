<template>
  <div
    class="table-skeleton bg-white py-5 px-3 shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)]"
  >
    <div class="h-[26px] mb-4 w-full skeleton-bg rounded-md"></div>
    <div class="table-skeleton__item skeleton-item flex py-4">
      <div
        class="skeleton-item__image w-[64px] h-[48px] skeleton-bg rounded-md mr-5"
      ></div>
      <div
        class="skeleton-item__content h-[48px] skeleton-bg rounded-md w-full"
      ></div>
    </div>
    <div class="table-skeleton__item skeleton-item flex py-4">
      <div
        class="skeleton-item__image w-[64px] h-[48px] skeleton-bg rounded-md mr-5"
      ></div>
      <div
        class="skeleton-item__content h-[48px] skeleton-bg rounded-md w-full"
      ></div>
    </div>
    <div class="table-skeleton__item skeleton-item flex py-4">
      <div
        class="skeleton-item__image w-[64px] h-[48px] skeleton-bg rounded-md mr-5"
      ></div>
      <div
        class="skeleton-item__content h-[48px] skeleton-bg rounded-md w-full"
      ></div>
    </div>
  </div>
  <div class="cart-panel">
    <div
      class="h-[76px] cart-panel__item panel-item skeleton-bg rounded-md"
    ></div>
    <div
      class="h-[76px] cart-panel__item panel-item skeleton-bg rounded-md"
    ></div>
    <div
      class="h-[76px] cart-panel__item panel-item skeleton-bg rounded-md"
    ></div>
    <div
      class="h-[76px] cart-panel__item panel-item skeleton-bg rounded-md"
    ></div>
  </div>
  <div class="cart-controls">
    <div class="button-skeleton skeleton-bg w-[150px] h-[46px]"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.cart-panel {
  @apply flex justify-between items-center py-5 max-lg:flex-col;
}

.cart-panel__item {
  @apply flex justify-between items-center w-1/5 max-lg:w-full max-lg:mb-4 p-5 border border-slate-200;
}

.panel-item__sum {
  @apply font-semibold text-2xl;
}

.cart-controls {
  @apply py-5 flex flex-row justify-end items-center;
}

.cart-placeholder {
  @apply w-full h-80 flex flex-col justify-center items-center text-2xl;
}

.cart-placeholder__wrapper {
  @apply flex justify-center items-center mb-6;
}

.cart-placeholder__picture {
  @apply w-16 h-16 ml-2;
}

.cart-placeholder__image {
  @apply w-full h-auto;
}
</style>
