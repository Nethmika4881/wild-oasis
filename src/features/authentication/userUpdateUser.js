import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/auth";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: ({ fullName, password, avatar }) =>
      updateCurrentUser({ fullName, password, avatar }),
    onSuccess: (user) => {
      toast.success("user details successfully edited");
      queryClient.setQueryData("user", user);

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => {
      toast.error("Failed to edit user details");
      console.error("❌ Failed to edit user details:", err.message);
    },
  });
  return editMutation;
}

export default useUpdateUser;
