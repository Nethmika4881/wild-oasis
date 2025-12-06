import { Loader } from "lucide-react";
import styled, { keyframes } from "styled-components";
const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerMini = styled(Loader)`
  width: 1.8rem;
  height: 1.8rem;
  animation: ${rotate} 1.5s infinite linear;
`;

export default SpinnerMini;
