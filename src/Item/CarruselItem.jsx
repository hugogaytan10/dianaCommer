import React, { useState, useRef, useContext } from "react";
import "../Home/Carrusel/Carrusel.css";
import share from "../assets/share.svg";
import { AppContext } from "../Context/AppContext";
export const CarruselItem = (props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const carouselRef = useRef(null);
  const lastScrollLeft = useRef(0); // Almacena la última posición de scroll conocida
  const contexto = useContext(AppContext);
  const [loaded, setLoaded] = useState(false);


  const handleScroll = () => {
    const scrollLeft = carouselRef.current.scrollLeft;
    lastScrollLeft.current = scrollLeft; // Actualiza la última posición de scroll conocida

    // Aquí puedes usar 'direction' si necesitas realizar acciones específicas
    // dependiendo de si el usuario hizo scroll hacia la derecha o hacia la izquierda

    const totalWidth =
      carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
    const newCurrentImage = Math.round(
      (scrollLeft / totalWidth) * (props.images.length - 1)
    );

    if (newCurrentImage !== currentImage) {
      setCurrentImage(newCurrentImage);
    }
  };

  return (
    <div
      ref={carouselRef}
      className="w-full carousel rounded-box h-96 overflow-auto "
      onScroll={handleScroll}
    >
      <div className="flex">
        {props.images.map((img, index) => (
          <div
            key={index}
            className={`carousel-item w-full flex-shrink-0 flex justify-center items-center`}
          >
            <img
              src={img}
              alt={`imagen ${index + 1}`}
              className="w-full h-full object-contain object-center"
              style={{ display: loaded ? "block" : "none" }}
              onLoad={() => setLoaded(true)}

            />
            {!loaded && (
            <div className="flex flex-col gap-4 w-52">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          )}
          </div>
        ))}
      </div>
      {/* Toast para mostrar el índice actual de la imagen / total de imágenes */}
      <div className="absolute bottom-0 right-2  text-gray-300 py-0 px-2 rounded-md z-10 bg-primary opacity-60">
        {currentImage + 1} | {props.images.length}
      </div>
      <div className="absolute bottom-0 left-0  text-gray-100 py-0 px-2 rounded-md z-10 ">
        <a
          href={`https://wa.me/?text=Mira%20estos%20increíbles%20tenis%20en%20www.calzadodiaz.com/item/${contexto.card.Id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={share} alt="share" className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
};
