import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useGetBooking from "./useGetBooking";
import Spinner from "../../ui/Spinner";
import { Navigate, useNavigate } from "react-router-dom";
import useCheckoutMutation from "./useCheckoutMutation";
import useBookingDeleteMutation from "./useBookingDeleteMutation";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useGetBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const checkoutMutation = useCheckoutMutation();
  const deleteMutation = useBookingDeleteMutation();
  const isCheckoutUnderProcess = checkoutMutation.isPending;
  if (isLoading) return <Spinner />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const { id, status } = booking;
  function handleCheckout(id) {
    checkoutMutation.mutate({
      obj: { status: "checked-out" },
      id: Number(id),
    });
  }
  function handleDelete(id) {
    deleteMutation.mutate(Number(id));
  }
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "checked-in" && (
          <Button
            variation="primary"
            disabled={isCheckoutUnderProcess}
            onClick={() => handleCheckout(id)}
          >
            Check out
          </Button>
        )}

        {status === "unconfirmed" && (
          <Button
            variation="danger"
            disabled={deleteMutation.isPending}
            onClick={() => handleDelete(id)}
          >
            Delete
          </Button>
        )}
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/bookings`)}>Checkin</Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
