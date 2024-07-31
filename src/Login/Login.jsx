import React from "react";
import "./Login.css";
export const Login = () => {
  return (
    <div className="container-login">
      <div className="simple-login-container">
        <form className="simple-login-form">
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
