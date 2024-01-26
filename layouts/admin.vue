<template>
  <div>
    <Header />
    <div class="section-wrapper">
      <AdminSidebar />
      <section ref="scrollEl" class="w-full lg:ml-10">
        <slot></slot>
      </section>
    </div>
    <Footer />
  </div>
</template>
<style scoped>
.section-wrapper {
  @apply container mx-auto py-10 flex min-h-[calc(100vh-160px)] max-lg:flex-col max-lg:px-3;
}
</style>
