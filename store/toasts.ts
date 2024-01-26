import { defineStore } from "pinia";
export const useToastsStore = defineStore("toasts", () => {
  const { $toast } = useNuxtApp();

  const showSuccessToast = (_: any, message: string) => {
    $toast.success(message, { timeout: 2000 });
  };

  const showErrorToast = (_: any, message: string) => {
    $toast.error(message, { timeout: 20000 });
  };

  const showWarningToast = (_: any, message: string) => {
    $toast.warning(message, { timeout: 2000 });
  };

  return {
    showErrorToast,
    showSuccessToast,
    showWarningToast,
  };
});
