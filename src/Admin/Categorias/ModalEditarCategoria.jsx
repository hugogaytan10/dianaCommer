import React, { useContext, useEffect, useState } from "react";
import { URL } from "../../Const/Const";
import { AppContext } from "../../Context/AppContext";
import { getSubcategorias } from "./Peticiones";
export const ModalEditarCategoria = ({ actualizar, setActualizar, listaSubcategorias, setListaSubcategorias, Id, nombre, setNombre }) => {
  //console.log('es lo mismo padrino?: ',listaSubcategorias)
  const context = useContext(AppContext);
  const [seEdito, setSeEdito] = useState(false);
  const [errorSubcategoria, setErrorSubcategoria] = useState(false);
  const [subcategorias, setSubcategorias] = useState([]);
  const [listaSubcategoriasID, setListaSubcategoriasID] = useState([]);
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState("");
  //const [subcategories, setSubcategories] = useState([]);

  const EditarCategoria = async (e) => {
    e.preventDefault();
    const subcategories = []

    console.log('puta perra lista: ', listaSubcategorias)
    listaSubcategorias.forEach(element => {
      const sb = {
        Id: element.Id
      };
      console.log('sbs', sb)
      subcategories.push(sb)
      // Usando la función de actualización para obtener el valor más reciente de 'subcategories'
      //setSubcategories([...subcategories, sb]);
    });
    console.log('lista de subcategorias linea 26', subcategories)
    if (subcategories.length === 0) {
      return
    }
    const categoria = {
      Category: {
        Nombre: nombre,
        Id: Id
      },
      Subcategories: subcategories
    };
    /*const categoria = {
      Nombre: nombre,
      Id: Id
    };*/
    //console.log(categoria);
    if (nombre != "") {
      console.log(categoria.Subcategories)
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
          Reset()
          //subcategories = [];
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const revisonListaItems = (id) => {
    console.log('miralo es horrible', id)

    // Remover la subcategoría de las listas
    const nuevasSubcategorias = listaSubcategorias.filter(
      (item) => item.Id != id

    );
    const nuevasSubcategoriasID = listaSubcategoriasID.filter(
      (ids) => ids != id
    );
    setListaSubcategorias(nuevasSubcategorias);
    setListaSubcategoriasID(nuevasSubcategoriasID);
  }

  /*const getSubcategoriasByCategoryId = async (Id) => {
    try {
      const url = `${URL}/subcategoria/conseguir/categoria/${Id}`;
      const response = await fetch(url);
      const data = await response.json();
      setListaSubcategorias(data)
      console.log('hola', data)
      console.log('hola', url)

      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };*/

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
    if (seEdito) {
      Reset();
      setSeEdito(false);
    }
  }, [nombre, seEdito]);

  useEffect(() => {
    //console.log('lista de subcategorias modal',listaSubcategorias)
    getSubcategorias().then((data) => {
      setSubcategorias(data);
    });
    //getSubcategoriasByCategoryId(Id);
    console.log('modal editar: ')
  }, []);
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
                      ),
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
                  /*const selectElement = document.getElementById("subcategoria");
                  const selectedValue = selectElement.value ? JSON.parse(selectElement.value) : 'hey';
                  console.log(selectedValue);
                  if (!selectedValue) {
                    setErrorSubcategoria(true);
                    return;
                  }*/
                  if (subcategoriaSeleccionada === "") {
                    setErrorSubcategoria(true);
                    return;
                  }
                  const nuevaSubcategoria = {
                    Nombre: JSON.parse(subcategoriaSeleccionada).Nombre,
                    Id: JSON.parse(subcategoriaSeleccionada).Id,
                  };
                  setListaSubcategorias([...listaSubcategorias, nuevaSubcategoria]);
                  setListaSubcategoriasID([...listaSubcategoriasID, nuevaSubcategoria.Id]);
                  document.getElementById("subcategoria").value = "";
                  setErrorSubcategoria(false);
                  setSubcategoriaSeleccionada();
                }}
              >
                Agregar
              </button>
            </div>

            <div className="flex flex-wrap">
              {listaSubcategorias.map((subcategoria, index) => (
                <div
                  key={subcategoria.Id}
                  className="btn-subcategoria"
                >
                  <p id='subcategoria'>{subcategoria.Nombre}</p>
                  <button
                    type="button"
                    className="btn-eliminar-subcategoria"
                    onClick={() => {
                      revisonListaItems(subcategoria.Id)
                    }}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>

            <div className="flex w-full justify-around mt-10">
              <button
                type="button"
                className="btn-cancelar border-none"
                onClick={() => {
                  const modal = document.getElementById("modal_editar_categoria");
                  if (modal) {
                    setListaSubcategorias([])
                    modal.close();
                  }
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
