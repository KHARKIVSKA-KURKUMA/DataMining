import styled from "styled-components";

const StyledTable = styled.table`
  border: none;
  margin-top: 30px;
  width: 100%;
`;

const StyledHeaderRow = styled.tr`
  background: #aad9bb;
`;
const StyledHead = styled.th`
  padding: 15px;
  border: 1px solid black;
`;

const StyledBodyRow = styled.tr`
  background: #d5f0c1;
`;

const StyledCell = styled.td`
  border: 1px solid black;
  padding: 5px;
`;
export { StyledTable, StyledHeaderRow, StyledHead, StyledBodyRow, StyledCell };
