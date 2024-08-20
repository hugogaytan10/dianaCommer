import React, { useState } from "react";
import lupa from "../../assets/search.svg";
import arrowBack from "../../assets/arrow-back.svg";
import subcategory from "../../assets/subcategory.svg";
import "./HeaderAdmin.css";
import { NavLink } from "react-router-dom";

type HeaderAdminProps = {
  subcategoriasFiltradas: any[]; // Replace 'any' with the actual type of 'productosFiltrados'
  subcategorias: any[]; // Replace 'any' with the actual type of 'productos'
  setSubcategoriasFiltradas: (productos: any[]) => void; // Replace 'any' with the actual type of 'productos'
};

export const HeaderSubcategorias = ({
  subcategoriasFiltradas,
  subcategorias,
  setSubcategoriasFiltradas
}: HeaderAdminProps) => {
  const [showInput, setShowInput] = useState(false);
  const [searchText, setSearchText] = useState("");


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    //vamos a iterar sobre los productos y vamos a filtrar los que contengan el texto que estamos buscando
    const filtro = subcategorias.filter((subcategoria) =>
      subcategoria.Nombre.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSubcategoriasFiltradas(filtro);
  };

  return (
    <div className="flex w-full justify-end gap-2 mt-4">
      <NavLink className="h-8 w-8 rounded-full bg-primary border-primary border-2 cursor-pointer flex items-center justify-center" 
      to="/admin/categorias">
         <img
          src={arrowBack}
          alt="Regresar a categorias"
          className="z-10 h-8 w-8 rounded-full bg-white border-primary border-2 cursor-pointer flex items-center justify-center"
        />
      </NavLink>

      <button
        className="h-8 w-8 rounded-full bg-primary border-primary border-2 cursor-pointer flex items-center justify-center"
        onClick={() =>
          (
            document.getElementById("modal_agregar_subcategoria") as HTMLDialogElement
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
          onClick={(e) => { setShowInput(!showInput) }}
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
