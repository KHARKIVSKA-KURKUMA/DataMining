import styled from "styled-components";
import { GlobalStyle } from "./GlobalStyles";
import DataTable from "./components/DataTable/DataTable";

const Container = styled.div`
  background-color: antiquewhite;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

function App() {
  return (
    <Container>
      <GlobalStyle />
      <DataTable />
    </Container>
  );
}

export default App;
