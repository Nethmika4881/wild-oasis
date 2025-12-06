import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (data) => {
      console.log(data, "data");
      queryClient.setQueryData(["user", data.user]);
      navigate("/dashboard", { replace: true }); //go to dashboard without keeping this login page in the browse history,user cant go back to this page
    },
    onError: (error) => {
      console.error("Error", error.message);
      toast.error("Provided email or password incorrect");
    },
  });

  return loginMutation;
}
