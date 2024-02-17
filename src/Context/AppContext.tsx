import React, { useState, createContext, useMemo } from "react";
import { AppContextState } from "./EstadoContexto";

type Props = {
  children: React.ReactNode;
};
export const AppContext = createContext({} as AppContextState);

const AppProvider: React.FC<Props> = ({ children }) => {
 
  const [card, setCard] = useState({
    img:'',
    title:'',
    price: 0,
    description: '',
    tallas: [''],
  });
  const memoizedValue = useMemo(
    () => ({
      card: card,
      setCard: setCard,
    }),
    [card, setCard]
  );
  return (
    <AppContext.Provider value={memoizedValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
