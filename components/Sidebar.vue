<template>
  <aside v-if="maxPrice && filteringOptions" class="sidebar">
    <h3 class="sidebar__title sidebar-title">Filters</h3>
    <div class="sidebar-block sidebar__block">
      <h3 class="sidebar-block__title">Price</h3>
      <div class="sidebar-block__list filter-list">
        <BaseSlider
          v-model="slider1"
          :max="maxPrice ? maxPrice : 0"
          :min="0"
          :step="1"
        />
      </div>
    </div>
    <div
      v-for="item in filteringOptions"
      :key="item.label"
      class="sidebar__block"
    >
      <h3 class="sidebar-block__title">
        {{ item.label }}
      </h3>
      <div class="filter-section__list filter-list">
        <div class="filter-list__option">
          <BaseCheckbox
            v-for="option in item.value"
            :key="option.label"
            :option="option"
            :category="item.category"
            @value-checked="selectItem(option.label.toString(), item.category)"
          />
        </div>
      </div>
    </div>
  </aside>
  <SidebarSkeleton v-else />
</template>

<script setup lang="ts">
import { watchDebounced } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { useCatalogStore } from "~/store/catalog";

const store = useCatalogStore();
const { visibleItems, initialPrice, filteringOptions } = storeToRefs(store);
const { selectItem } = store;

const slider1 = ref(0);

const maxPrice = computed(() => {
  if (visibleItems.value?.length) {
    return visibleItems.value.reduce((prev, cur) => {
      return prev > cur.price ? prev : cur.price;
    }, 0);
  } else return 0;
});

watchDebounced(
  slider1,
  () => {
    initialPrice.value = slider1.value;
  },
  { debounce: 500, maxWait: 1000 }
);
</script>

<style scoped lang="css">
.sidebar {
  @apply min-w-[300px] h-full max-lg:w-full max-lg:mb-10 border bg-white border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg;
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
