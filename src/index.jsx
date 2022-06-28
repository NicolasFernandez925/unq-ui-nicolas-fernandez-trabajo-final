import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { GameProvider } from "context/Game";
import { ModalProvider } from "context/Modal";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GameProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </GameProvider>
    </BrowserRouter>
  </React.StrictMode>
);
