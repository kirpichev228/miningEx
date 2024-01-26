<template>
  <form
    v-if="catalogItems.length"
    ref="baseList"
    class="base-list w-full"
    @submit.prevent="submitForm"
  >
    <select
      v-if="users.length"
      class="modal-form__select mr-2 w-full"
      name="select-user"
      @change="selectUser($event)"
    >
      <option disabled selected>Choose user</option>
      <option v-for="item in users" :key="item.id" :value="item.email">
        {{ item.email }}
      </option>
    </select>
    <OrdersFormList :items="catalogItems" @select-items="selectItems" />
    <input
      class="button_regular"
      type="submit"
      value="Create order"
      name="submit"
    />
  </form>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useOrdersStore } from "~/store/orders";
import { useCatalogStore } from "~/store/catalog";
import { useUsersStore } from "~/store/users";

const ordersStore = useOrdersStore();
const catalogStore = useCatalogStore();
const usersStore = useUsersStore();

const { catalogItems } = storeToRefs(catalogStore);
const { users } = storeToRefs(usersStore);

const { addOrder } = ordersStore;
const { fetchCatalogItems } = catalogStore;
const { fetchUsers } = usersStore;

const baseList = ref(null);
const user = ref(null);
const items = ref([]);

const total = computed(() => {
  if (items.value) {
    return items.value.reduce((acc, item) => {
      return (acc += item.total);
    }, 0);
  } else return 0;
});

const selectUser = (e) => {
  user.value = e.target.value;
};

const selectItems = (val) => {
  items.value = val;
};

const closeModal = inject("closeModal", () => {});

const submitForm = () => {
  const values = {
    user: user.value,
    total: total.value,
    created_at: new Date(),
    status: "Pending",
    items: items.value,
  };
  addOrder(values);
  closeModal();
};

onMounted(() => {
  fetchCatalogItems();
  fetchUsers();
});
</script>

<style scoped></style>
