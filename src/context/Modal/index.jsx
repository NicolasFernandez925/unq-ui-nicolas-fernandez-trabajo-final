import ModalRules from "components/common/Modal/ModalRules";
import FinishedRound from "components/common/Modal/ModalFinishedRound";
import { MODAL_TYPES } from "constants";
import { createContext, useContext, useState } from "react";

const initalState = {
  showModal: () => {},
  hideModal: () => {},
  store: {},
};

const ModalContext = createContext(initalState);

const MODAL_COMPONENTS = {
  [MODAL_TYPES.RULES]: ModalRules,
  [MODAL_TYPES.FINISHED_ROUND]: FinishedRound,
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
