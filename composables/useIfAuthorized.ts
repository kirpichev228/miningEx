import type { Database } from "~/types/database.types";

export const useIfAuthorized = () => {
  const client = useSupabaseClient<Database>();
  const useIfAuthorized = async () => {
    const {
      data: { user },
    } = await client.auth.getUser();
    if (user) {
      return user.id;
    } else {
      return null;
    }
  };
  return {
    useIfAuthorized,
  };
};
