import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./profile.css";
import flecha from "../assets/arrow-back.svg";
import { Direccion } from "./Direccion";
import { background } from "@cloudinary/url-gen/qualifiers/focusOn";
import { BackgroundColor } from "@cloudinary/url-gen/actions/background/actions/BackgroundColor";
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
    <div className="w-full flex flex-wrap flex-col justify-start items-center  min-h-screen bg-gray-100">


        <div className="bg-white p-2 w-3/4 h-32 mt-4 rounded-lg">
            <h3 className="text-gray-700 font-semibold mb-4">Ajustes</h3>
            <NavLink className="border-b-2 p-2 flex justify-between" to={'/direcciones'}>
              <p className="text-gray-500">Mis Direcciones</p>
              <p className="text-gray-500">{`>`}</p>
            </NavLink>
        </div>

        <div className="bg-white p-2 w-3/4 h-32 mt-4 rounded-lg">
            <h3 className="text-gray-700 font-semibold mb-4">Información</h3>
            <NavLink className="border-b-2 p-2 flex justify-between" to={'/politica'}>
              <p className="text-gray-500">Politica de Privacidad</p>
              <p className="text-gray-500">{`>`}</p>
            </NavLink>
        </div>

    </div>
  );
};
