<template>
  <section class="rating-section px-5 py-[50px]">
    <h2 class="rating-section__title">Ratings and reviews</h2>
    <div class="summary">
      <div class="summary-wrapper">
        <div class="summary__score summary-score">
          <h3 class="summary-score__rating text-6xl mb-3">
            {{ averageRating }}
          </h3>
          <star-rating
            v-model:rating="averageRating"
            :star-size="20"
            :show-rating="false"
            read-only
          />
          <p class="summary-text">{{ reviews.length }} product ratings</p>
        </div>
        <ul class="summary__description summary-description pr-10">
          <li
            v-for="(item, index) in scores"
            :key="index"
            class="summary-description__block summary-block flex"
          >
            <Icon
              name="heroicons:star"
              color="#444444"
              size="24px"
              class="w-6 h-6 mr-2"
            />
            <div class="summary-block__breakdown flex">
              <span class="text-zinc-600">{{ item.score }}</span>
              <div class="progress">
                <span
                  class="progress_filled"
                  :class="`w-[${progressArray[index]}px]`"
                ></span>
              </div>
              <span class="text-zinc-600">{{ item.value }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="summary__percentage summary-percentage">
        <div class="summary-percentage__item percentage-item">
          <circle-progress
            :percent="priceRating"
            fill-color="#52525B"
            empty-color="#E4E4E7"
            :show-percent="true"
            :size="80"
            :border-width="5"
            :border-bg-width="5"
          />
          <h5 class="summary-text">Good price</h5>
        </div>
        <div class="summary-percentage__item">
          <circle-progress
            :percent="qualityRating"
            fill-color="#52525B"
            empty-color="#E4E4E7"
            :show-percent="true"
            :size="80"
            :border-width="5"
            :border-bg-width="5"
          />
          <h5 class="summary-text">Quality</h5>
        </div>
        <div class="summary-percentage__item">
          <circle-progress
            :percent="descriptionRating"
            fill-color="#52525B"
            empty-color="#E4E4E7"
            :show-percent="true"
            :size="80"
            :border-width="5"
            :border-bg-width="5"
          />
          <h5 class="summary-text">Fit the description</h5>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import CircleProgress from "vue3-circle-progress";
import StarRating from "vue-star-rating";

const props = defineProps<{
  averageRating: number | string;
  priceRating: number | string;
  descriptionRating: number | string;
  qualityRating: number | string;
  reviews: FormattedReview[];
}>();

const reviews = computed(() => {
  return props.reviews;
});

const averageRating = computed(() => {
  return props.averageRating;
});

const scores = computed(() => {
  const obj: Record<number, number> = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  if (props.reviews.length) {
    props.reviews.forEach((item) => {
      const rating = (item.rating as RatingBreakdown).overall;
      obj[rating] = obj[rating] + 1;
    });
  }

  const result = Object.keys(obj).map((key) => ({
    score: Number(key),
    value: obj[key as unknown as number],
  }));
  return result;
});

const progressArray = computed(() => {
  return scores.value.map((item) => {
    return ((item.value / reviews.value.length) * 150).toFixed(0);
  });
});
</script>

<style lang="css">
.rating-section__title {
  @apply mb-7 text-2xl font-semibold;
}

.summary {
  @apply flex max-xl:flex-col;
}

.summary-wrapper {
  @apply flex max-xl:mb-5 max-xl:mx-auto max-[500px]:flex-col max-[500px]:items-start max-[500px]:mx-0;
}

.summary-score {
  @apply pr-10 flex flex-col items-center max-[500px]:mb-4;
}

.summary-block {
  @apply flex items-center;
}

.summary-block__breakdown {
  @apply flex items-center;
}

.summary-percentage {
  @apply flex max-xl:mx-auto max-[500px]:flex-wrap;
}

.summary-percentage__item {
  @apply w-[130px] flex flex-col items-center max-[500px]:mb-3;
}

.summary-text {
  @apply text-base text-zinc-600 mt-2;
}

.progress {
  @apply w-[150px] h-[10px] bg-zinc-200 mx-2 relative overflow-hidden rounded-full;
}

.progress_filled {
  @apply absolute top-0 left-0 bg-zinc-600 h-full;
}

.current-counter {
  font-size: 20px;
}
</style>
