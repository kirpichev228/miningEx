import type { PostgrestError, RealtimeChannel } from "@supabase/supabase-js";
import type { Database } from "~/types/database.types";

const client = useSupabaseClient<Database>();
let realtimeChannel: RealtimeChannel;

class CatalogService {
  async fetchCatalogItems() {
    const { data, error } = await client
      .from("catalog")
      .select(
        "id, name, price, date, manufacturer, photo, type, battery_type, pixels, max_FPS_video, max_FPS_photo, max_sensitivity, max_resolution, min_sensitivity, wi_fi, card_support, matrix_type, matrix_size, popularity, rating, warranty, in_stock, item_code, is_visible, reviews,  discounts (discount_number)"
      );
    return { data, error };
  }

  async fetchSelectedItem(id: number) {
    const { data, error } = await client
      .from("catalog")
      .select(
        "id, name, price, date, manufacturer, photo, type, battery_type, pixels, max_FPS_video, max_FPS_photo, max_sensitivity, max_resolution, min_sensitivity, wi_fi, card_support, matrix_type, matrix_size, popularity, rating, warranty, in_stock, item_code, is_visible, reviews, discounts (discount_number)"
      )
      .eq("id", id);
    return { data, error };
  }

  async toggleVisibility(
    isChecked: boolean,
    id: number
  ): Promise<PostgrestError | null> {
    const { error } = await client
      .from("catalog")
      .update({ is_visible: isChecked })
      .eq("id", id);
    return error;
  }

  async deleteItem(id: number): Promise<PostgrestError | null> {
    const { error } = await client.from("catalog").delete().eq("id", id);
    return error;
  }

  async addItem(values: FormValues) {
    const initialValues = {
      date: new Date().toISOString(),
      popularity: 0,
      rating: 0,
      reviews: [],
      discount: null,
    } as unknown as CatalogItem;

    const formValues = {
      ...initialValues,
      ...values,
    };

    const { error } = await client.from("catalog").insert([formValues]);
    return error;
  }

  async editItem(formValues: FormValues, id: string) {
    const { error } = await client
      .from("catalog")
      .update([formValues])
      .eq("id", id);
    return error;
  }

  subscribeToCatalogUpdates = () => {
    realtimeChannel = client
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "catalog" },
        () => this.fetchCatalogItems()
      );
    realtimeChannel.subscribe();
  };

  unsubscribeFromCatalogUpdates = () => {
    client.removeChannel(realtimeChannel);
  };
}

const catalogService = new CatalogService();

export default catalogService;
