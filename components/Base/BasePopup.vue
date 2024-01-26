<template>
  <Teleport to="body">
    <Transition>
      <div v-if="isOpen" class="overlay">
        <div ref="target" class="popup">
          <p class="popup__content">{{ text }}</p>
          <NuxtLink to="/catalog">
            <button class="button_regular" @click="closePopup">
              {{ btnText }}
            </button>
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePopupStore } from "~/store/popup";

const target = ref(null);

const store = usePopupStore();
const { popupState: isOpen, popupContent: text, btnText } = storeToRefs(store);
const { closePopup } = store;

onClickOutside(target, () => {
  closePopup();
});
</script>

<style scoped>
.overlay {
  @apply fixed overflow-y-auto z-10 w-full h-screen bg-sky-400/75 flex justify-center items-center;
}

.popup {
  @apply w-[500px] max-md:w-[calc(100w-100px)] h-[300px] border border-white shadow-[0_1px_5px_1px_rgba(0,0,0,0.1)] rounded-lg overflow-y-auto bg-white p-10 opacity-100 flex flex-col justify-center items-center;
}

.popup__content {
  @apply text-2xl text-center mb-10;
}
</style>
