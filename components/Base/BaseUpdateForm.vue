<template>
  <form ref="form" class="modal__form modal-form" @submit.prevent="updateItem">
    <template v-for="el in CATALOG_INPUT_FIELDS" :key="el">
      <input
        v-if="el.elType === 'input'"
        v-model="selectedItem[el.name as keyof typeof selectedItem]"
        :name="el.name"
        :placeholder="el.placeholder"
        class="modal-form__input"
      />
      <input
        v-else-if="el.elType === 'file'"
        type="file"
        :name="el.name"
        :placeholder="el.placeholder"
        class="modal-form__file"
        @change="selectImage"
      />
      <select
        v-else-if="el.elType === 'select'"
        :name="el.name"
        class="modal-form__select"
      >
        <option disabled selected>{{ el.placeholder }}</option>
        <option
          v-for="option in el.options"
          :key="el.name + option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </template>
    <input type="submit" class="modal-form__submit" :value="'Edit item'" />
  </form>
</template>

<script setup lang="ts">
import { useCatalogStore } from "~/store/catalog";
import { CATALOG_INPUT_FIELDS } from "~/constants/form";

const props = defineProps<{
  item: CatalogItem | OrderItem | User;
  originalItems: CatalogItem[] | undefined;
}>();

const store = useCatalogStore();
const { selectImage, editItem } = store;

const modalOpen = ref(false);
const target = ref(null);
const form = ref(null);

onClickOutside(target, () => {
  modalOpen.value = false;
});

const updateItem = () => {
  const values = form.value;
  if (values) {
    editItem(values, props.item.id);
  }
};

const selectedItem = computed(() => {
  const id = props.item.id;
  const el = props.originalItems?.find((item) => item.id === id);
  if (el) {
    return el;
  } else return {};
});
</script>

<style scoped>
.modal__form {
  @apply w-full flex flex-col mb-4 h-full;
}

.modal-form__input {
  @apply h-12 bg-white border rounded-none mb-4 px-3 text-xl;
}

.modal-form__select {
  @apply file:bg-sky-400 file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xl file:bg-sky-400 file:text-white hover:file:bg-sky-500 cursor-pointer mb-4;
}

.modal-form__select {
  @apply h-12 bg-white border rounded-none mb-4 px-3 text-xl;
}

.modal-form__file {
  @apply file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xl file:bg-sky-400 file:text-white hover:file:bg-sky-500 cursor-pointer mb-4;
}

.modal-form__submit {
  @apply bg-sky-400 text-white px-8 py-4 block text-xl cursor-pointer tracking-wider;
}
</style>
