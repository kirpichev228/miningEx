<template>
  <div class="pagination-container">
    <div class="pagination-container__display">
      {{ start }}-{{ end }}
      out of
      {{ items.length }}
    </div>
    <div v-if="pageNumbers.length" class="pagination">
      <div class="pagination__nav" @click="firstPage">First</div>
      <div
        v-for="num in pageNumbers"
        :key="num"
        :class="{ 'pagination-item_active': num === currentPage + 1 }"
        class="pagination-item"
        @click="setPage(num)"
      >
        {{ num }}
      </div>
      <div class="pagination__nav" @click="lastPage">Last</div>
    </div>
    <div v-else class="skeleton-bg h-[50px] w-[300px]"></div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePaginationStore } from "~/store/pagination";

const props = defineProps<{
  items: CatalogItem[] | OrderItem[] | User[];
  targetRef: Element | null;
}>();

const store = usePaginationStore();
const { currentPage } = storeToRefs(store);

const start = computed(() => {
  return currentPage.value === 0 ? 1 : currentPage.value * 12;
});

const end = computed(() => {
  const endValue = (currentPage.value + 1) * 12;
  return endValue > props.items.length ? props.items.length : endValue;
});

const pageNumbers = computed(() => {
  const numbers = [];
  for (let i = 1; i <= Math.ceil(props.items.length / 12); i++) {
    numbers.push(i);
  }
  return numbers;
});

const scrollToTarget = () => {
  const target: Element | null = props.targetRef;
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
};

const firstPage = () => {
  scrollToTarget();
  setTimeout(() => {
    currentPage.value = 0;
  }, 100);
};

const lastPage = () => {
  scrollToTarget();
  setTimeout(() => {
    const maxLength = Math.ceil(props.items.length / 12);
    currentPage.value = maxLength - 1;
  }, 100);
};

const setPage = (num: number) => {
  scrollToTarget();
  setTimeout(() => {
    currentPage.value = num - 1;
  }, 100);
};

onUnmounted(() => {
  currentPage.value = 0;
});
</script>

<style scoped>
.pagination {
  @apply flex cursor-pointer bg-white;
}

.pagination-container {
  @apply w-full flex justify-between items-end mt-10;
}

.pagination__nav {
  @apply flex justify-center items-center border font-semibold px-5 h-[50px];
}

.pagination-item {
  @apply hover:bg-sky-400 hover:text-white hover:border-sky-400 transition duration-200 flex justify-center items-center border w-[50px] h-[50px]  font-semibold;
}

.pagination-item_active {
  @apply bg-sky-400 text-white border-sky-400;
}
</style>
