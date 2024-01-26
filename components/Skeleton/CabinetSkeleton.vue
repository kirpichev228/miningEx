<template>
  <section class="w-full cabinet">
    <div class="cabinet__block">
      <h1 class="cabinet__title h-[40px] w-full skeleton-bg"></h1>
      <div class="cabinet-block__info">
        <div
          class="cabinet-info__item info-item skeleton-bg h-[120px] rounded-md"
        >
          <div>
            <h3 class="info-item__title"></h3>
            <h4 class="text-lg"></h4>
          </div>
        </div>
        <div
          class="cabinet-info__item info-item skeleton-bg h-[120px] rounded-md"
        >
          <div class="">
            <h3 class="info-item__title"></h3>
            <h4 class="text-lg"></h4>
          </div>
        </div>
        <div
          class="cabinet-info__item info-item skeleton-bg h-[120px] rounded-md"
        >
          <div class="">
            <h3 class="info-item__title"></h3>
            <h4 class="text-lg"></h4>
          </div>
        </div>
      </div>
    </div>
    <div class="cabinet__block cabinet-block">
      <h1
        class="cabinet-block__header h-[40px] w-full skeleton-bg rounded-md"
      ></h1>
      <div
        class="cabinet-block__content h-[114px] skeleton-bg rounded-md"
      ></div>
    </div>
    <div class="cabinet__block">
      <h1
        class="cabinet-block__header h-[40px] w-full skeleton-bg rounded-md"
      ></h1>
      <TableSkeleton />
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.cabinet__title {
  @apply font-semibold text-4xl mb-7 flex justify-between;
}

.cabinet__block {
  @apply mb-10;
}

.cabinet-block__header {
  @apply font-semibold text-4xl mb-7 flex justify-between;
}

.cabinet-block__categories {
  @apply w-full flex flex-wrap justify-between;
}

.cabinet-block__content {
  @apply w-full flex flex-col flex-wrap justify-between bg-white border border-white shadow-[0_-1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg p-4;
}

.cabinet-block__orders {
  @apply mb-5 min-w-full w-full bg-white p-5 border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg;
}

.cabinet-block__info {
  @apply flex justify-between max-lg:flex-col;
}
.cabinet-info__item {
  @apply mb-5 bg-white h-[120px] lg:min-w-[320px] w-[calc(100%/3-50px)] max-lg:w-full flex justify-between items-center border border-white shadow-[0_-1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg px-4 overflow-hidden;
}

.cabinet-orders__status {
  @apply ml-4 text-red-700 font-semibold;
}

.info-item__title {
  @apply text-2xl font-semibold mb-2;
}
</style>
