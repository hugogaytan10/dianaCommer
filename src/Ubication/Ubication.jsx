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
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d468.283008539001!2d-101.19212157974617!3d20.123027990910124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2smx!4v1722365151557!5m2!1ses-419!2smx" width="600" height="450"  allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" style={{margin: 'auto'}}></iframe>
        )}
      </div>
    </div>
  );
};
