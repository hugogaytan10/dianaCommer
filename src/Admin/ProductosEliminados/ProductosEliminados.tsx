import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { getProductosEliminados, reactivarProducto } from "./Peticiones";
interface Producto {
    Id: number;
    Titulo: string;
    Descripcion: string;
    PrecioAdquisicion: number;
    PrecioVenta: number;
    Stock: number;
    Descuento: number;
    ListaTallas: string[];
    URLImagen: string;
    ImagenesCarrusel: string[];
    SubcategoriaId: number;
    Subcategoria: string;
}
export const ProductosEliminados = () => {
  const [productosEliminados, setProductosEliminados] = useState<Producto[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [actualizar, setActualizar] = useState(false);

  const contexto = useContext(AppContext);
  useEffect(() => {
    getProductosEliminados(contexto.user.Token).then((data) => {
      setProductosEliminados(data);
      setLoaded(true);
    });
  }, [actualizar]);
  return (
    <div className="w-11/12 flex flex-wrap justify-between p-2 items-center m-auto relative ">
      {
      productosEliminados.length > 0 &&
      productosEliminados.map((producto, idx) => {
        return (
          <div
            key={`producto-${producto.Id}`}
            className={`contenedor-card border-b-2  rounded-md ${
              producto.Id % 2 === 0 ? "mt-8" : "mt-0"
            }`}
          >
            <div>
              <div className="card">
                <figure className="h-3/4">
                  <img
                    src={producto.URLImagen}
                    alt="Shoes"
                    className="object-contain h-full w-full"
                    onLoad={() => setLoaded(true)}
                    style={{ display: loaded ? "block" : "none" }}
                  />
                  {!loaded && (
                    <div className="flex flex-col gap-4 w-52">
                      <div className="skeleton h-32 w-full"></div>
                      <div className="skeleton h-4 w-28"></div>
                      <div className="skeleton h-4 w-full"></div>
                      <div className="skeleton h-4 w-full"></div>
                    </div>
                  )}
                </figure>
                <div className="card-body p-1">
                  <div className="card-actions flex justify-between items-end w-full mt-2 ">
                    <h2 className="text-black text-md md:text-md font-semibold flex justify-between mt-1">
                      {producto.Titulo}
                    </h2>
                   <button className="text-indigo-900 underline"
                   onClick={() => {reactivarProducto(contexto.user.Token, producto.Id).then(() => setActualizar(!actualizar))}}
                   >Reactivar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
