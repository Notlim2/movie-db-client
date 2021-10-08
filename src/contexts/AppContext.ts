import { createContext, Dispatch, SetStateAction } from "react";

interface IAppContext {
  setModalContent: Dispatch<SetStateAction<JSX.Element | undefined>>;
  modalContent?: JSX.Element;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
}

const AppContext = createContext({} as IAppContext);

export default AppContext;
