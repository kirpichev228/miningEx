import type { Database } from "~/types/database.types";

const client = useSupabaseClient<Database>();

class EmailService {
  async fetchTemplates() {
    const { data: items, error } = await client.storage
      .from("html-templates")
      .list();
    return { items, error };
  }

  getTemplateUrl(name: string) {
    const { data: url } = client.storage
      .from("html-templates")
      .getPublicUrl(name);
    return url.publicUrl;
  }
}

const emailService = new EmailService();

export default emailService;
