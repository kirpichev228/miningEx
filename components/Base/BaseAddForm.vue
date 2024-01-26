<template>
  <form ref="form" class="modal__form modal-form" @submit.prevent="submitForm">
    <template v-for="item in fields" :key="item">
      <input
        v-if="item.elType === 'input'"
        v-model="item.default"
        :type="item.dataType"
        :name="item.name"
        :placeholder="item.placeholder"
        :class="
          item.dataType === 'file' ? 'modal-form__file' : 'modal-form__input'
        "
        @change="item.dataType === 'file' ? selectImage($event) : ''"
      />
      <select
        v-else-if="item.elType === 'select'"
        :name="item.name"
        class="modal-form__select"
      >
        <option disabled selected>{{ item.placeholder }}</option>
        <option
          v-for="(option, index) in item.options"
          :key="index"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </template>
    <input
      type="submit"
      class="modal-form__submit"
      :value="activeItem ? 'Edit item' : 'Create item'"
    />
  </form>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCatalogStore } from "~/store/catalog";
import { useFormStore } from "~/store/form";

import {
  CATALOG_INPUT_FIELDS,
  ORDER_INPUT_FIELDS,
  USER_INPUT_FIELDS,
  DISCOUNT_INPUT_FIELDS,
} from "~/constants/form";

type INPUT_UNION =
  | typeof CATALOG_INPUT_FIELDS
  | typeof ORDER_INPUT_FIELDS
  | typeof USER_INPUT_FIELDS
  | typeof DISCOUNT_INPUT_FIELDS;

const catalogStore = useCatalogStore();
const formStore = useFormStore();

const { formatFormValues, selectImage } = formStore;
const { activeItem } = storeToRefs(catalogStore);

const props = defineProps<{
  fields: INPUT_UNION;
  currentPage: string;
  title?: string;
}>();

const form = ref(null);

const closeModal = inject("closeModal", () => {});

const submitForm = () => {
  const values = form.value;
  formatFormValues(values, props.currentPage);
  closeModal();
};
</script>

<style>
.modal__form {
  @apply w-full flex flex-col mb-4;
}

.modal-form__input {
  @apply h-12 bg-white border rounded-none mb-4 px-3 text-xl;
}

.modal-form__file {
  @apply file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xl file:bg-sky-400 file:text-white hover:file:bg-sky-500 cursor-pointer mb-4;
}

.modal-form__select {
  @apply h-12 bg-white border rounded-none mb-4 px-3 text-xl;
}

.modal-form__submit {
  @apply transition duration-200 hover:bg-sky-500 bg-sky-400 text-white px-8 py-4 block text-xl cursor-pointer tracking-wider;
}
</style>
