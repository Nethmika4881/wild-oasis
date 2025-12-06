import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/auth";
import toast from "react-hot-toast";

export function useSignup() {
  const signupMutation = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signUp({ fullName, email, password }),
    onSuccess: () => {
      toast.success("successfully signup Please verify the email address");
    },

    onError: () => {
      toast.error("an Error occured");
    },
  });

  return signupMutation;
}
