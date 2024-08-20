import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { deleteListaDeseos, getListaDeseos } from "./Peticiones";
import { NavLink, useNavigate } from "react-router-dom";
import flecha from "../assets/arrow-back.svg";
interface IFavorito {
  Id: number;
  Titulo: string;
  URLImagen: string;
  PrecioVenta: number;
  Descripcion: string;
  SubCategoria: string;
  Descuento: string;
  Estado: string;
  LineaId: number;
}
export const ListaDeseos = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [listaDeseos, setListaDeseos] = useState<IFavorito[]>([]);
  const [actualizar, setActualizar] = useState(false);
  useEffect(() => {
    const data = getListaDeseos(context.user.Id || 0, context.user.Token || "");
    data.then((res) => {
      setListaDeseos(res);
      //console.log(res);
    });
  }, [actualizar]);
  if (listaDeseos.length === 0) {
    return (
      <div className="h-screen">
        <NavLink
        to={'/perfil'}
        className="bg-black  p-2 font-semibold w-10 h-10 flex items-center rounded-full"
      >
        <img alt="regresar" src={flecha} className="h-10 w-10" />
      </NavLink>
        <div className="flex justify-center items-center h-full">
          <div className="w-3/4 border-2 rounded-lg md:w-1/2">
            <div className="card-body">
              <h1 className="text-lg text-center text-gray-800">
                No tienes productos en tu lista de deseos
              </h1>
              <NavLink to="/" className="btn bg-primary text-gray-200">
                Ver productos
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap contenedor-cart overflow-auto bg-white pb-20 min-h-screen">
      <NavLink
        to={"/perfil"}
        className="bg-black  p-2 font-semibold w-10 h-10 flex items-center rounded-full"
      >
        <img alt="regresar" src={flecha} className="h-10 w-10" />
      </NavLink>
      {listaDeseos.map((favorito, idx) => {
        return (
          <div
            key={`item-${favorito.Titulo}-${idx}`}
            className="w-11/12 h-40 p-2 flex flex-wrap justify-around carrito text-black overflow-hidden"
          >
            <NavLink to={`/item/${favorito.Id}`}>
              <img
                src={favorito.URLImagen}
                alt="favorito"
                className="h-20 w-20 rounded-sm object-cover self-center md:h-40 md:w-40"
              />
            </NavLink>
            <div className="w-1/4 flex flex-wrap justify-around items-center flex-col ">
              <p className="font-semibold">{favorito.Titulo}</p>
            </div>
            <div className="flex flex-col justify-around">
              <p className="text-xs">${favorito.PrecioVenta} MXN</p>
              <p
                className="text-red-500 "
                onClick={() => {
                  deleteListaDeseos(
                    context.user.Id!,
                    context.user.Token,
                    favorito.Id
                  ).then((res) => {
                    if (res) {
                      setActualizar(!actualizar);
                    }
                  });
                }}
              >
                Eliminar
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
