import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import flecha from "../assets/arrow-back.svg";
import carrito from "../assets/cart-outline.svg";
import "./cart.css";
export const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const UpdateAmount = (id, talla, accion) => {
    if (accion === 1) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          if (item.count > 1 && item.talla === talla) {
            item.count = item.count - 1;
          }
        }
        return item;
      });
      setCart(newCart);
      localStorage.setItem("items", JSON.stringify(newCart));
    } else if (accion === 2) {
      const newCart = cart.map((item) => {
        if (item.id === id && item.talla === talla) {
          item.count = item.count + 1;
        }
        return item;
      });
      setCart(newCart);
      localStorage.setItem("items", JSON.stringify(newCart));
    } else {
      const newCart = cart.filter(
        (item) => item.id !== id || item.talla !== talla
      );
      setCart(newCart);
      localStorage.setItem("items", JSON.stringify(newCart));
    }
  };
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("items")) || [];
    setCart(cart);
  }, []);
  return (
    <div>
      <div className="bg-white p-2">
        <NavLink
          onClick={() => navigate(-1)}
          className="bg-black  p-2 font-semibold w-10 h-10 flex items-center rounded-full"
        >
          <img alt="regresar" src={flecha} className="h-10 w-10" />
        </NavLink>
      </div>
      <div className="flex flex-wrap contenedor-cart overflow-auto bg-white">
        {cart.length > 0 ? (
          cart?.map((item) => {
            return (
              <div
                key={`item-${item.title}`}
                className="w-11/12 h-40 p-2 flex flex-wrap justify-around carrito text-black overflow-hidden"
              >
                <img
                  src={item.img}
                  alt="shoes"
                  className="h-20 w-20 rounded-sm object-cover self-center md:h-40 md:w-40"
                />
                <div className="w-1/4 flex flex-wrap justify-around items-center flex-col ">
                  <p className="font-semibold">{item.title}</p>
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-gray-300 rounded-full w-8 h-8"
                      onClick={() => {
                        UpdateAmount(item.id, item.talla, 1);
                      }}
                    >
                      -
                    </button>
                    <span className="text-xl">{item.count}</span>
                    <button
                      className="bg-primary rounded-full w-8 h-8 text-gray-50"
                      onClick={() => {
                        UpdateAmount(item.id, item.talla, 2);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col justify-around">
                  <p className="text-xs">${item.price} MXN</p>
                  <p className="text-sm">talla: {item.talla}</p>
                  <p
                    className="text-red-500 "
                    onClick={() => {
                      UpdateAmount(item.id, item.talla, 3);
                    }}
                  >
                    Eliminar
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center w-full items-center flex-wrap">
            <div className="w-full flex flex-wrap items-center justify-center flex-col gap-4">
              <img
                src={carrito}
                alt="carrito"
                className="h-28 block bg-primary rounded-full p-4"
              />
              <p className="text-center text-gray-400 font-semibold block w-full">
                No hay productos en el carrito
              </p>
              <NavLink to={"/"} className={`btn text-gray-100 w-2/4 `}>
                Comprar productos
              </NavLink>
            </div>
          </div>
        )}
      </div>
      {cart.length > 0 && (
        <div className="modal-abajo text-black">
          <div className="flex w-full justify-around mt-4">
            <p className="font-semibold">Total:</p>
            <p className="font-semibold">
              ${cart?.reduce((acc, item) => acc + item.price * item.count, 0)}{" "}
              MXN
            </p>
          </div>
          {cart?.length > 0 && (
            <NavLink
              to={"/metodoPago"}
              className="mt-2 m-auto w-2/4 p-1 block bg-primary text-center text-gray-50 font-semibold rounded-sm"
            >
              Pedir
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
};
