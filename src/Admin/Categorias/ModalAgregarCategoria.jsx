import React, { useContext, useState, useEffect } from "react";
import { URL } from '../../Const/Const'
import { AppContext } from "../../Context/AppContext";
import { getSubcategorias } from "./Peticiones";

export const ModalAgregarCategoria = ({ actualizar, setActualizar }) => {
  const [nombre, setNombre] = useState("");
  const [nombreSubcategoria, setNombreSubcategoria] = useState("");
  const [subcategorias, setSubcategorias] = useState([]);
  const [errorSubcategoria, setErrorSubcategoria] = useState(false);
  const context = useContext(AppContext);

  const InsertarCategoria = async (e) => {
    e.preventDefault();
    const categoria = {
      Category: {
        Nombre: nombre
      },
      Subcategories: [{
        Nombre: nombreSubcategoria,
      }]
    };
    if (
      nombre != ""
    ) {
      document.getElementById("modal_agregar_categoria").close();
      try {
        const url = `${URL}/categoria/agregar`;
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

  const handleSelectChange = (event) => {
    console.log(nombreSubcategoria)
    setNombreSubcategoria(event.target.value);
  };

  const Reset = () => {
    setNombre("");
  };

  useEffect(() => {
    getSubcategorias().then((data) => {
      setSubcategorias(data);
    });
  }, [actualizar]);

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

            <div className="form-group">
              <select
                className="bg-white"
                onChange={handleSelectChange}>
                <option className="text-gray-800" value="">Selecciona una Subcategoria</option>
                {subcategorias.map((subcategoria) => (
                  <option className="text-gray-800" key={subcategoria.Id} value={subcategoria.Nombre}>
                    {subcategoria.Nombre}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  if (document.getElementById("subcategoria").value === "" || document.getElementById("stock").value === "") {
                    setErrorSubcategoria(true);
                    return;
                  }
                  const nuevaSubcategoria = {
                    Subcategoria: document.getElementById("subcategoria").value,
                    Stock: document.getElementById("stock").value,
                  };
                  setSubcategorias([...subcategorias, nuevaSubcategoria]);
                  document.getElementById("subcategoria").value = "";
                  document.getElementById("stock").value = "";
                  setErrorSubcategoria(false);
                }}
                className="btn-siguiente h-12 text-primary border-none w-1/4"
              ></button>
            </div>

            <div className="form-group w-full flex flex-wrap items-end gap-2 mb-0">
              <div className="form-group w-1/4 mb-0">
                <input
                  type="number"
                  placeholder=" "
                  id="subcategoria"
                  name="subcategoria"
                  className="bg-white "
                />
                <label>Subcategoria</label>
              </div>
              <div className="form-group w-1/4 mb-0">
                <input
                  type="number"
                  placeholder=" "
                  id="stock"
                  name="stock"
                  className="bg-white"
                  onChange={(e) => {
                    setStock(e.target.value);
                  }}
                />
                <label>Stock</label>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (document.getElementById("subcategoria").value === "" || document.getElementById("stock").value === "") {
                    setErrorSubcategoria(true);
                    return;
                  }
                  const nuevaSubcategoria = {
                    Subcategoria: document.getElementById("subcategoria").value,
                    Stock: document.getElementById("stock").value,
                  };
                  setSubcategorias([...subcategorias, nuevaSubcategoria]);
                  document.getElementById("subcategoria").value = "";
                  document.getElementById("stock").value = "";
                  setErrorSubcategoria(false);
                }}
                className="btn-siguiente h-12 text-primary border-none w-1/4"
              >
                Agregar
              </button>
              {
                <p className="text-red-500  text-xs block w-full">
                  {errorSubcategoria ? "Debe agregar al menos una subcategoria" : ""}
                </p>
              }
            </div>
            <div className="flex flex-wrap">
              {subcategorias &&
                subcategorias.length > 0 &&
                subcategorias.map((subcategoria, index) => (
                  <div className="btn-subcategoria" key={`subcategoria-${subcategoria.Subcategoria}`}>
                    <p id={`subcategoria-${subcategoria}`}>{subcategoria.Subcategoria}</p>
                    <button
                      className="btn-eliminar-subcategoria"
                      onClick={() => {
                        setSubcategorias(subcategorias.filter((t) => t !== subcategoria));
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}
            </div>

            <div className="flex w-full justify-around">
              <button
                className="btn-cancelar border-none"
                onClick={() => {
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
