import React, { useContext, useEffect } from "react";
import {URL} from '../Const/Const'
import { AppContext } from "../Context/AppContext";
export const ModalAgregarCategoria = ({
  nombre,
  setNombre,
}) => {
  const context = useContext(AppContext);
  const InsertarCategoria = async (e) => {
    e.preventDefault();

    const categoria = {
      Nombre: nombre
    };
    if (
      nombre != "" 
    ) {
      document.getElementById("modal_agregar").close();
      try {
        const url =`${URL}/categoria/agregar`;
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
          setPaso(paso + 1);
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

 /* useEffect(() => {
    if (paso == 3) {
      Reset();
      setPaso(0);
    }
  }, [paso]);*/
  return (
    <dialog id="modal_agregar" className="modal">
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
              InsertarCategoria(e);
            }}
          >

            <div className="form-group">
              <input
                type="text"
                placeholder=" "
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
                  document.getElementById("modal_agregar").close();
                  Reset();
                }
                }
              >
                Cancelar
              </button>
              <button className="btn-siguiente">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};
