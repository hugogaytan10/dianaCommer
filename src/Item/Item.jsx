import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import carrito from "../assets/cart-outline.svg";
import "./item.css";
import { NavLink } from "react-router-dom";
export const Item = () => {
  const contexto = useContext(AppContext);
  const [oldPrice, setOldPrice] = useState(0);
  const [count, setCount] = useState(1);
  const [talla, setTalla] = useState("");
  const [cart, setCart] = useState(0);

  const AddToCart = () => {
    if (talla !== "") {
      const oldItems = JSON.parse(localStorage.getItem("items")) || [];
      const item = {
        id: contexto.card.id,
        title: contexto.card.title,
        price: contexto.card.price * count,
        img: contexto.card.img,
        talla: talla,
        count: count,
      };
      oldItems.push(item);
      setCart(oldItems.length);
      localStorage.setItem("items", JSON.stringify(oldItems));

      //mostramos aviso
      const aviso = document.querySelector(".aviso");
      aviso.classList.add("mostrar");
      setTimeout(() => {
        aviso.classList.remove("mostrar");
      }, 2000);
    } else {
      document.getElementById("modalAviso").showModal();
    }
  };

  useEffect(() => {
    const oldPriceCalculate = contexto.card.price * 1.15;
    setOldPrice(oldPriceCalculate);
    const cart = JSON.parse(localStorage.getItem("items")) || [];
    setCart(cart.length);
  }, []);

  return (
    <div>
      <div className="bg-black flex flex-wrap justify-between p-2">
        <NavLink to={"/"} className="bg-white rounded-md p-2 font-semibold">
          Regresar
        </NavLink>
        <div className="contenedor-carrito">
          <span className="mt-1">{cart}</span>
          <NavLink to={"/cart"}>
            <img src={carrito} alt="carrito" />
          </NavLink>
        </div>
      </div>

      <img src={contexto.card.img} alt="shoes" />

      <div className="p-2">
        <h2 className="text-pink-500 font-bold">Diana Zapatos y Accesorios</h2>
        <p className="font-extrabold text-xl ml-4 mt-4">
          {contexto.card.title}
        </p>
        <p className="text-gray-400 font-thin text-sm ml-4 mt-2">
          {contexto.card.description}
        </p>

        <div className="mt-4 pl-2 flex flex-wrap items-center justify-between w-full">
          <div className="flex items-center">
            <p className="font-extrabold">${contexto.card.price} MXN</p>
            <span className="ml-4 descuento">15%</span>
          </div>
          <span className="line-through text-sm text-gray-400 mr-4">
            {oldPrice}
          </span>
        </div>

        <p className="mt-4 ml-4">Talla</p>
        <div className="flex flex-wrap gap-2 ml-4 w-full overflow-x-auto">
          {contexto.card.tallas.length > 0 &&
            contexto.card.tallas.map((tallaMap, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    setTalla(tallaMap);
                  }}
                  className={`${
                    talla === tallaMap
                      ? "bg-black text-gray-200"
                      : "bg-white text-black"
                  } w-8 h-8 text-center rounded-full border-black  talla`}
                >
                  {tallaMap}
                </button>
              );
            })}
        </div>
        <div className="block w-3/4 m-auto mt-4">
          <div className="flex flex-wrap w-full justify-around contador font-semibold text-lg">
            <button
              onClick={() => {
                if (count > 2) {
                  setCount(count - 1);
                }
              }}
            >
              -
            </button>
            <span>{count}</span>
            <button
              onClick={() => {
                setCount(count + 1);
              }}
            >
              +
            </button>
          </div>
        </div>

        <button onClick={AddToCart} className="agregar-al-carrito">
          Agregar Al carrito
        </button>
      </div>

      <div className="aviso">
        <div className="texto-aviso">
          <span>Artículo Agregado</span>
        </div>
      </div>

      <dialog
        id="modalAviso"
        className="fixed inset-0 z-50  bg-white left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 w-30 h-30 p-4 rounded-lg "
      >
        <div className="flex items-center justify-center h-full w-full">
          <div className="bg-white rounded-lg">
            <p className="py-4 text-blue-800 font-semibold">
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
