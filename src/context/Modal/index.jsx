import CustomModal from "components/common/Modal";
import { createContext, useContext, useMemo, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalShow, setModalShow] = useState(false);

  const value = useMemo(() => {
    return {
      modalShow,
      setModalShow,
    };
  }, [modalShow, setModalShow]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      <CustomModal show={modalShow} onHide={() => setModalShow(false)} />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
