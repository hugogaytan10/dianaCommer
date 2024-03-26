import React, { useEffect } from "react";

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
}) => {
  const handlerSubmitEditar = (e) => {
    e.preventDefault();
    setPaso(paso + 1);
  };

  //reset update form
  const ResetEditar = () => {
    setPaso(-1);
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
    document.getElementById("modal_editar").close();
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
  const ActualizarProducto = async (e) => {
    e.preventDefault();
    const producto = {
      Id: idProducto,
      Titulo: nombre,
      Descripcion: descripcion,
      PrecioAdquisicion: precioAdquisicion,
      Descuento: descuento,
      PrecioVenta: precioVenta,
      Stock: stock,
      Tallas: tallas,
      URLImagen: preview,
      ImgCarrusel: [banner, banner2, banner3],
      ListaTallas: tallas,
    };
    if (
      nombre != "" &&
      descripcion != "" &&
      precioAdquisicion > 0 &&
      precioVenta > 0 &&
      stock > 0 &&
      descuento >= 0 &&
      preview != image &&
      banner != image &&
      banner2 != image &&
      banner3 != image
    ) {
      //document.getElementById("modal_editar").close();
      const url =
        "https://back-diana-production.up.railway.app/api/producto/actualizar";
      try {
        const response = await fetch(url, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(producto),
        });
        ResetEditar();
        if (response.status === 200) {
          const newProductos = productos.map((p) => {
            if (p.Id === idProducto) {
              return { ...p, ...producto }; // Esto asume que tu servidor responde con el producto actualizado
            }
            return p;
          });
          setProductos(newProductos);
        }
      } catch (error) {
        console.error("Error al actualizar producto", error);
      }
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
  useEffect(() => {}, [idProducto]);
  return (
    <dialog id="modal_editar" className="modal">
      <div className="modal-box w-11/12 max-w-5xl bg-white">
        <div className="flex flex-wrap w-full justify-around">
          <div
            id="stepOneEdit"
            className={`mt-4 h-16 w-16 ${
              paso === 0 ? "bg-indigo-800" : "bg-primary"
            } text-white rounded-full flex items-center justify-center font-bold text-2xl`}
          >
            1
          </div>
          <div
            id="stepTwoEdit"
            className={`mt-4 h-16 w-16 ${
              paso === 1 ? "bg-indigo-800" : "bg-primary"
            }  text-white rounded-full flex items-center justify-center font-bold text-2xl`}
          >
            2
          </div>
          <div
            id="stepThreeEdit"
            className={`mt-4 h-16 w-16 ${
              paso === 2 ? "bg-indigo-800" : "bg-primary"
            }  text-white rounded-full flex items-center justify-center font-bold text-2xl`}
          >
            3
          </div>
        </div>
        <div
          className={`h-96 modal-action ${
            paso === 0 ? "block" : "hidden"
          } m-auto bg-white mt-10 transition-all md:w-2/4 text-gray-600`}
          id="divstepOneEdit"
        >
          <form
            method="dialog w-full"
            onSubmit={(e) => {
              handlerSubmitEditar(e);
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
                value={nombre}
              />
              <label>Nombre del artículo</label>
            </div>
            <div className="form-group">
              <textarea
                type="text"
                placeholder=" "
                id="descripcion"
                name="descripcion"
                className="bg-white"
                onChange={(e) => {
                  setDescripcion(e.target.value);
                }}
                value={descripcion}
              />
              <label>Descripción</label>
            </div>
            <div className="flex w-full justify-around">
              <button className="btn-cancelar" onClick={ResetEditar}>
                Cancelar
              </button>
              <button className="btn-siguiente">Siguiente</button>
            </div>
          </form>
        </div>

        <div
          className={`h-96 modal-action ${
            paso === 1 ? "block" : "hidden"
          } m-auto bg-white mt-10 transition-all md:w-2/4 text-gray-600`}
          id="divstepTwoEdit"
        >
          <form
            method="dialog w-full"
            onSubmit={(e) => {
              handlerSubmitEditar(e);
            }}
          >
            {/* if there is a button, it will close the modal */}
            <div className="form-group">
              <input
                type="number"
                placeholder=" "
                id="precioAdquisicion"
                name="precioAdquisicionEditar"
                className="bg-white"
                onChange={(e) => {
                  setPrecioAdquisicion(e.target.value);
                }}
                value={precioAdquisicion}
              />
              <label>Precio de Adquisición</label>
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder=" "
                id="precioVenta"
                name="precioVenta"
                className="bg-white"
                onChange={(e) => {
                  setPrecioVenta(e.target.value);
                }}
                value={precioVenta}
              />
              <label>Precio de Venta</label>
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder=" "
                id="stock"
                name="stock"
                className="bg-white"
                onChange={(e) => {
                  setStock(e.target.value);
                }}
                value={stock}
              />
              <label>Cantidad en inventario</label>
            </div>
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
                className="btn-cancelar"
                onClick={() => {
                  setPaso(0);
                }}
              >
                Atras
              </button>
              <button className="btn-siguiente">Siguiente</button>
            </div>
          </form>
        </div>

        <div
          className={`h-96 modal-action ${
            paso === 2 ? "block" : "hidden"
          } m-auto bg-white mt-10 transition-all md:w-2/4 text-gray-600`}
          id="divStepThreeEdit"
        >
          <form
            method="dialog w-full"
            onSubmit={(e) => {
              ActualizarProducto(e);
            }}
          >
            {/* if there is a button, it will close the modal */}
            <div className="form-group w-full flex items-center gap-2">
              <input
                type="number"
                placeholder=" "
                id="tallaEditar"
                name="tallaEditar"
                className="bg-white "
              />
              <label>Talla</label>
              <button
                type="button"
                onClick={() => {
                  setTallas([
                    ...tallas,
                    document.getElementById("tallaEditar").value,
                  ]);
                  document.getElementById("tallaEditar").value = "";
                }}
                className="btn-siguiente text-primary"
              >
                Agregar
              </button>
            </div>
            <div className="flex flex-wrap">
              {tallas &&
                tallas.length > 0 &&
                tallas.map((talla, index) => (
                  <div className="btn-talla" key={`talla-${talla}-editar`}>
                    <p id={`talla-${talla}-editar`}>{talla}</p>
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
                className="btn-cancelar"
                onClick={() => {
                  setPaso(1);
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
