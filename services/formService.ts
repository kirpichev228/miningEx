import type { Database } from "~/types/database.types";

const client = useSupabaseClient<Database>();

class FormService {
  async uploadImage(filename: string, image: File) {
    const { data, error } = await client.storage
      .from("catalog")
      .upload(`${filename}.png`, image, {
        cacheControl: "3600",
        upsert: false,
        contentType: "image/png",
      });
    return { data, error };
  }

  getImageUrl(url: string) {
    const path = client.storage.from("catalog").getPublicUrl(url)
      .data.publicUrl;
    return path;
  }
}

const formService = new FormService();

export default formService;
