import { useEffect } from "react";

export const useBeforeUnload = (
  realizoJugadaJugadorDos = "",
  realizoJugadaJugadorUno = ""
) => {
  useEffect(() => {
    const beforeUnloadListener = (event) => {
      event.preventDefault();
      return (event.returnValue = "Are you sure you want to exit?");
    };

    window.addEventListener("beforeunload", beforeUnloadListener);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadListener);
    };
  }, [realizoJugadaJugadorDos, realizoJugadaJugadorUno]);
};
