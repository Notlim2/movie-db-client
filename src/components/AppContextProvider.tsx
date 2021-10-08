import React, { useState } from "react";
import AppContext from "../contexts/AppContext";

const AppContextProvider: React.FC = ({ children }) => {
  const [modalContent, setModalContent] = useState<JSX.Element | undefined>(
    undefined
  );
  const [showModal, setShowModal] = useState(false);

  return (
    <AppContext.Provider
      value={{ modalContent, setModalContent, showModal, setShowModal }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
