<template>
  <header class="header">
    <NuxtLink to="/catalog" class="max-[340px]:hidden">
      <div class="logo">
        <div class="logo__outer">
          <div class="logo__inner">Photolens</div>
        </div>
      </div>
    </NuxtLink>
    <div v-if="user" class="header-items">
      <NuxtLink to="/cabinet">
        <div class="header-item header__item">
          <div class="header-item__image">
            <Icon name="heroicons:user-circle" color="#444444" size="36px" />
          </div>
          Account
        </div>
      </NuxtLink>
      <NuxtLink v-if="user" to="/cart">
        <div class="header-item header__item">
          <div class="header-item__image">
            <Icon name="heroicons:shopping-cart" color="#444444" size="36px" />
          </div>
          Cart
        </div>
      </NuxtLink>
    </div>
    <template v-else>
      <BaseModal>
        <template #trigger>
          <button class="button_regular">Log in</button>
        </template>
        <template #content>
          <BaseAuthForm />
        </template>
      </BaseModal>
    </template>
  </header>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
</script>

<style scoped>
.header {
  @apply z-10 h-20 bg-white px-10 max-md:px-5 max-[340px]:justify-end flex items-center justify-between shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)];
}

.logo {
  @apply p-1 bg-sky-300;
}

.logo__outer {
  @apply p-1 bg-white;
  font-family: "Raleway", sans-serif;
}

.logo__inner {
  @apply text-2xl tracking-wide uppercase bg-sky-300 py-1 px-2 text-white max-md:text-lg;
}

.header-items {
  @apply flex items-center;
}

.header-item {
  @apply flex flex-col items-center mx-4 max-md:mx-2;
}

.header-item__image {
  @apply w-8 h-8 mr-2;
}

.header-item__icon {
  @apply w-full h-auto cursor-pointer block;
  color: "red";
}
</style>
