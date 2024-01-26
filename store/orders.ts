import { defineStore } from "pinia";
import { useToastsStore } from "./toasts";
import ordersService from "~/services/ordersService";

export const useOrdersStore = defineStore("orders", () => {
  const orders: Ref<Order[] | null> = ref([]);
  const ordersLoaded = ref(false);

  const toastsStore = useToastsStore();
  const { showErrorToast, showSuccessToast } = toastsStore;

  const fetchOrders = async () => {
    const { data, error } = await ordersService.fetchOrders();
    if (error) {
      throw error;
    } else {
      orders.value = data;
      ordersLoaded.value = true;
    }
  };

  const subscribeToUpdates = () => {
    ordersService.subscribeToOrdersUpdates(fetchOrders);
  };

  const fetchUserOrders = async () => {
    const { data, error } = await ordersService.fetchUserOrders();
    if (error) {
      throw error;
    } else {
      orders.value = data;
      ordersLoaded.value = true;
    }
  };

  const getUserId = async (values: Order) => {
    const { data, error } = await ordersService.getUserId(values);
    if (error) {
      const { toast, message } = toastHandler("user-not-found");
      showErrorToast(toast, message);
    } else {
      return data[0];
    }
  };

  const addOrder = async (values: FormValues) => {
    const selected = await getUserId(values as Order);
    const formValues = {
      userId: selected.user_id,
      ...values,
    };
    const error = await ordersService.addOrder(formValues);
    if (error) {
      const { toast, message } = toastHandler("registration-failed");
      showErrorToast(toast, message);
    }
  };

  const updateOrderStatus = async ({
    id,
    event,
  }: {
    id: number;
    event: Event;
  }) => {
    const target = event.target as HTMLInputElement;
    const status = target.value;
    const error = await ordersService.updateOrderStatus(status, id);

    if (error) {
      const { toast, message } = toastHandler("status-update-error");
      showErrorToast(toast, message);
    } else {
      const { toast, message } = toastHandler("status-update-success");
      showSuccessToast(toast, message);
    }
  };

  return {
    orders,
    ordersLoaded,
    updateOrderStatus,
    fetchOrders,
    fetchUserOrders,
    addOrder,
    subscribeToUpdates,
  };
});
