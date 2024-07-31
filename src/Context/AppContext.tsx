import React, { useState, createContext, useMemo } from "react";
import { AppContextState } from "./EstadoContexto";
import { Card } from "../models/Card";
import { User } from "../models/User";

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
  const [user, setUser] = useState<User>({
    Id: 0,
    Email: "",
    Password: "",
    User: "",
    Type: 0,
  });

   // Método para iniciar sesión
   const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Guardar el usuario en el almacenamiento local
  };

  // Método para cerrar sesión
  const logout = () => {
    setUser({
      Id: 0,
      Email: "",
      Password: "",
      User: "",
      Type: 0,
    });
    localStorage.removeItem("user");
  };

  
  const memoizedValue = useMemo(
    () => ({
      card: card,
      setCard: setCard,
      cart: cart,
      setCart: setCart,
      user: user,
      setUser: setUser,
    }),
    [card, setCard, cart, setCart, user, setUser]
  );
  return (
    <AppContext.Provider value={memoizedValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
