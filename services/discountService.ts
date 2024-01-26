import type { RealtimeChannel } from "@supabase/supabase-js";
import type { Database } from "~/types/database.types";

const client = useSupabaseClient<Database>();
let realtimeChannel: RealtimeChannel;

class DiscountService {
  async fetchDiscounts() {
    const { data, error } = await client
      .from("discounts")
      .select("id, date_start, date_end, discount_number");

    return { data, error };
  }

  subscribeToUpdates() {
    realtimeChannel = client
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "discounts" },
        () => this.fetchDiscounts()
      );
    realtimeChannel.subscribe();
  }

  unsubscribeFromUpdated() {
    client.removeChannel(realtimeChannel);
  }

  async addDiscount(values: DiscountInput) {
    const { error } = await client.from("discounts").insert([values]);
    return error;
  }
}

const discountService = new DiscountService();

export default discountService;
