import React, { useEffect, useState } from "react";
import "./Categoria.css";
import image from "./images-outline.svg";
import lupa from "./search.svg";
import add from "./add.svg";
import trash from "./trash.svg";
import { ModalAgregarAdmin } from "./ModalAgregarAdmin";
import { ModalEditarAdmin } from "./ModalEditarAdmin";

import {URL} from '../Const/Const'
import { HeaderAdmin } from "./HeaderAdmin";
import { ModalAgregarCategoria } from "./ModalAgregarCategoria";

export const Categoria = () => {
  const [loaded, setLoaded] = useState(false);
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
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
  const [pdfLoader, setPdfLoader] = useState(true);

  useEffect(() => {
    const getProductos = async () => {
      try {
        const url = `${URL}/categoria/conseguir`;
        const response = await fetch(url);
        const data = await response.json();
        setProductos(data);
        setProductosFiltrados(data);
        setPdfLoader(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProductos();
  }, []);

  const handlerDelete = async (e) => {
    e.preventDefault();
    const url = `${URL}/producto/eliminar/${idProducto}`;
    await fetch(url, {
      method: "PUT",
    });
    document.getElementById("my_eliminar").close();
  };

  return (
    <div>
      <HeaderAdmin productosFiltrados={productosFiltrados} productos={productos} setProductosFiltrados={setProductosFiltrados} />


      <div className={pdfLoader ? 'none' : `w-11/12 flex flex-wrap justify-between p-2 items-center m-auto`}>
        {productosFiltrados.map((producto) => (
          <div
            className={`contenedor-card border-b-2 w-7/12 h-20 rounded-md mx-auto ${producto.Id % 2 === 0 ? "mt-6" : "mt-6"}`}
            key={`producto-${producto.Id}`}
          >
            <div className="card" id="a">
              <div className="card-body p-1">
                <div className="card-actions flex justify-between items-end w-full mt-2 ">
                  <h2 className="text-black text-md md:text-lg font-semibold flex justify-between mt-1">
                    {producto.Nombre}
                  </h2>
                  <img
                    src={trash}
                    alt="trash"
                    className="h-6 w-6"
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

      <ModalAgregarCategoria
        nombre={nombre}
        setNombre={setNombre}
      />

      <ModalEditarAdmin
        paso={paso}
        setPaso={setPaso}
        image={image}
        idProducto={idProducto}
        nombre={nombre}
        setNombre={setNombre}
        descripcion={descripcion}
        setDescripcion={setDescripcion}
        tallas={tallas}
        setTallas={setTallas}
        precioAdquisicion={precioAdquisicion}
        setPrecioAdquisicion={setPrecioAdquisicion}
        precioVenta={precioVenta}
        setPrecioVenta={setPrecioVenta}
        stock={stock}
        setStock={setStock}
        descuento={descuento}
        setDescuento={setDescuento}
        preview={preview}
        setPreview={setPreview}
        banner={banner}
        setBanner={setBanner}
        banner2={banner2}
        setBanner2={setBanner2}
        banner3={banner3}
        setBanner3={setBanner3}
        productos={productos}
        setProductos={setProductos}
      />

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
              method="dialog"
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
