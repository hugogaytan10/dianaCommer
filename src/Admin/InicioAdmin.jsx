import React, { useContext, useEffect, useState } from "react";
import "./InicioAdmin.css";
import image from "../assets/images-outline.svg";
import trash from "../assets/trash.svg";
import { ModalAgregarAdmin } from "./ModalAgregarAdmin";
import { ModalEditarAdmin } from "./ModalEditarAdmin";

import { URL } from "../Const/Const";
import { HeaderAdmin } from "./HeaderAdmin";
import { AppContext } from "../Context/AppContext";
import { CarruselBanner } from "./CarruselBanner/CarruselBanner";

export const InicioAdmin = () => {
  const context = useContext(AppContext);
  let contadorToast = 0;
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
  const [categorias, setCategorias] = useState([]);
  const [subCategorias, setSubCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState({
    CategoriaId: 0,
    Categoria: "",
  });
  const [subCategoriaSeleccionada, setSubCategoriaSeleccionada] = useState({
    SubCategoriaId: 0,
    SubCategoria: "",
  });
  //CONTRALADOR DE BUSCADOR
  const [estaAbierto, setEstaAbierto] = useState(false);

  useEffect(() => {
    const getProductos = async () => {
      try {
        const url = `${URL}/producto/conseguir`;
        const response = await fetch(url);
        const data = await response.json();
        setProductos(data);
        setProductosFiltrados(data);
        setPdfLoader(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const getCategorias = async () => {
      try {
        const url = `${URL}/categoria/conseguir`;
        const response = await fetch(url);
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const getSubCategorias = async () => {
      try {
        const url = `${URL}/subcategoria/conseguir`;
        const response = await fetch(url);
        const data = await response.json();
        setSubCategorias(data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    getSubCategorias();
    getCategorias();
    getProductos();
  }, []);

  const handlerDelete = async (e) => {
    e.preventDefault();
    const url = `${URL}/producto/eliminar/${idProducto}`;
    await fetch(url, {
      method: "PUT",
      headers: {
        token: context.user.Token,
      },
    }).then((response) => {
      if (response.status === 200) {
        const newProductos = productos.filter(
          (producto) => producto.Id !== idProducto
        );
        setProductos(newProductos);
        setProductosFiltrados(newProductos);
      } else {
        console.log("Error al eliminar producto");
      }
    });

    document.getElementById("my_eliminar").close();
  };

  useEffect(() => {
    if (contadorToast > 2) {
      const aviso = document.querySelector(".toast-admin");

      aviso.classList.add("mostrar");
      setTimeout(() => {
        aviso.classList.remove("mostrar");
      }, 1000);
    }
    contadorToast++;
  }, [productos]);

  return (
    <div>
      {/*   
      <div className="flex w-full justify-end gap-2 mt-4">
      
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
      */}

      <div
        className={
          pdfLoader
            ? "none"
            : `w-11/12 flex flex-wrap justify-between p-2 items-center m-auto relative `
        }
      >
        <div className="fixed bg-transparent z-10 top-14 right-0">
          <HeaderAdmin
            productosFiltrados={productosFiltrados}
            productos={productos}
            setProductosFiltrados={setProductosFiltrados}
          />
        </div>

        {productosFiltrados.map((producto, idx) => {
          return (
            <div
              key={`producto-${producto.Id}`}
              className={`contenedor-card border-b-2  rounded-md ${
                producto.Id % 2 === 0 ? "mt-8" : "mt-0"
              }`}
            >
              <div>
                <div className="card">
                  <figure className="h-3/4">
                    <img
                      src={producto.URLImagen}
                      alt="Shoes"
                      className="object-contain h-full w-full"
                      onLoad={() => setLoaded(true)}
                      style={{ display: loaded ? "block" : "none" }}
                      onClick={() => {
                        setIdProducto(producto.Id);
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
                        setSubCategoriaSeleccionada({
                          SubcategoriaId: producto.SubcategoriaId,
                          Subcategoria: producto.Subcategoria,
                        });
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
                      <h2 className="text-black text-md md:text-lg font-semibold flex justify-between mt-1">
                        {producto.Titulo}
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
            </div>
          );
        })}
      </div>

      <div className="toast-admin">
        <div className="text-gray-200 text-lg">
          <span>Nuevo Cambio</span>
        </div>
      </div>
      <CarruselBanner />

      <ModalAgregarAdmin
        paso={paso}
        setPaso={setPaso}
        image={image}
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
        setProductosFiltrados={setProductosFiltrados}
        subCategorias={subCategorias}
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
        subCategorias={subCategorias}
        subCategoriaSeleccionada={subCategoriaSeleccionada}
        setSubCategoriaSeleccionada={setSubCategoriaSeleccionada}
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
