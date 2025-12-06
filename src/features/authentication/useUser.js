import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/auth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryFn: getCurrentUser,
    queryKey: ["user"],
  });

  console.log("user user", user);

  return {
    isLoading,
    user,
    isAuthenticated: user?.user.role === "authenticated",
  };
}
