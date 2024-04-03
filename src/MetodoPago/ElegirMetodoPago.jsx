import React from 'react'
import './MetodoPago.css'
import { NavLink, useNavigate } from 'react-router-dom'
import flecha from '../assets/arrow-back.svg';
export const ElegirMetodoPago = () => {
    const navigate = useNavigate();
  return (
    <div>
        <h2 className='text-center mt-5'>Metodos de Pago</h2>
        <NavLink
          onClick={() => navigate(-1)}
          className="bg-black  p-2 font-semibold w-10 h-10 flex items-center rounded-full"
        >
          <img alt="regresar" src={flecha} className="h-10 w-10" />
        </NavLink>
        <div className="flex flex-wrap justify-around mt-40 mb-52">
          <NavLink className="w-1/4 h-20 metodo" to={'/pago'}>Tarjeta</NavLink>
          <NavLink className="w-1/4 h-20 metodo" to={'/profile'}>Pagar en puerta </NavLink>
        </div>
    </div>
  )
}
