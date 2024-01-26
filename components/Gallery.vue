<template>
  <section class="gallery" :class="`max-w-[${380 * itemsNumber}px]`">
    <div class="gallery__header gallery-header">
      <h2 class="gallery-header__text">{{ title }}</h2>
    </div>
    <carousel :items-to-show="itemsNumber" :style="maxWidth" class="mx-auto">
      <slide v-for="item in items" :key="item.id">
        <GalleryItem :item="item" />
      </slide>
      <template #addons>
        <navigation />
      </template>
    </carousel>
  </section>
</template>

<script setup lang="ts">
import { Carousel, Slide, Navigation } from "vue3-carousel";

defineProps<{
  items: CatalogItem[];
  title: string;
}>();

const { type } = useBreakpoints();

const itemsNumber = computed(() => {
  switch (type.value) {
    case "xxl":
      return 3;
    case "xl":
      return 3;
    case "lg":
      return 1;
    default:
      return 1;
  }
});

const maxWidth = computed(() => {
  return `max-width: ${380 * itemsNumber.value}px`;
});
</script>

<style lang="css">
.gallery {
  @apply py-10 bg-white;
}

.gallery-header {
  @apply flex justify-between mb-5 py-3 px-5;
}

.gallery-header__text {
  @apply text-3xl font-semibold;
}

.carousel {
  text-align: left;
}

li.carousel__slide {
  text-align: inherit;
  padding: 10px 0;
}

.carousel__prev {
  margin-left: 0;
}

.carousel__next {
  margin-right: 0;
}
</style>
