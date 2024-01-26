import { defineStore } from "pinia";
import { useToastsStore } from "./toasts";
import { toastHandler } from "~/utils/toastHandler";
import { useUsersStore } from "~/store/users";
import authService from "~/services/authService";

export const useAuthStore = defineStore("auth", () => {
  const usersStore = useUsersStore();
  const toastsStore = useToastsStore();

  const { addUser } = usersStore;
  const { showErrorToast, showSuccessToast } = toastsStore;

  const loginUser = async (email: string, password: string) => {
    const error = await authService.loginUser(email, password);
    if (error) {
      const { toast, message } = toastHandler("login-failed");
      showErrorToast(toast, message);
    }
  };

  const registerUser = async (values: FormValues) => {
    const { email, password } = values as User;
    const error = await authService.registerUser(email, password);
    if (error) {
      const { toast, message } = toastHandler("registration-failed");
      showErrorToast(toast, message);
    } else {
      addUser(values as User);
      const { toast, message } = toastHandler("registration-successful");
      showSuccessToast(toast, message);
    }
  };
  return {
    loginUser,
    registerUser,
  };
});
