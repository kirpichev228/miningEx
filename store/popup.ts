import { defineStore } from "pinia";

export const usePopupStore = defineStore("popup", () => {
  const router = useRouter();
  const popupState = ref(false);
  const popupContent = ref("");
  const btnText = ref("");

  const openPopup = (message: string, btnLabel: string) => {
    popupContent.value = message;
    popupState.value = true;
    btnText.value = btnLabel;
    setTimeout(() => {
      closePopup();
    }, 4000);
  };

  const closePopup = () => {
    popupState.value = false;
    router.push("/cabinet");
  };

  return {
    popupState,
    popupContent,
    btnText,
    openPopup,
    closePopup,
  };
});
