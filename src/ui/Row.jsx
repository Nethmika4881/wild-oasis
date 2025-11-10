// import styled, { css } from "styled-components";

// const Row = styled.div`
//   display: flex;
//   ${(props) =>
//     props.type === "horizontal" &&
//     css`
//       flex-direction: row;
//       justify-content: space-between;
//       align-items: center;
//     `};

//   ${(props) =>
//     props.type === "vertical" &&
//     css`
//       flex-direction: column;
//       gap: 1.6rem;
//     `};
// `;

// Row.defaultProps = {
//   type: "vertical",
// };
// export default Row;

import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.type === "horizontal" ? "row" : "column"};
  gap: 1.6rem;

  ${(props) =>
    props.type === "horizontal" &&
    `
    justify-content: space-between;
    align-items: center;
  `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
