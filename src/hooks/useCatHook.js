import { useEffect, useState } from "react";
import { getCats } from "../helpers/getCats";

export const useGetGifs = (valorBusqueda) => {
  const [estado, setEstado] = useState({
    gifs: [],
    cargando: true,
  });

  useEffect(() => {
    setTimeout(
      () =>
        getCats(valorBusqueda).then((gifs) => {
          setEstado({
            gifs: gifs,
            cargando: false,
          });
        }),
      5
    );
  }, [valorBusqueda]);

  return estado;
};
