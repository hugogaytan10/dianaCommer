import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { getOrdenes } from "./Peticiones";
import { useNavigate } from "react-router-dom";

export const CardOrden = () => {
    const navigate = useNavigate();
  const [ordenes, setOrdenes] = useState([]);
  const contexto = useContext(AppContext);
  useEffect(() => {
    getOrdenes(contexto.user.Token).then((data) => {
      setOrdenes(data);
    });
  }, [contexto.bandera]);
  return (
    <div className="w-full flex flex-wrap justify-around" >
      {ordenes.map((orden: any) => (
          orden.Estado === "ORDENADO" &&
          <div
          key={`orden-${orden.Id}`}
          className="w-full md:w-1/4 bg-white m-2 p-2 rounded-lg border-2"
          onClick={()=>{navigate(`/admin/Ordenes/${orden.Id}`)}}
        >
          <h1 className="text-center text-xl text-gray-800">Orden {orden.Id}</h1>
          <p className="text-gray-500 text-sm">Fecha: {orden.FechaOrden}</p>
          <p className="text-gray-400 text-sm">Estado: {orden.Estado}</p>
          <p className="text-gray-700">Total: <span className="text-indigo-800 font-bold">{orden.Total}</span></p>
        </div>
      ))}
    </div>
  );
};
