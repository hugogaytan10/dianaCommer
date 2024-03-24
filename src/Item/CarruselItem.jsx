import React, { useState } from "react";
import '../Home/Carrusel/Carrusel.css';
export const CarruselItem = (props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = props.images || [];

  const handleNext = () => {
    setTimeout(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 300);

    const carrusel = document.getElementById("carrusel");
    carrusel?.classList.add("carrusel__item--next");
    setTimeout(() => {
      carrusel?.classList.remove("carrusel__item--next");
    }, 1000);
  };

  const handlePrevious = () => {
    setTimeout(() => {
      setCurrentImage((prevImage) =>
        prevImage === 0 ? images.length - 1 : prevImage - 1
      );
    }, 300);
    const carrusel = document.getElementById("carrusel");
    carrusel?.classList.add("carrusel__item--previous");
    setTimeout(() => {
      carrusel?.classList.remove("carrusel__item--previous");
    }, 1000);
  };

  return (
    <div className="carrusel">
    <div id="carrusel" className="container_item justify-center ">
      
      <img
        src={images[currentImage]}
        alt="carrusel__item"
        className="relative object-contain h-full w-full"
        
      />
    </div>
    <button
      onClick={handlePrevious}
      className="carrusel-button left-button z-20"
    >
      <
    </button>
    <button
      onClick={handleNext}
      className="carrusel-button right-button z-20 text-bold"
    >
      >
    </button>
  </div>
  );
};
