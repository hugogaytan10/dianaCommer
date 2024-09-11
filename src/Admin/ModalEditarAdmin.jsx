import React, { useContext, useState } from "react";
import { URL } from "../Const/Const";
import { NavLink } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { set } from "@cloudinary/url-gen/actions/variable";
export const ModalEditarAdmin = ({
  paso,
  setPaso,
  image,
  idProducto,
  nombre,
  setNombre,
  descripcion,
  setDescripcion,
  tallas,
  setTallas,
  precioAdquisicion,
  setPrecioAdquisicion,
  precioVenta,
  setPrecioVenta,
  stock,
  setStock,
  descuento,
  setDescuento,
  preview,
  setPreview,
  banner,
  setBanner,
  banner2,
  setBanner2,
  banner3,
  setBanner3,
  productos,
  setProductos,
  subCategorias,
  subCategoriaSeleccionada,
  setSubCategoriaSeleccionada,
}) => {
  const context = useContext(AppContext);
  const [errorTitulo, setErrorTitulo] = useState(false);
  const [errorDescripcion, setErrorDescripcion] = useState(false);
  const [errorPrecioAdquisicion, setErrorPrecioAdquisicion] = useState(false);
  const [errorPrecioVenta, setErrorPrecioVenta] = useState(false);
  const [errorTalla, setErrorTalla] = useState(false);
  const handlerSubmitUno = (e) => {
    e.preventDefault();
    if (nombre === "") {
      setErrorTitulo(true);
    }
    if (descripcion === "") {
      setErrorDescripcion(true);
    }
    if (nombre != "" && descripcion != "") {
      setPaso((prevPaso) => prevPaso + 1);
    }
  };
  const handlerSubmitDos = (e) => {
    e.preventDefault();
    setPaso((prevPaso) => prevPaso + 1);
  };
  const handlerSubmitTres = (e) => {
    e.preventDefault();
    if (precioAdquisicion <= 0) {
      setErrorPrecioAdquisicion(true);
    }
    if (precioVenta <= 0) {
      setErrorPrecioVenta(true);
    }
    if (precioAdquisicion > 0 && precioVenta > 0) {
      setPaso((prevPaso) => prevPaso + 1);
    }
  };
  const handlerSubmitCuatro = async (e) => {
    e.preventDefault();
    if (tallas.length === 0) {
      setErrorTalla(true);
      return;
    }
    const producto = {
      Producto: {
        Id: idProducto,
        Titulo: nombre,
        Descripcion: descripcion,
        PrecioAdquisicion: precioAdquisicion,
        Descuento: descuento,
        PrecioVenta: precioVenta,
        URLImagen: preview || "",
        SubcategoriaId: subCategoriaSeleccionada.subcategoriaId || null,
      },
      ImgCarrusel: [banner || "", banner2 || "", banner3 || ""],
      Tallas: tallas,
    };
    try {
      const response = await fetch(`${URL}/producto/actualizar`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          token: context.user.Token,
        },
        body: JSON.stringify(producto),
      });

      if (response.status === 200) {
        document.getElementById("modal_editar").close();
        const newProductos = productos.map((p) => {
          if (p.Id === idProducto) {
            return { ...p, ...producto }; // Esto asume que tu servidor responde con el producto actualizado
          }
          return p;
        });
        setProductos(newProductos);
        ResetEditar();
      }
    } catch (error) {
      console.error("Error al actualizar producto", error);
    }
  };
  //reset update form
  const ResetEditar = () => {
    setPaso(0);
    setBanner(image);
    setBanner2(image);
    setBanner3(image);
    setPreview(image);
    setNombre("");
    setDescripcion("");
    setPrecioAdquisicion(0);
    setPrecioVenta(0);
    setStock(0);
    setDescuento(0);
    setTallas([]);
    setSubCategoriaSeleccionada("");
  };
  const SubirImagen = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "diana-fotos"); // Reemplaza 'tu_upload_preset' con tu propio upload preset
    formData.append("folder", "diana-fotos"); // Especifica el nombre de la carpeta donde quieres subir el archivo

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/ravekh/auto/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data) {
        return data.secure_url;
      }
      // Aquí puedes seguir procesando la respuesta, por ejemplo, guardar la URL de la imagen
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado
    if (file) {
      const url = await SubirImagen(file);
      setBanner(url);
    }
  };

  const handleFileChange2 = async (event) => {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado
    if (file) {
      const url = await SubirImagen(file);
      setBanner2(url);
    }
  };
  const handleFileChange3 = async (event) => {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado
    if (file) {
      const url = await SubirImagen(file);
      setBanner3(url);
    }
  };
  const handleFileChange4 = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = await SubirImagen(file);
      setPreview(url);
    }
  };

  return (
    <dialog id="modal_editar" className="modal">
      <div className="modal-box w-11/12 max-w-5xl bg-white">
        <div className="flex flex-wrap w-full justify-around">
          <div
            className={`mt-4 h-10 w-10 md:h-16 md:w-16 ${
              paso === 0 ? "bg-indigo-800" : "bg-primary"
            } text-white rounded-full flex items-center justify-center font-bold text-2xl`}
          >
            1
          </div>
          <div
            className={`mt-4 h-10 w-10 md:h-16 md:w-16 ${
              paso === 1 ? "bg-indigo-800" : "bg-primary"
            }  text-white rounded-full flex items-center justify-center font-bold text-2xl`}
          >
            2
          </div>
          <div
            className={`mt-4 h-10 w-10 md:h-16 md:w-16 ${
              paso === 2 ? "bg-indigo-800" : "bg-primary"
            }  text-white rounded-full flex items-center justify-center font-bold text-2xl`}
          >
            3
          </div>
          <div
            className={`mt-4 h-10 w-10 md:h-16 md:w-16 ${
              paso === 3 ? "bg-indigo-800" : "bg-primary"
            } text-white rounded-full flex items-center justify-center font-bold text-2xl`}
          >
            4
          </div>
        </div>

        <div
          className={`h-80 modal-action ${
            paso === 0 ? "block" : "hidden"
          } m-auto bg-white mt-10 transition-all md:w-3/4 text-gray-600`}
          id="divstepOneEdit"
        >
          <form
            method="dialog w-full"
            onSubmit={(e) => {
              handlerSubmitUno(e);
            }}
          >
            <div className="contenedor-img">
              <img src={preview} alt="" className="img-previa" />
              <input
                type="file"
                id="imagenTennis"
                name="imagenTennis"
                className=""
                onChange={(e) => {
                  handleFileChange4(e);
                }}
              />
              <label htmlFor="imagenTennis">+</label>
            </div>

            <div className={`${errorTitulo ? " mb-0" : "mb-4"} form-group `}>
              <input
                type="text"
                placeholder=" "
                id="nombreArticulo"
                name="nombreArticulo"
                className="bg-white"
                onChange={(e) => {
                  if (errorTitulo) {
                    setErrorTitulo(false);
                  }
                  setNombre(e.target.value);
                }}
                value={nombre}
              />
              <label>Nombre del artículo</label>
            </div>
            {errorTitulo && (
              <p className="text-red-500 mb-4 text-xs">
                El nombre del artículo es obligatorio
              </p>
            )}
            <div
              className={`${errorDescripcion ? " mb-0" : "mb-4"} form-group`}
            >
              <textarea
                type="text"
                placeholder=" "
                id="descripcion"
                name="descripcion"
                className="bg-white"
                onChange={(e) => {
                  if (errorDescripcion) {
                    setErrorDescripcion(false);
                  }
                  setDescripcion(e.target.value);
                }}
                value={descripcion}
              />
              <label>Descripción</label>
            </div>
            {errorDescripcion && (
              <p className="text-red-500 mb-4 text-xs">
                La descripción es obligatoria
              </p>
            )}
            <div className="flex w-full justify-around">
              <button
                className="btn-cancelar border-none"
                onClick={(e) => {
                  document.getElementById("modal_editar").close();
                  e.preventDefault();
                  ResetEditar();
                }}
              >
                Cancelar
              </button>
              <button className="btn-siguiente">Siguiente</button>
            </div>
          </form>
        </div>

        <div
          className={`h-80 md:w-3/4  modal-action ${
            paso === 1 ? "block" : "hidden"
          } m-auto bg-white mt-10 transition-all  text-gray-600`}
        >
          <form
            method="dialog w-full flex justify-around"
            onSubmit={(e) => {
              handlerSubmitDos(e);
            }}
          >
            <div className="flex flex-row flex-wrap w-full items-center justify-around mb-4">
              <label className="form-control w-full md:w-1/2 mb-2">
                <select
                  className="select select-bordered bg-white"
                  onChange={(e) => {
                    const selectedSubcategoria = subCategorias.find(
                      (subcategoria) => subcategoria.Id == e.target.value
                    );
                    setSubCategoriaSeleccionada({
                      subcategoriaId: selectedSubcategoria.Id,
                      subcategoriaNombre: selectedSubcategoria.Nombre,
                    });
                  }}
                  value={subCategoriaSeleccionada.subcategoriaId || ""}
                  defaultValue=""
                >
                  <option disabled value="">
                    {subCategoriaSeleccionada.subcategoriaNombre ||
                      `Selecciona una subcategoría`}
                  </option>
                  {subCategorias.map((subcategoria) => (
                    <option key={subcategoria.Id} value={subcategoria.Id}>
                      {subcategoria.Nombre}
                    </option>
                  ))}
                </select>
              </label>

              <NavLink
                to="/admin/categorias"
                className="text-gray-800 text-sm md:text-base mb-6"
              >
                Agregar subcategoría
              </NavLink>
            </div>

            <div className="flex w-full md:w-1/2 justify-around m-auto">
              <button
                className="btn-cancelar border-none"
                onClick={() => {
                  setPaso(-1);
                }}
              >
                Atrás
              </button>
              <button className="btn-siguiente">Siguiente</button>
            </div>
          </form>
        </div>

        <div
          className={`h-80 modal-action ${
            paso === 2 ? "block" : "hidden"
          } m-auto bg-white mt-10 transition-all md:w-3/4 text-gray-600`}
          id="divstepTwoEdit"
        >
          <form
            method="dialog w-full"
            onSubmit={(e) => {
              handlerSubmitTres(e);
            }}
          >
            {/* if there is a button, it will close the modal */}
            <div
              className={`${
                errorPrecioAdquisicion ? " mb-0" : "mb-4"
              } form-group`}
            >
              <input
                type="number"
                placeholder=" "
                id="precioAdquisicion"
                name="precioAdquisicionEditar"
                className="bg-white"
                onChange={(e) => {
                  if (errorPrecioAdquisicion) {
                    setErrorPrecioAdquisicion(false);
                  }
                  setPrecioAdquisicion(e.target.value);
                }}
                value={precioAdquisicion}
              />
              <label>Precio de Adquisición</label>
            </div>
            {errorPrecioAdquisicion && (
              <p className="text-red-500 mb-4 text-xs">
                El precio de adquisición es obligatorio
              </p>
            )}
            <div
              className={`${errorPrecioVenta ? " mb-0" : "mb-4"} form-group`}
            >
              <input
                type="number"
                placeholder=" "
                id="precioVenta"
                name="precioVenta"
                className="bg-white"
                onChange={(e) => {
                  if (errorPrecioVenta) {
                    setErrorPrecioVenta(false);
                  }
                  setPrecioVenta(e.target.value);
                }}
                value={precioVenta}
              />
              <label>Precio de Venta</label>
            </div>
            {errorPrecioVenta && (
              <p className="text-red-500 mb-4 text-xs">
                El precio de venta es obligatorio
              </p>
            )}

            <div className="form-group">
              <input
                type="number"
                placeholder=" "
                id="descuento"
                name="descuento"
                className="bg-white"
                onChange={(e) => {
                  setDescuento(e.target.value);
                }}
                value={descuento}
              />
              <label>Descuento</label>
            </div>
            <div className="flex w-full justify-around">
              <button
                type="button"
                className="btn-cancelar border-none"
                onClick={() => {
                  setPaso(paso - 1);
                }}
              >
                Atras
              </button>
              <button className="btn-siguiente">Siguiente</button>
            </div>
          </form>
        </div>

        <div
          className={`h-80 modal-action ${
            paso === 3 ? "block" : "hidden"
          } m-auto bg-white mt-10 transition-all md:w-3/4 text-gray-600`}
          id="divStepThreeEdit"
        >
          <form
            method="dialog w-full"
            onSubmit={(e) => {
              handlerSubmitCuatro(e);
            }}
          >
            {/* if there is a button, it will close the modal */}
            <div className="form-group w-full flex flex-wrap items-end gap-1 mb-0">
              <div className="form-group mb-0 w-1/4">
                <input
                  type="number"
                  placeholder=" "
                  id="tallaEditar"
                  name="tallaEditar"
                  className="bg-white "
                />
                <label>Talla</label>
              </div>

              <div className="form-group w-1/4 mb-0">
                <input
                  type="number"
                  placeholder=" "
                  id="stockEditar"
                  name="stockEditar"
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
                  if (document.getElementById("tallaEditar").value === "") {
                    setErrorTalla(true);
                    return;
                  }
                  const actualizarTalla = {
                    Talla: document.getElementById("tallaEditar").value,
                    Stock: document.getElementById("stockEditar").value,
                  };
                  setTallas([...tallas, actualizarTalla]);
                  document.getElementById("tallaEditar").value = "";
                  document.getElementById("stockEditar").value = "";
                  setErrorTalla(false);
                }}
                className="h-12 bg-white text-primary border-none w-1/4"
              >
                Agregar
              </button>
              {
                <p className="text-red-500  text-xs block w-full">
                  {errorTalla ? "Debe agregar al menos una talla" : ""}
                </p>
              }
            </div>
            <div className="flex flex-wrap">
              {tallas &&
                tallas.length > 0 &&
                tallas.map((talla, index) => (
                  <div
                    className="btn-talla"
                    key={`talla-${talla.Talla}-editar`}
                  >
                    <p id={`talla-${talla}-editar`}>{talla.Talla}</p>
                    <button
                      className="btn-eliminar-talla"
                      onClick={() => {
                        setTallas(tallas.filter((t) => t !== talla));
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}
            </div>

            <div className="flex flex-wrap">
              <div className="contenedor-img">
                <img src={banner} alt="" className="img-previa" />
                <input
                  type="file"
                  id="imagenProducto1"
                  name="imagenProducto1"
                  className=""
                  onChange={(e) => {
                    
                    handleFileChange(e);
                  }}
                />
                <label htmlFor="imagenProducto1">+</label>
              </div>
              <div className="contenedor-img">
                <img src={banner2} alt="" className="img-previa" />
                <input
                  type="file"
                  id="imagenProducto2"
                  name="imagenProducto2"
                  className=""
                  onChange={(e) => {
                    handleFileChange2(e);
                  }}
                />
                <label htmlFor="imagenProducto2">+</label>
              </div>
              <div className="contenedor-img">
                <img src={banner3} alt="" className="img-previa" />
                <input
                  type="file"
                  id="imagenProducto3"
                  name="imagenProducto3"
                  className=""
                  onChange={(e) => {
                    handleFileChange3(e);
                  }}
                />
                <label htmlFor="imagenProducto3">+</label>
              </div>
            </div>

            <div className="flex w-full justify-around ">
              <button
                type="button"
                className="btn-cancelar border-none"
                onClick={() => {
                  setPaso(paso - 1);
                }}
              >
                Atras
              </button>
              <button className="btn-siguiente">Actualizar</button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};
