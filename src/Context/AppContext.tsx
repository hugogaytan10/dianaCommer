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
    Apellido: "",
    Correo: "",
    Contrasenia: "",
    EstadoUsuario: "",
    Id: 0,
    Nombre: "",
    TipoUsuario: "",
  });

  // Método para iniciar sesión
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Guardar el usuario en el almacenamiento local
  };

  // Método para cerrar sesión
  const logout = () => {
    setUser({
      Apellido: "",
      Correo: "",
      Contrasenia: "",
      EstadoUsuario: "",
      Id: 0,
      Nombre: "",
      TipoUsuario: "",
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
