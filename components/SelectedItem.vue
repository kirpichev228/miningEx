<template>
  <section v-if="selectedItem" class="selected-item">
    <div class="selected-item__info">
      <div v-if="selectedItem.discounts !== null" class="discount-bar">
        <span
          class="discount-bar__text"
        >
          Limited offer
        </span>
        <span
          class="discount-bar__percentage"
        >
          -{{selectedItem.discounts.discount_number}}%
        </span>        
      </div>
      <div class="p-5">
        <img
          class="selected-item__image"
          :src="selectedItem.photo"
          :alt="selectedItem.name"
          loading="eager"
        />
      </div>

      <div class="w-full p-5">
        <h1 class="selected-item__name">{{ selectedItem.name }}</h1>
        <p class="mb-3 flex items-center">
          <span class="pr-2 font-semibold text-lg">{{ averageRating }}</span>
          <star-rating
            v-model:rating="averageRating"
            read-only
            :star-size="20"
            :show-rating="false"
          />
          <span class="text-base pl-4">
            {{ ratings?.length ? ratings.length : "No" }}
            <span>ratings</span>
          </span>
        </p>
        <p class="mb-2">
          <span class="text-lg font-semibold">Manufacturer:</span>
          {{ selectedItem.manufacturer }}
        </p>
        <p class="mb-2">
          <span class="text-lg font-semibold">Warranty:</span>
          {{ selectedItem.warranty }} month
        </p>
        <p class="mb-2 mt-2 flex items-end">
          <div class="mr-3">
            <span class="text-2xl font-bold pr-1">{{ currentPrice }}</span>
            <span class="text-base font-normal">USD</span>
          </div>
          <div v-if="selectedItem.price !== null" class="price_crossed line-through tracking-wide">
            <span class="text-normal">{{ selectedItem.price }}</span>
            <span class="text-normal">USD</span>
          </div>          
        </p>
        <p class="selected-item__stock">
          <Icon
            name="heroicons:check-circle"
            color="#444444"
            size="24px"
            class="mr-2"
          />
          <span>{{
            selectedItem.in_stock ? "In stock" : "Not available"
          }}</span>
        </p>
        <button
          class="button_regular disabled:bg-gray-200"
          :disabled="selectedItem.in_stock < 0 ? true : false"
          show-rating="false"
          @click="addToCart(selectedItem.id, currentPrice)"
        >
          <Icon
            name="heroicons:shopping-cart"
            color="white"
            size="24px"
            class="mr-2"
          />Add to cart</button>
      </div>
    </div>
    <RatingsSummary
      :average-rating="averageRating"
      :description-rating="descriptionRating"
      :quality-rating="qualityRating"
      :price-rating="valueRating"
      :reviews="reviews"
    />
    <div class="tabs">
      <div
        class="tabs-item"
        :class="currentTab === 'description' ? 'tab_active' : ''"
        value="description"
        @click="setTab($event)"
      >
        <Icon
          name="heroicons:document-chart-bar"
          size="24px"
          color="#444444"
          class="w-8 mr-2 max-sm:hidden"
        />
        Description
      </div>
      <div
        class="tabs-item"
        :class="currentTab === 'reviews' ? 'tab_active' : ''"
        value="reviews"
        @click="setTab($event)"
      >
        <Icon
          name="heroicons:chat-bubble-bottom-center-text"
          color="#444444"
          size="24px"
          class="w-8 mr-2 max-sm:hidden"
        />
        Reviews
        <span class="pl-1 max-sm:font-base"
          >({{ reviews?.length ? reviews?.length : 0 }})</span
        >
      </div>
    </div>
    <KeepAlive>
      <Transition name="fade" mode="out-in">
        <component
          :is="currentTabComponent"
          :selected-item="selectedItem"
          :selected-properties="SELECTED_ITEM_PROPERTIES"
          :reviews="reviews"
          @update-rating="fetchRating(selectedItem.id)"
        />
      </Transition>
    </KeepAlive>
    <Gallery :items="popularItems" title="Popular products" />
    <Gallery :items="discountItems" title="Limited-time offer" />
  </section>
  <SelectedItemSkeleton v-else />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import StarRating from "vue-star-rating";
import { SELECTED_ITEM_PROPERTIES } from "~/constants/selectedItem";
import { useCatalogStore } from "~/store/catalog";
import { useRatingsStore } from "~/store/ratings";
import { useCartStore } from "~/store/cart";
import { useOrdersStore } from "~/store/orders"

