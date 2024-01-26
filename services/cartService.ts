import type { PostgrestError } from "@supabase/supabase-js";
import type { Database } from "~/types/database.types";

const client = useSupabaseClient<Database>();

class CartService {
  async fetchCartItems(id: string) {
    const { data, error } = await client
      .from("users")
      .select("cart")
      .eq("user_id", id);
    return { data, error };
  }

  async addToCart(cart: [] | CartItem[], id: string) {
    const { error } = await client
      .from("users")
      .update({ cart } as never)
      .eq("user_id", id);
    return error;
  }

  async updateAmount(cart: [] | CartItem[], id: string) {
    const { error } = await client
      .from("users")
      .update({ cart } as never)
      .eq("user_id", id);
    return error;
  }

  async deleteItem(cart: [] | CartItem[], id: string) {
    const { error } = await client
      .from("users")
      .update({ cart } as never)
      .eq("user_id", id);
    return error;
  }

  async placeOrder(order: Order, id: string): Promise<PostgrestError | null> {
    const { error } = await client.from("orders").insert([order] as never);
    if (error) throw error;
    const { error: updateError } = await client
      .from("users")
      .update({ cart: [] } as never)
      .eq("user_id", id);
    return updateError;
  }
}

const cartService = new CartService();

export default cartService;
