import styled from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  border: none;
  font-family: "Raleway", sans-serif;
  font-size: 18px;
  th,
  td {
    font-family: "Manrope", sans-serif;
    border: 1px solid #000;
    padding: 8px;
    text-align: left;
  }
  td:first-of-type {
    font-weight: 700;
  }
`;
