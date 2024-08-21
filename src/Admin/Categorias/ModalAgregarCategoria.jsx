import React, { useContext, useState, useEffect } from "react";
import { URL } from '../../Const/Const'
import { AppContext } from "../../Context/AppContext";
import { getSubcategorias } from "./Peticiones";

export const ModalAgregarCategoria = ({ actualizar, setActualizar, listaSubcategorias, setListaSubcategorias }) => {
  const [nombre, setNombre] = useState("");
  //const [nombreSubcategoria, setNombreSubcategoria] = useState("");
  const [subcategorias, setSubcategorias] = useState([]);
  const [listaSubcategoriasID, setListaSubcategoriasID] = useState([]);
  const [errorSubcategoria, setErrorSubcategoria] = useState(false);
  const context = useContext(AppContext);
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState("");

  const InsertarCategoria = async (e) => {
    e.preventDefault();
    const subcategories = []
    listaSubcategoriasID.forEach(element => {
      const sb={
        Id:element
      }
      subcategories.push(sb);
    });
    const categoria = {
      Category: {
        Nombre: nombre
      },
      Subcategories: subcategories
    };
    if (subcategories.length===0) {
      return
    }
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
    //console.log('esto es lo que quieres imprimir?', listaSubcategorias)
    setSubcategoriaSeleccionada(event.target.value);
    //setNombreSubcategoria(event.target.value);
  };

  const Reset = () => {
    setNombre("");
    document.getElementById("nombreArticulo").value = "";
    setListaSubcategorias([]);
    setListaSubcategoriasID([]);
  };

  useEffect(() => {
    getSubcategorias().then((data) => {
      setSubcategorias(data);
    });
    console.log("hey: ", subcategorias)
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

            <div className="form-group w-7/8 mb-0 flex items-center">
              <select
                className="bg-white w-2/3 mb-4"
                id="subcategoria"
                onChange={handleSelectChange}>
                <option className="text-gray-800" value="">Selecciona una Subcategoria</option>
                {subcategorias
                  .filter(
                    (subcategoria) =>
                      !listaSubcategorias.some(
                        (item) => item.Nombre === subcategoria.Nombre
                      )
                  )
                  .map((subcategoria) => (
                    <option
                      className="text-gray-800"
                      key={subcategoria.Id}
                      value={JSON.stringify({ Id: subcategoria.Id, Nombre: subcategoria.Nombre })}
                    >
                      {subcategoria.Nombre}
                    </option>
                  ))}
              </select>
              <button
                className="btn-siguiente h-12 text-primary border-none w-1/3 mb-4 ml-2"
                type="button"
                onClick={() => {
                  const selectElement = document.getElementById("subcategoria");
                  const selectedValue = selectElement.value ? JSON.parse(selectElement.value) : null;
                  console.log(selectedValue)
                  if (!selectedValue) {
                    setErrorSubcategoria(true);
                    return;
                  }

                  const nuevaSubcategoria = {
                    Nombre: selectedValue.Nombre,
                    Id: selectedValue.Id,
                  };
                  /*if (document.getElementById("subcategoria").value === "") {
                    setErrorSubcategoria(true);
                    return;
                  }
                  const nuevaSubcategoria = {
                    Nombre: document.getElementById("subcategoria").value,
                    Id: 
                  };*/
                  setListaSubcategorias([...listaSubcategorias, nuevaSubcategoria]);
                  setListaSubcategoriasID([...listaSubcategoriasID, nuevaSubcategoria.Id]);
                  document.getElementById("subcategoria").value = "";
                  setErrorSubcategoria(false);
                }}
              >
                Agregar
              </button>
            </div>

            <div className="flex flex-wrap">
              {listaSubcategorias &&
                listaSubcategorias.length > 0 &&
                listaSubcategorias.map((subcategoria, index) => (
                  <div className="btn-subcategoria" key={`subcategoria-${subcategoria.id}`}>
                    <p id='subcategoria'/*{`subcategoria-${subcategoria.id}`}*/>{subcategoria.Nombre}</p>
                    <button
                      className="btn-eliminar-subcategoria"
                      onClick={() => {
                        setListaSubcategorias(listaSubcategorias.filter((s) => s !== subcategoria));
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
              <button className="btn-siguiente">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};
