import "./App.css";
import Banner from "./components/MovieModal/Banner";
import Nav from "./components/MovieModal/Nav";
import styled from "styled-components";

function App() {
  return (
    <Container>
      <Nav></Nav>
      <Banner />
    </Container>
  );
}

const Container = styled.main`
  position: relative;
  display: block;
  top: 70px;
  padding: 0 calc(3.5vw + 5px);
`;

export default App;
