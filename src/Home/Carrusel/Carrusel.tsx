import React, { useState } from "react";
import "./Carrusel.css";
import rojos from "./RojosCarrusel.png";
import vans from "./VansCarrusel.png";
import af1 from "./Af1Carrusel.png";

export const Carrusel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [{
    src: rojos,
    title: "Air Force Rojos",
    description: "Incrementa tu estilo con estas zapatillas rojas"
  },
    {
        src: vans,
        title: "Vans Old Skool",
        description: "Las zapatillas más clásicas de la historia"
    },
    {
        src: af1,
        title: "Air Force 1",
        description: "Las zapatillas más vendidas de la historia, creando estilo en cada paso."
    }
];

  const handleNextImage = () => {
    setTimeout(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 300);

    const carrusel = document.getElementById("carrusel__item");
    carrusel?.classList.add("carrusel__item--next");
    setTimeout(() => {
      carrusel?.classList.remove("carrusel__item--next");
    }, 1000);
  };

  const handlePreviousImage = () => {
    setTimeout(() => {
      setCurrentImage((prevImage) =>
        prevImage === 0 ? images.length - 1 : prevImage - 1
      );
    }, 300);
    const carrusel = document.getElementById("carrusel__item");
    carrusel?.classList.add("carrusel__item--previous");
    setTimeout(() => {
      carrusel?.classList.remove("carrusel__item--previous");
    }, 1000);
  };

  return (
    <div className="carrusel">
      <div id="carrusel__item" className="container_item justify-center">
        <div className="w-full md:w-1/3 order-3 md:order-1 ">
            <h2 className="text-xl text-pink-500 font-semibold text-center md:text-left">{images[currentImage].title}</h2>
            <p className="text-gray-600 text-center md:text-left">{images[currentImage].description}</p>
        </div> 
        <img
          src={images[currentImage].src}
          alt="carrusel__item"
          className="carrusel-image"
          
        />
      </div>
      <button
        onClick={handlePreviousImage}
        className="carrusel-button left-button"
      >
        Anterior
      </button>
      <button
        onClick={handleNextImage}
        className="carrusel-button right-button"
      >
        Siguiente
      </button>
    </div>
  );
};
