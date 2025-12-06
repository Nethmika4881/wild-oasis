import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useCheckoutMutation = function () {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const updateMutation = useMutation({
    mutationFn: ({ obj, id }) => updateBooking({ obj, id }),
    onSuccess: (data) => {
      toast.success(`Boooking #${data.id} - successfully checked-out`);
      //   queryClient.invalidateQueries({ queryKey: ["booking", id] });
      queryClient.invalidateQueries({ active: true });

      navigate("/bookings");
    },
    onError: (err) => {
      toast.error("Failed to checked out the guest");
      console.error("❌ Failed to checked out guest:", err.message);
    },
  });

  return updateMutation;
};

export default useCheckoutMutation;
