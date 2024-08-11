import React, { useEffect, useState, useContext } from "react";
import "./Categoria.css";
import trash from "../../assets/trash.svg";
import { ModalAgregarCategoria } from "./ModalAgregarCategoria";
import { ModalEditarCategoria } from "./ModalEditarCategoria";
import { URL } from "../../Const/Const";
import { getCategorias, eliminarCategoria } from "./Peticiones";
import { AppContext } from "../../Context/AppContext";
import { HeaderCategorias } from "./HeaderCategorias";

export const Categoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [idCategoria, setIdCategoria] = useState(0);
  const [nombre, setNombre] = useState("");
  const [actualizar, setActualizar] = useState(false);
  const context = useContext(AppContext);
  useEffect(() => {
    getCategorias().then((data) => {
      setCategorias(data);
      setCategoriasFiltradas(data);
    });
  }, [actualizar]);

  const handlerDelete = async (e) => {
    e.preventDefault();
    eliminarCategoria(idCategoria, context.user.Token).then((res) => {
      if (res.status === 200) {
        setActualizar(!actualizar);
        document.getElementById("modal_eliminar_categoria").close();
      }
    });
  };
  return (
    <div>
      <HeaderCategorias
        categorias={categorias}
        setCategoriasFiltradas={setCategoriasFiltradas}
        categoriasFiltradas={categoriasFiltradas}
      />
      <div
        className={`w-11/12 flex flex-wrap justify-between p-2 items-center m-auto`}
      >
        {categoriasFiltradas.map((categoria) => (
          <div
            className={`contenedor-card border-b-2 w-full md:w-7/12 h-20  mx-auto ${
              categoria.Id % 2 === 0 ? "mt-6" : "mt-6"
            }`}
            key={`producto-${categoria.Id}`}
          >
            <div className="card" id="a">
              <div className="card-body p-1">
                <div className="card-actions flex justify-between items-end w-full mt-2 ">
                  <h2
                    onClick={() => {
                      document
                        .getElementById("modal_editar_categoria")
                        .showModal();
                      setNombre(categoria.Nombre);
                      setIdCategoria(categoria.Id);
                    }}
                    className="text-black text-md md:text-lg font-semibold flex justify-between mt-1 w-3/5"
                  >
                    {categoria.Nombre}
                  </h2>
                  <div className="flex justify-between w-1/5">
                    <img
                      src={trash}
                      alt="trash"
                      className="h-6 w-6"
                      onClick={() => {
                        document
                          .getElementById("modal_eliminar_categoria")
                          .showModal();
                        setNombre(categoria.Nombre);
                        setIdCategoria(categoria.Id);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <ModalAgregarCategoria
          actualizar={actualizar}
          setActualizar={setActualizar}
        />

        <ModalEditarCategoria
          actualizar={actualizar}
          setActualizar={setActualizar}
          Id={idCategoria}
          nombre={nombre}
          setNombre={setNombre}
        />

        <dialog
          id="modal_eliminar_categoria"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box bg-white">
            <h3 className="font-bold text-lg text-primary text-center">
              Eliminar Categoria
            </h3>
            <p className="py-4 text-primary text-center">
              Deseas eliminar {nombre} ?
            </p>
            <div className="modal-action block w-full">
              <form
                method="dialog"
                onSubmit={(e) => {
                  handlerDelete(e);
                }}
              >
                {/*<img src={preview} alt="" className="h-40 m-auto" />*/}
                <div className="flex justify-center gap-4">
                  <button
                    type="submit"
                    className="w-1/3 border-2 p-2 border-red-500 rounded-lg text-red-500"
                  >
                    eliminar
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById("modal_eliminar_categoria")
                        .close()
                    }
                    className="w-1/3 border-2 p-2 border-red-500 rounded-lg text-white bg-red-500"
                  >
                    Cerrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};
