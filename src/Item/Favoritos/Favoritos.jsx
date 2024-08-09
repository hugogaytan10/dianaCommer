import React, { useContext, useState } from "react";
import favoritos from "../../assets/corazon.svg";
import { AppContext } from "../../Context/AppContext";
import favoritoRelleno from "../../assets/corazonRelleno.svg";
import { set } from "@cloudinary/url-gen/actions/variable";
export const Favoritos = ({ idProducto, showModal, setShowModal }) => {
  const context = useContext(AppContext);
  const [favorito, setFavorito] = useState(false);
  const agregarFavoritos = () => {
    //CHECAMOS QUE ESTE LOGUEADO PARA PODER AGREGAR A FAVORITOS
    if (!context.user.Correo) {
      setShowModal(true);
      return;
    } 
    if(!favorito){
      //peticion para guardar en la base de datos
      setFavorito(!favorito);
      const aviso = document.querySelector(".aviso");
      aviso.classList.add("mostrar");
      setTimeout(() => {
        aviso.classList.remove("mostrar");
      }, 1000);
      return;
    }
    //peticion para eliminar de la base de datos
    setFavorito(!favorito);
  };
  return (
    <div>
      {favorito ? (
        <img
          src={favoritoRelleno}
          alt="favoritos"
          className="w-6 h-6 hover:scale-110 cursor-pointer transition-all"
          onClick={agregarFavoritos}
        />
      ) : (
        <img
          src={favoritos}
          alt="favoritos"
          className="w-6 h-6 hover:scale-110 cursor-pointer transition-all"
          onClick={agregarFavoritos}
        />
      )}
      <div className="aviso">
        <div className="texto-aviso">
          <span>Agregado a favoritos</span>
        </div>
      </div>
    </div>
  );
};
