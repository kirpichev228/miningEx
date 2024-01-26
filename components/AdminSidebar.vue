<template>
  <aside class="admin-sidebar">
    <div class="admin-sidebar__categories">
      <div class="">
        <NuxtLink class="admin-sidebar__link sidebar-link" to="/admin">
          <Icon
            name="heroicons:shopping-bag"
            color="black"
            size="24px"
            class="mr-2"
          />
          Catalog</NuxtLink
        >
      </div>
      <div>
        <NuxtLink class="admin-sidebar__link sidebar-link" to="/admin/orders">
          <Icon
            name="heroicons:shopping-cart"
            color="black"
            size="24px"
            class="mr-2"
          />
          Orders</NuxtLink
        >
      </div>
      <div>
        <NuxtLink class="admin-sidebar__link sidebar-link" to="/admin/users">
          <Icon name="heroicons:users" color="black" size="24px" class="mr-2" />
          Users</NuxtLink
        >
      </div>
      <div>
        <NuxtLink
          class="admin-sidebar__link sidebar-link"
          to="/admin/discounts"
        >
          <Icon
            name="heroicons:currency-dollar"
            color="black"
            size="24px"
            class="mr-2"
          />
          Discounts</NuxtLink
        >
      </div>
      <div>
        <NuxtLink
          class="admin-sidebar__link sidebar-link"
          to="/admin/dashboard"
        >
          <Icon
            name="heroicons:chart-bar-square"
            color="black"
            size="24px"
            class="mr-2"
          />
          Statistics</NuxtLink
        >
      </div>
      <div>
        <NuxtLink
          class="admin-sidebar__link sidebar-link"
          to="/admin/emailbuilder"
        >
          <Icon
            name="heroicons:pencil-square"
            color="black"
            size="24px"
            class="mr-2"
          />
          Email editor</NuxtLink
        >
      </div>
      <div>
        <NuxtLink class="admin-sidebar__link sidebar-link" to="/admin/mailing">
          <Icon
            name="heroicons:envelope"
            color="black"
            size="24px"
            class="mr-2"
          />
          Mailing</NuxtLink
        >
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts"></script>

<style scoped lang="css">
.icon {
  color: #222222;
}

a.router-link-active {
  @apply bg-gray-200 font-semibold;
}

.admin-sidebar {
  @apply w-96 max-h-full max-lg:w-full max-lg:mb-5 border p-4 bg-white border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg;
}

.admin-sidebar__link {
  @apply text-lg p-3 w-full flex cursor-pointer items-center transition duration-200;
}

.sidebar-link__image {
  @apply w-6 h-6 mr-2 icon;
}
</style>
