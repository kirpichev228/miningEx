<template>
  <div>
    <Header />
    <slot />
    <Footer />
  </div>
</template>
<script setup>
useHead(() => ({
  link: [
    {
      rel: "canonical",
      href: "/catalog",
    },
  ],
}));
</script>
