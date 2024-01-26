import type { RealtimeChannel } from "@supabase/supabase-js";
import type { Database } from "~/types/database.types";

const client = useSupabaseClient<Database>();
let realtimeChannel: RealtimeChannel;

class OrdersService {
  async fetchOrders() {
    const { data, error } = await client
      .from("orders")
      .select("id, created_at, items, userId, user, total, status");
    return { data, error };
  }

  async fetchUserOrders() {
    const {
      data: { user },
    } = await client.auth.getUser();
    const { data, error } = await client
      .from("orders")
      .select("id, created_at, items, userId, user, total, status")
      .eq("userId", user?.id);
    return { data, error };
  }

  async getUserId(values: Order) {
    const { data, error } = await client
      .from("users")
      .select("user_id")
      .eq("email", values.user);
    return { data, error };
  }

  async addOrder(formValues: Order) {
    const { error } = await client.from("orders").insert([formValues]);
    return error;
  }

  async updateOrderStatus(status: string, id: number) {
    const { error } = await client
      .from("orders")
      .update({ status })
      .eq("id", id);
    return error;
  }

  subscribeToOrdersUpdates(func: () => void) {
    realtimeChannel = client
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => func()
      );
    realtimeChannel.subscribe();
  }

  unsubscribeFromOrdersUpdates() {
    client.removeChannel(realtimeChannel);
  }
}

const ordersService = new OrdersService();

export default ordersService;
