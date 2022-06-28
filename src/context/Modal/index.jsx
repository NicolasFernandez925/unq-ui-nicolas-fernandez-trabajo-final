import ModalRules from "components/common/Modal/ModalRules";
import { MODAL_TYPES } from "constants";
import { createContext, useContext, useState } from "react";
import ModalRounds from "components/common/Modal/ModalRounds";
import ModalEndOfTheGame from "components/common/Modal/ModaEndOfTheGame";

const initalState = {
  showModal: () => {},
  hideModal: () => {},
  store: {},
};

const ModalContext = createContext(initalState);

const MODAL_COMPONENTS = {
  [MODAL_TYPES.RULES]: ModalRules,
  [MODAL_TYPES.ROUNDS]: ModalRounds,
  [MODAL_TYPES.END_OF_THE_GAME]: ModalEndOfTheGame,
};

export const ModalProvider = ({ children }) => {
  const [store, setStore] = useState();
  const { modalType, modalProps } = store || {};

  const showModal = (modalType, modalProps = {}) => {
    setStore({
      ...store,
      modalType,
      modalProps,
    });
  };

  const hideModal = () => {
    setStore({
      ...store,
      modalType: null,
      modalProps: {},
    });
  };

  const renderComponent = () => {
    const ModalComponent = MODAL_COMPONENTS[modalType];
    if (!modalType || !ModalComponent) {
      return null;
    }
    return <ModalComponent id="global-modal" {...modalProps} />;
  };

  return (
    <ModalContext.Provider value={{ store, showModal, hideModal }}>
      {renderComponent()}
      {children}
    </ModalContext.Provider>
  );
};

export const useModalGlobal = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModalGlobal must be used within a ModalProvider");
  }
  return context;
};
