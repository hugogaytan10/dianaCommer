import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import FormularioPago from "./FormularioPago";
const stripePromise = loadStripe(
  "pk_live_51P0QdE06slOooMaorztN5sw1yxJdDrJxYnkB8JhTIFPZNymTwy60IImUw7Q2jZ8ag5VDUnslqsjPL3bqmrZaeMxX00b3dFtBRd"
);
export const MainStripe = () => {
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    //rescatar el carrito
    const cart = JSON.parse(localStorage.getItem("items")) || [];
    const amount = cart.reduce((acc, item) => acc + item.price, 0);
    const getClientSecret = async () => {
      fetch(`https://back-diana-production.up.railway.app/api/pago`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <FormularioPago />
        </Elements>
      )}
    </div>
  );
};
