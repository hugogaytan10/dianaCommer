import React, { useContext, useEffect, useState } from "react";
import { URL } from "../../Const/Const";
import { AppContext } from "../../Context/AppContext";
export const ModalEditarSubcategoria = ({actualizar, setActualizar, Id, nombre, setNombre }) => {
  const context = useContext(AppContext);
  const [seEdito, setSeEdito] = useState(false);
  const EditarSubcategoria = async (e) => {
    e.preventDefault();
    const subcategoria = {
      Id: Id,
      Nombre: nombre,
    };
    //console.log(subcategoria);
    if (nombre != "") {
      document.getElementById("modal_editar_subcategoria").close();
      try {
        const url = `${URL}/subcategoria/actualizar`;
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            mode: "cors",
            "Content-Type": "application/json",
            token: context.user.Token,
          },
          body: JSON.stringify(subcategoria),
        });
        if (response.status === 200) {
          setSeEdito(true);
          setActualizar(!actualizar);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  const Reset = () => {
    setNombre("");
  };
  useEffect(() => {
    if (seEdito) {
      Reset();
      setSeEdito(false);
    }
  }, [nombre, seEdito]);
  return (
    <dialog id="modal_editar_subcategoria" className="modal">
      <div className="modal-box w-11/12  bg-white">
        <h2 className="text-gray-800">Editar Categoría</h2>
        <div
          className={`modal-action block m-auto bg-white mt-10 transition-all  text-gray-600`}
        >
          <form
            method="dialog w-full"
            onSubmit={(e) => {
              EditarSubcategoria(e);
            }}
          >
            <div className="form-group">
              <input
                type="text"
                placeholder={nombre}
                id="nombreArticulo"
                name="nombreArticulo"
                className="bg-white"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
              />
              <label>Nombre del artículo</label>
            </div>
            <div className="flex w-full justify-around">
              <button
                className="btn-cancelar border-none"
                onClick={() => {
                  document.getElementById("modal_editar_subcategoria").close();
                  Reset();
                }}
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
