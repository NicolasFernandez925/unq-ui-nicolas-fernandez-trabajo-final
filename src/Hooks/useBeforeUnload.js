import { useEffect } from "react";

export const useBeforeUnload = (
  realizoJugadaJugadorDos = "",
  realizoJugadaJugadorUno = ""
) => {
  useEffect(() => {
    const beforeUnloadListener = (event) => {
      event.preventDefault();
      return (event.returnValue =
        "Perderás el progreso de la partida actual, ¿ Estás de acuerdo ?");
    };

    window.addEventListener("beforeunload", beforeUnloadListener);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadListener);
    };
  }, [realizoJugadaJugadorDos, realizoJugadaJugadorUno]);
};
