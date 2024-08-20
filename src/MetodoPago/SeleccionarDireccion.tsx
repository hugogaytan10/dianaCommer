import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import flecha from "../assets/arrow-back.svg";
import { AppContext } from "../Context/AppContext";
import { conseguirDireccionPorUsuario } from "./Peticiones";
interface Direccion {
  Id: number;
  Calle: string;
  Ciudad: string;
  CodigoPostal: string;
  Referencias: string;
  UsuarioId: number;
  Estado: string;
}
export const SeleccionarDireccion = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [direcciones, setDirecciones] = useState<Direccion[]>([]);


  const direccionClick = async(direccion: Direccion) => {
    context.setDireccion(direccion);
    navigate('/pago');
  }

  useEffect(() => {
    const direcciones = conseguirDireccionPorUsuario(
      context.user.Id + "" || "0"
    ).then((res) => {
      setDirecciones(res);
    });
  }, [context.bandera]);
  return (
    <div className="min-h-screen">
      <div className="bg-white p-2 flex items-center">
        <NavLink
          onClick={() => navigate(-1)}
          className="bg-black  p-2 font-semibold w-10 h-10 flex items-center rounded-full"
        >
          <img alt="regresar" src={flecha} className="h-10 w-10" />
        </NavLink>
        {direcciones.length > 0 && (
        <div className="w-full flex justify-end">
          <NavLink to="/guardarDireccion" className="text-gray-800 p-0 px-2 text-sm">
            Agregar dirección
          </NavLink>
        </div>
      )}
      </div>
      
      {direcciones.length == 0 ? (
        <div className="flex flex-wrap flex-col justify-center w-full">
          <div className="text-center">
            <p className="text-gray-500">No se han encontrado direcciones :c</p>
            <NavLink to="/guardarDireccion" className="btn text-gray-300 mt-4">
              Agregar dirección de envío
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="w-3/4 flex flex-wrap justify-center m-auto flex-col">
          {direcciones.map((direccion, idx) => {
            return (
              <button
              onClick={() => {direccionClick(direccion) }}
                className="w-full md:w-1/2 flex border-2 mt-2 items-center self-center justify-between p-2 rounded-md"
                key={`direccion-usuario-${context.user.Id}-${direccion.Id}`}
              >
                <div className="flex flex-col justify-start items-start">
                  <p className="text-gray-500">{direccion.Calle}</p>
                  <p className="text-gray-500">{direccion.Ciudad}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
