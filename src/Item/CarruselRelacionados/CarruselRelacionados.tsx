import React, { useState, useEffect } from "react";
import "./CarruselRelacionados.css";
import { useNavigate } from "react-router-dom";
interface Item {
  Id: number;
  Categoria: string;
  CategoriaId: number;
  Descripcion: string;
  Estado: string;
  ImagenesCarrusel: [];
  ListaTallas: [];
  PrecioAdquisicion: number;
  PrecioVenta: number;
  Titulo: string;
  URLImagen: string;
}
export const CarruselRelacionados = ({item}: {item: Item[]}) => {
    const navigate = useNavigate();
  return (
    <div className="container-products">
      { item.length > 0 &&
      item.map((item, index) => {
        return (
          <div
            key={index}
            className="shadow-md rounded-lg h-72 relative cursor-pointer product"
            onClick={() => navigate(`/item/${item.Id}`)}
          >
            <span className="absolute font-sans font-extrabold text-gray-700 px-1 text-xl text-shadow  rounded-md">
              {item.PrecioVenta}
            </span>

            <img
              src={item.URLImagen}
              className="rounded-tl-lg rounded-tr-lg h-2/3 w-full object-contain "
            />
            <div className="h-1/3 w-full flex flex-wrap content-center">
              <p className="text-marron font-sans text-center block w-full font-semibold text-gray-700">
                {item.Titulo}
              </p>
              <div className="block w-11/12 h-px bg-gray-200 m-auto shadow-2xl"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
