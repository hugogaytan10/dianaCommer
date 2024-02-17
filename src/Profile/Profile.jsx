import React from "react";
import { NavLink } from "react-router-dom";
import "./profile.css";
export const Profile = () => {
  return (
    <div>
      <div className="bg-primary p-2">
        <NavLink to={"/cart"} className="bg-white rounded-md p-2 font-semibold">
          Carrito
        </NavLink>
      </div>

      <div className="flex flex-wrap flex-col gap-3 mt-4 w-full justify-center items-center">
        <label className="form-control w-10/12">
          <div className="label font-semibold text-primary">
            <span className="label-text ml-4">Nombre</span>
          </div>
          <input
            type="text"
            placeholder="Diana"
            className="input input-bordered w-10/12 datos p-2 ml-4"
          />
        </label>

        <label className="form-control w-10/12">
          <div className="label font-semibold text-primary">
            <span className="label-text ml-4">Apellido</span>
          </div>
          <input
            type="text"
            placeholder="Díaz"
            className="input input-bordered w-10/12 datos p-2 ml-4"
          />
        </label>

        <label className="form-control w-10/12">
          <div className="label font-semibold text-primary">
            <span className="label-text ml-4">Teléfono</span>
          </div>
          <input
            type="text"
            placeholder="4451701133"
            className="input input-bordered w-10/12 datos p-2 ml-4"
          />
        </label>

        <label className="form-control w-10/12">
          <div className="label font-semibold text-primary">
            <span className="label-text ml-4">Dirección</span>
          </div>
          <textarea
            type="text"
            placeholder="Calle pipila #123, Moroleón, Guanajuto, en frente de una tienda de abarrotes"
            className="min-h-32 input input-bordered w-10/12 datos p-2 ml-4"
          />
        </label>

        <button className="btn btn-primary  bg-primary text-gray-50 font-semibold rounded-sm w-2/4">Aceptar</button>

      </div>
    </div>
  );
};
