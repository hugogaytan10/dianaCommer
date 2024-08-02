import React, { useContext, useEffect, useState, useRef } from "react";
import "./Login.css";
import chrome from "../assets/cromo.png";
import { useNavigate } from "react-router-dom";
import { loginToServer, signUpToServer } from "./Peticiones";
import { AppContext } from "../Context/AppContext";
export const AuthPage: React.FC = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  /*
  const signUpButton = document.getElementById("signUp"); //para escritorio
  const signUpButtonMobile = document.getElementById("signUp-Mobile"); //para mobile
  const signInButtonMobile = document.getElementById("signIn-Mobile"); //para mobile
  const containerSignUpMobile = document.getElementById("sign-in-container"); //contendor de iniciar sesion
  const containerSignUp = document.getElementById("sign-up-container"); //contenedor de crear cuenta
  const signInButton = document.getElementById("signIn");
  const container = document.getElementById("container");

  signUpButton?.addEventListener("click", () => {
    container?.classList.add("right-panel-active");
  });
  //cuando presione el boton de crear cuenta en mobile
  //se activara el panel de crear cuenta
  //y se desactivara el panel de iniciar sesion
  signUpButtonMobile?.addEventListener("click", () => {
    containerSignUpMobile?.classList.add("hidden-sign-in");
    containerSignUp?.classList.add("show-sign-in");
    //agregar la clase right-panel-active solo si la pantalla tien mas
    //de 768px
    if (window.innerWidth > 768) {
      container?.classList.add("right-panel-active");
    }
  });
  signInButtonMobile?.addEventListener("click", () => {
    containerSignUpMobile?.classList.remove("hidden-sign-in");
    containerSignUp?.classList.remove("show-sign-in");
    //agregar la clase right-panel-active solo si la pantalla tien mas
    //de 768px
    if (window.innerWidth > 768) {
      container?.classList.remove("right-panel-active");
    }
  });
  signInButton?.addEventListener("click", () => {
    container?.classList.remove("right-panel-active");
  });


*/

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
    const dataSignUp = await signUpToServer(name, email, password);
    if (dataSignUp) {
      //si todo fue cvalido guardar el correo y contraseña en el localstorage
      //como un objeto user
      localStorage.setItem("user", JSON.stringify({ email, password }));
      context.setUser(dataSignUp);
      navigate("/");
    }
  };

  const login = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const dataLogin = await loginToServer(email, password);
    if (dataLogin) {
      //si todo fue cvalido guardar el correo y contraseña en el localstorage
      //como un objeto user
      localStorage.setItem("user", JSON.stringify({ email, password }));
      context.setUser(dataLogin);
      //redireccionar a la pagina dependiendo el tipo de usuario
      if (dataLogin.TipoUsuario == "0") {
        navigate("/");
      } else {
        navigate("/admin");
      }
    }
  };
  useEffect(() => {
    //verificamos si contamos con un usuario en el localstorage
    const user = localStorage.getItem("user");
    if (user) {
      const { email, password } = JSON.parse(user);
      loginToServer(email, password).then((data) => {
        if (data) {
          context.setUser(data);
          if (data.TipoUsuario == "0") {
            navigate("/");
          } else {
            navigate("/admin");
          }
        }
      });
    }
  }, []);
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
            className="w-full"
            onSubmit={(e) => {
              creatAccount(e);
            }}
          >
            <h1>Crear Cuenta</h1>
            <div className="social-container">
              <img src={chrome} className="social" alt="google" />
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
            onSubmit={(e) => {
              login(e);
            }}
          >
            <h1>Iniciar Sesión</h1>
            <div className="social-container">
              <img src={chrome} className="social" alt="google" />
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
