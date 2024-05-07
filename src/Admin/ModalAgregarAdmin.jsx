import React, { useEffect } from "react";

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
  setProductos,
}) => {
  const InsertarProducto = async (e) => {
    e.preventDefault();

    const producto = {
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
      tallas.length > 0 &&
      precioAdquisicion > 0 &&
      precioVenta > 0 &&
      stock > 0 &&
      descuento >= 0 &&
      preview != image &&
      banner != image &&
      banner2 != image &&
      banner3 != image
    ) {
      document.getElementById("modal_agregar").close();
      try {
        const url ="https://back-diana-production.up.railway.app/api/producto/agregar";
        //const url = "http://localhost:8090/api/producto/agregar";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            mode: "cors",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(producto),
        });
        if (response.status === 200) {
          setProductos([...productos, producto]);
          setPaso(paso + 1);
          Reset();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
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

  const handlerSubmit = (e) => {
    e.preventDefault();
    setPaso(paso + 1);
  };
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
  useEffect(() => {
    if (paso == 3) {
      Reset();
      setPaso(0);
    }
  }, [paso]);
  return (
    <dialog id="modal_agregar" className="modal">
      <div className="modal-box w-11/12 max-w-5xl bg-white">
        <div className="flex flex-wrap w-full justify-around">
          <div
            id="pasoUno"
            className={`mt-4 h-16 w-16 ${
              paso === 0 ? "bg-indigo-800" : "bg-primary"
            } text-white rounded-full flex items-center justify-center font-bold text-2xl`}
          >
            1
          </div>
          <div
            id="pasoDos"
            className={`mt-4 h-16 w-16 ${
              paso === 1 ? "bg-indigo-800" : "bg-primary"
            }  text-white rounded-full flex items-center justify-center font-bold text-2xl`}
          >
            2
          </div>
          <div
            id="pasoTres"
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
          id="divPasoUno"
        >
          <form
            method="dialog w-full"
            onSubmit={(e) => {
              handlerSubmit(e);
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
              />
              <label>Descripción</label>
            </div>
            <div className="flex w-full justify-around">
              <button
                className="btn-cancelar"
                onClick={() =>{
                  document.getElementById("modal_agregar").close();
                  Reset();
                  setPaso(-1);
                }
                }
              >
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
          id="divPasoDos"
        >
          <form
            method="dialog w-full"
            onSubmit={(e) => {
              handlerSubmit(e);
            }}
          >
            {/* if there is a button, it will close the modal */}
            <div className="form-group">
              <input
                type="number"
                placeholder=" "
                id="precioAdquisicion"
                name="precioAdquisicion"
                className="bg-white"
                onChange={(e) => {
                  setPrecioAdquisicion(e.target.value);
                }}
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
              />
              <label>Descuento</label>
            </div>
            <div className="flex w-full justify-around">
              <button
                type="button"
                className="btn-cancelar"
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
          className={`h-96 modal-action ${
            paso === 2 ? "block" : "hidden"
          } m-auto bg-white mt-10 transition-all md:w-2/4 text-gray-600`}
          id="divPasoTres"
        >
          <form
            method="dialog w-full"
            onSubmit={(e) => {
              InsertarProducto(e);
            }}
          >
            {/* if there is a button, it will close the modal */}
            <div className="form-group w-full flex items-center gap-2">
              <input
                type="number"
                placeholder=" "
                id="talla"
                name="talla"
                className="bg-white "
              />
              <label>Talla</label>
              <button
                type="button"
                onClick={() => {
                  setTallas([
                    ...tallas,
                    document.getElementById("talla").value,
                  ]);
                  document.getElementById("talla").value = "";
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
                  <div className="btn-talla" key={`talla-${talla}`}>
                    <p id={`talla-${talla}`}>{talla}</p>
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
