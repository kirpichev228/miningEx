<template>
  <div
    class="container mx-auto py-10 flex min-h-[calc(100vh-160px)] max-lg:flex-col"
  >
    <Sidebar />
    <CatalogContainer />
  </div>
  <Newsletter />
</template>

<script setup lang="ts">
useHead({
  title: "Camera store",
  meta: [
    {
      name: "description",
      content:
        "Online marketplace for digital high-quality cameras & camera kits",
    },
    {
      name: "lang",
      content: "en",
    },
  ],
});

useSeoMeta({
  title: "Camera store",
  ogTitle: "Camera store",
  description:
    "Online marketplace for digital high-quality cameras & camera kits",
  ogDescription:
    "Online marketplace for digital high-quality cameras & camera kits",
  ogImage: "~/assets/newsletter.jpg",
  ogUrl: "/catalog",
  ogType: "website",
  ogLocale: "en_US",
  twitterCard: "summary_large_image",
});
</script>

<style scoped></style>
