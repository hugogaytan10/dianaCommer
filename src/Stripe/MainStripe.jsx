import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import FormularioPago from "./FormularioPago";
import flecha from "../assets/arrow-back.svg";
import { NavLink } from "react-router-dom";
import { URL } from "../Const/Const";
import { AppContext } from "../Context/AppContext";
import { crearOrden } from "./Peticiones";
const stripePromise = loadStripe(
  "pk_live_51P0QdE06slOooMaorztN5sw1yxJdDrJxYnkB8JhTIFPZNymTwy60IImUw7Q2jZ8ag5VDUnslqsjPL3bqmrZaeMxX00b3dFtBRd"
);
export const MainStripe = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(0);
  const context = useContext(AppContext);

  useEffect(() => {
    //rescatar el carrito
    const cart = JSON.parse(localStorage.getItem("items")) || [];
    const amount = cart.reduce((acc, item) => acc + item.price, 0);
    setCart(cart);
    setAmount(amount);
    //insertar Orden
    crearOrden(cart, context.user.Token, context.user.Id, amount);

    const getClientSecret = async () => {
      fetch(`${URL}/pago`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: context.user.Token,
        },
        body: JSON.stringify({
          amount: amount,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setClientSecret(data);
        });
    };
    getClientSecret();
  }, []);

  const appearance = {
    theme: "flat",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div>
      <div className="p-2 absolute z-10">
        <NavLink
          to={"/metodoPago"}
          className="bg-black  p-2 font-semibold w-10 h-10 flex items-center rounded-full"
        >
          <img alt="regresar" src={flecha} className="h-10 w-10" />
        </NavLink>
      </div>

      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <FormularioPago />
        </Elements>
      )}
    </div>
  );
};
