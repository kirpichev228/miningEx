<template>
  <table class="selected-item__reviews selected-reviews">
    <tbody>
      <template v-if="reviews?.length">
        <tr v-for="item in reviews" :key="item.id">
          <td>
            <div class="review py-3">
              <div class="review__wrapper">
                <div>
                  <h6 class="text-lg font-semibold">{{ item.author }}</h6>
                  <star-rating
                    v-model:rating="(item.rating as RatingBreakdown).overall"
                    star-size="15"
                    read-only
                    :show-rating="false"
                  />
                </div>
                <span>{{ formatDate(item.date) }}</span>
              </div>
              <div class="text-lg py-2">
                {{ item.description }}
              </div>
            </div>
          </td>
        </tr>
      </template>
      <tr v-else>
        <td>
          <div class="py-8 font-semibold text-zinc-400">No reviews yet</div>
        </td>
      </tr>
      <tr v-if="isRated === -1 && user">
        <td>
          <form
            class="selected-reviews__form reviews-form"
            @submit.prevent="sendReview()"
          >
            <h3 class="reviews-form__title">Leave review</h3>
            <div class="reviews-form__block flex mb-2">
              <h4 class="font-semibold text-base min-w-[150px]">Your score</h4>
              <star-rating
                v-model:rating="reviewRating"
                star-size="20"
                show-rating="false"
              />
            </div>
            <div class="reviews-form__block review-block flex mb-2">
              <h4 class="review-block__title">Your review</h4>
              <textarea
                v-model="reviewTxt"
                class="reviews-form__text"
                placeholder="Your review"
              />
            </div>
            <div class="reviews-form__block review-block flex mb-2">
              <h4 class="review-block__title">Good value</h4>
              <div class="reviews-form__details flex flex-col">
                <star-rating
                  v-model:rating="valueRating"
                  star-size="20"
                  show-rating="false"
                  class="mb-2"
                />
              </div>
            </div>
            <div class="reviews-form__block review-block flex mb-2">
              <h4 class="review-block__title">Quality</h4>
              <div class="reviews-form__details flex flex-col">
                <star-rating
                  v-model:rating="qualityRating"
                  star-size="20"
                  show-rating="false"
                  class="mb-2"
                />
              </div>
            </div>
            <div class="reviews-form__block review-block flex mb-2">
              <h4 class="review-block__title">Fit the description</h4>
              <div class="reviews-form__details flex flex-col">
                <star-rating
                  v-model:rating="descriptionRating"
                  star-size="20"
                  show-rating="false"
                  class="mb-2"
                />
              </div>
            </div>
            <input
              type="submit"
              value="Отправить"
              :disabled="!isFormFilled"
              class="reviews-form__submit"
            />
          </form>
        </td>
      </tr>
      <tr v-else-if="isRated === -1 && !user">
        <td>
          <BaseModal>
            <template #trigger>
              <span class="login-link">
                <span class="text-sky-400">Log in</span> to leave a review
              </span>
            </template>
            <template #content>
              <BaseAuthForm />
            </template>
          </BaseModal>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import StarRating from "vue-star-rating";
import { useRatingsStore } from "~/store/ratings";
import { formatDate } from "~/utils/formatDate";

const props = defineProps<{
  selectedItem: CatalogItem;
  reviews: Review[];
}>();

const emit = defineEmits(["updateRating"]);

const store = useRatingsStore();

const { updateReviews } = store;

const user = useSupabaseUser();

const reviewTxt = ref("");
const reviewRating = ref(0);
const valueRating = ref(0);
const qualityRating = ref(0);
const descriptionRating = ref(0);

const reviews = computed(() => {
  return props.reviews;
});

const isFormFilled = computed(() => {
  return (
    qualityRating.value !== 0 &&
    descriptionRating.value !== 0 &&
    valueRating.value !== 0 &&
    reviewTxt.value !== "" &&
    reviewRating.value !== 0
  );
});

const isRated = computed(() => {
  if (reviews.value) {
    return reviews.value.findIndex((el) => {
      return el.author === user.value?.email;
    });
  } else return -1;
});

const sendReview = async () => {
  const review = {} as Review;
  const ratingObj = {} as RatingBreakdown;
  review.date = new Date();
  review.item_id = props.selectedItem.id;
  review.user_id = 3;
  ratingObj.overall = reviewRating.value;
  ratingObj.value = valueRating.value;
  ratingObj.quality = qualityRating.value;
  ratingObj.description = descriptionRating.value;
  review.rating = ratingObj;
  review.description = reviewTxt.value;
  review.author = user.value?.email;
  await updateReviews(review);
  emit("updateRating");
};
</script>

<style scoped lang="css">
.review__wrapper {
  @apply flex justify-between mb-2 max-md:flex-col-reverse;
}

.selected-item__reviews {
  @apply w-full border-separate border-spacing-2 py-5 px-3 mb-5 bg-white;
}

.selected-reviews__form {
  @apply flex flex-col justify-end;
}

.reviews-title {
  @apply text-2xl font-semibold mb-4;
}

.review-block__title {
  @apply font-semibold text-base min-w-[150px];
}

.reviews-form__title {
  @apply mb-3 font-semibold text-xl;
}

.reviews-form__text {
  @apply w-full resize-none p-3 bg-white border min-h-[120px] rounded-none mb-4 p-3 text-lg py-2;
}

.reviews-form__submit {
  @apply disabled:bg-gray-200 disabled:cursor-default self-end bg-sky-400 text-white px-8 max-h-[50px] py-2 text-lg cursor-pointer tracking-wider transition duration-200 hover:bg-sky-500;
}

.login-link {
  @apply cursor-pointer text-lg font-semibold;
}
</style>
