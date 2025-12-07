import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const signupMutation = useSignup();
  const isSignupUnderProccess = signupMutation.isPending;
  function onSubmitForm(data) {
    console.log(data);
    signupMutation.mutate(
      {
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      },
      {
        onSettled: () => reset(),
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmitForm)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          disabled={isSignupUnderProccess}
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
          autoComplete="name"
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          disabled={isSignupUnderProccess}
          type="email"
          id="email"
          autoComplete="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Provide a valid email",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          disabled={isSignupUnderProccess}
          type="password"
          id="password"
          autoComplete="new-password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          disabled={isSignupUnderProccess}
          type="password"
          id="passwordConfirm"
          autoComplete="new-password"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to be match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={reset}>
          Cancel
        </Button>
        <Button disabled={isSignupUnderProccess}>
          {isSignupUnderProccess ? <SpinnerMini /> : "Create a new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
