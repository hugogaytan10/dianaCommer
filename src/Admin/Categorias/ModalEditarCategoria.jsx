import React, { useContext, useEffect, useState } from "react";
import { URL } from "../../Const/Const";
import { AppContext } from "../../Context/AppContext";
import { getSubcategorias } from "./Peticiones";
export const ModalEditarCategoria = ({ actualizar, setActualizar, listaSubcategorias, setListaSubcategorias, Id, nombre, setNombre }) => {
  const context = useContext(AppContext);
  const [seEdito, setSeEdito] = useState(false);
  const [errorSubcategoria, setErrorSubcategoria] = useState(false);
  const [subcategorias, setSubcategorias] = useState([]);
  const [listaSubcategoriasID, setListaSubcategoriasID] = useState([
    { Id: 1 },
    { Id: 2 },
    { Id: 3 }
  ]);
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState("");

  const EditarCategoria = async (e) => {
    e.preventDefault();
    /////aun hay que modificar el back perrillo
    const categoria = {
      Category: {
        Nombre: nombre,
        Id: Id
      },
      Subcategories: listaSubcategoriasID
    };
    /*const categoria = {
      Nombre: nombre,
      Id: Id
    };*/
    //console.log(categoria);
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
  const handleSelectChange = (event) => {
    //console.log('esto es lo que quieres imprimir?', listaSubcategorias)
    setSubcategoriaSeleccionada(event.target.value);
    //setNombreSubcategoria(event.target.value);
  };

  const Reset = () => {
    setNombre("");

    setListaSubcategorias([]);
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

            <div className="form-group w-7/8 mb-0 flex items-center">
              <select
                className="bg-white w-2/3 mb-4"
                id="subcategoria"
                value={subcategoriaSeleccionada}
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
                      value={subcategoria.Nombre}
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

                  if (!selectedValue) {
                    setErrorSubcategoria(true);
                    return;
                  }

                  const nuevaSubcategoria = {
                    Nombre: selectedValue.Nombre,
                    Id: selectedValue.Id,
                  };
                  /*if (subcategoriaSeleccionada === "") {
                    //console.log('si neta?');
                    setErrorSubcategoria(true);
                    return;
                  }
                  //console.log('nadota')
                  const nuevaSubcategoria = {
                    Nombre: subcategoriaSeleccionada
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
