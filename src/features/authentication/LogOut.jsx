import { ArrowRightSquare } from "lucide-react";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function LogOut() {
  const logoutMutation = useLogout();
  const isLogoutUnderProccess = logoutMutation.isPending;

  return (
    <ButtonIcon
      disabled={isLogoutUnderProccess}
      onClick={() => logoutMutation.mutate()}
    >
      {!isLogoutUnderProccess ? <ArrowRightSquare /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default LogOut;
