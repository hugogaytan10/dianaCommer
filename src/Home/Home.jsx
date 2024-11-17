import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { Card } from "./card/Card";
import perrito from "../assets/Perrito.webp";
import { AppContext } from "../Context/AppContext";
import { Carrusel } from "./Carrusel/Carrusel";
import Filtrador from "./Filtrador/Filtrador";
import { URL } from "../Const/Const";
import drag from "../assets/drag.gif";
import { getCarruselBanner } from "./Peticiones";
import { CarruselBanner } from "./CarruselBanner/CarruselBanner";
export const Home = () => {
  const contexto = useContext(AppContext);
  const [cards, setCards] = useState([]);
  const [cardFilter, setCardFilter] = useState(cards);
  const [images, setImages] = useState([]);
  const getTennis = async () => {
    const url = `${URL}/producto/conseguir`;
    const response = await fetch(url);
    const data = await response.json();
    setCards(data);
    setCardFilter(data);
  };
  useEffect(() => {
    setTimeout(() => {
      const lastViewedCard = contexto.lastViewedCard;
      if (lastViewedCard) {
        const element = document.querySelector(`[data-id="${lastViewedCard}"]`);
        if (element) {
          // Calcula la posición absoluta del elemento
          const elementRect = element.getBoundingClientRect();
  
          // Ajusta el scroll global de la ventana
          window.scrollTo({
            top: window.scrollY + elementRect.top - 16, // Ajusta el margen si es necesario
            behavior: "smooth", // Scroll suave
          });
        }
      }
    }, 1000);
  }, [contexto.lastViewedCard]);
  
  useEffect(() => {
    const itemsCart = JSON.parse(localStorage.getItem("items")) || [];
    contexto.setCart(itemsCart.length);
    getTennis();
    getCarruselBanner().then((data) => {
      setImages(data);
    });
  }, []);
  return (
    <div className="block min-h-screen w-full bg-white">
      {/**
        <div className="contenedor-buscador">
        <div className="inputIcono">
          <input
            type="text"
            className="inputBuscador"
            placeholder="AF1"
            onChange={(e) => {
              Buscador(e.target.value);
            }}
          />
          <img src={buscador} alt="buscador" />
        </div>
      </div>
       */}
      {images.length > 0 ? <CarruselBanner images={images} /> : <Carrusel />}

      <h1 className="text-center font-thin m-4 text-gray-500 text-sm">
        Todo tipo de calzado (zapato, tennis deportivos, hombre, mujer, niño) en
        Moroleón, Guanajuato{" "}
      </h1>
      <div className="flex justify-end w-full flex-wrap">
        <button
          className="text-gray-600 underline mr-10"
          onClick={() => {
            document.getElementById("modal_filtrar").showModal();
          }}
        >
          Filtrar
        </button>
      </div>
      <Filtrador cards={cards} setCardFilter={setCardFilter} />

      <div className="w-11/12 flex flex-wrap justify-between p-2 items-center m-auto">
        {cardFilter.length > 0 ? (
          cardFilter.map((card) => {
            return (
              <div
                data-id={`tennis-home-${card.Id}`}
                key={`tennis-home-${card.Id}`}
                className={`contenedor-card rounded-none scroll-content ${
                  card.Id % 2 == 0 ? "mt-16" : "mt-0"
                }
                  ${card.Id > 4 ? "fadeRight" : ""}
                  `}
                onClick={() => {
                  contexto.setCard(card);
                  contexto.setLastViewedCard(`tennis-home-${card.Id}`);
                }}
              >
                <Card
                  title={card.Titulo}
                  price={card.PrecioVenta}
                  img={card.URLImagen}
                  description={card.Descripcion}
                  id={card.Id}
                />
              </div>
            );
          })
        ) : (
          <div className="w-full flex flex-wrap justify-center items-center mt-8">
            <h3 className="w-full text-center font-extrabold text-xl text-gray-400">
              No se encontraron resultados
            </h3>
            <img
              src={perrito}
              alt="imagen"
              className="w-3/4 h-96 object-contain"
            />
            <p className="text-gray-400 font-thin">
              Con cada par que compres un perrito será alimentado con croquetas
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
