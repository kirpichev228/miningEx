<template>
  <section ref="scrollEl" class="catalog">
    <h1 class="catalog__title">Catalog</h1>
    <CatalogPanel />
    <template v-if="catalogItems?.length">
      <div v-if="catalogItems?.length && isLoaded" class="catalog__wrapper">
        <TransitionGroup name="catalog">
          <CatalogItem
            v-for="item in catalogItems?.slice(start, end)"
            :key="item.id"
            :item="item"
          />
        </TransitionGroup>
      </div>
    </template>
    <template v-else-if="catalogItems?.length === 0 && isLoaded">
      <Transition>
        <div class="preloader-wrapper">
          <span class="preloader-wrapper__text">No items found</span>
        </div>
      </Transition>
    </template>
    <div v-else class="catalog__wrapper">
      <TransitionGroup name="catalog">
        <CatalogItemSkeleton v-for="item in 12" :key="item" />
      </TransitionGroup>
    </div>
    <BasePagination :items="catalogItems" :target-ref="scrollEl" />
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { fetchAdress } from "~/utils/fetchAdress";
import { useCartStore } from "~/store/cart";
import { useCatalogStore } from "~/store/catalog";
import { usePaginationStore } from "~/store/pagination";

const user = useSupabaseUser();
const scrollEl = ref(null);

const store = useCatalogStore();
const pagesStore = usePaginationStore();
const cartStore = useCartStore();

const { loaded: isLoaded } = storeToRefs(store);
const { selectedItems: catalogItems } = storeToRefs(store);
const { currentPage } = storeToRefs(pagesStore);

const { fetchCatalogItems } = store;
const { getCartItems } = cartStore;

const start = computed(() => {
  return currentPage.value * 12;
});

const end = computed(() => {
  return (currentPage.value + 1) * 12;
});

onMounted(() => {
  fetchAdress();
  fetchCatalogItems();
  if (user.value) {
    getCartItems();
  }
});
</script>

<style scoped lang="css">
.catalog {
  @apply w-full lg:ml-10;
}

.catalog__title {
  @apply text-3xl font-semibold mb-5 max-sm:px-4;
}

.catalog__wrapper {
  @apply grid gap-4 min-[1920px]:grid-cols-4 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2;
}

.preloader-wrapper {
  @apply flex justify-center items-center h-full w-full;
}

.catalog-enter-active,
.catalog-leave-active {
  transition: opacity 0.1s ease;
}

.catalog-enter-active {
  transition-delay: 0.15s;
}

.catalog-enter-from,
.catalog-leave-to {
  opacity: 0.5;
}
</style>
