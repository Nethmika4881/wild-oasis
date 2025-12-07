import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success("Successfully logged out");
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("An error occured please try again");
    },
  });
  return logoutMutation;
}
