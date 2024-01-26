import type { Database } from "~/types/database.types";

const client = useSupabaseClient<Database>();

class RatingsService {
  async fetchRating(id: number) {
    const { data, error } = await client
      .from("ratings")
      .select("*")
      .eq("item_id", id);
    return { data, error };
  }

  async updateReviews(review: Review) {
    const { error } = await client.from("ratings").insert([review]);
    return error;
  }
}

const ratingsService = new RatingsService();

export default ratingsService;
