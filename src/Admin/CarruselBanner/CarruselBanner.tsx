import React, { useState, useEffect, useContext } from "react";
import image from "../../assets/images-outline.svg";
import { URL } from "../../Const/Const";
import { AppContext } from "../../Context/AppContext";
import { set } from "@cloudinary/url-gen/actions/variable";
export const CarruselBanner = () => {
  const contexto = useContext(AppContext);
  const [paso, setPaso] = useState(0);
  const [banner, setBanner] = useState(image);
  const [tituloUno, setTituloUno] = useState("");
  const [descripcionUno, setDescripcionUno] = useState("");
  const [errorTitulo, setErrorTitulo] = useState(false);
  const [errorDescripcion, setErrorDescripcion] = useState(false);
  //para la segunda imagen
  const [tituloDos, setTituloDos] = useState("");
  const [descripcionDos, setDescripcionDos] = useState("");
  const [errorTituloDos, setErrorTituloDos] = useState(false);
  const [errorDescripcionDos, setErrorDescripcionDos] = useState(false);
  const [bannerDos, setBannerDos] = useState(image);
 //para la tercera imagen
  const [tituloTres, setTituloTres] = useState("");
  const [descripcionTres, setDescripcionTres] = useState("");
  const [errorTituloTres, setErrorTituloTres] = useState(false);
  const [errorDescripcionTres, setErrorDescripcionTres] = useState(false);
  const [bannerTres, setBannerTres] = useState(image);

  useEffect(() => {
    //console.log("Paso cambiado:", paso);
  }, [paso]);
  
  const handleSubmitUno = (e: any) => {
    e.preventDefault();
    if (!tituloUno) {
      setErrorTitulo(true);
      return;
    }
    if (!descripcionUno) {
      setErrorDescripcion(true);
      return;
    }
    //aumentar el paso con el paso anterior mas 1
    setPaso(paso + 1);
  };
  const handleSubmitDos = (e: any) => {
    e.preventDefault();
    if (!tituloDos) {
      setErrorTituloDos(true);
      return;
    }
    if (!descripcionDos) {
      setErrorDescripcionDos(true);
      return;
    }
    //aumentar el paso con el paso anterior mas 1
    setPaso(paso + 1);
  };
  const handleSubmitTres = (e: any) => {
    e.preventDefault();
    if (!tituloTres) {
      setErrorTituloTres(true);
      return;
    }
    if (!descripcionDos) {
      setErrorDescripcionTres(true);
      return;
    }
    //aumentar el paso con el paso anterior mas 1
    guardarBanner();
  };
  const handleFileChange = async (event: any, setBanner: any) => {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado
    if (file) {
      const url = await SubirImagen(file);
      setBanner(url);
    }
  };
  const SubirImagen = async (file: any) => {
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
  const guardarBanner = async () => {
    try {
      //eliminar banner anterior
      const response = await fetch(`${URL}/carruselbanner/eliminar`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: contexto?.user.Token || "",
        },
      });
      //crear un array con los datos de los banners
      const banners = [
        {
          Titulo: tituloUno,
          Descripcion: descripcionUno,
          Imagen: banner,
        },
        {
          Titulo: tituloDos,
          Descripcion: descripcionDos,
          Imagen: bannerDos,
        },
        {
          Titulo: tituloTres,
          Descripcion: descripcionTres,
          Imagen: bannerTres,
        },
      ];
      //enviar la información al servidor haciendo un for de peticiones
      for (const banner of banners) {
        const response = await fetch(`${URL}/carruselbanner/agregar`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: contexto?.user.Token || "",
          },
          body: JSON.stringify(banner),
        });
        const data = await response.json();
        console.log("Respuesta del servidor:", data);
      }

    } catch (error) {
      console.error("Error al guardar el banner:", error);
    }
    finally{
      setPaso(0);
      setBanner(image);
      setTituloUno("");
      setDescripcionUno("");
      setErrorTitulo(false);
      setErrorDescripcion(false);
      setBannerDos(image);
      setTituloDos("");
      setDescripcionDos("");
      setErrorTituloDos(false);
      setErrorDescripcionDos(false);
      setBannerTres(image);
      setTituloTres("");
      setDescripcionTres("");
      setErrorTituloTres(false);
      setErrorDescripcionTres(false);
      (document.getElementById("modal_carrusel") as HTMLDialogElement)?.close?.();
    }
  }
  return (
    <dialog id="modal_carrusel" className="modal">
      <div className="modal-box w-11/12 max-w-5xl bg-white">
        <div
          className={`h-80 modal-action ${
            paso === 0 ? "block" : "hidden"
          } m-auto bg-white mt-10 transition-all md:w-3/4 text-gray-600`}
        >
          <form
            method="dialog w-full"
            onSubmit={(e) => {
              handleSubmitUno(e);
            }}
          >
            <div className="contenedor-img">
              <img src={banner} alt="" className="img-previa" />
              <input
                type="file"
                id="imagenBanner1"
                name="imagenBanner1"
                className=""
                onChange={(e) => {
                  handleFileChange(e, setBanner);
                }}
              />
              <label htmlFor="imagenBanner1">+</label>
            </div>

            <div className={`${errorTitulo ? " mb-0" : "mb-4"} form-group`}>
              <input
                type="text"
                placeholder=" "
                id="tituloBanner"
                name="tituloBanner"
                className="bg-white"
                value={tituloUno}
                onChange={(e) => {
                  if (errorTitulo) {
                    setErrorTitulo(false);
                  }
                  setTituloUno(e.target.value);
                }}
              />
              <label>Título</label>
            </div>
            {errorTitulo && (
              <p className="text-red-500 mb-4 text-xs">
                El título es obligatorio
              </p>
            )}
            <div
              className={`${errorDescripcion ? " mb-0" : "mb-4"} form-group`}
            >
              <textarea
                placeholder=" "
                id="descripcionBanner"
                name="descripcionBanner"
                className="bg-white"
                value={descripcionUno}
                onChange={(e) => {
                  if (errorDescripcion) {
                    setErrorDescripcion(false);
                  }
                  setDescripcionUno(e.target.value);
                }}
              />
              <label>Descripción</label>
            </div>
            {errorDescripcion && (
              <p className="text-red-500 mb-4 text-xs">
                La descripción es obligatoria
              </p>
            )}

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
              <button className="btn-siguiente">Siguiente</button>
            </div>
          </form>
        </div>
   

        <div
          className={`h-80 modal-action ${
            paso === 1 ? "block" : "hidden"
          } m-auto bg-white mt-10 transition-all md:w-3/4 text-gray-600`}
        >
          <form
            method="dialog w-full"
            onSubmit={(e) => {
              handleSubmitDos(e);
            }}
          >
            <div className="contenedor-img">
              <img src={bannerDos} alt="" className="img-previa" />
              <input
                type="file"
                id="imagenBanner2"
                name="imagenBanner2"
                className=""
                onChange={(e) => {
                  handleFileChange(e, setBannerDos);
                }}
              />
              <label htmlFor="imagenBanner2">+</label>
            </div>

            <div className={`${errorTituloDos ? " mb-0" : "mb-4"} form-group`}>
              <input
                type="text"
                placeholder=" "
                id="tituloBanne2"
                name="tituloBanner2"
                className="bg-white"
                value={tituloDos}
                onChange={(e) => {
                  if (errorTituloDos) {
                    setErrorTituloDos(false);
                  }
                  setTituloDos(e.target.value);
                }}
              />
              <label>Título</label>
            </div>
            {errorTituloDos && (
              <p className="text-red-500 mb-4 text-xs">
                El título es obligatorio
              </p>
            )}
            <div
              className={`${errorDescripcionDos ? " mb-0" : "mb-4"} form-group`}
            >
              <textarea
                placeholder=" "
                id="descripcionBanner"
                name="descripcionBanner"
                className="bg-white"
                value={descripcionDos}
                onChange={(e) => {
                  if (errorDescripcionDos) {
                    setErrorDescripcionDos(false);
                  }
                  setDescripcionDos(e.target.value);
                }}
              />
              <label>Descripción</label>
            </div>
            {errorDescripcionDos && (
              <p className="text-red-500 mb-4 text-xs">
                La descripción es obligatoria
              </p>
            )}

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
              <button className="btn-siguiente">Siguiente</button>
            </div>
          </form>
        </div>

        <div
          className={`h-80 modal-action ${
            paso === 2 ? "block" : "hidden"
          } m-auto bg-white mt-10 transition-all md:w-3/4 text-gray-600`}
        >
          <form
            method="dialog w-full"
            onSubmit={(e) => {
              handleSubmitTres(e);
            }}
          >
            <div className="contenedor-img">
              <img src={bannerTres} alt="" className="img-previa" />
              <input
                type="file"
                id="imagenBanner3"
                name="imagenBanner3"
                className=""
                onChange={(e) => {
                  handleFileChange(e, setBannerTres);
                }}
              />
              <label htmlFor="imagenBanner3">+</label>
            </div>

            <div className={`${errorTituloTres ? " mb-0" : "mb-4"} form-group`}>
              <input
                type="text"
                placeholder=" "
                id="tituloBanne3"
                name="tituloBanner3"
                className="bg-white"
                value={tituloTres}
                onChange={(e) => {
                  if (errorTituloTres) {
                    setErrorTituloTres(false);
                  }
                  setTituloTres(e.target.value);
                }}
              />
              <label>Título</label>
            </div>
            {errorTituloTres && (
              <p className="text-red-500 mb-4 text-xs">
                El título es obligatorio
              </p>
            )}
            <div
              className={`${errorDescripcionTres ? " mb-0" : "mb-4"} form-group`}
            >
              <textarea
                placeholder=" "
                id="descripcionBanner"
                name="descripcionBanner"
                className="bg-white"
                value={descripcionTres}
                onChange={(e) => {
                  if (errorDescripcionTres) {
                    setErrorDescripcionTres(false);
                  }
                  setDescripcionTres(e.target.value);
                }}
              />
              <label>Descripción</label>
            </div>
            {errorDescripcionTres && (
              <p className="text-red-500 mb-4 text-xs">
                La descripción es obligatoria
              </p>
            )}

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
              <button className="btn-siguiente">Siguiente</button>
            </div>
          </form>
        </div>

        </div>
    </dialog>
  );
};
