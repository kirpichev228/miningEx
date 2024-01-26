import { defineStore } from "pinia";
import emailService from "~/services/emailService";

export const useEmailStore = defineStore("email", () => {
  interface EmailTemplate {
    name: string;
    url: string;
  }

  const emailTemplate: Ref<EmailEditorData | null> = ref(null);
  const emailTemplatePreset: Ref<EditorDesign | null> = ref(null);
  const templates: Ref<EmailTemplate[]> = ref([]);

  const fetchTemplates = async () => {
    const { items, error } = await emailService.fetchTemplates();
    items?.forEach((item) => {
      const url = emailService.getTemplateUrl(item.name);
      const template = {
        name: item.name,
        url,
      };
      templates.value.push(template);
    });
    if (error) throw error;
  };

  return {
    emailTemplate,
    emailTemplatePreset,
    templates,
    fetchTemplates,
  };
});
