import React, { useContext } from "react";
import carritoAzul from "../../assets/cart-outline-blue.svg";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
export const Card = (props) => {
  const { title, price, img, description, tallas } = props;
  const contexto = useContext(AppContext);
  const NewStateContext = () => {
    contexto.setCard({ img, title, price, description, tallas });
  };
  return (
    <div className="card bg-white shadow-sm">
      <figure className="h-3/4">
        <NavLink
          to={"/item"}
          onClick={() => {
            NewStateContext();
          }}
          className="h-full w-full"
        >
          <img src={img} alt="Shoes" className="object-cover h-full w-full" />
        </NavLink>
      </figure>
      <div className="card-body p-1">
        <h2 className="text-black card-title font-semibold flex justify-between mt-1">
          {title}
        </h2>
        <div className="card-actions flex justify-between items-end w-full mt-2 ">
          <p className="text-gray-400 font-thin text-sm">{price} MXN</p>
          <NavLink to={'/item'} onClick={()=>{
            NewStateContext();
          }}>
            <img src={carritoAzul} alt="carrito" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
