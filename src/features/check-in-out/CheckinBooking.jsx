import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useGetBooking from "../bookings/useGetBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import useBookingUpdateMutation from "../bookings/useBookingUpdateMutation";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirm, setConfirm] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { booking, isLoading } = useGetBooking();
  const updateBookingMutation = useBookingUpdateMutation();
  const isCheckin = updateBookingMutation.isPending;

  const { settings, isLoadingSettings } = useSettings();

  useEffect(() => {
    setConfirm(booking?.isPaid ?? false);
  }, [setConfirm, booking]);
  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numOfGuests,
    hasBreakfast,
    numOfNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numOfGuests * numOfNights;
  console.log(settings, guests);
  function handleCheckin() {
    if (!confirm) return;
    if (addBreakfast) {
      updateBookingMutation.mutate({
        obj: {
          isPaid: true,
          status: "checked-in",
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
        },
      });
    } else {
      updateBookingMutation.mutate({
        obj: { isPaid: true, status: "checked-in" },
      });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((c) => !c);
              setConfirm(false);
            }}
          >
            Add Breakfast for {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirm}
          disabled={confirm || isCheckin}
          onChange={() => setConfirm((c) => !c)}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the full amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button disabled={!confirm || isCheckin} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
