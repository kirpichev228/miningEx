<template>
  <aside class="sidebar">
    <h3
      class="sidebar__title sidebar-title skeleton-bg h-[32px] my-[16px] rounded-md mx-5"
    ></h3>
    <div class="sidebar-block sidebar__block">
      <h3 class="sidebar-block__title skeleton-bg h-[28px] rounded-md"></h3>
      <div
        class="sidebar-block__list filter-list h-[48px] skeleton-bg rounded-md"
      ></div>
    </div>
    <div v-for="el in 4" :key="el" class="sidebar-block px-5 mb-8">
      <h3 class="sidebar-block__title skeleton-bg h-[28px] rounded-md"></h3>
      <div class="filter-section__list filter-list">
        <div class="filter-list__option">
          <label class="flex items-center py-2 h-[44px]"
            ><div
              type="checkbox"
              class="mr-2 min-w-[30px] h-[30px] rounded-md skeleton-bg"
            ></div>
            <div class="skeleton-bg rounded-md w-full h-full"></div
          ></label>
        </div>
        <div class="filter-list__option">
          <label class="flex items-center py-2 h-[44px]"
            ><div
              type="checkbox"
              class="mr-2 min-w-[30px] h-[30px] rounded-md skeleton-bg"
            ></div>
            <div class="skeleton-bg rounded-md w-full h-full"></div
          ></label>
        </div>
        <div class="filter-list__option">
          <label class="flex items-center py-2 h-[44px]"
            ><div
              type="checkbox"
              class="mr-2 min-w-[30px] h-[30px] rounded-md skeleton-bg"
            ></div>
            <div class="skeleton-bg rounded-md w-full h-full"></div
          ></label>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts"></script>

<style scoped>
.sidebar {
  @apply min-w-[300px] max-lg:w-full max-lg:mb-10 border bg-white border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg;
}

.sidebar-title {
  @apply flex justify-center text-center py-5 text-2xl font-semibold;
}

.sidebar__block {
  @apply px-5 py-4;
}

.sidebar-block__title {
  @apply text-xl font-semibold mb-2;
}

.filter-list__options {
  @apply flex flex-col;
}
</style>
