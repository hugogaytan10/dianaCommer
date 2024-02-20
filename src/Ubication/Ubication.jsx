import React, { useState, useEffect } from "react";

export const Ubication = () => {
  // Estado para controlar si el mapa está cargando
  const [isLoading, setIsLoading] = useState(true);

  // Simula el tiempo de carga del mapa antes de mostrarlo
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Establece isLoading en false después de un tiempo
    }, 3000); // Puedes ajustar este tiempo según sea necesario

    // Limpieza del temporizador al desmontar el componente
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h3 className="text-xl text-center text-black font-extrabold m-4">
        Ubicación
      </h3>
      <p className="text-center text-black m-2">
        Plaza Metropilitana de Moroleón Local <strong>14 A</strong>
      </p>
      <p className="text-center text-black m-2 font-semibold">
        445-111-33-70 o 445-129-09-37
      </p>
      <div className="w-full">
        {isLoading ? (
          // Muestra el esqueleto mientras isLoading es true
          <div className="flex flex-col gap-4 w-52 m-auto">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        ) : (
          // Muestra el mapa una vez que isLoading es false
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d936.4971868778423!2d-101.18539148464376!3d20.134517049284533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842cfaea088744d3%3A0x1bca8f42c7445268!2sPlaza%20Textil%20Metropolitana!5e0!3m2!1ses-419!2smx!4v1708207540402!5m2!1ses-419!2smx"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full m-auto"
          ></iframe>
        )}
      </div>
    </div>
  );
};
