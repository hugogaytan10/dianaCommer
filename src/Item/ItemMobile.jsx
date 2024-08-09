import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import carrito from "../assets/cart-outline.svg";
import "./item.css";
import { NavLink } from "react-router-dom";
import flecha from "../assets/arrow-back.svg";
import { CarruselItem } from "./CarruselItem";
import { URL } from "../Const/Const";
import { Favoritos } from "./Favoritos/Favoritos";
import { Modal } from "../utilities/Modal";
import { AuthPageCart } from "../Login/AuthPageCart";
import { CarruselRelacionados } from "./CarruselRelacionados/CarruselRelacionados";
export const ItemMobile = ({id}) => {
  const contexto = useContext(AppContext);
  const [oldPrice, setOldPrice] = useState(0);
  const [count, setCount] = useState(1);
  const [talla, setTalla] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [ImagenesCarrusel, setImagenesCarrusel] = useState([]);

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
      //function to search if the item is already in the cart
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
        //mostramos aviso
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
      //mostramos aviso
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
        (precioVenta * ((contexto.card.Descuento / 100) + 1)).toFixed(2)
      );
      setOldPrice(oldPriceCalculate);
    } else {
      const precioVenta = Number(contexto.card.PrecioVenta);
      const oldPriceCalculate = Number((precioVenta * 1.15).toFixed(2));
      setOldPrice(oldPriceCalculate);
    }

    const cart = JSON.parse(localStorage.getItem("items")) || [];
    contexto.setCart(cart.length);
    //UBICATE ON THE TOP OF THE SCREEN
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
    <div>
      <div className="p-2 absolute z-10">
        <NavLink
          to={"/"}
          className="bg-black  p-2 font-semibold w-10 h-10 flex items-center rounded-full"
        >
          <img alt="regresar" src={flecha} className="h-10 w-10" />
        </NavLink>
      </div>

      <div className="p-2 absolute z-10 right-0">
        <Favoritos idProducto={contexto.card.Id} showModal={showModal} setShowModal={setShowModal}/>
      </div>

      {contexto.card &&
        contexto.card.ImagenesCarrusel &&
        contexto.card.ImagenesCarrusel.length > 0 && (
          <div className="relative m-auto w-full block">
            <CarruselItem images={contexto.card.ImagenesCarrusel} />
          </div>
        )}

      <div className="p-2 bg-white md:w-1/2 md:m-auto">
        <h2 className="text-pink-500 font-bold">Díaz Zapatos y Accesorios</h2>
        <p className="font-extrabold text-xl ml-4 mt-4 text-black">
          {contexto.card.Titulo}
        </p>
        <p className="text-gray-400 font-thin text-sm ml-4 mt-2">
          {contexto.card.Descripcion}
        </p>

        <div className="mt-4 text-black pl-2 flex flex-wrap items-center justify-between w-full">
          <div className="flex items-center">
            <p className="font-extrabold">${contexto.card.PrecioVenta} MXN</p>
            <span className="ml-4 descuento">{contexto.card.Descuento > 0 ? contexto.card.Descuento : '15'}%</span>
          </div>
          <span className="line-through text-sm text-gray-400 mr-4">
            {oldPrice}
          </span>
        </div>

        <p className="mt-4 ml-4">Talla</p>
        <div className="flex flex-wrap gap-2  w-full overflow-x-auto">
          {contexto.card &&
            contexto.card.ListaTallas &&
            contexto.card.ListaTallas.length > 0 &&
            contexto.card.ListaTallas.map((tallaMap, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    setTalla(tallaMap.Talla);
                  }}
                  className={`${
                    talla === tallaMap.Talla
                      ? "bg-black text-gray-200"
                      : "bg-white text-black"
                  } w-1/4 h-10 text-center rounded-lg border-black text-xs  talla text-black font-semibold`}
                >
                  CM {tallaMap.Talla}
                </button>
              );
            })}
        </div>
        <div className="block w-3/4 m-auto mt-5 md:w-1/2">
          <div className="flex flex-wrap w-full justify-around contador font-semibold text-lg text-black`">
            <button
              className="text-black"
              onClick={() => {
                if (count > 2) {
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
          className="agregar-al-carrito mb-10 mt-3 md:w-1/2"
        >
          Agregar Al carrito
        </button>
      </div>

      <div className="block w-full">
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
