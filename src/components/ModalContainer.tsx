import React, { useContext } from "react";
import styled from "styled-components";
import AppContext from "../contexts/AppContext";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";

const Modal = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 3;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  padding: 24px;
  display: flex;
  border-radius: 8px;
  background: var(--default-white);
  position: relative;
  height: 80vh;
  width: 80vw;
`;

const CloseButton = styled(Button)`
  background: transparent;
  position: absolute;
  top: 24px;
  right: 24px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.5s;

  :hover {
    background: rgba(255, 255, 255, 0.4);
    color: var(--default-black);
  }
`;

const ModalContainer: React.FC = () => {
  const { modalContent, showModal, setShowModal } = useContext(AppContext);

  return showModal ? (
    <Modal onClick={() => setShowModal(false)}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => setShowModal(false)}>
          <AiOutlineClose />
        </CloseButton>
        {modalContent}
      </ModalContent>
    </Modal>
  ) : (
    <></>
  );
};

export default ModalContainer;
