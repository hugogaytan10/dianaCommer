import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import flecha from "../assets/arrow-back.svg";
import { ItemDesktop } from "./itemDesktop";
import { ItemMobile } from "./ItemMobile";

export const Item = () => {
  const { id } = useParams(); // Obtener el ID del producto
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  const location = useLocation(); // Obtener información de la navegación
  const navigate = useNavigate(); // Navegar a otra ruta
  console.log("Estado recibido en Item:", location.state);

  // Obtener la ruta desde donde se navegó o establecer un valor predeterminado
  const fromSection = location.state?.fromSection || "/";

  // Manejar el redimensionamiento de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {/* Botón para regresar */}
      <div className="p-2 absolute z-10">
        <button
          onClick={() => {
            console.log("Navegando de regreso a:", fromSection); // Verifica que el valor sea correcto
            navigate(fromSection); // Navegar a la ruta previa
          }} // Navegar a la ruta previa
          className="bg-black p-2 font-semibold w-10 h-10 flex items-center rounded-full"
        >
          <img alt="regresar" src={flecha} className="h-10 w-10" />
        </button>
      </div>

      {/* Renderizado condicional según el tamaño de la pantalla */}
      {isLargeScreen ? <ItemDesktop id={id} /> : <ItemMobile id={id} />}
    </div>
  );
};
