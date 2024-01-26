<template>
  <section class="selected-item">
    <div class="selected-item__info">
      <div class="p-5">
        <div class="selected-item__image skeleton-bg rounded-md"></div>
      </div>
      <div class="w-full p-5">
        <h1
          class="selected-item__name skeleton-bg w-full h-[36px] rounded-md"
        ></h1>
        <p
          class="mb-1 flex items-center w-1/2 skeleton-bg h-[28px] rounded-md"
        ></p>
        <p class="mb-1 w-1/2 skeleton-bg h-[28px] rounded-md"></p>
        <p class="mb-1 w-1/2 skeleton-bg h-[28px] rounded-md"></p>
        <p
          class="mb-1 mt-4 flex items-center w-1/2 skeleton-bg h-[32px] rounded-md"
        ></p>
        <div class="button-skeleton skeleton-bg h-[46px] w-[150px]"></div>
      </div>
    </div>
    <section class="rating-section px-5 py-10">
      <h2
        class="mb-7 text-2xl font-semibold skeleton-bg h-[32px] w-1/3 rounded-md"
      ></h2>
      <div
        class="summary flex max-xl:flex-col skeleton-bg h-[124px] rounded-md"
      >
        <div
          class="flex max-xl:mb-5 max-xl:mx-auto max-[500px]:flex-col max-[500px]:items-start max-[500px]:mx-0 skeleton-bg rounded-md"
        ></div>
      </div>
    </section>
    <div class="px-5">
      <div class="skeleton-bg my-4 h-[24px] w-full rounded-md"></div>
      <div class="skeleton-bg my-4 h-[24px] w-full rounded-md"></div>
      <div class="skeleton-bg my-4 h-[24px] w-full rounded-md"></div>
      <div class="skeleton-bg my-4 h-[24px] w-full rounded-md"></div>
      <div class="skeleton-bg my-4 h-[24px] w-full rounded-md"></div>
      <div class="skeleton-bg my-4 h-[24px] w-full rounded-md"></div>
      <div class="skeleton-bg my-4 h-[24px] w-full rounded-md"></div>
    </div>
    <div class="px-5">
      <section
        class="gallery max-w-full w-full skeleton-bg h-[350px] rounded-md"
      ></section>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.selected-item {
  @apply lg:ml-10 lg:w-[calc(100%-300px)] bg-white border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg;
}

.selected-item__info {
  @apply w-full flex justify-between mb-5 bg-white max-sm:flex-col border-b-2 border-zinc-200;
}

.selected-item__image {
  @apply min-w-[300px] w-[300px] h-[230px] object-cover max-md:min-w-[200px] max-md:w-[200px];
}

.selected-item__name {
  @apply text-3xl font-semibold mb-2;
}

.tabs {
  @apply w-full flex;
}

.tabs-item {
  @apply min-w-[180px] h-16 px-4 flex max-sm:min-w-[130px] max-sm:px-2 items-center justify-center cursor-pointer text-center text-lg bg-slate-200 text-slate-400 transition duration-100;
}

.vue-star-rating .vue-star-rating-star {
  display: flex;
  align-items: center;
}

.vue-star-rating .vue-star-rating-star[data-v-f675a548] {
  display: flex;
}

.vue-star-rating-star,
.vue-star-rating {
  line-height: 28px;
  max-height: 28px;
}

.vue-star-rating-rating-text {
  display: none;
}

.tab_active {
  background-color: #ffffff;
  color: #000000;
}

.tab_active img {
  -webkit-filter: invert(0.1);
  filter: invert(0.1);
}

.icon {
  color: #ffffff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
