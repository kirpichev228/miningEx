<template>
  <div class="flex" @click="modalOpen = true">
    <slot name="trigger"></slot>
  </div>
  <Teleport to="body">
    <Transition>
      <div v-if="modalOpen" class="overlay">
        <div class="modal-wrap">
          <div ref="target" class="modal">
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const modalOpen = ref(false);
const target = ref(null);

onClickOutside(target, () => {
  closeModal();
});

const closeModal = () => {
  modalOpen.value = false;
};

provide("closeModal", closeModal);
</script>

<style scoped>
.overlay {
  @apply fixed top-0 left-0 z-10 w-full h-screen bg-sky-400/75 flex justify-center items-center;
}

.modal-wrap {
  @apply max-h-[calc(100vh_-_100px)] w-[700px] overflow-y-auto;
}

.modal {
  @apply h-full bg-white p-10 opacity-100 flex flex-col justify-center items-center;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
