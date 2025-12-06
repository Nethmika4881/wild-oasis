import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const useBookingUpdateMutation = function () {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const updateMutation = useMutation({
    mutationFn: ({ obj }) => updateBooking({ obj, id }),
    onSuccess: (data) => {
      toast.success(`Boooking #${data.id} - successfully checked-in`);
      //   queryClient.invalidateQueries({ queryKey: ["booking", id] });
      queryClient.invalidateQueries({ active: true });

      navigate("/bookings");
    },
    onError: (err) => {
      toast.error("Failed to update");
      console.error("❌ Failed to update booking:", err.message);
    },
  });

  return updateMutation;
};

export default useBookingUpdateMutation;
