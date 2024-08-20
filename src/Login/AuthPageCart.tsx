import React, { useContext, useEffect, useState, useRef } from "react";
import "./Login.css";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { loginToServer, signUpToServer } from "./Peticiones";
import { AppContext } from "../Context/AppContext";
import { jwtDecode } from "jwt-decode";
interface DecodedToken {
  name: string;
  email: string;
  picture: string;
}
interface AuthPageCartProps {
  show: boolean;
  onClose: () => void;
}
export const AuthPageCart: React.FC<AuthPageCartProps> = ({
  show,
  onClose,
}) => {
  const context = useContext(AppContext);

  // Referencias a los elementos del DOM
  const signUpButtonRef = useRef<HTMLButtonElement>(null);
  const signUpMobileButtonRef = useRef<HTMLButtonElement>(null);
  const signInMobileButtonRef = useRef<HTMLButtonElement>(null);
  const signInButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerSignUpMobileRef = useRef<HTMLDivElement>(null);
  const containerSignUpRef = useRef<HTMLDivElement>(null);

  // Añadir event listeners al montar el componente
  useEffect(() => {
    const signUpButton = signUpButtonRef.current;
    const signUpMobileButton = signUpMobileButtonRef.current;
    const signInMobileButton = signInMobileButtonRef.current;
    const signInButton = signInButtonRef.current;
    const container = containerRef.current;
    const containerSignUpMobile = containerSignUpMobileRef.current;
    const containerSignUp = containerSignUpRef.current;

    const handleSignUpClick = () => {
      container?.classList.add("right-panel-active");
    };

    const handleSignUpMobileClick = () => {
      containerSignUpMobile?.classList.add("hidden-sign-in");
      containerSignUp?.classList.add("show-sign-in");
      if (window.innerWidth > 768) {
        container?.classList.add("right-panel-active");
      }
    };

    const handleSignInMobileClick = () => {
      containerSignUpMobile?.classList.remove("hidden-sign-in");
      containerSignUp?.classList.remove("show-sign-in");
      if (window.innerWidth > 768) {
        container?.classList.remove("right-panel-active");
      }
    };

    const handleSignInClick = () => {
      container?.classList.remove("right-panel-active");
    };

    signUpButton?.addEventListener("click", handleSignUpClick);
    signUpMobileButton?.addEventListener("click", handleSignUpMobileClick);
    signInMobileButton?.addEventListener("click", handleSignInMobileClick);
    signInButton?.addEventListener("click", handleSignInClick);

    // Limpiar listeners al desmontar
    return () => {
      signUpButton?.removeEventListener("click", handleSignUpClick);
      signUpMobileButton?.removeEventListener("click", handleSignUpMobileClick);
      signInMobileButton?.removeEventListener("click", handleSignInMobileClick);
      signInButton?.removeEventListener("click", handleSignInClick);
    };
  }, []);

  const creatAccount = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    if (name && email && password) {
      const dataSignUp = await signUpToServer(name, email, password);
      if (dataSignUp) {
        localStorage.setItem("user", JSON.stringify({ email, password }));
        context.setUser(dataSignUp);
        onClose(); // Mover aquí para cerrar solo si el registro fue exitoso
      }
    }
  };

  const login = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const dataLogin = await loginToServer(email, password);
    if (dataLogin) {
      //console.log("entro al login", dataLogin);
      localStorage.setItem("user", JSON.stringify({ email, password }));
      context.setUser(dataLogin);
      onClose(); // Mover aquí para cerrar solo si el inicio de sesión fue exitoso
    }
  };

  const responseMessage = async (response: CredentialResponse) => {
    if (response.credential) {
      const token = response.credential;
      try {
        const decoded: DecodedToken = jwtDecode(token);
        const dataLogin = await loginToServer(decoded.email, "");
        if (!dataLogin) {
          const dataSignUp = await signUpToServer(
            decoded.name,
            decoded.email,
            ""
          );
          if (dataSignUp) {
            context.setUser(dataSignUp);
            onClose(); // Mover aquí para cerrar solo si el registro fue exitoso
          }
          return;
        }
        context.setUser(dataLogin);
        onClose(); // Mover aquí para cerrar solo si el inicio de sesión fue exitoso
      } catch (error) {
        console.error("Error decoding token: ", error);
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="container" id="container" ref={containerRef}>
        <div
          className="form-container sign-up-container"
          id="sign-up-container"
          ref={containerSignUpRef}
        >
          <form
            action="#"
            className="w-full form-login"
            onSubmit={(e) => {
              creatAccount(e);
            }}
          >
            <h1>Crear Cuenta</h1>
            <div className="social-container">
              <GoogleLogin onSuccess={responseMessage} />{" "}
            </div>
            <span>O usa tu correo para registrarte</span>
            <input type="text" placeholder="Nombre" className="input-login" />
            <input type="email" placeholder="Correo" className="input-login" />
            <input
              type="password"
              placeholder="Contraseña"
              className="input-login"
            />
            <button className="btn-login">Registrarme</button>
            <button
              className="btn-crear-cuenta"
              id="signIn-Mobile"
              ref={signInMobileButtonRef}
            >
              Tengo Cuenta
            </button>
          </form>
        </div>
        <div
          className="form-container sign-in-container"
          id="sign-in-container"
          ref={containerSignUpMobileRef}
        >
          <form
            action="#"
            className="form-login"
            onSubmit={(e) => {
              login(e);
            }}
          >
            <h1>Iniciar Sesión</h1>
            <div className="social-container">
              <GoogleLogin onSuccess={responseMessage} />
            </div>
            <span>o usa tu cuenta</span>
            <input type="email" placeholder="Correo" className="input-login" />
            <input
              type="password"
              placeholder="Contraseña"
              className="input-login"
            />
            <a href="#" className="self-end text-xs mt-2 mb-2">
              Olvidaste tu contraseña?
            </a>
            <button className="btn-login mt-2">Iniciar Sesión</button>
            <button
              className="btn-crear-cuenta mt-3"
              id="signUp-Mobile"
              ref={signUpMobileButtonRef}
            >
              Crear Cuenta
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h2>Hola de Nuevo!</h2>
              <p className="mt-2">
                Para seguir conectado con nosotros por favor inicia sesión con
                tus datos personales
              </p>
              <button
                className="ghost btn-login mt-2"
                id="signIn"
                ref={signInButtonRef}
              >
                Inicio de Sesión
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h2>Hola, Bienvenido</h2>
              <p className="mt-2">Ingresa tus datos y comienza a comprar</p>
              <button
                className="ghost btn-login mt-2"
                id="signUp"
                ref={signUpButtonRef}
              >
                Crear Cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