const catalogStore = useCatalogStore();
const ratingsStore = useRatingsStore();
const cartStore = useCartStore();
const ordersStore = useOrdersStore();

const { selectedItem, visibleItems } = storeToRefs(catalogStore);
const { ratings } = storeToRefs(ratingsStore);
const { orders} = storeToRefs(ordersStore);

const { fetchSelectedItem, fetchCatalogItems } = catalogStore;
const { fetchRating } = ratingsStore;
const { addToCart } = cartStore;
const { fetchOrders } = ordersStore;

const id = useRoute().params.id;

const tabs = {
  description: resolveComponent("SelectedItemDescription"),
  reviews: resolveComponent("SelectedItemReviews"),
};

const currentTab: Ref<string | null> = ref("description");

const currentTabComponent = computed(() => {
  return tabs[currentTab.value as keyof SelectedItemTabs];
});

const setTab = (e: Event) => {
  const target = e.currentTarget as HTMLElement;
  currentTab.value = target.getAttribute("value");
};

watch(selectedItem, () => {
  if (selectedItem.value) {
    fetchRating(selectedItem.value?.id);
  }
});

const currentPrice = computed(() => {
  return selectedItem.value?.discounts !== null ? Math.floor(selectedItem.value?.price * ( (100 - selectedItem.value?.discounts.discount_number)/100 )): selectedItem.value?.price
})

const discountItems = computed(() => {
  return visibleItems.value.filter((item) => {
    return item.discounts !== null
  })
});

const popularItems = computed(() => {
  const bestSelling = [];
  orders.value
    .forEach((order) => {
      order.items.forEach((item) => {
        const index = bestSelling.findIndex((x) => x.id === item.id);

        if (index !== -1) {
          bestSelling[index].items_sold += item.amount;
        } else {
          item.items_sold = item.amount
          item.discounts = item.discounts ? item.discounts : null
          bestSelling.push(item);
        }
      });
    });
  return bestSelling.sort((a, b) => b.items_sold - a.items_sold).slice(0, 6);
});


const averageRating = computed(() => {
  if (ratings.value?.length) {
    return Number(
      (
        ratings.value?.reduce((sum, item) => {
          return (sum += JSON.parse(item.rating as string).overall);
        }, 0) / ratings.value?.length
      ).toFixed(0)
    );
  } else {
    return 0;
  }
});

const valueRating = computed(() => {
  if (ratings.value?.length) {
    return Number(
      (
        (ratings.value?.reduce((sum, item) => {
          return (sum += JSON.parse(item.rating as string).value);
        }, 0) /
          ratings.value?.length) *
        20
      ).toFixed(1)
    );
  } else {
    return 0;
  }
});

const qualityRating = computed(() => {
  if (ratings.value?.length) {
    return Number(
      (
        (ratings.value?.reduce((sum, item) => {
          return (sum += JSON.parse(item.rating as string).quality);
        }, 0) /
          ratings.value?.length) *
        20
      ).toFixed(1)
    );
  } else {
    return 0;
  }
});

const descriptionRating = computed(() => {
  if (ratings.value?.length) {
    return Number(
      (
        (ratings.value?.reduce((sum, item) => {
          return (sum += JSON.parse(item.rating as string).description);
        }, 0) /
          ratings.value?.length) *
        20
      ).toFixed(1)
    );
  } else {
    return 0;
  }
});

const reviews = computed(() => {
  if (ratings.value) {
    return ratings.value?.map((item: Review) => {
      const review = {} as FormattedReview;
      review.id = item.id;
      review.description = item.description;
      review.author = item.author;
      review.date = item.date;
      review.rating = JSON.parse(item.rating as string);
      return review;
    });
  } else {
    return [];
  }
});

onMounted(() => {
  fetchCatalogItems();
  fetchOrders()
  if (id) {
    fetchSelectedItem(id);
  }
});
</script>

<style lang="css">
.selected-item {
  @apply lg:ml-10 lg:w-[calc(100%-300px)] bg-white border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg;
}

.selected-item__info {
  @apply relative w-full flex justify-between mb-5 bg-white max-sm:flex-col border-b-2 border-zinc-200;
}

.selected-item__image {
  @apply min-w-[300px] w-[300px] h-auto object-cover max-md:min-w-[200px] max-md:w-[200px];
}

.selected-item__name {
  @apply text-3xl font-semibold mb-1;
}

.selected-item__stock {
  @apply mb-2 flex items-center text-base text-zinc-400;
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

.tab_active svg {
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
