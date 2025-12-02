import { createCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useAddCabin() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (obj) => createCabin(obj),
    onSuccess: () => {
      toast.success("Cabin successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error("Failed to add cabin");
      console.error("❌ Failed to add cabin:", err.message);
    },
  });

  return createMutation;
}

export default useAddCabin;
