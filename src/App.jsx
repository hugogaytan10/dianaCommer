import React, { useState, useEffect } from "react";
import "./App.css";
import AppProvider from "./Context/AppContext";
import { Rutas } from "./rutas/rutas";
import { GoogleOAuthProvider } from '@react-oauth/google';
import {Carga} from './PantallaCarga/Carga';
window.addEventListener("scroll", function () {
  let elements = document.getElementsByClassName("scroll-content");
  let screenSize = window.innerHeight;

  for (const item of elements) {
    let element = item;

    if (element.getBoundingClientRect().top < screenSize - 50) {
      element.classList.add("visible");
    } else {
      element.classList.remove("visible");
    }
  }
});
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // El tiempo total de la animación es de 2.4 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);
  return (
    <GoogleOAuthProvider clientId="976511984237-e0tpe248r6f9hn9vkk70k940fmb8rmc3.apps.googleusercontent.com">
      <AppProvider>
      {loading ? <Carga /> : <Rutas />}
      </AppProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
