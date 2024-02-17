import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./profile.css";
import flecha from "../assets/arrow-back.svg";
export const Profile = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');

  const Pedir = async () => {
    if (
      nombre === "" ||
      apellido === "" ||
      telefono === "" ||
      direccion === "" 
    ) {
      document.getElementById("modalAviso").showModal();
    } else {
      const carrito = JSON.parse(localStorage.getItem('items') || []);
      const productos = carrito.map((producto) => {
          return {
              nombre: producto.title,
              cantidad: producto.count,
              talla: producto.talla,
              precio: producto.price,
          };
      });

      const total = carrito.reduce((acc, producto) => {
          return acc + producto.price * producto.count;
      }, 0);
      
      const res = await fetch(
        `https://bervk-production.up.railway.app/api/contacto/sendinfo2`,
       //`http://localhost:8090/api/contacto/sendinfo2`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            direccion: direccion,
            productos: productos,
            total: total,
          }),
        }
      );

      if (res.ok) {
        document.getElementById("modalAviso2").showModal();
        //delete the localstorage
        localStorage.removeItem('items');
      }
      
    }
  };
  return (
    <div>
      <div className="bg-primary p-2">
        <NavLink
          onClick={() => navigate(-1)}
          className="bg-white  p-2 font-semibold w-10 h-10 flex items-center rounded-full"
        >
          <img alt='regresar' src={flecha} className="h-10 w-10"/>
        </NavLink>
      </div>

      <div className="flex flex-wrap flex-col gap-3  w-full justify-center items-center bg-white text-black">
        <label className="form-control w-10/12">
          <div className="label font-semibold text-primary">
            <span className="label-text ml-4 text-black">Nombre</span>
          </div>
          <input
            type="text"
            placeholder="Diana"
            className="input input-bordered w-10/12 datos p-2 ml-4 bg-white"
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>

        <label className="form-control w-10/12">
          <div className="label font-semibold text-primary">
            <span className="label-text ml-4 text-black">Apellido</span>
          </div>
          <input
            type="text"
            placeholder="Díaz"
            className="input input-bordered w-10/12 datos p-2 ml-4 bg-white"
            onChange={(e) => setApellido(e.target.value)}
          />
        </label>

        <label className="form-control w-10/12">
          <div className="label font-semibold text-primary">
            <span className="label-text ml-4 text-black">Teléfono</span>
          </div>
          <input
            type="text"
            placeholder="4451701133"
            className="input input-bordered w-10/12 datos p-2 ml-4 bg-white"
            onChange={(e) => setTelefono(e.target.value)}
          />
        </label>

        <label className="form-control w-10/12">
          <div className="label font-semibold text-primary">
            <span className="label-text ml-4 text-black">Dirección</span>
          </div>
          <textarea
            type="text"
            placeholder="Calle pipila #123, Moroleón, Guanajuto, en frente de una tienda de abarrotes"
            className="bg-white min-h-32 input input-bordered w-10/12 datos p-2 ml-4"
            onChange={(e) => setDireccion(e.target.value)}
          />
        </label>

        <button
          onClick={() => {
            Pedir();
          }}
          className="btn btn-primary  bg-primary text-gray-50 font-semibold rounded-sm w-2/4 p-2 mb-10"
        >
          Aceptar
        </button>
      </div>

      <dialog
        id="modalAviso"
        className="fixed inset-0 z-50  bg-white left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 w-30 h-30 p-4 rounded-lg "
      >
        <div className="flex items-center justify-center h-full w-full">
          <div className="bg-white rounded-lg">
            <p className="py-4 text-red-500 font-semibold">
              Llena todos los campos por favor
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

      <dialog
        id="modalAviso2"
        className="fixed inset-0 z-50  bg-white left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 w-30 h-30 p-4 rounded-lg "
      >
        <div className="flex items-center justify-center h-full w-full">
          <div className="bg-white rounded-lg">
            <p className="py-4 text-red-500 font-semibold">
              En seguida nos pondremos en contacto contigo :)
            </p>
            <div>
              <form method="dialog" className="w-full">
                <NavLink
                  to="/"
                  className="btn w-full bg-primary text-gray-50 w-3/4 p-1 rounded-sm"
                >
                  Aceptar
                </NavLink>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};
