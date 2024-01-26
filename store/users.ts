import { defineStore } from "pinia";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { useToastsStore } from "./toasts";
import type { Database } from "~/types/database.types";
import { toastHandler } from "~/utils/toastHandler";
import userService from "~/services/userService";

export const useUsersStore = defineStore("users", () => {
  const client = useSupabaseClient<Database>();
  let realtimeChannel: RealtimeChannel;
  const users: Ref<User[] | null> = ref([]);

  const toastsStore = useToastsStore();

  const { showErrorToast } = toastsStore;

  const fetchUsers = async () => {
    const { data, error } = await userService.fetchUsers();
    if (error) {
      throw error;
    } else {
      users.value = data;
    }
  };

  const subscribeToUpdates = () => {
    realtimeChannel = client
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users" },
        () => fetchUsers()
      );
    realtimeChannel.subscribe();
  };

  const unsubscribeFromUpdates = () => {
    client.removeChannel(realtimeChannel);
  };

  const addUser = async (values: User) => {
    const initialValues = {
      date: new Date(),
      cart: [],
      user_id: uuidv4(),
    };
    const formValues: UserInput = {
      ...initialValues,
      ...values,
    };
    delete formValues.password;

    const error = await userService.addUser(formValues);
    if (error) {
      const { toast, message } = toastHandler("registration-failed");
      showErrorToast(toast, message);
    }
  };

  return {
    users,
    fetchUsers,
    addUser,
    subscribeToUpdates,
    unsubscribeFromUpdates,
  };
});
