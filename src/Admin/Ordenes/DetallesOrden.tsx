import React, { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import flecha from "../../assets/arrow-back.svg";
import { cancelarOrden, getOrden, marcarEnviado } from "./Peticiones";
import { AppContext } from "../../Context/AppContext";
import { Direccion } from "../../models/Direccion";
interface Orden {
  Productos: any[];
  Direccion: Direccion;
  Total: number;
  Usuario: {
    Correo: string;
    Nombre: string;
  };
}
export const DetallesOrden = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [orden, setOrden] = useState<Orden>({} as Orden);
  const contexto = useContext(AppContext);
  useEffect(() => {
    getOrden(contexto.user.Token, id || "1").then((data) => {
      setOrden(data);
    });
  }, [id]);
  return (
    <div className="min-h-screen">
      <div className="p-2 absolute z-10">
        <NavLink
          to={"/admin/Ordenes"}
          className="bg-black  p-2 font-semibold w-10 h-10 flex items-center rounded-full"
        >
          <img alt="regresar" src={flecha} className="h-10 w-10" />
        </NavLink>
      </div>
      <h1 className="mt-20 text-center text-gray-900 font-semibold">Detalles de orden {id}</h1>
      
    <div className="w-full flex justify-between mt-10 md:justify-end mb-20">
      <button className="mr-4 text-green-600" onClick={async ()=>{ marcarEnviado(contexto.user.Token, id || ""); contexto.setBandera(!contexto.bandera); navigate(-1);}}>Marcar como enviado</button>
      <button className="mr-4 text-red-500" onClick={async()=>{ cancelarOrden(contexto.user.Token, id || ""); contexto.setBandera(!contexto.bandera); navigate(-1);}}>Cancelar Pedido</button>
    </div>

      <div className="flex flex-wrap flex-row">
      <div className="w-full md:w-1/2 flex flex-wrap justify-around mt-20">
        {orden.Productos &&
          orden.Productos.map((producto: any) => {
            return (
              <div
                className="bg-white border-2 p-2 m-2 rounded-md w-full md:w-1/4 h-60"
                key={`orden-producto-${producto.Id}`}
              >
                <img src={producto.URLImagen} alt="producto" className="object-contain h-40 m-auto"/>
                <div className="flex justify-between">
                  <h2 className="font-semibold text-gray-900">{producto.Titulo}</h2>
                  <h2 className="font-semibold text-gray-400">{producto.PrecioVenta}</h2>
                </div>
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-600">Cantidad:</h3>
                  <h3 className="font-medium text-gray-600">{producto.Cantidad}</h3>
                </div>
              </div>
            );
          })}
      </div>
  
        <div className="w-full md:w-1/2  flex flex-col flex-wrap md:flex-row justify-around items-center self-center">
        <div className="bg-gray-900   rounded-md w-1/2 md:w-5/12 h-16 flex flex-col justify-center items-center">
            <h2 className="font-semibold text-gray-300">Total</h2>
            <h2 className="font-semibold text-gray-300">$ {orden.Total || 0}</h2>
          </div>
          <div className="bg-gray-900   rounded-md w-1/2 md:w-5/12 h-16 flex flex-col justify-center items-center mt-2">
            <h2 className="font-semibold text-gray-300 ">Correo:</h2>
            <h2 className="font-semibold text-gray-300">{orden.Usuario?.Correo || ""}</h2>
          </div>
          <div className="bg-gray-900   rounded-md w-1/2 md:w-5/12 h-16 flex flex-col justify-center items-center mt-2">
            <h2 className="font-semibold text-gray-300">Nombre:</h2>
            <h2 className="font-semibold text-gray-300">{orden.Usuario?.Nombre || ""}</h2>
          </div>

          <div className="bg-gray-900   rounded-md w-1/2 md:w-5/12 h-16 flex flex-col justify-center items-center mt-2">
            <h2 className="font-semibold text-gray-300">Calle:</h2>
            <h2 className="font-semibold text-gray-300">{orden.Direccion?.Calle || ""}</h2>
          </div>
          <div className="bg-gray-900   rounded-md w-1/2 md:w-5/12 h-16 flex flex-col justify-center items-center mt-2">
            <h2 className="font-semibold text-gray-300">Codigo Postal:</h2>
            <h2 className="font-semibold text-gray-300">{orden.Direccion?.CodigoPostal || ""}</h2>
          </div>
          <div className="bg-gray-900   rounded-md w-1/2 md:w-5/12 h-16 flex flex-col justify-center items-center mt-2">
            <h2 className="font-semibold text-gray-300">Ciudad:</h2>
            <h2 className="font-semibold text-gray-300">{orden.Direccion?.Ciudad || ""}</h2>
          </div>
          <div className="bg-gray-900   rounded-md w-1/2 md:w-5/12 h-16 flex flex-col justify-center items-center mt-2">
            <h2 className="font-semibold text-gray-300">Estado:</h2>
            <h2 className="font-semibold text-gray-300">{orden.Direccion?.Estado || ""}</h2>
          </div>
          <div className="bg-gray-900   rounded-md w-1/2 md:w-5/12 h-16 flex flex-col justify-center items-center mt-2">
            <h2 className="font-semibold text-gray-300">Referencia:</h2>
            <h2 className="font-semibold text-gray-300">{orden.Direccion?.Referencias || ""}</h2>
          </div>
        </div>


        </div>

    </div>
  );
};
