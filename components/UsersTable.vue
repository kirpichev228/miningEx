<template>
  <BaseTable
    v-if="data?.length"
    :header="USERS_HEADER"
    :data="data"
    :shadowed="true"
    :sortable="true"
  />
  <div v-else class="preloader-wrapper">
    <img
      class="w-16"
      src="~/assets/icons/oval.svg"
      alt="Preloader"
      loading="eager"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUsersStore } from "~/store/users";
import { usePaginationStore } from "~/store/pagination";
import { USERS_HEADER } from "~/constants/users";

const store = useUsersStore();
const pagesStore = usePaginationStore();

const { currentPage } = storeToRefs(pagesStore);
const { users } = storeToRefs(store);

const { fetchUsers, subscribeToUpdates, unsubscribeFromUpdates } = store;

const start = computed(() => {
  return currentPage.value * 12;
});

const end = computed(() => {
  return (currentPage.value + 1) * 12;
});

const data = computed(() => {
  return users.value?.slice(start.value, end.value);
});

onMounted(() => {
  fetchUsers();
  subscribeToUpdates();
});

onUnmounted(() => {
  unsubscribeFromUpdates();
});
</script>

<style scoped></style>
