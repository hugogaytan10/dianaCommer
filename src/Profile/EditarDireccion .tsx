import React, { useContext, useState } from "react";
import flecha from "../assets/arrow-back.svg";
import { useNavigate, NavLink, useParams   } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { editarDireccion } from "./Peticiones";
export const EditarDireccion = () => {
  const navigate = useNavigate();
  const { Id, calle, ciudad, estado, codigoPostal, referencia } = useParams();
  const context = useContext(AppContext);
  const [calleEditar, setCalleEditar] = useState(calle);
  const [ciudadEditar, setCiudadEditar] = useState(ciudad);
  const [estadoEditar, setEstadoEditar] = useState(estado);
  const [codigoPostalEditar, setCodigoPostalEditar] = useState(codigoPostal);
  const [referenciaEditar, setReferenciaEditar] = useState(referencia);

  const guardar = async () => {
    const body = {
      Id: Id,
      UsuarioId: context.user.Id,
      Calle: calleEditar,
      Ciudad: ciudadEditar,
      Estado: estadoEditar,
      CodigoPostal: codigoPostalEditar,
      Referencias: referenciaEditar,
    };
    editarDireccion(body, context.user.Token);
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
          value={calleEditar}
          onChange={(e) => setCalleEditar(e.target.value)}
        />
      </label>

      <label className="form-control w-10/12">
        <div className="label font-semibold text-primary">
          <span className="label-text ml-4 text-black">Cuidad</span>
        </div>
        <input
          type="text"
          placeholder="León"
          value={ciudadEditar}
          className="w-10/12 datos p-2 ml-4 bg-white"
          onChange={(e) => setCiudadEditar(e.target.value)}
        />
      </label>

      <label className="form-control w-10/12">
        <div className="label font-semibold text-primary">
          <span className="label-text ml-4 text-black">Estado</span>
        </div>
        <input
          type="text"
          placeholder="Guanajuato"
          value={estadoEditar}
          className="w-10/12 datos p-2 ml-4 bg-white"
          onChange={(e) => setEstadoEditar(e.target.value)}
        />
      </label>

      <label className="form-control w-10/12">
        <div className="label font-semibold text-primary">
        </div>
          <span className="label-text ml-4 text-black">Código Postal</span>
        <input
          type="text"
          placeholder="82082"
          value={codigoPostalEditar}
          className="w-10/12 datos p-2 ml-4 bg-white"
          onChange={(e) => setCodigoPostalEditar(e.target.value)}
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
          value={referenciaEditar}
          onChange={(e) => setReferenciaEditar(e.target.value)}
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
