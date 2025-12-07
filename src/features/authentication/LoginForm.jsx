import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./uselogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    loginMutation.mutate(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit} type="regular">
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loginMutation.isPending}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loginMutation.isPending}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" variation="primary">
          {loginMutation.isPending ? (
            <span>
              <SpinnerMini />
            </span>
          ) : (
            "Log in"
          )}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
