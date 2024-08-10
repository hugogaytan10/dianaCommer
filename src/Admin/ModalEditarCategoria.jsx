import React, { useContext, useEffect } from "react";
import {URL} from '../Const/Const'
import { AppContext } from "../Context/AppContext";
export const ModalEditarCategoria = ({
  id,
  nombre,
  setNombre,
}) => {
  console.log({nombre})
  const context = useContext(AppContext);
  const EditarCategoria = async (e) => {
    e.preventDefault();
    const categoria = {
      Nombre: nombre
    };
    if (
      nombre != "" 
    ) {
      document.getElementById("modal_editar").close();
      try {
        const url =`${URL}/categoria/editar`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            mode: "cors",
            "Content-Type": "application/json",
            token: context.user.Token
          },
          body: JSON.stringify(categoria),
        });
        if (response.status === 200) {
          setCategorias([...categorias, categoria]);
          Reset();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  const Reset = () => {
    setNombre("");
  };
  return (
    <dialog id="modal_editar" className="modal">
      <div className="modal-box w-11/12 max-w-5xl bg-white">
        <div className="flex flex-wrap w-full justify-around">
          <div
            id="pasoUno"
            className={`mt-4 h-16 w-16 bg-indigo-800 text-white rounded-full flex items-center justify-center font-bold text-2xl`}
          >
            1
          </div>
        </div>
        <div
          className={`h-96 modal-action block m-auto bg-white mt-10 transition-all md:w-2/4 text-gray-600`}
          id="divPasoUno"
        >
          <form
            method="dialog w-full"
            onSubmit={(e) => {
              EditarCategoria(e);
            }}
          >

            <div className="form-group">
              <input
                type="text"
                placeholder={JSON.stringify(nombre)}
                id="nombreArticulo"
                name="nombreArticulo"
                className="bg-white"
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
              />
              <label>Nombre del artículo</label>
            </div>
            <div className="flex w-full justify-around">
              <button
                className="btn-cancelar"
                onClick={() =>{
                  document.getElementById("modal_editar").close();
                  Reset();
                }
                }
              >
                Cancelar
              </button>
              <button className="btn-siguiente">Editar</button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};
