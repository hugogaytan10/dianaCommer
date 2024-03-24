import React, { useEffect, useState } from "react";
import "./InicioAdmin.css";
import image from "./images-outline.svg";
import lupa from "./search.svg";
import add from "./add.svg";
import trash from "./trash.svg";
export const InicioAdmin = () => {
  const [loaded, setLoaded] = useState(false);
  const [productos, setProductos] = useState([]);
  const [idProducto, setIdProducto] = useState(0);
  const [paso, setPaso] = useState(0);
  const [tallas, setTallas] = useState([]);
  const [banner, setBanner] = useState(image);
  const [banner2, setBanner2] = useState(image);
  const [banner3, setBanner3] = useState(image);
  const [preview, setPreview] = useState(image);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioAdquisicion, setPrecioAdquisicion] = useState(0);
  const [precioVenta, setPrecioVenta] = useState(0);
  const [stock, setStock] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const CambioColor = () => {
    if (paso == 0) {
      const divUno = document.getElementById("pasoUno");
      const divDos = document.getElementById("pasoDos");
      const formDos = document.getElementById("divPasoDos");
      const formUno = document.getElementById("divPasoUno");
      if (formDos && divUno && formUno && divDos) {
        formDos.style.opacity = "1";
        formDos.style.display = "block";
        formUno.style.opacity = "0";
        formUno.style.display = "none";
        divUno.style.backgroundColor = "#2C3A3A";
        divDos.style.backgroundColor = "rgba(55,48,163,1)";
      }
    } else if (paso == 1) {
      const divDos = document.getElementById("pasoDos");
      const divTres = document.getElementById("pasoTres");
      const formDos = document.getElementById("divPasoDos");
      const formTres = document.getElementById("divPasoTres");
      if (formDos && formTres && divDos && divTres) {
        formDos.style.opacity = "0";
        formDos.style.display = "none";
        formTres.style.opacity = "1";
        formTres.style.display = "block";
        divDos.style.backgroundColor = "#2C3A3A";
        divTres.style.backgroundColor = "rgba(55,48,163,1)";
      }
    }
    setPaso(paso + 1);
  };
  const Retroceder = () => {
    if (paso > 0) {
      if (paso == 1) {
        const divUno = document.getElementById("pasoUno");
        const divDos = document.getElementById("pasoDos");
        const formDos = document.getElementById("divPasoDos");
        const formUno = document.getElementById("divPasoUno");
        if (formDos && formUno && divDos && divUno) {
          formDos.style.opacity = "0";
          formDos.style.display = "none";
          formUno.style.opacity = "1";
          formUno.style.display = "block";
          divUno.style.backgroundColor = "rgba(55,48,163,1)";
          divDos.style.backgroundColor = "#2C3A3A";
        }
      } else if (paso == 2) {
        const divDos = document.getElementById("pasoDos");
        const divTres = document.getElementById("pasoTres");
        const formDos = document.getElementById("divPasoDos");
        const formTres = document.getElementById("divPasoTres");
        if (formDos && formTres && divDos && divTres) {
          formDos.style.opacity = "1";
          formDos.style.display = "block";
          formTres.style.opacity = "0";
          formTres.style.display = "none";
          divDos.style.backgroundColor = "rgba(55,48,163,1)";
          divTres.style.backgroundColor = "#2C3A3A";
        }
      }
    }
    setPaso(paso - 1);
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
    CambioColor();
  };
  //cambios de modal editar
  const CambioColorEditar = () => {
    if (paso == 0) {
      const divUno = document.getElementById("pasoUnoEditar");
      const divDos = document.getElementById("pasoDosEditar");
      const formDos = document.getElementById("divPasoDosEditar");
      const formUno = document.getElementById("divPasoUnoEditar");
      if (formDos && divUno && formUno && divDos) {
        formDos.style.opacity = "1";
        formDos.style.display = "block";
        formUno.style.opacity = "0";
        formUno.style.display = "none";
        divUno.style.backgroundColor = "#2C3A3A";
        divDos.style.backgroundColor = "rgba(55,48,163,1)";
      }
    } else if (paso == 1) {
      const divDos = document.getElementById("pasoDosEditar");
      const divTres = document.getElementById("pasoTresEditar");
      const formDos = document.getElementById("divPasoDosEditar");
      const formTres = document.getElementById("divPasoTresEditar");
      if (formDos && formTres && divDos && divTres) {
        formDos.style.opacity = "0";
        formDos.style.display = "none";
        formTres.style.opacity = "1";
        formTres.style.display = "block";
        divDos.style.backgroundColor = "#2C3A3A";
        divTres.style.backgroundColor = "rgba(55,48,163,1)";
      }
    }
    setPaso(paso + 1);
  };
  const RetrocederEditar = () => {
    if (paso > 0) {
      if (paso == 1) {
        const divUno = document.getElementById("pasoUnoEditar");
        const divDos = document.getElementById("pasoDosEditar");
        const formDos = document.getElementById("divPasoDosEditar");
        const formUno = document.getElementById("divPasoUnoEditar");
        if (formDos && formUno && divDos && divUno) {
          formDos.style.opacity = "0";
          formDos.style.display = "none";
          formUno.style.opacity = "1";
          formUno.style.display = "block";
          divUno.style.backgroundColor = "rgba(55,48,163,1)";
          divDos.style.backgroundColor = "#2C3A3A";
        }
      } else if (paso == 2) {
        const divDos = document.getElementById("pasoDosEditar");
        const divTres = document.getElementById("pasoTresEditar");
        const formDos = document.getElementById("divPasoDosEditar");
        const formTres = document.getElementById("divPasoTresEditar");
        if (formDos && formTres && divDos && divTres) {
          formDos.style.opacity = "1";
          formDos.style.display = "block";
          formTres.style.opacity = "0";
          formTres.style.display = "none";
          divDos.style.backgroundColor = "rgba(55,48,163,1)";
          divTres.style.backgroundColor = "#2C3A3A";
        }
      }
    }
    setPaso(paso - 1);
  };
  const handlerSubmitEditar = (e) => {
    e.preventDefault();
    CambioColorEditar();
  };
  //reset the steps of the form
  const Reset = () => {
    setPaso(0);
    const divUno = document.getElementById("pasoUno");
    const divDos = document.getElementById("pasoDos");
    const formDos = document.getElementById("divPasoDos");
    const formUno = document.getElementById("divPasoUno");
    const formTres = document.getElementById("divPasoTres");
    const divTres = document.getElementById("pasoTres");
    if (formDos && divUno && formUno && divDos) {
      formDos.style.opacity = "0";
      formDos.style.display = "none";
      formUno.style.opacity = "1";
      formUno.style.display = "block";
      divUno.style.backgroundColor = "rgba(55,48,163,1)";
      divDos.style.backgroundColor = "#2C3A3A";
      formTres.style.opacity = "0";
      formTres.style.display = "none";
      divTres.style.backgroundColor = "#2C3A3A";
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
    }
  };
  //reset update form
  const ResetEditar = () => {
    setPaso(0);
    const divUno = document.getElementById("pasoUnoEditar");
    const divDos = document.getElementById("pasoDosEditar");
    const divTres = document.getElementById("pasoTresEditar");
    const formDos = document.getElementById("divPasoDosEditar");
    const formUno = document.getElementById("divPasoUnoEditar");
    const formTres = document.getElementById("divPasoTresEditar");
    if (
      formDos &&
      divUno &&
      formUno &&
      divDos &&
      divTres &&
      formTres &&
      divTres
    ) {
      formUno.style.opacity = "1";
      formUno.style.display = "block";
      divUno.style.backgroundColor = "rgba(55,48,163,1)";
      divDos.style.backgroundColor = "#2C3A3A";
      formTres.style.opacity = "0";
      formTres.style.display = "none";
      divTres.style.backgroundColor = "#2C3A3A";
      RetrocederEditar();
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
    }
  };
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
      Reset();
      const url =
        "https://back-diana-production.up.railway.app/api/producto/agregar";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });
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
      document.getElementById("modal_editar").close();
      const url =
        "https://back-diana-production.up.railway.app/api/producto/actualizar";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });
      ResetEditar();
    }
  };
  const handleFileChange4 = async (event) => {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado
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
  const handlerDelete = async (e) => {
    const url = `https://back-diana-production.up.railway.app/api/producto/eliminar/${idProducto}`;
    const response = await fetch(url, {
      method: "PUT",
    });
    document.getElementById("my_eliminar").close();
  };
  useEffect(() => {
    const getProductos = async () => {
      const url =
        "https://back-diana-production.up.railway.app/api/producto/conseguir";
      const response = await fetch(url);
      const data = await response.json();
      setProductos(data);
    };
    getProductos();
  }, []);
  useEffect(() => {
    console.log(banner, preview);
  }, [banner, preview]);
  return (
    <div>
      <div className="flex w-full justify-end gap-2">
        <img
          src={add}
          alt="agregar"
          className="h-8 w-8 rounded-full bg-white border-primary border-2 cursor-pointer flex items-center justify-center"
          onClick={() => document.getElementById("modal_agregar").showModal()}
        />
        <img
          src={lupa}
          alt="Buscar"
          className="h-8 w-8 rounded-full bg-white border-primary border-2 cursor-pointer flex items-center justify-center"
        />
      </div>

      <div className="w-11/12 flex flex-wrap justify-between p-2 items-center m-auto">
        {productos.map((producto) => (
          <div
            className={`contenedor-card border-2  rounded-lg ${
              producto.Id % 2 == 0 ? "mt-8" : "mt-0"
            }
            `}
            key={`producto-${producto.Id}`}
          >
            <div className="card">
              <figure className="h-3/4">
                <img
                  src={producto.URLImagen}
                  alt="Shoes"
                  className="object-cover h-full w-full"
                  onLoad={() => setLoaded(true)}
                  style={{ display: loaded ? "block" : "none" }}
                  onClick={() => {
                    setPreview(producto.URLImagen);
                    setNombre(producto.Titulo);
                    setDescripcion(producto.Descripcion);
                    setPrecioAdquisicion(producto.PrecioAdquisicion);
                    setPrecioVenta(producto.PrecioVenta);
                    setStock(producto.Stock);
                    setDescuento(producto.Descuento);
                    setTallas(producto.ListaTallas);
                    setBanner(producto.ImagenesCarrusel[0]);
                    setBanner2(producto.ImagenesCarrusel[1]);
                    setBanner3(producto.ImagenesCarrusel[2]);
                    setIdProducto(producto.Id);
                    document.getElementById("modal_editar").showModal();
                  }}
                />
                {!loaded && (
                  <div className="flex flex-col gap-4 w-52">
                    <div className="skeleton h-32 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                  </div>
                )}
              </figure>
              <div className="card-body p-1">
                <div className="card-actions flex justify-between items-end w-full mt-2 ">
                  <h2 className="text-black card-title font-semibold flex justify-between mt-1">
                    {producto.Titulo}
                  </h2>
                  <img
                    src={trash}
                    alt="trash"
                    className="h-10 w-10"
                    onClick={() => {
                      document.getElementById("my_eliminar").showModal();
                      setPreview(producto.URLImagen);
                      setNombre(producto.Titulo);
                      setIdProducto(producto.Id);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <dialog id="modal_agregar" className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-white">
          <div className="flex flex-wrap w-full justify-around">
            <div
              id="pasoUno"
              className={`mt-4 h-16 w-16 bg-indigo-800 text-white rounded-full flex items-center justify-center font-bold text-2xl`}
            >
              1
            </div>
            <div
              id="pasoDos"
              className={`mt-4 h-16 w-16 bg-primary  text-white rounded-full flex items-center justify-center font-bold text-2xl`}
            >
              2
            </div>
            <div
              id="pasoTres"
              className={`mt-4 h-16 w-16 bg-primary  text-white rounded-full flex items-center justify-center font-bold text-2xl`}
            >
              3
            </div>
          </div>
          <div
            className="h-96 modal-action block m-auto bg-white mt-10 transition-all md:w-2/4 text-gray-600"
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
                  onClick={() =>
                    document.getElementById("modal_agregar").close()
                  }
                >
                  Cancelar
                </button>
                <button className="btn-siguiente">Siguiente</button>
              </div>
            </form>
          </div>

          <div
            className="h-96 modal-action block m-auto bg-white mt-10 transition-all opacity-0 md:w-2/4 text-gray-600"
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
                  onClick={Retroceder}
                >
                  Atras
                </button>
                <button className="btn-siguiente">Siguiente</button>
              </div>
            </form>
          </div>

          <div
            className="h-96 modal-action block m-auto bg-white mt-10 transition-all opacity-0 md:w-2/4 text-gray-600"
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
                  onClick={Retroceder}
                >
                  Atras
                </button>
                <button className="btn-siguiente">Agregar</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="modal_editar" className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-white">
          <div className="flex flex-wrap w-full justify-around">
            <div
              id="pasoUnoEditar"
              className={`mt-4 h-16 w-16 bg-indigo-800 text-white rounded-full flex items-center justify-center font-bold text-2xl`}
            >
              1
            </div>
            <div
              id="pasoDosEditar"
              className={`mt-4 h-16 w-16 bg-primary  text-white rounded-full flex items-center justify-center font-bold text-2xl`}
            >
              2
            </div>
            <div
              id="pasoTresEditar"
              className={`mt-4 h-16 w-16 bg-primary  text-white rounded-full flex items-center justify-center font-bold text-2xl`}
            >
              3
            </div>
          </div>
          <div
            className="h-96 modal-action block m-auto bg-white mt-10 transition-all md:w-2/4 text-gray-600"
            id="divPasoUnoEditar"
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
            className="h-96 modal-action block m-auto bg-white mt-10 transition-all opacity-0 md:w-2/4 text-gray-600"
            id="divPasoDosEditar"
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
                  onClick={RetrocederEditar}
                >
                  Atras
                </button>
                <button className="btn-siguiente">Siguiente</button>
              </div>
            </form>
          </div>

          <div
            className="h-96 modal-action block m-auto bg-white mt-10 transition-all opacity-0 md:w-2/4 text-gray-600"
            id="divPasoTresEditar"
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
                  onClick={RetrocederEditar}
                >
                  Atras
                </button>
                <button className="btn-siguiente">Actualizar</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="my_eliminar" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg text-primary text-center">
            Eliminar Tennis
          </h3>
          <p className="py-4 text-primary text-center">
            Deseas eliminar {nombre} ?
          </p>
          <div className="modal-action block w-full">
            <form
              method="dialog "
              onSubmit={(e) => {
                handlerDelete(e);
              }}
            >
              <img src={preview} alt="" className="h-40 m-auto" />
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  className="w-1/3 border-2 p-2 border-red-500 rounded-lg text-red-500"
                >
                  eliminar
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById("my_eliminar").close()}
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
  );
};
