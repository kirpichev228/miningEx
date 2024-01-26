<template>
  <div class="list">
    <h3 class="mb-2 text-xl">Select items</h3>
    <div class="list-wrapper pb-5">
      <template v-for="(item, index) in itemsToRender" :key="item.id">
        <div
          class="list-wrapper__item"
          :class="isDisabled(item.id) ? 'list-item_disabled' : ''"
        >
          <label class="mcui-checkbox mr-5">
            <input
              type="checkbox"
              :name="item.name"
              @change="selectItem(item)"
            />
            <div>
              <svg class="mcui-check" viewBox="-2 -2 35 35" aria-hidden="true">
                <title>checkmark-circle</title>
                <polyline points="7.57 15.87 12.62 21.07 23.43 9.93" />
              </svg>
            </div>
            <div class="text-lg">{{ item.name }}</div>
          </label>
          <div class="mb-2">
            <input
              :name="'quantity' + item.id"
              :defaultValue="1"
              min="1"
              :disabled="isDisabled(item.id) ? true : false"
              type="number"
              placeholder="Quanity"
              class="bottom-0 modal-form__input w-[120px] mr-2"
              @change="updateQuantity($event, item.id)"
            />
            <input
              v-model="total[index]"
              :name="'total' + item.id"
              type="string"
              readonly
              disabled
              placeholder="Total"
              class="bottom-0 modal-form__input w-[120px] mr-2"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  items: CatalogItem[];
}>();

const emit = defineEmits(["selectItems"]);

const selectedItems = ref([]);

const itemsToRender = computed(() => {
  return props.items.map((item) => {
    item.amount = 1;
    item.total = item.amount * item.price;
    return item;
  });
});

const isDisabled = (id) => {
  const index = selectedItems.value?.findIndex((el) => id === el.id);
  if (index === -1) {
    return true;
  } else {
    return false;
  }
};

const total = computed(() => {
  return props.items.map((item) => {
    const index = selectedItems.value?.findIndex((el) => el.id === item.id);
    if (index === -1) {
      return item.price;
    } else {
      return (
        selectedItems.value[index].amount * selectedItems.value[index].price
      );
    }
  });
});

const selectItem = (item) => {
  const index = selectedItems.value.findIndex((el) => el.id === item.id);
  if (index === -1) {
    item.amount = 1;
    selectedItems.value.push(item);
  } else {
    selectedItems.value.splice(index, 1);
  }
  emit("selectItems", selectedItems.value);
};

const updateQuantity = (e, id) => {
  const index = selectedItems.value.findIndex((el) => el.id === id);
  const copy = Object.assign({}, selectedItems.value[index]);
  copy.amount = Number(e.target.value);
  copy.total = Number(e.target.value) * copy.price;
  selectedItems.value[index] = copy;
  emit("selectItems", selectedItems.value);
};
</script>

<style scoped>
.list {
  @apply h-[300px] overflow-hidden mb-5;
}

.list-wrapper {
  @apply h-[300px] w-full overflow-y-auto;
}

.list-wrapper__item {
  @apply flex items-center justify-between mb-2;
}

.modal-form__input.bottom-0 {
  @apply mb-0;
}

.list-wrapper__item {
  @apply transition duration-200 opacity-100;
}

.list-item_disabled {
  @apply opacity-25;
}
</style>
