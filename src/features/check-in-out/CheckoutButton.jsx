import Button from "../../ui/Button";
import useCheckoutMutation from "../bookings/useCheckoutMutation";

function CheckoutButton({ bookingId }) {
  const checkoutMutation = useCheckoutMutation();
  const obj = { status: "checked-out" };
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkoutMutation.mutate({ bookingId, obj })}
      disabled={checkoutMutation.isPending}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
