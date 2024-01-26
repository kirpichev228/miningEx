import { defineStore } from "pinia";
import { useToastsStore } from "./toasts";
import ratingsService from "~/services/ratingsService";

export const useRatingsStore = defineStore("ratings", () => {
  const toastsStore = useToastsStore();
  const { showErrorToast, showSuccessToast } = toastsStore;

  const ratings: Ref<Review[] | null> = ref(null);

  const fetchRating = async (id: number) => {
    const { data, error } = await ratingsService.fetchRating(id);
    if (error) throw Error;
    else {
      ratings.value = data;
    }
  };

  const updateReviews = async (review: Review) => {
    const error = await ratingsService.updateReviews(review);
    if (error) {
      const { toast, message } = toastHandler("add-review-error");
      showErrorToast(toast, message);
    } else {
      const { toast, message } = toastHandler("add-review-success");
      showSuccessToast(toast, message);
    }
  };

  return {
    fetchRating,
    updateReviews,
    ratings,
  };
});
