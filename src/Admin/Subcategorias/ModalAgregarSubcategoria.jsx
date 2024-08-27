import React, { useContext, useState, useEffect } from "react";
import { URL } from '../../Const/Const';
import { AppContext } from "../../Context/AppContext";

export const ModalAgregarSubcategoria = ({ actualizar, setActualizar }) => {
  const [nombre, setNombre] = useState("");
  const context = useContext(AppContext);

  const InsertarSubcategoria = async (e) => {
    e.preventDefault();
    const subcategoria = { Nombre: nombre };

    if (nombre !== "") {
      document.getElementById("modal_agregar_subcategoria").close();
      try {
        const url = `${URL}/subcategoria/agregar`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            mode: "cors",
            "Content-Type": "application/json",
            token: context.user.Token,
          },
          body: JSON.stringify(subcategoria),
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
    console.log('Entro a borrar el nombre');
    setNombre("");  // Limpia el estado de nombre
  };

  useEffect(() => {
    Reset();  // Resetea el nombre cuando el componente se monta
  }, []);

  return (
    <dialog id="modal_agregar_subcategoria" className="modal">
      <div className="modal-box w-11/12 bg-white">
        <h2 className="text-gray-800">Agregar Categoría</h2>
        <div className="modal-action block m-auto bg-white mt-10 transition-all text-gray-600">
          <form
            method="dialog w-full"
            onSubmit={(e) => InsertarSubcategoria(e)}
          >
            <div className="form-group">
              <input
                type="text"
                placeholder=" "
                id="nombreArticulo"
                name="nombreArticulo"
                className="bg-white"
                value={nombre}  // El valor del input está controlado por el estado
                onChange={(e) => setNombre(e.target.value)}
              />
              <label>Nombre del artículo</label>
            </div>
            <div className="flex w-full justify-around">
              <button
                type="button"  // Cambié a type="button" para evitar la sumisión del formulario al cancelar
                className="btn-cancelar border-none"
                onClick={() => {
                  document.getElementById("modal_agregar_subcategoria").close();
                  Reset();
                }}
              >
                Cancelar
              </button>
              <button type="submit" className="btn-siguiente">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};
