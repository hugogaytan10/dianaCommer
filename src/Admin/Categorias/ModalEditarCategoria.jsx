import React, { useContext, useEffect, useState } from "react";
import { URL } from "../../Const/Const";
import { AppContext } from "../../Context/AppContext";
import { getSubcategorias } from "./Peticiones";
export const ModalEditarCategoria = ({actualizar, setActualizar, Id, nombre, setNombre }) => {
  const context = useContext(AppContext);
  const [seEdito, setSeEdito] = useState(false);
  const [subcategorias, setSubcategorias] = useState([]);

  const EditarCategoria = async (e) => {
    e.preventDefault();
    const categoria = {
      Category: {
        Nombre: nombre
      },
      Subcategories: [{
        Nombre:nombreSubcategoria,
      }]
    };
    console.log(categoria);
    if (nombre != "") {
      document.getElementById("modal_editar_categoria").close();
      try {
        const url = `${URL}/categoria/actualizar`;
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            mode: "cors",
            "Content-Type": "application/json",
            token: context.user.Token,
          },
          body: JSON.stringify(categoria),
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

  useEffect(() => {
    getSubcategorias().then((data) => {
      setSubcategorias(data);
    });
  }, [actualizar]);

  return (
    <dialog id="modal_editar_categoria" className="modal">
      <div className="modal-box w-11/12  bg-white">
        <h2 className="text-gray-800">Editar Categoría</h2>
        <div
          className={`modal-action block m-auto bg-white mt-10 transition-all  text-gray-600`}
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

            <div className="form-group">
              <select
              className="bg-white">
                <option className="text-gray-800" value="">Selecciona una Subcategoria</option>
                {subcategorias.map((subcategoria) => (
                  <option className="text-gray-800" key={subcategoria.Id} value={subcategoria.Id}>
                    {subcategoria.Nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex w-full justify-around">
              <button
                className="btn-cancelar border-none"
                onClick={() => {
                  document.getElementById("modal_editar_categoria").close();
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
