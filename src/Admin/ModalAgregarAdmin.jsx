import React, { useContext, useState } from "react";
import { URL } from "../Const/Const";
import { AppContext } from "../Context/AppContext";
import { NavLink } from "react-router-dom";
import { set } from "@cloudinary/url-gen/actions/variable";
export const ModalAgregarAdmin = ({
  paso,
  setPaso,
  image,
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
  setProductosFiltrados,
  subCategorias,
}) => {
  const context = useContext(AppContext);
  const [subCategoria, setSubCategoria] = useState("");
  const [errorTitulo, setErrorTitulo] = useState(false);
  const [errorDescripcion, setErrorDescripcion] = useState(false);
  const [errorPrecioAdquisicion, setErrorPrecioAdquisicion] = useState(false);
  const [errorPrecioVenta, setErrorPrecioVenta] = useState(false);
  const [errorTalla, setErrorTalla] = useState(false);


  const Reset = () => {
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
  };

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
  const handlerSubmitCuatro = async(e) => {
    e.preventDefault();
    if(tallas.length === 0) {
      setErrorTalla(true);
      return;
    }
    const producto = {
      Producto: {
        Titulo: nombre,
        Descripcion: descripcion,
        PrecioAdquisicion: precioAdquisicion,
        Descuento: descuento,
        PrecioVenta: precioVenta,
        URLImagen: preview || "",
        SubcategoriaId: subCategoria || null,
      },
      ImgCarrusel: [banner || "", banner2 || "", banner3 || ""],
      Tallas: tallas,
    };
    try {
      const url = `${URL}/producto/agregar`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          mode: "cors",
          "Content-Type": "application/json",
          token: context.user.Token,
        },
        body: JSON.stringify(producto),
      });
      if (response.status === 200) {
        const productoInsertado = {
          Titulo: nombre,
          Descripcion: descripcion,
          PrecioAdquisicion: precioAdquisicion,
          Descuento: descuento + "",
          PrecioVenta: precioVenta,
          URLImagen: preview || "",
          SubcategoriaId: subCategoria || null,
          ImgCarrusel: [banner || "", banner2 || "", banner3 || ""],
          Tallas: tallas,
        };
        setProductosFiltrados([...productos, productoInsertado]);
        Reset();

        document.getElementById("modal_agregar").close();
      }
    } catch (e) {
      console.log(e);
    }
  }


  const handleFileChange4 = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = await SubirImagen(file);
      setPreview(url);
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

  return (
    <dialog id="modal_agregar" className="modal">
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
            }  text-white rounded-full flex items-center justify-center font-bold text-2xl`}
          >
            4
          </div>
        </div>

        <div
          className={`h-80 modal-action ${
            paso === 0 ? "block" : "hidden"
          } m-auto bg-white mt-10 transition-all md:w-2/4 text-gray-600`}
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

            <div className={`${errorTitulo ? " mb-0" : "mb-4"} form-group`}>
              <input
                type="text"
                placeholder=" "
                id="nombreArticulo"
                name="nombreArticulo"
                className="bg-white"
                value={nombre}
                onChange={(e) => {
                  if (errorTitulo) {
                    setErrorTitulo(false);
                  }
                  setNombre(e.target.value);
                }}
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
                value={descripcion}
                onChange={(e) => {
                  if (errorDescripcion) {
                    setErrorDescripcion(false);
                  }
                  setDescripcion(e.target.value);
                }}
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
                onClick={() => {
                  document.getElementById("modal_agregar").close();
                  Reset();
                  setPaso(-1);
                }}
              >
                Cancelar
              </button>
              <button className="btn-siguiente">Siguiente</button>
            </div>
          </form>
        </div>

        <div
          className={`h-80 modal-action ${
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
              <label className="form-control w-full md:w-1/2 mb-4">
                <select
                  className="select select-bordered bg-white"
                  onChange={(e) => setSubCategoria(e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled selected>
                    Selecciona una subcategoría
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

            <div className="flex w-full justify-around">
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
          } m-auto bg-white mt-10 transition-all md:w-2/4 text-gray-600`}
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
                name="precioAdquisicion"
                className="bg-white"
                value={precioAdquisicion}
                onChange={(e) => {
                  if (errorPrecioAdquisicion) {
                    setErrorPrecioAdquisicion(false);
                  }
                  setPrecioAdquisicion(e.target.value);
                }}
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
                value={precioVenta}
                onChange={(e) => {
                  if (errorPrecioVenta) {
                    setErrorPrecioVenta(false);
                  }
                  setPrecioVenta(e.target.value);
                }}
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
                value={descuento}
                onChange={(e) => {
                  setDescuento(e.target.value);
                }}
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
          } m-auto bg-white mt-10 transition-all md:w-2/4 text-gray-600`}
        >
          <form
            method="dialog w-full"
            onSubmit={(e) => {
              handlerSubmitCuatro(e);
            }}
          >
            {/* if there is a button, it will close the modal */}
            <div className="form-group w-full flex flex-wrap items-end gap-2 mb-0">
              <div className="form-group w-1/4 mb-0">
                <input
                  type="number"
                  placeholder=" "
                  id="talla"
                  name="talla"
                  className="bg-white "
                />
                <label>Talla</label>
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
                  if(document.getElementById("talla").value === "" || document.getElementById("stock").value === "") {
                    setErrorTalla(true);
                    return;
                  }
                  const nuevaTalla = {
                    Talla: document.getElementById("talla").value,
                    Stock: document.getElementById("stock").value,
                  };
                  setTallas([...tallas, nuevaTalla]);
                  document.getElementById("talla").value = "";
                  document.getElementById("stock").value = "";
                  setErrorTalla(false);
                }}
                className="btn-siguiente h-12 text-primary border-none w-1/4"
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
                  <div className="btn-talla" key={`talla-${talla.Talla}`}>
                    <p id={`talla-${talla}`}>{talla.Talla}</p>
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
                  id="imagenBanner1"
                  name="imagenBanner1"
                  className=""
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                />
                <label htmlFor="imagenBanner1">+</label>
              </div>
              <div className="contenedor-img">
                <img src={banner2} alt="" className="img-previa" />
                <input
                  type="file"
                  id="imagenBanner2"
                  name="imagenBanner2"
                  className=""
                  onChange={(e) => {
                    handleFileChange2(e);
                  }}
                />
                <label htmlFor="imagenBanner2">+</label>
              </div>
              <div className="contenedor-img">
                <img src={banner3} alt="" className="img-previa" />
                <input
                  type="file"
                  id="imagenBanner3"
                  name="imagenBanner3"
                  className=""
                  onChange={(e) => {
                    handleFileChange3(e);
                  }}
                />
                <label htmlFor="imagenBanner3">+</label>
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
              <button className="btn-siguiente">Agregar</button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};
