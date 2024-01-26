<template>
  <div class="builder__panel">
    <button class="button_regular mr-4" @click="saveDesign">Save Design</button>
    <button class="button_regular mr-4" @click="exportHtml">Export HTML</button>
  </div>
  <div class="editor-wrapper">
    <EmailEditor ref="emailEditor" min-height="500" @load="editorLoaded" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { EmailEditor } from "vue-email-editor";
import { useEmailStore } from "~/store/emailbuider";

const emailEditor: Ref<EmailEditor | null> = ref(null);

const emailStore = useEmailStore();
const { emailTemplate, emailTemplatePreset } = storeToRefs(emailStore);
const { fetchTemplates } = emailStore;

const editorLoaded = () => {
  if (emailTemplatePreset.value) {
    emailEditor.value?.editor.loadDesign(emailTemplatePreset.value);
  }
};

const saveDesign = () => {
  if (emailEditor.value) {
    emailEditor.value.editor.saveDesign((design: EditorDesign) => {
      emailTemplatePreset.value = design;
    });
  }
};

const exportHtml = () => {
  if (emailEditor.value) {
    emailEditor.value.editor.exportHtml((data: EmailEditorData) => {
      emailTemplate.value = data;
    });
  }
};

onMounted(() => {
  fetchTemplates();
});
</script>

<style scoped lang="css">
.builder__panel {
  @apply w-full flex items-center justify-start h-[80px] px-[30px];
}

.editor-wrapper {
  @apply h-[calc(100vh-160px)];
}

.unlayer-editor {
  height: calc(100vh - 160px);
}
</style>
