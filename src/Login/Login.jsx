import React, { useContext } from "react";
import "./Login.css";
import { login } from "./Peticiones";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const handlerSubmit = async(e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const dataLogin = await login(email, password);
    context.setUser(dataLogin);
    navigate("/admin");
  }
  return (
    <div className="container-login">
      <div className="simple-login-container">
        <form className="simple-login-form" onSubmit={(e)=>{handlerSubmit(e)}}>
          <h2 className="simple-login-title">Login</h2>

          <label htmlFor="email" className="simple-login-label">
            Correo
          </label>
          <input
            type="email"
            id="email"
            className="simple-login-input"
            placeholder="Ingresa tu correo"
          />

          <label htmlFor="password" className="simple-login-label">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="simple-login-input"
            placeholder="Ingresa tu contraseña"
          />

          <button type="submit" className="simple-login-button">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};
