import React, { useContext, useEffect, useState } from "react";
import buscador from "../assets/search.svg";
import "./Home.css";
import { Card } from "./card/Card";
import perrito from "../assets/Perrito.webp";
import Banner from "../assets/bannerDiana.png";
import af1 from "./assetsHome/Af1/AF1.jpg";
import nikeMujer from "./assetsHome/nikeMujer/nike.jpg";
import reebok from "./assetsHome/reebok/reebok.jpg";
import vans from "./assetsHome/vans/vans.jpg";
import adidas from "./assetsHome/Adidas/adidas.jpg";
import af1Negro from "./assetsHome/Af1Negro/af1Negros.jpg";
import nikeMujerBota from "./assetsHome/nikeMujerBota/nikeMujerBota.jpg";
import nikeCafe from "./assetsHome/NikeCafe/nikeCafe.jpg";
import nikeNina from "./assetsHome/NikeNina/nikeNina.jpg";
import nikeForceRojos from "./assetsHome/NikeForceRojos/NikeForceRojos.jpg";
import nikeForceRojosNino from "./assetsHome/NikeForceRojosNino/nikeNino.jpg";
import nikeForceAzules from "./assetsHome/NikeForceAzules/NikeForceAzules.jpg";
import pumaMujer from "./assetsHome/PumaMujer/pumaMujer.jpg";
import { AppContext } from "../Context/AppContext";
import { Carrusel } from "./Carrusel/Carrusel";
export const Home = () => {
  const contexto = useContext(AppContext);
  const [cards, setCards] = useState([]);
  const [cardFilter, setCardFilter] = useState(cards);

  const Buscador = (texto) => {
    const textoMinusculas = texto.toLowerCase();
    const filtro = cards.filter((card) => {
      const tituloMinusculas = card.title.toLowerCase();
      if (tituloMinusculas.includes(textoMinusculas)) {
        return card;
      }
    });
    setCardFilter(filtro);
  };
  const getTennis = async() => {
    const url = "https://back-diana-production.up.railway.app/api/producto/conseguir";
    const response = await fetch(url);
    const data = await response.json();
    setCards(data);
    setCardFilter(data);
  }
  useEffect(() => {
    const itemsCart = JSON.parse(localStorage.getItem("items")) || [];
    contexto.setCart(itemsCart.length);
    getTennis();
  }, []);
  return (
    <div className="block min-h-screen w-full bg-white">
     {
      /**
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
       */
     }
      <Carrusel/>
      <h1 className="text-center font-thin m-4 text-gray-500 text-xl">
        Todo tipo de calzado (zapato, tennis deportivos, hombre, mujer, niño) en Moroleón, Guanajuato{" "}
      </h1>
      <div className="w-11/12 flex flex-wrap justify-between p-2 items-center m-auto">
        {cardFilter.length > 0 ? (
          cardFilter.map((card) => {
            return (
              <div
                key={`tennis-home-${card.Id}`}
                className={`contenedor-card rounded-none scroll-content ${
                  card.Id % 2 == 0 ? "mt-16" : "mt-0"}
                  ${card.Id > 4 ? "fadeRight" : ""}
                  `}
                  onClick={()=>{contexto.setCard(card);}}
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
