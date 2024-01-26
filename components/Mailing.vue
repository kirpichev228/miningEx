<template>
  <div class="mailing">
    <h2 class="mailing__title">Settings</h2>
    <div>
      <div class="mailing__item mailing-item">
        <h3 class="mailing-item__title">Время:</h3>
        <select class="text-lg bg-transparent">
          <option value="9">09.00</option>
          <option value="12">12.00</option>
          <option value="15">15.00</option>
          <option value="16">18.00</option>
        </select>
      </div>
      <div class="mailing__item mailing-item">
        <h3 class="mailing-item__title">Timeline:</h3>
        <select class="text-lg bg-transparent">
          <option value="9">Every 24 hours</option>
          <option value="12">Every week</option>
          <option value="15">Every month</option>
        </select>
      </div>
      <div class="mailing__item mailing-item">
        <h3 class="mailing-item__title">Template</h3>
        <div v-if="templates.length" class="templates">
          <div
            v-for="item in templates"
            :key="item.name"
            class="mailing-template"
          >
            <img
              src="~/assets/icons/svg-file.svg"
              class="mailing-template__image"
              alt="File"
              loading="eager"
            />
            <p class="mailing-template__name">{{ item.name }}</p>
          </div>
        </div>
        <template v-else>
          <div class="mailing-template__placeholder">
            You don't have any templates
          </div>
        </template>
      </div>
      <button class="button_regular" @click="sendMail">Confirm</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEmailStore } from "~/store/emailbuider";

const emailStore = useEmailStore();
const { templates } = storeToRefs(emailStore);
const { fetchTemplates } = emailStore;

onMounted(() => {
  fetchTemplates();
});

const sendMail = () => {};
</script>

<style scoped lang="css">
.mailing {
  @apply w-full min-h-[120px] px-[30px] py-5;
}

.mailing__title {
  @apply text-2xl font-semibold mb-5;
}

.mailing__item {
  @apply flex mb-6 max-[340px]:flex-col;
}

.mailing-item__title {
  @apply text-xl font-semibold min-w-[200px] max-sm:text-lg max-sm:min-w-[150px] max-[340px]:mb-2;
}

.mailing-template {
  @apply cursor-pointer mr-4 mb-4 max-[340px]:mb-2;
}

.mailing-template__image {
  @apply mb-3 w-[80px] h-[80px] max-sm:w-[40px] max-sm:h-[40px];
}

.mailing-template__name {
  @apply text-xl text-center font-semibold max-sm:text-lg;
}

.mailing-template__placeholder {
  @apply w-full text-center text-xl py-5;
}

.templates {
  @apply flex flex-wrap;
}

svg {
  color: #0079af;
}
</style>
