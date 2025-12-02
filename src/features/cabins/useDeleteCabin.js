import { deleteCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const deleteCabinMutation = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin Successfully deleted");
      // console.log("✅ Cabin Successfully deleted:", cabinID);
      // 🔄 Refetch all cabins to update UI
      // queryClient.invalidateQueries(["cabins"]);
      //after success set currect data to invalid and refetch
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error("Failed to delete cabin");
      console.error("❌ Failed to delete cabin:", err.message);
    },
  });
  return deleteCabinMutation;
}
