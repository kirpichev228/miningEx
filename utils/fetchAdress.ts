import type { Database } from "~/types/database.types";

let message = {};

const fetchAdress = async () => {
  const client = useSupabaseClient<Database>();

  const { data: users, error } = await client
    .from("users")
    .select("email")
    .eq("subscribed", false);
  if (error) {
    throw error;
  } else {
    message = users?.map((email) => {
      const item = {};
      item.to = email;
      return item;
    });
  }
};

export { fetchAdress, message };
