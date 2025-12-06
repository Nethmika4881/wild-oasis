import { useMutation } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useBookingDeleteMutation = function () {
  const navigate = useNavigate();
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      toast.success(`Booking Successfully Deleted`);
      navigate("/bookings");
    },
    onError: (err) => {
      toast.error("Failed to delete");
      console.error("❌ Failed to delete booking:", err.message);
    },
  });
  return deleteMutation;
};

export default useBookingDeleteMutation;
