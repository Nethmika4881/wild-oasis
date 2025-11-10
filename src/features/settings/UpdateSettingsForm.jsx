import toast from "react-hot-toast";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import useUpdateSettings from "./useUpdateSettings";

export default function UpdateSettingsForm() {
  const { settings, error, isLoadingSettings } = useSettings();
  const updateSettingMutation = useUpdateSettings();
  const isUpdatingSetting = updateSettingMutation.isPending;
  const handleUpdate = (field, newValue, currentValue) => {
    const numValue = Number(newValue);

    // Don't update if value hasn't changed
    if (numValue === currentValue) return;

    if (isNaN(numValue) || numValue < 0) {
      toast.error("Please enter a valid positive number");
      return;
    }

    updateSettingMutation.mutate({ [field]: numValue });
  };

  if (isLoadingSettings) return <Spinner />;
  if (error) return <div>Error loading settings</div>;
  if (!settings) return null;

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdatingSetting}
          onBlur={(e) =>
            handleUpdate("minBookingLength", e.target.value, minBookingLength)
          }
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdatingSetting}
          onBlur={(e) =>
            handleUpdate("maxBookingLength", e.target.value, maxBookingLength)
          }
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdatingSetting}
          onBlur={(e) =>
            handleUpdate(
              "maxGuestsPerBooking",
              e.target.value,
              maxGuestsPerBooking
            )
          }
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdatingSetting}
          onBlur={(e) =>
            handleUpdate("breakfastPrice", e.target.value, breakfastPrice)
          }
        />
      </FormRow>
    </Form>
  );
}
