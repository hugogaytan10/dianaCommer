import React, { useContext, useState } from "react";
import flecha from "../assets/arrow-back.svg";
import { useNavigate, NavLink } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { guardarDireccion } from "./Peticiones";
export const AgregarDireccion = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [calle, setCalle] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [estado, setEstado] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [referencia, setReferencia] = useState("");

  const guardar = async () => {
    
    const body = {
        UsuarioId: context.user.Id,
        Calle: calle,
        Ciudad: ciudad,
        Estado: estado,
        CodigoPostal: codigoPostal,
        Referencias: referencia
    }
    guardarDireccion(body, context.user.Token);
    context.setBandera(!context.bandera);
    navigate(-1);
  };

  return (
    <div className="flex flex-wrap flex-col gap-3  w-full justify-center items-center bg-white text-black">
      <div className="bg-white p-2 flex items-center w-full">
        <NavLink
          onClick={() => navigate(-1)}
          className="bg-black  p-2 font-semibold w-10 h-10 flex items-center rounded-full"
        >
          <img alt="regresar" src={flecha} className="h-10 w-10" />
        </NavLink>
      </div>

      <label className="form-control w-10/12">
        <div className="label font-semibold text-primary">
          <span className="label-text ml-4 text-black">Calle</span>
        </div>
        <input
          type="text"
          placeholder="C. Pipila"
          className="w-10/12 datos p-2 ml-4 bg-white"
          onChange={(e) => setCalle(e.target.value)}
        />
      </label>

      <label className="form-control w-10/12">
        <div className="label font-semibold text-primary">
          <span className="label-text ml-4 text-black">Cuidad</span>
        </div>
        <input
          type="text"
          placeholder="León"
          className="w-10/12 datos p-2 ml-4 bg-white"
          onChange={(e) => setCiudad(e.target.value)}
        />
      </label>

      <label className="form-control w-10/12">
        <div className="label font-semibold text-primary">
          <span className="label-text ml-4 text-black">Estado</span>
        </div>
        <input
          type="text"
          placeholder="Guanajuato"
          className="w-10/12 datos p-2 ml-4 bg-white"
          onChange={(e) => setEstado(e.target.value)}
        />
      </label>

      <label className="form-control w-10/12">
        <div className="label font-semibold text-primary">
        </div>
          <span className="label-text ml-4 text-black">Código Postal</span>
        <input
          type="text"
          placeholder="82082"
          className="w-10/12 datos p-2 ml-4 bg-white"
          onChange={(e) => setCodigoPostal(e.target.value)}
        />
      </label>

      <label className="form-control w-10/12">
        <div className="label font-semibold text-primary">
        </div>
          <span className="label-text ml-4 text-black">Referencias</span>
        <textarea
          type="text"
          className="bg-white min-h-32  w-10/12 datos p-2 ml-4"
          placeholder="En frente de una tienda de abarrotes"
          onChange={(e) => setReferencia(e.target.value)}
        />
      </label>

      <button
        onClick={() => {
          guardar();
        }}
        className="btn btn-primary  bg-primary text-gray-50 font-semibold rounded-sm w-2/4 p-2 mb-10"
      >
        Guardar Dirección
      </button>
    </div>
  );
};
