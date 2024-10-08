import React, { useState } from "react";
import lupa from "../assets/search.svg";
import "./HeaderAdmin.css";

type HeaderAdminProps = {
  productosFiltrados: any[]; // Replace 'any' with the actual type of 'productosFiltrados'
  productos: any[]; // Replace 'any' with the actual type of 'productos'
  setProductosFiltrados: (productos: any[]) => void; // Replace 'any' with the actual type of 'productos'
};

export const HeaderAdmin = ({
  productosFiltrados,
  productos,
  setProductosFiltrados,
}: HeaderAdminProps) => {
  const [showInput, setShowInput] = useState(false);
  const [searchText, setSearchText] = useState("");


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    console.log(event.target.value);
    //vamos a iterar sobre los productos y vamos a filtrar los que contengan el texto que estamos buscando
    const filtro = productos.filter((producto) =>
      producto.Titulo.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setProductosFiltrados(filtro);
  };

  return (
    <div className="flex w-full justify-end gap-2 mt-4 sticky top-0">
      <button 
      className="bg-primary px-4 rounded-md text-white"
      onClick={() => {
        (document.getElementById("modal_carrusel") as HTMLDialogElement)?.showModal?.();
      }}
      >Carrusel</button>
      <button
        className= "h-8 w-8 rounded-full bg-primary border-primary border-2 cursor-pointer flex items-center justify-center"
        onClick={() =>
          (
            document.getElementById("modal_agregar") as HTMLDialogElement
          )?.showModal?.()
        }
        tabIndex={0}
      >
        <p className="text-2xl text-gray-200">+</p>
      </button>
      <div className="relative flex items-center">
        <img
          src={lupa}
          alt="Buscar"
          className="z-10 h-8 w-8 rounded-full bg-white border-primary border-2 cursor-pointer flex items-center justify-center"
          onClick={(e)=>{setShowInput(!showInput)}}
        />
        <input
          type="text"
          className={`search-input ${showInput ? "expanded" : "collapsed"}`}
          placeholder="Buscar..."
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};
