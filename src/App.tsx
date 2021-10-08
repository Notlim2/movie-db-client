import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import "pure-react-carousel/dist/react-carousel.es.css";
import ModalContainer from "./components/ModalContainer";
import AppContextProvider from "./components/AppContextProvider";

const AppContainer = styled.div`
  overflow-x: hidden;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
`;

const App: React.FC = () => {
  return (
    <Router>
      <AppContextProvider>
        <AppContainer>
          <Header />
          <Content>
            <Routes />
          </Content>

          <ModalContainer />
        </AppContainer>
      </AppContextProvider>
    </Router>
  );
};

export default App;
