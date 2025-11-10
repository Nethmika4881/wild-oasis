import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: ({ newCabin, id }) => editCabin({ newCabin, id }),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error("Failed to edit cabin");
      console.error("❌ Failed to edit cabin:", err.message);
    },
  });
  return editMutation;
}

export default useEditCabin;
