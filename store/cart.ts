import { defineStore, storeToRefs } from "pinia";
import { useCatalogStore } from "./catalog";
import { useToastsStore } from "./toasts";
import { usePopupStore } from "./popup";
import { toastHandler } from "~/utils/toastHandler";
import cartService from "~/services/cartService";

export const useCartStore = defineStore("cart", () => {
  const user = useSupabaseUser();
  const userId: Ref<string> = ref("");
  const userEmail: Ref<string | undefined> = ref("");
  const cartItems: Ref<Array<CartItem> | []> = ref([]);
  const cartLoaded = ref(false);

  const toastsStore = useToastsStore();
  const popupStore = usePopupStore();
  const catalogStore = useCatalogStore();

  const { catalogItems } = storeToRefs(catalogStore);

  const { fetchCatalogItems } = catalogStore;
  const { openPopup } = popupStore;

  const { showErrorToast, showSuccessToast } = toastsStore;

  const getCartItems = async () => {
    if (user.value) {
      userEmail.value = user.value.email;
      userId.value = user.value.id;
      const { data, error } = await cartService.fetchCartItems(user.value.id);
      if (error) {
        const { toast, message } = toastHandler("cart-empty");
        showErrorToast(toast, message);
      } else {
        cartItems.value = data[0].cart;
        cartLoaded.value = true;
      }
    } else {
      const { toast, message } = toastHandler("not-authorized");
      showErrorToast(toast, message);
    }
  };

  const totalSum = computed(() => {
    return (cartItems.value as CartItem[]).reduce(
      (acc: number, item: CartItem) => {
        if (item.amount) {
          return (acc += item.price * item.amount);
        } else {
          return (acc += item.price);
        }
      },
      0
    );
  });

  const addToCart = async (id: number, price: number) => {
    fetchCatalogItems();
    if (user.value) {
      const present = cartItems.value.findIndex((el: CartItem) => el.id === id);
      if (present === -1) {
        const item = catalogItems.value?.find(
          (el: CatalogItem) => el.id === id
        ) as unknown as CartItem;
        item.amount = 1;
        item.total = item.amount * price;
        (cartItems.value as CartItem[]).push(item);
      } else {
        cartItems.value[present].amount =
          Number(cartItems.value[present].amount) + 1;
        cartItems.value[present].total =
          Number(cartItems.value[present].amount) * price;
      }
      const error = await cartService.addToCart(cartItems.value, userId.value);
      if (error) {
        throw error;
      } else {
        const { toast, message } = toastHandler("add-to-cart");
        showSuccessToast(toast, message);
      }
    } else {
      const { toast, message } = toastHandler("not-authorized");
      showErrorToast(toast, message);
    }
  };

  const updateAmount = async (value: number, id: number) => {
    const item = cartItems.value.find(
      (el: CartItem) => el.id === id
    ) as unknown as CartItem;
    item.amount = value;
    item.total = item.amount * item.price;
    const error = await cartService.updateAmount(cartItems.value, userId.value);
    if (error) throw error;
  };

  const deleteItem = async (id: number) => {
    const newItems = cartItems.value.filter((item: CartItem) => item.id !== id);
    const error = await cartService.deleteItem(newItems, userId.value);
    if (error) throw error;
  };

  const placeOrder = async () => {
    const newOrder = {} as Order;
    newOrder.created_at = new Date();
    newOrder.items = cartItems.value;
    newOrder.userId = userId.value as string;
    newOrder.user = userEmail.value as string;
    newOrder.total = totalSum.value;
    newOrder.status = "Pending" as OrderStatus.Pending;
    const error = await cartService.placeOrder(newOrder, userId.value);
    if (error) {
      const { toast, message } = toastHandler("order-confirmation-error");
      showErrorToast(toast, message);
    } else {
      const { toast, message } = toastHandler("order-confirmation-success");
      showSuccessToast(toast, message);
    }
    openPopup("You order was succesfully placed!", "Go to account");
  };

  return {
    cartItems,
    cartLoaded,
    addToCart,
    totalSum,
    updateAmount,
    deleteItem,
    getCartItems,
    placeOrder,
  };
});
