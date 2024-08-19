import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import carrito from "../assets/cart-outline.svg";
import "./item.css";
import { NavLink } from "react-router-dom";
import flecha from "../assets/arrow-back.svg";
import { URL } from "../Const/Const";
import { Favoritos } from "./Favoritos/Favoritos";
import { Modal } from "../utilities/Modal";
import { AuthPageCart } from "../Login/AuthPageCart";
import { CarruselRelacionados } from "./CarruselRelacionados/CarruselRelacionados";
export const ItemDesktop = ({ id }) => {
  const contexto = useContext(AppContext);
  const [oldPrice, setOldPrice] = useState(0);
  const [count, setCount] = useState(1);
  const [talla, setTalla] = useState("");
  const [showModal, setShowModal] = useState(false);
  //productos variables para el carrusel
  const [ImagenesCarrusel, setImagenesCarrusel] = useState([]);

  const [mainImage, setMainImage] = useState(contexto.card.URLImagen || "");

  const thumbnails = contexto.card.ImagenesCarrusel || [];

  const AddToCart = () => {
    if (talla !== "") {
      const oldItems = JSON.parse(localStorage.getItem("items")) || [];
      const item = {
        id: contexto.card.Id,
        title: contexto.card.Titulo,
        price: contexto.card.PrecioVenta * count,
        img: contexto.card.URLImagen,
        talla: talla,
        count: count,
      };
      const found = oldItems.some(
        (el) => el.id === item.id && el.talla === item.talla
      );
      if (found) {
        const newCart = oldItems.map((itemMap) => {
          if (itemMap.id === item.id && itemMap.talla === item.talla) {
            itemMap.count = itemMap.count + item.count;
          }
          return itemMap;
        });
        contexto.setCart(newCart.length);
        localStorage.setItem("items", JSON.stringify(newCart));
        const aviso = document.querySelector(".aviso");
        aviso.classList.add("mostrar");
        setTimeout(() => {
          aviso.classList.remove("mostrar");
        }, 1000);
        return;
      } else {
        oldItems.push(item);
        contexto.setCart(oldItems.length);
        localStorage.setItem("items", JSON.stringify(oldItems));
      }
      const aviso = document.querySelector(".aviso");
      aviso.classList.add("mostrar");
      setTimeout(() => {
        aviso.classList.remove("mostrar");
      }, 1000);
    } else {
      document.getElementById("modalAviso").showModal();
    }
  };

  useEffect(() => {
    if (contexto.card.Descuento != 0) {
      const precioVenta = Number(contexto.card.PrecioVenta);
      const oldPriceCalculate = Number(
        (precioVenta * (contexto.card.Descuento / 100 + 1)).toFixed(2)
      );
      setOldPrice(oldPriceCalculate);
    } else {
      const precioVenta = Number(contexto.card.PrecioVenta);
      const oldPriceCalculate = Number((precioVenta * 1.15).toFixed(2));
      setOldPrice(oldPriceCalculate);
    }

    const cart = JSON.parse(localStorage.getItem("items")) || [];
    contexto.setCart(cart.length);
    window.scrollTo(0, 0);
    if (id) {
      const url = `${URL}/producto/conseguir/${id}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          contexto.setCard({
            Descripcion: data.Descripcion,
            Titulo: data.Titulo,
            PrecioVenta: data.PrecioVenta,
            ImagenesCarrusel: data.ImagenesCarrusel,
            ListaTallas: data.ListaTallas,
            Descuento: data.Descuento,
            PrecioAquisicion: data.PrecioAquisicion,
            URLImagen: data.URLImagen,
            Id: data.Id,
          });
          setMainImage(data.URLImagen);
        });
    } else {
      const url = `${URL}/producto/conseguir/${1}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          contexto.setCard({
            Descripcion: data.Descripcion,
            Titulo: data.Titulo,
            PrecioVenta: data.PrecioVenta,
            ImagenesCarrusel: data.ImagenesCarrusel,
            ListaTallas: data.ListaTallas,
            Descuento: data.Descuento,
            PrecioAquisicion: data.PrecioAquisicion,
            URLImagen: data.URLImagen,
            Id: data.Id,
          });
          setMainImage(data.URLImagen);
        });
    }
    const url = `${URL}/producto/conseguir/aleatorio`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setImagenesCarrusel(data);
      });
  }, [id]);
  return (
    <div className="flex justify-center flex-wrap">
      <div className="flex mt-24 p-4 w-full">
        <div className="flex flex-col space-y-2">
          {thumbnails.map((thumb, index) => (
            <img
              key={index}
              src={thumb}
              alt={`Shoe ${index}`}
              className="w-20 h-20 object-cover cursor-pointer rounded-md bg-gray-200"
              onMouseEnter={() => setMainImage(thumb)}
            />
          ))}
        </div>

        <div className="flex-1 ml-4">
          <div className="flex  p-4 rounded-lg">
            <img
              src={mainImage}
              alt="Shoe"
              className="w-1/2 h-full object-cover rounded-sm bg-gray-100"
            />
            <div className="w-1/2 pl-4">
              <div className="flex justify-between items-center mt-2">
                <span className="text-xl font-bold text-gray-700">
                  {contexto.card.Titulo}
                </span>
                <Favoritos
                  idProducto={contexto.card.Id}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              </div>
              <span className="block text-gray-600 text-sm mb-6">
                Lo mejor de estrenar con nosotros
              </span>

              <span className="text-lg font-bold text-gray-950">
                $ {contexto.card.PrecioVenta}
              </span>

              <div className="flex mt-8 space-x-2">
                {thumbnails.map((thumb, index) => (
                  <div
                    key={index}
                    className="w-1/3 h-22 border flex items-center justify-center cursor-pointer"
                    onMouseEnter={() => setMainImage(thumb)}
                  >
                    <img
                      src={thumb}
                      alt={`Color Option ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <p className="mt-4 ml-4 text-gray-600">Talla</p>
              <div className="flex flex-wrap gap-2 justify-between  w-full overflow-x-auto">
                {contexto.card &&
                  contexto.card.ListaTallas &&
                  contexto.card.ListaTallas.length > 0 &&
                  contexto.card.ListaTallas.map((tallaMap, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          setTalla(tallaMap.IdTalla);
                        }}
                        className={`${
                          talla === tallaMap.IdTalla
                            ? "bg-black text-gray-200"
                            : "bg-white text-black"
                        } w-1/4 h-10 text-center rounded-md border-gray-200 text-xs talla text-black font-semibold`}
                      >
                        CM {tallaMap.Talla}
                      </button>
                    );
                  })}
              </div>

              <div className="block w-3/4  m-auto mt-5  ">
                <div className="flex flex-wrap w-full justify-around contador font-semibold text-lg text-black`">
                  <button
                    className="text-black"
                    onClick={() => {
                      if (count > 1) {
                        setCount(count - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <span className="text-black">{count}</span>
                  <button
                    className="text-black"
                    onClick={() => {
                      setCount(count + 1);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={AddToCart}
                className="agregar-al-carrito mb-10 mt-3 w-3/4 p-4"
              >
                Comprar ahora
              </button>

              <p className="mt-4 text-gray-600 text-sm w-full text-left">
                {contexto.card.Descripcion}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="block w-full">
        <h2 className="text-left text-black font-bold text-2xl mt-4">
          Productos Relacionados
        </h2>
        <CarruselRelacionados item={ImagenesCarrusel} />
      </div>

      <div className="aviso">
        <div className="texto-aviso">
          <span>Artículo Agregado</span>
        </div>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <AuthPageCart show={showModal} onClose={() => setShowModal(false)} />
      </Modal>

      <dialog
        id="modalAviso"
        className="fixed inset-0 z-50  bg-white left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 w-30 h-30 p-4 rounded-lg "
      >
        <div className="flex items-center justify-center h-full w-full">
          <div className="bg-white rounded-lg">
            <p className="py-4 text-red-500 font-semibold">
              Selecciona una talla
            </p>
            <div>
              <form method="dialog" className="w-full">
                <button className="btn w-full bg-primary text-gray-50 w-3/4 p-1 rounded-sm">
                  Cerrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};
