import React, { useState } from "react";
import carritoAzul from "../../assets/cart-outline-blue.svg";
import { NavLink } from "react-router-dom";
export const Card = (props) => {
  const { title, price, img, id } = props;
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`card rounded-none bg-white shadow-sm `}>
      <figure className="h-1/4 h-96">
        <NavLink
          to={`/item/${id}`}
          className="h-full w-full"
        >
          <img
            src={img}
            alt="Shoes"
            className="object-contain h-full w-full"
            onLoad={() => setLoaded(true)}
            style={{ display: loaded ? "block" : "none" }}
          />
          {!loaded && (
            <div className="flex flex-col gap-4 w-52">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          )}
        </NavLink>
      </figure>
      <div className="card-body p-1">
        <h2 className="text-black card-title font-semibold flex justify-between mt-1">
          {title}
        </h2>
        <div className="card-actions flex justify-between items-end w-full mt-2 ">
          <p className="text-gray-400 font-thin text-sm">{price} MXN</p>
          <NavLink
            to={"/item"}
          >
            <img src={carritoAzul} alt="carrito" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
