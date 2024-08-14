import React from 'react'
import './MetodoPago.css'
import { NavLink, useNavigate } from 'react-router-dom'
import flecha from '../assets/arrow-back.svg';
export const ElegirMetodoPago = () => {

  return (
    <div>
        <NavLink
          to={"/cart"}
          className="bg-black  p-2 font-semibold w-10 h-10 flex items-center rounded-full"
        >
          <img alt="regresar" src={flecha} className="h-10 w-10" />
        </NavLink>
        <h2 className='text-center mt-5 text-gray-700'>Metodos de Pago</h2>
        <div className="flex flex-wrap justify-around mt-40 mb-52">
          <NavLink className="w-2/6 h-32 metodo text-gray-700 p-2 flex justify-center items-center text-center" to={'/pago'}>Tarjeta</NavLink>
          <NavLink className="w-2/6 h-32 metodo text-gray-700 p-2 flex justify-center items-center text-center" to={'/profile'}>Pagar en puerta </NavLink>
        </div>
    </div>
  )
}
