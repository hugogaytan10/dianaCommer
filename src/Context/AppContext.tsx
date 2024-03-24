import React, { useState, createContext, useMemo } from "react";
import { AppContextState } from "./EstadoContexto";
import { Card } from "../models/Card";

type Props = {
  children: React.ReactNode;
};
export const AppContext = createContext({} as AppContextState);

const AppProvider: React.FC<Props> = ({ children }) => {
 
  const [card, setCard] = useState<Card>({
    Titulo: "",
    Descripcion: "",
    PrecioAquisicion: 0,
    PrecioVenta: 0,
    Descuento: 0,
    Estado: "",
    Stock: 0,
    URLImagen: "",
    ImagenesCarrusel: [],
    ListaTallas: [],
  
  });
  const [cart, setCart] = useState(0);
  const memoizedValue = useMemo(
    () => ({
      card: card,
      setCard: setCard,
      cart: cart,
      setCart: setCart,
    }),
    [card, setCard, cart, setCart]
  );
  return (
    <AppContext.Provider value={memoizedValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
