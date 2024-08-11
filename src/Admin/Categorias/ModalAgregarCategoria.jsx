import React, { useContext, useState } from "react";
import {URL} from '../../Const/Const'
import { AppContext } from "../../Context/AppContext";
export const ModalAgregarCategoria = ({actualizar, setActualizar}) => {
  const [nombre, setNombre] = useState("");
  const context = useContext(AppContext);
  const InsertarCategoria = async (e) => {
    e.preventDefault();
    const categoria = {
      Nombre: nombre
    };
    if (
      nombre != "" 
    ) {
      document.getElementById("modal_agregar_categoria").close();
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
          setActualizar(!actualizar);
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
    <dialog id="modal_agregar_categoria" className="modal">
      <div className="modal-box w-11/12  bg-white">
        <h2 className="text-gray-800">Agregar Categoría</h2>
        <div
          className={`modal-action block m-auto bg-white mt-10 transition-all  text-gray-600`}
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
                className="btn-cancelar border-none"
                onClick={() =>{
                  document.getElementById("modal_agregar_categoria").close();
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
