<template>
  <BasePopup />
  <template v-if="cartLoaded && cartItems.length > 0">
    <h2 class="font-semibold text-4xl mb-7">Cart</h2>
    <BaseTable
      :header="CART_HEADER"
      :data="data"
      :shadowed="true"
      :sortable="false"
      :emit-options="emitOptions"
      @delete-item="deleteItemFromCart"
      @set-amount="setAmount"
    />
    <div class="cart-panel">
      <div class="cart-panel__item panel-item">
        <span class="panel-item__category">Discount</span>
        <span class="panel-item__sum">$0.00</span>
      </div>
      <div class="cart-panel__item panel-item">
        <span class="panel-item__category">Delivery</span>
        <span class="panel-item__sum">$0.00</span>
      </div>
      <div class="cart-panel__item panel-item">
        <span class="panel-item__category">Subtotal</span>
        <span class="panel-item__sum">$0.00</span>
      </div>
      <div class="cart-panel__item panel-item">
        <span class="panel-item__category">Total</span>
        <span class="panel-item__sum">${{ totalSum }}</span>
      </div>
    </div>
    <div class="cart-controls">
      <button class="button_regular" @click="placeOrder()">
        <Icon name="heroicons:check" color="white" size="24px" class="mr-2" />
        Confirm order
      </button>
    </div>
  </template>
  <div
    v-else-if="cartLoaded && cartItems.length === 0"
    class="cart-placeholder"
  >
    <div class="cart-placeholder__wrapper">
      <p class="text-2xl">Your cart is empty</p>
      <div class="cart-placeholder__picture">
        <Icon name="heroicons:face-frown" class="cart-placeholder__image" />
      </div>
    </div>
    <NuxtLink to="/catalog" class="button_regular">Back to catalog</NuxtLink>
  </div>
  <CartSkeleton v-else />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCartStore } from "~/store/cart";
import { CART_HEADER } from "~/constants/cart";

const client = useSupabaseClient();

const cartStore = useCartStore();

const { cartItems, cartLoaded, totalSum } = storeToRefs(cartStore);
const { updateAmount, deleteItem, getCartItems, placeOrder } = cartStore;

const emitOptions = ["deleteItem", "setAmount"];

const setAmount = ({ id, event }: { id: number; event: Event }) => {
  const target = event.target as HTMLInputElement;
  const val = Number(target.value);
  updateAmount(val, id);
};

const data = computed(() => {
  return cartItems.value.map((item) => {
    const price =
      item.discounts !== null
        ? Math.floor(
            item.price * ((100 - item.discounts.discount_number) / 100)
          )
        : item.price;
    item.price = price;
    return item;
  });
});

const deleteItemFromCart = (id: number) => {
  deleteItem(id);
  getCartItems();
};

onMounted(() => {
  getCartItems();
  client
    .channel("table-db-changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "users" },
      () => getCartItems()
    )
    .subscribe();
});
</script>

<style scoped lang="css">
.cart-panel {
  @apply flex justify-between items-center py-5 max-lg:flex-col;
}

.cart-panel__item {
  @apply flex justify-between items-center w-1/5 max-lg:w-full max-lg:mb-4 p-5 border border-slate-200;
}

.panel-item__sum {
  @apply font-semibold text-2xl;
}

.cart-controls {
  @apply py-5 flex flex-row justify-end items-center;
}

.cart-placeholder {
  @apply w-full h-80 flex flex-col justify-center items-center text-2xl;
}

.cart-placeholder__wrapper {
  @apply flex justify-center items-center mb-6;
}

.cart-placeholder__picture {
  @apply w-16 h-16 ml-2;
}

.cart-placeholder__image {
  @apply w-full h-auto;
}

svg {
  color: #0079af;
  fill: #ffffff;
  stroke: #ffffff;
}
</style>
