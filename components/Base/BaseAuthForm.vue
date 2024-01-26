<template>
  <h1 class="modal__header">
    {{ userExists ? "Log into your account" : "Create account" }}
  </h1>
  <form
    class="modal__form modal-form"
    @submit.prevent="
      userExists
        ? loginUser(email, password)
        : registerUser(email, password, isSubscribed, userId, userRole)
    "
  >
    <input
      v-model="email"
      type="email"
      class="modal-form__input"
      name="email"
    />
    <input
      v-model="password"
      type="password"
      class="modal-form__input"
      name="password"
    />
    <div v-if="!userExists" class="flex justify-between py-4">
      <p class="text-lg max-w-[320px]">Subscribe to newsletter</p>
      <BaseToggleInput :state="isSubscribed" @change="setSubscription" />
    </div>
    <input
      type="submit"
      class="modal-form__submit"
      :disabled="!ifFormFilled"
      :value="userExists ? 'Log in' : 'Register now'"
    />
  </form>
  <p class="modal-form__redirect" @click="userExists = !userExists">
    {{ !userExists ? "I already have an account" : "I don't have an account" }}
  </p>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { useAuthStore } from "~/store/auth";

const store = useAuthStore();

const { loginUser, registerUser } = store;

const user = useSupabaseUser();
const password = ref("");
const email = ref("");
const isSubscribed = ref(true);
const userRole = ref("user");
const userId = uuidv4();
const modalOpen = ref(false);
const userExists = ref(true);
const target = ref(null);

const ifFormFilled = computed(() => {
  return password.value && email.value;
});

onClickOutside(target, () => {
  modalOpen.value = false;
});

const setSubscription = () => {
  isSubscribed.value = !isSubscribed.value;
};

onMounted(() => {
  watchEffect(() => {
    if (user.value) {
      navigateTo("/admin");
    }
  });
});
</script>

<style scoped>
.modal__header {
  @apply text-xl tracking-wider uppercase mb-4 text-center;
}

.modal__form {
  @apply w-full flex flex-col mb-4;
}

.modal-form__input {
  @apply h-12 bg-white border rounded-none mb-4 px-3 text-xl;
}

.modal-form__submit {
  @apply disabled:bg-zinc-300 transition duration-200 hover:bg-sky-500 bg-sky-400 text-white px-8 py-4 block text-xl cursor-pointer tracking-wider;
}

.modal-form__redirect {
  @apply cursor-pointer py-4 text-xl text-center;
}
</style>
