import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import FormRow from "./../../ui/FormRow";
import useEditCabin from "./useEditCabin";
import useAddCabin from "./useAddCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editID, ...editValues } = cabinToEdit;
  const isAEditSession = Object.keys(cabinToEdit).length > 0;

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: isAEditSession ? editValues : {},
  });

  // Mutation for creating cabins
  const createMutation = useAddCabin();

  // Mutation for editing cabins
  const editMutation = useEditCabin();

  const isWorking = createMutation.isPending || editMutation.isPending;

  const onSubmit = function (data) {
    let imageFile = null;

    // Check if a new file was uploaded
    if (data.image && data.image instanceof FileList && data.image.length > 0) {
      imageFile = data.image[0];
    }

    if (isAEditSession) {
      // For editing
      // console.log(data, "editdata");
      // console.log(imageFile);
      // console.log(editValues.image);
      editMutation.mutate(
        {
          newCabin: { ...data, image: imageFile || editValues.image },
          id: editID,
        },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
    } else {
      // For creating - image is required
      createMutation.mutate({ ...data, image: imageFile });
    }
  };

  const onError = function (errors) {
    console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount should be less than or equal to the regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin Photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isAEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit" disabled={isWorking} variation="primary">
          {isAEditSession ? "Edit cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
